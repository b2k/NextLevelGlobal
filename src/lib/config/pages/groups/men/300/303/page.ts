import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-300-303',
	title: 'Men 303',
	subtitle: '',
	heroImage: '/groups/men/300/303/hero.jpg',
	heroTextColor: 'white',
	theme: 'tan',
	sections: [
	{
		title: 'Book',
		theme: 'dark',
		items: [
			{
				type: 'book',
				title: 'The Titus Ten',
				description: 'Timothy Keller',
				image: '/groups/men/300/303/static/groups/men/300/303/titus-ten-book-cover.jpg',
				buyUrl: 'https://www.christianbook.com/titus-ten-foundations-for-godly-manhood/j-smith/9781087752396/pd/752396?event=BRSRCP%7CPSEN&ps_exit=PRODUCT%7Clegacy&search_term=titus%20ten&Ntt=752396&product_redirect=1',
				questionsPdf: '/groups/men/300/303/titus_ten_questions.pdf'
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
				title: 'Weeks 121-124',
				pdf: '/groups/men/300/303/nlgm303w121-124.pdf'
			},
			{
				type: 'pdf',
				title: 'Weeks 125-128',
				pdf: '/groups/men/300/303/nlgm303w125-128.pdf'
			},
			{
				type: 'pdf',
				title: 'Weeks 129-133',
				pdf: '/groups/men/300/303/nlgm303w129-133.pdf'
			}
		]
	},
	{
		title: 'Scripture Memorization',
		theme: 'light',
		columns: [
			{
				title: 'ESV',
				items: [
					{
						type: 'pdf',
						title: 'Steps Toward Discipleship',
						pdf: '/groups/men/300/discipleship-esv.pdf'
					},
					{
						type: 'pdf',
						title: 'Romans 8',
						pdf: '/groups/men/300/romans-8-esv.pdf'
					}
				]
			},
			{
				title: 'NIV',
				items: [
					{
						type: 'pdf',
						title: 'Steps Toward Discipleship',
						pdf: '/groups/men/300/discipleship-niv.pdf'
					},
					{
						type: 'pdf',
						title: 'Romans 8',
						pdf: '/groups/men/300/romans-8-niv.pdf'
					}
				]
			},
			{
				title: 'NKJV',
				items: [
					{
						type: 'pdf',
						title: 'Steps Toward Discipleship',
						pdf: '/groups/men/300/discipleship-nkjv.pdf'
					},
					{
						type: 'pdf',
						title: 'Romans 8',
						pdf: '/groups/men/300/romans-8-nkjv.pdf'
					}
				]
			}
		]
	},
	{
		id: 'additional-resources',
		title: 'Additional Resources',
		theme: 'dark',
		items: [
			{
				type: 'pdf',
				title: 'Next Level Vision',
				pdf: '/groups/men/vision.pdf'
			},
			{
				type: 'pdf',
				title: '300 Growth Plan',
				pdf: '/groups/men/300/growth-plan.pdf'
			},
			{
				type: 'pdf',
				title: 'Commitment',
				pdf: '/groups/men/commitment.pdf'
			}
		]
	}
],
	menuTitle: 'Men 303',
	calendar,

};
