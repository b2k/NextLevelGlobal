/* eslint-disable @typescript-eslint/no-explicit-any */
import { dev } from '$app/environment';
import type { GroupCalendarConfig } from '$lib/config/models/calendars/groupCalendars.js';
import type { GroupPage } from '$lib/config/models/types.js';
import { archiveFile } from '$lib/utils/editorHelpers';
import { error, fail, redirect } from '@sveltejs/kit';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const configRoot = path.join(root, 'src/lib/config/pages');

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const typeToCode = {
	reading: 'R',
	book: 'B',
	memory: 'L',
	meeting: 'M',
	event: 'E',
	psalm: 'P',
	week: 'W'
} as const;

const codeToType = {
	R: 'reading',
	B: 'book',
	L: 'memory',
	M: 'meeting',
	E: 'event',
	P: 'psalm',
	W: 'week'
} as const;

function assertSafePath(parts: string[]) {
	if (!parts.length || parts.some((p) => !p || p === '..' || p.includes('\\') || p.includes('/'))) {
		throw new Error('Invalid page path');
	}
}

function pageDir(parts: string[]) {
	assertSafePath(parts);
	return path.join(configRoot, ...parts);
}

function serializeTs(value: unknown) {
	return (
		JSON.stringify(value, null, '\t')
			// escape single quotes inside string values
			.replace(/"((?:[^"\\]|\\.)*)"/g, (_, content) => {
				const escaped = content.replace(/'/g, "\\'");
				return `'${escaped}'`;
			})
			// unquote keys
			.replace(/'([^']+)':/g, '$1:')
	);
}
function entryToLine(entry: any) {
	const code = typeToCode[entry.kind as keyof typeof typeToCode] ?? entry.kind;
	if (entry.kind === 'event') {
		return [code, entry.title, entry.startTime ?? '', entry.endTime ?? ''].join('|');
	}
	return `${code}|${entry.title}`;
}

function entriesToGrid(startingWeek: number, entries: any[] = []) {
	const grid: Record<string, Record<string, string>> = {};
	let maxWeek = startingWeek;

	for (const entry of entries) {
		if (entry.kind === 'event' && entry.date) continue;

		const week = Number(entry.week || startingWeek);
		const day = Number(entry.dayOfWeek || 0);
		maxWeek = Math.max(maxWeek, week);

		grid[week] ??= {};
		grid[week][day] ??= '';

		grid[week][day] += `${entryToLine(entry)}\n`;
	}

	for (let week = startingWeek; week <= maxWeek; week++) {
		grid[week] ??= {};
		for (let day = 0; day < 7; day++) {
			grid[week][day] ??= '';
		}
	}

	return grid;
}

function parseLine(line: string) {
	const trimmed = line.trim();
	if (!trimmed) return null;

	const [rawCode, rawTitle, rawStart, rawEnd] = trimmed.split('|').map((x) => x.trim());
	const kind = codeToType[rawCode as keyof typeof codeToType];

	if (!kind || !rawTitle) {
		throw new Error(`Invalid calendar line: ${line}`);
	}

	const entry: any = {
		kind,
		title: rawTitle
	};

	if (kind === 'event') {
		if (rawStart) entry.startTime = rawStart;
		if (rawEnd) entry.endTime = rawEnd;
	}

	return entry;
}

function gridToEntries(gridJson: string) {
	const grid = JSON.parse(gridJson) as Record<string, Record<string, string>>;
	const entries: any[] = [];

	for (const [weekText, days] of Object.entries(grid)) {
		const week = Number(weekText);

		for (const [dayText, text] of Object.entries(days)) {
			const dayOfWeek = Number(dayText);

			for (const line of text.split('\n')) {
				const parsed = parseLine(line);
				if (!parsed) continue;

				entries.push({
					week,
					dayOfWeek,
					...parsed
				});
			}
		}
	}

	return entries.sort((a, b) => a.week - b.week || a.dayOfWeek - b.dayOfWeek);
}

function parseEvents(eventsJson: string) {
	const events = JSON.parse(eventsJson || '[]') as any[];

	return events
		.filter((e) => e.title?.trim() && e.date?.trim())
		.map((e) => ({
			kind: 'event',
			title: e.title.trim(),
			date: e.date.trim(),
			...(e.startTime?.trim() ? { startTime: e.startTime.trim() } : {}),
			...(e.endTime?.trim() ? { endTime: e.endTime.trim() } : {})
		}));
}

async function loadConfig(parts: string[]) {
	const dir = pageDir(parts);
	const pageFile = path.join(dir, 'page.ts');
	const calendarFile = path.join(dir, 'calendar.ts');

	if (!existsSync(pageFile)) {
		throw redirect(302, `/admin/groups/${parts.join('/')}?missing=1`);
	}

	const version = Date.now();
	const pageModule = await import(`${pathToFileURL(pageFile).href}?v=${version}`);
	let calendarModule = { calendar: null };
	if (existsSync(calendarFile)) {
		calendarModule = await import(`${pathToFileURL(calendarFile).href}?v=${version}`);
	}
	return {
		page: pageModule.page,
		calendar: calendarModule?.calendar ?? ({} as GroupCalendarConfig)
	};
}

