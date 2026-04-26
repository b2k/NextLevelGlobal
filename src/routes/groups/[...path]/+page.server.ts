import { error } from '@sveltejs/kit';
import { pageByPath } from '$lib/config/groups/pages';
import { generateCalendarEntries } from '$lib/config/calendars/generateCalendarEntries';
import { resolveCalendarStartDate } from '$lib/config/calendars/resolveCalendarStartDate';
import { jsonClone } from '$lib/utils/jsonClone';

export function load({ url, params, cookies }) {
	const path = (params.path?.split('/') ?? []).join('/');

	if (!path) {
		throw error(404, 'Page not found');
	}

	const page = jsonClone(pageByPath.get(path));

	if (!page) {
		throw error(404, `Page not found: ${path}`);
	}

	let startDate: string | null = null;

	if (page.calendar) {
		const customStartDate = cookies.get(`customStartDate:${path}`);
		console.log('Custom start date from cookie:', customStartDate);

		startDate = resolveCalendarStartDate(
			page.calendar.defaultStartDate,
			customStartDate || url.searchParams.get('start-date')
		);

		const entries = startDate ? generateCalendarEntries(page.calendar, startDate) : [];

		page.calendar.defaultStartDate = startDate ?? page.calendar.defaultStartDate;
		page.calendar.entries = entries;
	}

	return {
		page,
		path,
		segments: path.split('/')
	};
}
