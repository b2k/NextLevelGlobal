export type CalendarEntryKind = 'week' | 'reading' | 'memory' | 'psalm' | 'book' | 'meeting' | 'other';

export type CalendarEntry = {
  week: number;
  dayOfWeek: number; // 0 = Sunday
  kind: CalendarEntryKind;
  title: string;
  allDay?: boolean;
  startTime?: string;
  endTime?: string;
  date?: string; // Populated when generating calendar entries
};

export type GroupCalendarConfig = {
  title: string;
  defaultStartDate: string;
  startingWeek: number;
  description?: string;	allDay?: boolean;

  entries: CalendarEntry[];
};
