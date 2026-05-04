import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'groups-men-200-202',
	title: 'Men 202',
	menuTitle: '202',
	parentPath: 'men',
	order: 1,
	heroImage: '/groups/men/200/202/hero.jpg',
	heroTextColor: 'white',
	theme: 'light',
	sections: [
	{
		id: 'books',
		title: 'Book',
		theme: 'dark',
		items: [
			{
				type: 'book',
				title: 'Knowing God',
				buyUrl: 'https://www.amazon.com/Knowing-God-J-I-Packer/dp/083081650X',
				questionsPdf: '/groups/men/200/202/knowing-god_questions.pdf',
				image: '/groups/men/200/202/knowing-god.jpg',
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
				title: 'Week 57-59',
				pdf: '/groups/men/200/202/nlgm202w57-59.pdf'
			},
			{
				type: 'pdf',
				title: 'Week 60-62',
				pdf: '/groups/men/200/202/nlgm202w60-62.pdf'
			},
			{
				type: 'pdf',
				title: 'Week 63-66',
				pdf: '/groups/men/200/202/nlgm202w63-66.pdf'
			}
		]
	},
	{
		id: 'memory-verses',
		title: 'Memory Verses',
		subtitle: 'Psalm 103',
		theme: 'dark',
		items: [
			{
				type: 'pdf',
				title: 'ESV',
				pdf: '/groups/men/200/202/psalm_103_esv.pdf'
			},
			{
				type: 'pdf',
				title: 'NIV',
				pdf: '/groups/men/200/202/psalm_103_niv.pdf'
			},
			{
				type: 'pdf',
				title: 'NKJV',
				pdf: '/groups/men/200/202/psalm_103_nkjv.pdf'
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
