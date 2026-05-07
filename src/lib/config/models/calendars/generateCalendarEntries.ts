import type { CalendarEntry, GroupCalendarConfig } from './groupCalendars';
import { resolveCalendarStartDate } from './resolveCalendarStartDate';

function parseLocalDate(value: string): Date {
	const [y, m, d] = value.split('-').map(Number);
	return new Date(y, m - 1, d);
}

function formatLocalDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
	const copy = new Date(date);
	copy.setDate(copy.getDate() + days);
	return copy;
}

function combine(date: Date, time: string): string {
	const [h, m] = time.split(':').map(Number);
	const dt = new Date(date);
	dt.setHours(h, m, 0, 0);
	return dt.toISOString();
}
export function createCalendarByReferenceDate(
	calendar: GroupCalendarConfig,
	customStartDate: string,
	referenceDate: Date
) {
	const resolvedStartDate =
		resolveCalendarStartDate(calendar.defaultStartDate, customStartDate, referenceDate) || '';

	const entries = generateCalendarEntries(calendar, resolvedStartDate) ?? [];
	return { startDate: resolvedStartDate, entries };
}

export function generateCalendarEntries(
	template: GroupCalendarConfig,
	startDate: string
): CalendarEntry[] {
	const anchor = parseLocalDate(startDate);

	return template.entries
		.map((entry) => {
			const weekOffset = (entry.week as number) - template.startingWeek;
			const offset = weekOffset * 7 + (entry.dayOfWeek as number);
			const date = addDays(anchor, offset);

			const result: CalendarEntry = {
				...template,
				...entry,
				date: formatLocalDate(date)
			};

			if (entry.startTime && entry.endTime) {
				result.startTime = combine(date, entry.startTime);
				result.endTime = combine(date, entry.endTime);
			} else {
				result.allDay = true;
				if (entry.durationDays) {
					result.endDate = formatLocalDate(addDays(date, entry.durationDays - 1));
				}
			}

			return result;
		})
		.sort((a, b) => a.date?.localeCompare(b.date ?? '') ?? 0);
}
