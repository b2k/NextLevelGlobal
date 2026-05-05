import path from 'path';
import type { CalendarEntry, GroupCalendarConfig } from './groupCalendars';
import { resolveCalendarStartDate } from './resolveCalendarStartDate';
import { error } from 'console';
import { jsonClone } from '$lib/utils/jsonClone';
import { pageByPath } from '../pages';

function parseLocalDate(value: string): Date {
	const [y, m, d] = value.split('-').map(Number);
	return new Date(y, m - 1, d);
}

function formatLocalDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
	const copy = new Date(date);
	copy.setDate(copy.getDate() + days);
	return copy;
}

function combine(date: Date, time: string): string {
	const [h, m] = time.split(':').map(Number);
	const dt = new Date(date);
	dt.setHours(h, m, 0, 0);
	return dt.toISOString();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveCalendarPage(params: any, cookies: any, url: any) {
	let configPath = params.path;
	const cookiesPath = path.join(...(params.path?.split('/') ?? []).filter(Boolean));
	console.log('Calendar GET request for path:', configPath);
	if (!configPath) {
		throw error(404, 'Calendar not found');
	}
	if (configPath.endsWith('.ics')) {
		configPath = configPath.slice(0, -4);
	}

	const page = jsonClone(pageByPath.get(configPath));

	if (!page?.calendar) {
		throw error(404, `Calendar not found: ${configPath}`);
	}

	const customStartDate = cookies.get(`customStartDate:${cookiesPath}`);
	console.log('Custom start date from cookie:', customStartDate);

	const startDate = resolveCalendarStartDate(
		page.calendar.defaultStartDate,
		customStartDate || url.searchParams.get('start-date')
	);

	const entries = startDate ? generateCalendarEntries(page.calendar, startDate) : [];

	page.calendar.defaultStartDate = startDate ?? page.calendar.defaultStartDate;
	page.calendar.entries = entries;
	return { page, configPath };
}
export function generateCalendarEntries(
	template: GroupCalendarConfig,
	startDate: string
): CalendarEntry[] {
	const anchor = parseLocalDate(startDate);

	return template.entries
		.map((entry) => {
			const weekOffset = (entry.week as number) - template.startingWeek;
			const offset = weekOffset * 7 + (entry.dayOfWeek as number);
			const date = addDays(anchor, offset);

			const result: CalendarEntry = {
				...template,
				...entry,
				date: formatLocalDate(date)
			};

			if (entry.startTime && entry.endTime) {
				result.startTime = combine(date, entry.startTime);
				result.endTime = combine(date, entry.endTime);
			} else {
				result.allDay = true;
				if (entry.durationDays) {
					result.endDate = formatLocalDate(addDays(date, entry.durationDays - 1));
				}
			}

			return result;
		})
		.sort((a, b) => a.date?.localeCompare(b.date ?? '') ?? 0);
}
