import { error } from '@sveltejs/kit';
import { buildCalendarIcs } from '$lib/config/models/calendars/calendar';
import { resolveCalendarPage } from '$lib/config/models/calendars/generateCalendarEntries';

export function GET({ params, url, cookies }) {
	const { page, configPath } = resolveCalendarPage(params, cookies, url);
	if (!page?.calendar) {
		throw error(404, `Calendar not found: ${configPath}`);
	}
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


