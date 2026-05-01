import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-103',
	title: 'Men 103',
	menuTitle: '103',
	parentPath: 'men/100',
	order: 3,
	heroImage: '/groups/men/100/103/hero.jpg',
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
				title: 'Titus Ten',
				buyUrl: 'https://www.christianbook.com/titus-ten-foundations-for-godly-manhood/j-smith/9781087752396/pd/752396?event=BRSRCP%7CPSEN&ps_exit=PRODUCT%7Clegacy&search_term=titus%20ten&Ntt=752396&product_redirect=1',
				questionsPdf: '/groups/men/100/103/titus_ten_questions.pdf',
				image: '/groups/men/100/103/titus-ten-book-cover.jpg',
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
				title: 'Week 34-36',
				pdf: '/groups/men/100/103/nlg103w34-36.pdf'
			},
			{
				type: 'pdf',
				title: 'Week 37-39',
				pdf: '/groups/men/100/103/nlgm103w37-39.pdf'
			},
			{
				type: 'pdf',
				title: 'Week 40-43',
				pdf: '/groups/men/100/103/nlgm103w40-43.pdf'
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
	calendar,

};
