import type { CalendarEntry } from '../calendars/groupCalendars';
import type { GroupPage } from './types';

function normalizePath(file: string): string {
	return file
		.replace('./pages/', '')
		.replace(/\/page\.(ts|js)$/, '');
}

function definePage(path: string, page: Omit<GroupPage, 'path'>): [string, GroupPage] {
	return [path, { ...page, path }];
}

const modules = import.meta.glob('./pages/**/page.ts', { eager: true });

export const pageByPath = new Map<string, GroupPage>(
	Object.entries(modules).map(([file, mod]) => {
		const path = normalizePath(file);
		const page = (mod as { page: Omit<GroupPage, 'path'> }).page;
		return definePage(path, page);
	})
);

export const oldPageByPath = new Map<string, GroupPage>([
	// definePage('men', men),
	// definePage('men/100', men100),
	// definePage('men/100/101', men101),

	definePage('women/401', {
		id: 'women-401',
		title: 'Women 401',
		menuTitle: '401',
		parentPath: 'women',
		order: 1,
		theme: 'dark',
		sections: [
			{
				id: 'overview',
				title: 'Women 401',
				subtitle: 'Group overview and resources.',
				items: []
			}
		],
		calendar: {
			title: 'Women 401 Schedule',
			description: 'Recurring schedule for Women 401',
			defaultStartDate: '2024-01-01',
			entries: [] as CalendarEntry[]
		}
	})
]);
