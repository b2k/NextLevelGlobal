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
					pdf: '/groups/men/101/nlgw1-2.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 3-6',
					pdf: '/groups/men/101/nlgw3-6.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 7-10',
					pdf: '/groups/men/101/nlgw7-10.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 11-13',
					pdf: '/groups/men/101/nlgw11-13.pdf'
				}
			]
		},
		{
			id: 'memory-verses',
			title: 'Memory Verses',
			subtitle: 'Download the memory verse cards.',
			theme: 'dark',
			columns: [
				{
					title: 'ESV',
					items: [
						{
							type: 'pdf',
							title: 'Colossians',
							pdf: '/groups/men/101/lcv-esv-colossians.pdf'
						},
						{
							type: 'pdf',
							title: '1 Thessalonians & Romans Road',
							pdf: '/groups/men/101/lcv-esv-1-thessalonians-romans-road.pdf'
						},
						{
							type: 'pdf',
							title: 'Ephesians',
							pdf: '/groups/men/101/lcv-esv-ephesians.pdf'
						}
					]
				},
				{
					title: 'NIV',
					items: [
						{
							type: 'pdf',
							title: 'Colossians',
							pdf: '/groups/men/101/lcv-niv-colossians.pdf'
						},
						{
							type: 'pdf',
							title: '1 Thessalonians & Romans Road',
							pdf: '/groups/men/101/lcv-niv-1-thessalonians-romans-road.pdf'
						},
						{
							type: 'pdf',
							title: 'Ephesians',
							pdf: '/groups/men/101/lcv-niv-ephesians.pdf'
						}
					]
				},
				{
					title: 'NKJV',
					items: [
						{
							type: 'pdf',
							title: 'Colossians',
							pdf: '/groups/men/101/lcv-kjv-colossians.pdf'
						},
						{
							type: 'pdf',
							title: '1 Thessalonians & Romans Road',
							pdf: '/groups/men/101/lcv-kjv-1-thessalonians-romans-road.pdf'
						},
						{
							type: 'pdf',
							title: 'Ephesians',
							pdf: '/groups/men/101/lcv-kjv-ephesians.pdf'
						}
					]
				}
			]
		}
	],
	calendar: calendar
};
