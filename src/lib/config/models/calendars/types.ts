export type CalendarEntryKind = 'week' | 'reading' | 'memory' | 'book' | 'psalm' | 'meeting';

export const calendarColors: Record<
	CalendarEntryKind,
	{ bg: string; text: string; accent: string }
> = {
	week: {
		bg: '#F3F4F6', // neutral gray (structure, not content)
		text: '#374151',
		accent: '#9CA3AF'
	},
	reading: {
		bg: '#E8F0FE', // soft blue
		text: '#1D4ED8',
		accent: '#3B82F6'
	},
	memory: {
		bg: '#ECFDF5', // mint green
		text: '#065F46',
		accent: '#10B981'
	},
	book: {
		bg: '#FEF3E8', // warm orange
		text: '#C2410C',
		accent: '#F97316'
	},
	psalm: {
		bg: '#F3E8FF', // soft purple
		text: '#7C3AED',
		accent: '#A78BFA'
	},
	meeting: {
		bg: '#FEE2E2', // soft red/pink
		text: '#B91C1C',
		accent: '#EF4444'
	}
};
