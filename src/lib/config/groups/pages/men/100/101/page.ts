import type { GroupPage } from '$lib/config/groups/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-101',
	title: 'Men 101',
	menuTitle: '101',
	parentPath: 'men',
	order: 1,
	heroImage: '/groups/men/100/101/hero.jpg',
	heroTextColor: 'white',
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
					questionsPdf: '/groups/men/100/101/the_man_code_by_mark_henry_questions.pdf',
					image: '/groups/men/100/101/the_man_code.jpg',
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
					pdf: '/groups/men/100/101/nlgw1-2.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 3-6',
					pdf: '/groups/men/100/101/nlgw3-6.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 7-10',
					pdf: '/groups/men/100/101/nlgw7-10.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 11-13',
					pdf: '/groups/men/100/101/nlgw11-13.pdf'
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
							pdf: '/groups/men/100/shared/lcv-col-esv.pdf'
						},
						{
							type: 'pdf',
							title: '1 Thessalonians & Romans Road',
							pdf: '/groups/men/100/shared/lcv-thes-rr-esv.pdf'
						},
						{
							type: 'pdf',
							title: 'Ephesians',
							pdf: '/groups/men/100/shared/lcv-eph-esv.pdf'
						}
					]
				},
				{
					title: 'NIV',
					items: [
						{
							type: 'pdf',
							title: 'Colossians',
							pdf: '/groups/men/100/shared/lcv-col-niv.pdf'
						},
						{
							type: 'pdf',
							title: '1 Thessalonians & Romans Road',
							pdf: '/groups/men/100/shared/lcv-thes-rr-niv.pdf'
						},
						{
							type: 'pdf',
							title: 'Ephesians',
							pdf: '/groups/men/100/shared/lcv-eph-niv.pdf'
						}
					]
				},
				{
					title: 'NKJV',
					items: [
						{
							type: 'pdf',
							title: 'Colossians',
							pdf: '/groups/men/100/shared/lcv-col-nkjv.pdf'
						},
						{
							type: 'pdf',
							title: '1 Thessalonians & Romans Road',
							pdf: '/groups/men/100/shared/lcv-thes-rr-nkjv.pdf'
						},
						{
							type: 'pdf',
							title: 'Ephesians',
							pdf: '/groups/men/100/shared/lcv-eph-nkjv.pdf'
						}
					]
				},
			]
		},
		{
			id: 'additional-resources',
			title: 'Additional Resources',
			theme: 'light',
			items: [
				{
					type: 'pdf',
					title: 'Next Level Vision',
					pdf: '/groups/men/vision.pdf'
				},
				{
					type: 'pdf',
					title: '100 Growth Plan',
					pdf: '/groups/men/100/growth-plan.pdf'
				},
				{
					type: 'pdf',
					title: 'Commitment',
					pdf: '/groups/men/commitment.pdf'
				}
			]

		}
	],
	calendar: calendar
};
