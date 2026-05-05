import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-300-302',
	title: 'Men 302',
	subtitle: '',
	heroImage: '/groups/men/300/302/hero.jpg',
	heroTextColor: 'white',
	theme: 'tan',
	sections: [
		{
			title: '302 Books',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'Counterfeit Gods',
					description: 'Timothy Keller',
					image: '/groups/men/300/302/counterfeit-gods.jpg',
					buyUrl:
						'https://www.amazon.com/gp/product/1594485496/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=booresbytimke-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1594485496',
					questionsPdf: '/groups/men/300/302/counterfeit-gods.pdf'
				}
			]
		},
		{
			title: 'Scripture Summaries & Questions',
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
	menuTitle: 'Men 302',
	calendar
};
