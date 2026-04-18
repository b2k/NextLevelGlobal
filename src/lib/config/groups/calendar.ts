import type { CalendarEventEntry } from '$lib/config/groups/types';

function pad(value: number): string {
	return String(value).padStart(2, '0');
}

export function escapeICal(value: string): string {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/\r?\n/g, '\\n')
		.replace(/,/g, '\\,')
		.replace(/;/g, '\\;');
}

export function formatUtcTimestamp(date: Date): string {
	return [
		date.getUTCFullYear(),
		pad(date.getUTCMonth() + 1),
		pad(date.getUTCDate())
	].join('') + `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

export function formatDateOnly(date: Date): string {
	return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`;
}

export function parseDateOnly(value: string): Date | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!match) return null;

	const [, y, m, d] = match;
	return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
}

export function nthWeekdayOfMonth(
	year: number,
	month: number,
	weekday: number,
	occurrence: number
): Date {
	const first = new Date(Date.UTC(year, month - 1, 1));
	const firstWeekday = first.getUTCDay();
	const offset = (weekday - firstWeekday + 7) % 7;
	const dayOfMonth = 1 + offset + (occurrence - 1) * 7;

	return new Date(Date.UTC(year, month - 1, dayOfMonth));
}

export function resolveDefaultStartDate(event: CalendarEventEntry, today = new Date()): Date {
	if (!event.startRule) {
		return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
	}

	const currentYear = today.getUTCFullYear();

	const thisYearStart = nthWeekdayOfMonth(
		currentYear,
		event.startRule.month,
		event.startRule.weekday,
		event.startRule.occurrence
	);

	const todayDateOnly = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

	if (thisYearStart >= todayDateOnly) {
		return thisYearStart;
	}

	return nthWeekdayOfMonth(
		currentYear + 1,
		event.startRule.month,
		event.startRule.weekday,
		event.startRule.occurrence
	);
}

export function buildCalendarIcs(args: {
	name: string;
	description?: string;
	events: CalendarEventEntry[];
	startDateOverride?: string | null;
}): string {
	const { name, description, events, startDateOverride } = args;

	const overrideDate = startDateOverride ? parseDateOnly(startDateOverride) : null;
	const now = new Date();

	const lines: string[] = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Next Level Global//Group Calendar//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		`X-WR-CALNAME:${escapeICal(name)}`
	];

	if (description) {
		lines.push(`X-WR-CALDESC:${escapeICal(description)}`);
	}

	for (const event of events) {
		const startDate = overrideDate ?? resolveDefaultStartDate(event, now);

		lines.push('BEGIN:VEVENT');
		lines.push(`UID:${escapeICal(event.uid)}`);
		lines.push(`DTSTAMP:${formatUtcTimestamp(now)}`);
		lines.push(`SUMMARY:${escapeICal(event.title)}`);

		if (event.description) {
			lines.push(`DESCRIPTION:${escapeICal(event.description)}`);
		}

		if (event.location) {
			lines.push(`LOCATION:${escapeICal(event.location)}`);
		}

		if (event.allDay) {
			lines.push(`DTSTART;VALUE=DATE:${formatDateOnly(startDate)}`);

			if ((event.durationDays ?? 1) > 1) {
				const endDate = new Date(startDate);
				endDate.setUTCDate(endDate.getUTCDate() + (event.durationDays ?? 1));
				lines.push(`DTEND;VALUE=DATE:${formatDateOnly(endDate)}`);
			}

			lines.push('RRULE:FREQ=WEEKLY;INTERVAL=52');
		} else {
			const endDateTime = new Date(startDate);
			endDateTime.setUTCHours(endDateTime.getUTCHours() + 1);

			lines.push(`DTSTART:${formatUtcTimestamp(startDate)}`);
			lines.push(`DTEND:${formatUtcTimestamp(endDateTime)}`);
			lines.push('RRULE:FREQ=WEEKLY;INTERVAL=52');
		}

		lines.push('END:VEVENT');
	}

	lines.push('END:VCALENDAR');

	return lines.join('\r\n');
}