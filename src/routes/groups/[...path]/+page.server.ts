import { error } from '@sveltejs/kit';
import { pageByPath } from '$lib/config/groups/pages';
import { generateCalendarEntries } from '$lib/config/calendars/generateCalendarEntries';
import { resolveCalendarStartDate } from '$lib/config/calendars/resolveCalendarStartDate';
import { jsonClone } from '$lib/utils/jsonClone';

export function load({ url, params }) {
	const path = (params.path?.split('/') ?? []).join('/');

	if (!path) {
		throw error(404, 'Page not found');
	}

	// Clone the page data to avoid mutating the 
	// original config when we add calendar entries
	const page = jsonClone(pageByPath.get(path));

	if (!page) {
		throw error(404, `Page not found: ${path}`);
	}

	let startDate: string | null = null;
	if (page.calendar) {
		startDate = resolveCalendarStartDate(
			page.calendar?.defaultStartDate,
			url.searchParams.get('start')
		);

		const entries = startDate ? generateCalendarEntries(page.calendar, startDate) : [];

		if (page.calendar) {
			page.calendar.entries = entries;
		}
	}

	return {
		page,
		path,
		segments: path.split('/'),
	};
}
