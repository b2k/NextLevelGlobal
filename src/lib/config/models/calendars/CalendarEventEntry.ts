import type { FloatingStartRule } from "./FloatingStartRule";
import type { CalendarEntry } from "./groupCalendars";

export interface CalendarEventEntry extends CalendarEntry {
	uid: string;
	title: string;
	description?: string;
	location?: string;
	allDay?: boolean;
	durationDays?: number;
	startRule?: FloatingStartRule;
}
