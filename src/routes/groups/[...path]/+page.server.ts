import { error } from '@sveltejs/kit';
import { generateCalendarEntries } from '$lib/config/models/calendars/generateCalendarEntries';
import { resolveCalendarStartDate } from '$lib/config/models/calendars/resolveCalendarStartDate';
import { jsonClone } from '$lib/utils/jsonClone';
import { getPageByPath } from '$lib/config/models/pages';
import path from 'node:path';

export function load({ url, params, cookies }) {
	const configPath = path.join('groups', ...(params.path?.split('/') ?? []).filter(Boolean));
	const cookiesPath = path.join(...(params.path?.split('/') ?? []).filter(Boolean));
	if (!configPath) {
		throw error(404, 'Page not found');
	}
	const pageData = getPageByPath(configPath);
	const page = jsonClone(pageData);

	if (!page) {
		throw error(404, `Page not found: ${configPath}`);
	}

	let startDate: string | null = null;

	if (page.calendar) {
		const customStartDate = cookies.get(`customStartDate:${cookiesPath}`);
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
		path: configPath,
		segments: configPath.split('/').slice(1) // Remove 'groups' from segments
	};
}
