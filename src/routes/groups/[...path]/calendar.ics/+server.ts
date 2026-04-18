import { error } from '@sveltejs/kit';
import { pageByPath } from '$lib/config/groups/pageByPath';
import { buildCalendarIcs } from '$lib/config/groups/calendar';

export function GET({ params, url }) {
	const path = (params.path ?? []).join('/');

	if (!path) {
		throw error(404, 'Calendar not found');
	}

	const page = pageByPath.get(path);

	if (!page?.calendar) {
		throw error(404, `Calendar not found: ${path}`);
	}

	const startDate = url.searchParams.get('start-date');

	const ics = buildCalendarIcs({
		name: page.calendar.name,
		description: page.calendar.description,
		events: page.calendar.events,
		startDateOverride: startDate
	});

	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `inline; filename="${path.replace(/\//g, '-')}-calendar.ics"`,
			'Cache-Control': 'public, max-age=300'
		}
	});
}
