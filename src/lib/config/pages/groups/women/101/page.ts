import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'women',
	title: 'Women 101',
	menuTitle: '101',
	parentPath: '',
	order: 1,
	heroImage: '/groups/women/101/hero.jpg',
	theme: 'light',
	sections: [
		{
			id: 'groups',
			title: 'Books',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'What Every Christian Ought to Know',
					image: '/groups/women/101/ought-to-know_orig.jpg',
					buyUrl: '/groups/women/101/books',
					questionsPdf: '/groups/women/101/christian_ought_to_know.pdf'
				},
				{
					type: 'book',
					title: 'Listening for God',
					image: '/groups/women/101/listening-for-god.jpg',
					buyUrl: '/groups/women/101/books',
					questionsPdf: '/groups/women/101/listening-for-god.pdf'
				},
				{
					type: 'book',
					title: 'Red Sea Rules',
					image: '/groups/women/101/red-sea-rules.png',
					buyUrl: '/groups/women/101/books',
					questionsPdf: '/groups/women/101/red-sea-rules.pdf'
				}
			]
		},
		{
			id: 'scripture-summaries-and-questions',
			title: 'Scripture Summaries & Questions',
			theme: 'light',
			items: [
				{
					type: 'pdf',
					title: 'Week 1-4',
					pdf: '/groups/women/101/nlw101-w1-4.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 5-8',
					pdf: '/groups/women/101/nlw101-w5-8.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 9-12',
					pdf: '/groups/women/101/nlw101-w9-12.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 13-16',
					pdf: '/groups/women/101/nlw101-w13-16.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 17-20',
					pdf: '/groups/women/101/nlw101-w17-20.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 21-24',
					pdf: '/groups/women/101/nlw101-w21-24.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 25-28',
					pdf: '/groups/women/101/nlw101-w25-28.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 29-32',
					pdf: '/groups/women/101/nlw101-w29-32.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 33-36',
					pdf: '/groups/women/101/nlw101-w33-36.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 37-40',
					pdf: '/groups/women/101/nlw101-w37-40.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 41-44',
					pdf: '/groups/women/101/nlw101-w41-44.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 45-50',
					pdf: '/groups/women/101/nlw101-w45-50.pdf'
				}
			]
		},
		{
			id: 'memory-verses',
			title: 'Memory Verses',
			theme: 'dark',
			columns: [
				{
					title: 'John',
					items: [
						{
							type: 'pdf',
							title: 'ESV',
							pdf: '/groups/women/101/next_level_101_john_esv.pdf'
						},
						{
							type: 'pdf',
							title: 'NIV',
							pdf: '/groups/women/101/next_level_101_john_niv.pdf'
						},
						{
							type: 'pdf',
							title: 'NKJV',
							pdf: '/groups/women/101/next_level_101_john_nkjv.pdf'
						}
					]
				},
				{
					title: 'A. Christian Living',
					items: [
						{
							type: 'pdf',
							title: 'ESV',
							pdf: '/groups/women/101/christian_living_esv.pdf'
						},
						{
							type: 'pdf',
							title: 'NIV11',
							pdf: '/groups/women/101/christian_living_niv11.pdf'
						},
						{
							type: 'pdf',
							title: 'NIV84',
							pdf: '/groups/women/101/christian_living_niv84.pdf'
						},
						{
							type: 'pdf',
							title: 'NKJV',
							pdf: '/groups/women/101/christian_living_nkjv.pdf'
						}
					]
				},
				{
					title: 'B. Gospel Explained',
					items: [
						{
							type: 'pdf',
							title: 'ESV',
							pdf: '/groups/women/101/gospel_explained_esv.pdf'
						},
						{
							type: 'pdf',
							title: 'NIV11',
							pdf: '/groups/women/101/gospel_explained_niv.pdf'
						},
						{
							type: 'pdf',
							title: 'NKJV',
							pdf: '/groups/women/101/gospel_explained_nkjv.pdf'
						}
					]
				}
			]
		}
	],
	calendar
};
