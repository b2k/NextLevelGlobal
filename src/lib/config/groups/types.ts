import type { GroupCalendarConfig } from '../calendars/groupCalendars';

export type ThemeName = 'light' | 'dark';

export type PageItem =
	| {
			type: 'pdf';
			title: string;
			pdf: string;
			description?: string;
	  }
	| {
			type: 'book';
			title: string;
			buyUrl: string;
			questionsPdf: string;
			description?: string;
			image?: string;
	  }
	| {
			type: 'link';
			title: string;
			href: string;
			description?: string;
	  };

export type SectionItem =
	| {
			type: 'pdf';
			title: string;
			pdf: string;
			description?: string;
	  }
	| {
			type: 'book';
			title: string;
			buyUrl: string;
			questionsPdf: string;
			image?: string;
			description?: string;
	  }
	| {
			type: 'link';
			title: string;
			href: string;
			description?: string;
	  };

export type SectionColumn = {
	title?: string;
	items: SectionItem[];
};

export type PageSection = {
	id?: string;
	title: string;
	subtitle?: string;
	theme?: ThemeName;
	items?: SectionItem[];
	columns?: SectionColumn[];
};

export interface FloatingStartRule {
	month: number; // 1-12
	weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
	occurrence: number; // 1 = first, 2 = second, 3 = third, etc.
}

export interface CalendarEventEntry {
	uid: string;
	title: string;
	description?: string;
	location?: string;
	allDay?: boolean;
	durationDays?: number;
	startRule?: FloatingStartRule;
}

export interface GroupPage {
	id: string;
	title: string;
	subtitle?: string;
	path?: string;
	menuTitle?: string;
	theme?: ThemeName;
	parentPath?: string;
	order?: number;
	heroImage?: string;
	sections: PageSection[];
	calendar?: GroupCalendarConfig;
}

export interface MenuItem {
	title: string;
	path: string;
	children?: MenuItem[];
}
