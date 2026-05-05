export type CalendarEntryKind =
	| 'week'
	| 'reading'
	| 'memory'
	| 'psalm'
	| 'book'
	| 'meeting'
	| 'event'
	| 'other';

export type CalendarEntry = {
	week?: number;
	dayOfWeek?: number; // 0 = Sunday
	kind: CalendarEntryKind;
	title: string;
	allDay?: boolean;
	durationDays?: number;
	startTime?: string;
	endTime?: string;
	date?: string; // Populated when generating calendar entries
	endDate?: string; // Optional end date for multi-day events
};

export type GroupCalendarConfig = {
	title: string;
	defaultStartDate: string;
	startingWeek: number;
	description?: string;
	allDay?: boolean;

	entries: CalendarEntry[];
};
