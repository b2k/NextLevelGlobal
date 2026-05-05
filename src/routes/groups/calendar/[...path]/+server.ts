import { error } from '@sveltejs/kit';
import { pageByPath } from '$lib/config/models/pages';
import { jsonClone } from '$lib/utils/jsonClone.js';
import { buildCalendarIcs } from '$lib/config/models/calendars/calendar';
import { resolveCalendarStartDate } from '$lib/config/models/calendars/resolveCalendarStartDate';
import { generateCalendarEntries } from '$lib/config/models/calendars/generateCalendarEntries';
import path from 'node:path';

export function GET({ params, url, cookies }) {
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

	const ics = buildCalendarIcs({
		name: page.calendar.title,
		description: page.calendar.description,
		events: page.calendar.entries.map((entry, i) => ({
			uid: `${entry.title.replaceAll(' ', '-')}-${i}`,
			...entry
		}))
	});

	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `inline; filename="${configPath.replace(/\//g, '-')}-calendar.ics"`,
			'Cache-Control': 'public, max-age=300'
		}
	});
}
