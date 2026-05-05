import type { CalendarEventEntry } from './CalendarEventEntry';

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

export function formatEventDate(event: CalendarEventEntry, date: Date): string {
	if (event.allDay) {
		return `VALUE=DATE:${formatDateOnly(date)}`;
	} else {
		return `${formatUtcTimestamp(date)}`;
	}
}

export function formatUtcTimestamp(date: Date): string {
	return (
		[date.getUTCFullYear(), pad(date.getUTCMonth() + 1), pad(date.getUTCDate())].join('') +
		`T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
	);
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

export function buildCalendarIcs(args: {
	name: string;
	description?: string;
	events: CalendarEventEntry[];
}): string {
	const { name, description, events } = args;

	const now = new Date();

	const lines: string[] = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Next Level Global//Group Calendar//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		`X-WR-CALNAME:${escapeICal(name)}`,
		'X-WR-TIMEZONE:America/Chicago'
	];
	/*
BEGIN:VEVENT
DTSTART;VALUE=DATE:20240813
DTEND;VALUE=DATE:20240814
RRULE:FREQ=WEEKLY;INTERVAL=52
DTSTAMP:20260505T011755Z
UID:CSVConvert040842930b34c31cd5d54cfa70d0ef19
CREATED:19000101T120000Z
LAST-MODIFIED:20260402T003620Z
SEQUENCE:1
STATUS:CONFIRMED
SUMMARY:Jeremiah 51
TRANSP:OPAQUE
END:VEVENT

*/
	if (description) {
		lines.push(`X-WR-CALDESC:${escapeICal(description)}`);
	}

	for (const event of events) {
		lines.push('BEGIN:VEVENT');
		lines.push(`UID:${escapeICal(event.uid)}`);
		lines.push(`DTSTAMP:${formatUtcTimestamp(now)}`);
		lines.push(`SUMMARY:${escapeICal(event.title)}`);

		const startDate = event.date?.replace(/[^\d]/g, '');
		const endDate = event.endDate?.replace(/[^\d]/g, '') ?? startDate;
		if (event.description) {
			lines.push(`DESCRIPTION:${escapeICal(event.description)}`);
		}

		if (event.location) {
			lines.push(`LOCATION:${escapeICal(event.location)}`);
		}

		if (event.allDay) {
			lines.push(`DTSTART;VALUE=DATE:${startDate}`);
			lines.push(`DTEND;VALUE=DATE:${endDate}`);

			lines.push('RRULE:FREQ=WEEKLY;INTERVAL=52');
		} else {
			const startTime = event.startTime?.replace(/[^\d]/g, '') ?? '000000';
			const endTime = event.endTime?.replace(/[^\d]/g, '') ?? '000000';
			if (!startTime || !endTime) {
				throw new Error(`Event ${event.uid} is missing startTime or endTime`);
			}

			lines.push(
				`DTSTART;TZID=America/Chicago:${startDate}T${startTime}`
			);
			lines.push(
				`DTEND;TZID=America/Chicago:${endDate}T${endTime}`
			);
			lines.push('RRULE:FREQ=WEEKLY;INTERVAL=52');
		}

		lines.push('END:VEVENT');
	}

	lines.push('END:VCALENDAR');

	return lines.join('\r\n');
}
