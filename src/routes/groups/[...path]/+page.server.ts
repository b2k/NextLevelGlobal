import { error } from '@sveltejs/kit';
import { generateCalendarEntries } from '$lib/config/models/calendars/generateCalendarEntries';
import { resolveCalendarStartDate } from '$lib/config/models/calendars/resolveCalendarStartDate';
import { jsonClone } from '$lib/utils/jsonClone';
import { getPageByPath } from '$lib/config/models/pages';

export function load({ url, params, cookies }) {
	const path = 'groups/' + (params.path?.split('/') ?? []).join('/');

	if (!path) {
		throw error(404, 'Page not found');
	}
	const pageData = getPageByPath(path);
	const page = jsonClone(pageData);

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
