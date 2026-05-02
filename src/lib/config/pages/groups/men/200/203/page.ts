import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'groups-men-200-203',
	title: 'Men 201',
	menuTitle: '203',
	parentPath: 'men',
	order: 1,
	heroImage: '/groups/men/200/201/hero.jpg',
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
				title: 'Experiencing God',
				buyUrl: 'https://www.christianbook.com/experiencing-knowing-doing-will-updated-expanded/henry-blackaby/9781087753676/pd/753679',
				questionsPdf: '/groups/men/200/201/expgod_questions.pdf',
				image: '/groups/men/200/201/expgod_book.jpg',
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
				title: 'Week 44-46',
				pdf: '/groups/men/200/201/nlgm201w44-46.pdf'
			},
			{
				type: 'pdf',
				title: 'Week 47-49',
				pdf: '/groups/men/200/201/nlgm201w47-49.pdf'
			},
			{
				type: 'pdf',
				title: 'Week 50-52',
				pdf: '/groups/men/200/201/nlgm201w50-52.pdf'
			},
			{
				type: 'pdf',
				title: 'Week 53-56',
				pdf: '/groups/men/200/201/nlgm201w53-56.pdf'
			}
		]
	},
	{
		id: 'memory-verses',
		title: 'Memory Verses',
		subtitle: 'John 15:1-17',
		theme: 'dark',
		items: [
			{
				type: 'pdf',
				title: 'ESV',
				pdf: '/groups/men/200/201/lcv-john15-1-18-esv.pdf'
			},
			{
				type: 'pdf',
				title: 'NIV',
				pdf: '/groups/men/200/201/lcv-john15-1-18-niv11.pdf'
			},
			{
				type: 'pdf',
				title: 'NKJV',
				pdf: '/groups/men/200/201/lcv-john15-1-18-nkjv.pdf'
			}
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
				title: '200 Growth Plan',
				pdf: '/groups/men/200/personal-growth-plan-200.pdf'
			},
			{
				type: 'pdf',
				title: 'Commitment',
				pdf: '/groups/men/commitment.pdf'
			}
		]
	}
],
	calendar,

};
