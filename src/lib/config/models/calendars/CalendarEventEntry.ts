import { FloatingStartRule } from './FloatingStartRule';

export interface CalendarEventEntry {
	uid: string;
	title: string;
	description?: string;
	location?: string;
	allDay?: boolean;
	durationDays?: number;
	startRule?: FloatingStartRule;
}
