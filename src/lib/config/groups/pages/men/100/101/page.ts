import type { GroupPage } from '$lib/config/groups/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-101',
	title: 'Men 101',
	menuTitle: '101',
	parentPath: 'men',
	order: 1,
	heroImage: '/groups/men/101/hero.jpg',
	theme: 'dark',
	sections: [
		{
			id: 'books',
			title: 'Book',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'Man Code Questions',
					buyUrl:
						'https://www.christianbook.com/man-code-priorities-every-needs-know/9780736990035/pd/990037?event=ESRCG',
					questionsPdf: '/groups/men/101/the_man_code_by_mark_henry_questions.pdf',
					image: '/groups/men/101/the_man_code.jpg',
					description: 'Download the weekly discussion questions PDF.'
				}
			]
		},
		{
			id: 'scripture-summaries',
			title: 'Scripture Summaries & Questions',
			subtitle: 'Download weekly summaries and discussion questions.',
			theme: 'light',
			items: [
				{
					type: 'pdf',
					title: 'Week 1-2',
					pdf: '/groups/men/101/week-1-2.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 3-6',
					pdf: '/groups/men/101/week-3-6.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 7-10',
					pdf: '/groups/men/101/week-7-10.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 11-13',
					pdf: '/groups/men/101/week-11-13.pdf'
				}
			]
		}
	],
	calendar: calendar
};