export async function load({ params, url }) {
	const parts = params.path.split('/').filter(Boolean);

	if (!dev) {
		error(401, 'Unauthorized: Dev mode only');
	}

	let page: GroupPage | null = null;
	let calendar: GroupCalendarConfig | null = null;
	let missing = url.searchParams.get('missing') === '1';

	if (!missing) {
		try {
			const config = await loadConfig(parts);
			page = config.page;
			calendar = config.calendar;
		} catch {
			missing = true;
		}
	}

	return {
		path: parts.join('/'),
		dayNames,
		missing,
		page,
		calendar,
		calendarGrid: entriesToGrid(calendar?.startingWeek ?? 1, calendar?.entries ?? []),
		fixedEvents: (calendar?.entries ?? []).filter((e: any) => e.kind === 'event' && e.date)
	};
}

export const actions = {
	save: async ({ request, params }) => {
		const parts = params.path.split('/').filter(Boolean);

		try {
			const data = await request.formData();

			const page = JSON.parse(String(data.get('page') ?? '{}'));
			const calendar = JSON.parse(String(data.get('calendar') ?? '{}'));
			calendar.startingWeek = Number(data.get('startingWeek') ?? calendar.startingWeek ?? 1);

			const entries = gridToEntries(String(data.get('calendarGrid') ?? '{}'));
			const events = parseEvents(String(data.get('fixedEvents') ?? '[]'));

			calendar.entries = [...entries, ...events];

			const dir = pageDir(parts);
			await mkdir(dir, { recursive: true });

			const hasCalendarEntries = calendar.entries && calendar.entries.length > 0;
			let calendarTs = '';
			if (hasCalendarEntries) {
				if (!calendar.defaultStartDate) {
					calendar.defaultStartDate = new Date().toISOString().split('T')[0];
				}

				calendarTs = `import type { GroupCalendarConfig } from '$lib/config/models/calendars/groupCalendars';

export const calendar: GroupCalendarConfig = ${serializeTs(calendar)};
`;
			}

			const pageForFile = {
				...page,
				calendar: undefined
			};

			delete pageForFile.calendar;
			const importCalendar = hasCalendarEntries ? `import { calendar } from './calendar';` : '';
			const calendarProp = hasCalendarEntries ? '\tcalendar,\n' : '';

			const pageTs = `import type { GroupPage } from '$lib/config/models/types';
${importCalendar}

export const page: GroupPage = {
${Object.entries(pageForFile)
	.map(([key, value]) => `\t${key}: ${serializeTs(value)},`)
	.join('\n')}
${calendarProp}
};
`;

			const pagePath = path.join(dir, 'page.ts');
			archiveFile(pagePath);
			await writeFile(pagePath, pageTs, 'utf8');

			if (hasCalendarEntries) {
				const calendarPath = path.join(dir, 'calendar.ts');
				archiveFile(calendarPath);
				await writeFile(calendarPath, calendarTs, 'utf8');
			}
			return { ok: true };
		} catch (error) {
			return fail(400, {
				ok: false,
				message: error instanceof Error ? error.message : 'Could not save page'
			});
		}
	},

	clone: async ({ request }) => {
		const data = await request.formData();

		const sourcePath = String(data.get('sourcePath') ?? '')
			.split('/')
			.filter(Boolean);

		const targetPath = String(data.get('targetPath') ?? '')
			.split('/')
			.filter(Boolean);

		try {
			assertSafePath(sourcePath);
			assertSafePath(targetPath);

			const sourceDir = pageDir(sourcePath);
			const targetDir = pageDir(targetPath);

			await mkdir(targetDir, { recursive: true });

			let pageTs = await readFile(path.join(sourceDir, 'page.ts'), 'utf8');
			pageTs = pageTs.replace(/id:\s*'[^']+'/, `id: '${targetPath.join('-')}'`);
			pageTs = pageTs.replace(/menuTitle:\s*'[^']+'/, `menuTitle: '${targetPath.at(-1)}'`);
			await writeFile(path.join(targetDir, 'page.ts'), pageTs, 'utf8');

			const calendarSource = path.join(sourceDir, 'calendar.ts');
			let calendarTs = '';
			if (existsSync(calendarSource)) {
				calendarTs = await readFile(calendarSource, 'utf8');
				await writeFile(path.join(targetDir, 'calendar.ts'), calendarTs, 'utf8');
			}
		} catch (error) {
			return fail(400, {
				ok: false,
				message: error instanceof Error ? error.message : 'Could not clone page'
			});
		}
		return redirect(303, `/admin/${targetPath.join('/')}`);
	}
};
