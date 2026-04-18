export interface SectionTheme {
	backgroundColor?: string;
	textColor?: string;
	accentColor?: string;
	backgroundImage?: string;
	backgroundPosition?: string;
	backgroundSize?: string;
	backgroundRepeat?: string;
	overlayColor?: string;
	overlayOpacity?: number;
}

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

export interface PageSection {
	id: string;
	title: string;
	subtitle?: string;
	theme?: SectionTheme;
	items?: PageItem[];
}

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

export interface GroupCalendar {
	name: string;
	description?: string;
	events: CalendarEventEntry[];
}

export interface GroupPage {
	id: string;
	title: string;
	path?: string;
	menuTitle?: string;
	parentPath?: string;
	order?: number;
	heroImage?: string;
	sections: PageSection[];
	calendar?: GroupCalendar;
}

export interface MenuItem {
	title: string;
	path: string;
	children?: MenuItem[];
}