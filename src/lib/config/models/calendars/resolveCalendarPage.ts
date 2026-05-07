import { jsonClone } from '$lib/utils/jsonClone';
import { error } from 'console';
import type path from 'path';
import { pageByPath } from '../pages';
import { createCalendarByReferenceDate } from './generateCalendarEntries';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function resolveCalendarPage({
	params,
	cookies,
	url,
	referenceDate = new Date()
}: {
	params: any;
	cookies: any;
	url: any;
	referenceDate?: Date;
}) {
	/* eslint-enable @typescript-eslint/no-explicit-any */
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
	const customStartDate =
		cookies.get(`customStartDate:${cookiesPath}`) || url.searchParams.get('start-date');
	console.log('Custom start date from cookie or URL:', customStartDate);

	const { startDate, entries } = createCalendarByReferenceDate(
		page.calendar,
		customStartDate,
		referenceDate
	);

	page.calendar.defaultStartDate = startDate ?? page.calendar.defaultStartDate;
	page.calendar.entries = entries;
	return { page, configPath };
}
