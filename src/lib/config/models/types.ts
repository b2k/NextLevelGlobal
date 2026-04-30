import type { GroupCalendarConfig } from './calendars/groupCalendars';

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
	  }
	| {
			type: 'video';
			title?: string;
			description?: string;
			href: string;
	  };

export type SectionColumn = {
	title?: string;
	items: SectionItem[];
};

export type PageSection = {
	id?: string;
	title: string;
	subtitle?: string;
	description?: string;
	backgroundImage?: string;
	theme?: ThemeName;
	items?: SectionItem[];
	columns?: SectionColumn[];
};

export interface GroupPage {
	id: string;
	title: string;
	subtitle?: string;
	description?: string;
	path?: string;
	menuTitle?: string;
	theme?: ThemeName;
	parentPath?: string;
	order?: number;
	heroImage?: string;
	heroTextColor?: string;
	sections: PageSection[];
	calendar?: GroupCalendarConfig;
}

export interface MenuItem {
	title: string;
	path: string;
	children?: MenuItem[];
}
