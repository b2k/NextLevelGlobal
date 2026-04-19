import { error } from '@sveltejs/kit';
import { buildCalendarIcs } from '$lib/config/groups/calendar';
import { pageByPath } from '$lib/config/groups/pages';
import { jsonClone } from '$lib/utils/jsonClone.js';

export function GET({ params, url }) {
	let path = params.path;
	console.log('Calendar GET request for path:', path);
	if (!path) {
		throw error(404, 'Calendar not found');
	}
	if (path.endsWith('.ics')) {
		path = path.slice(0, -4);
	}

	const page = jsonClone(pageByPath.get(path));

	if (!page?.calendar) {
		throw error(404, `Calendar not found: ${path}`);
	}

	const startDate = url.searchParams.get('start-date');

	const ics = buildCalendarIcs({
		name: page.calendar.title,
		description: page.calendar.description,
		events: page.calendar.entries.map((entry, i) => ({
			uid: `${entry.title.replaceAll(' ', '-')}-${i}`,
			...entry
		})),
		startDateOverride: startDate ?? undefined
	});

	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `inline; filename="${path.replace(/\//g, '-')}-calendar.ics"`,
			'Cache-Control': 'public, max-age=300'
		}
	});
}
