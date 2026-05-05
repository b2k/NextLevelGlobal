import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-301',
	title: 'Men 301',
	menuTitle: '301',
	parentPath: 'men/300',
	order: 1,
	heroImage: '/groups/men/300/301/hero.jpg',
	heroTextColor: 'white',
	theme: 'dark',
	sections: [
		{
			id: 'books',
			title: '301 Books',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'A Praying Life Questions',
					buyUrl:
						'https://www.christianbook.com/praying-life-connecting-distracting-world-edition/paul-miller/9781631466830/pd/466830',
					questionsPdf: '/groups/men/300/301/praying-life-questions.pdf',
					image: '/groups/men/300/301/praying-life.jpg',
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
					title: 'Weeks 87-89',
					pdf: '/groups/men/300/301/nlgm301w87-89.pdf'
				},
				{
					type: 'pdf',
					title: 'Weeks 90-92',
					pdf: '/groups/men/300/301/nlgm301w90-92.pdf'
				},
				{
					type: 'pdf',
					title: 'Weeks 93-95',
					pdf: '/groups/men/300/301/nlgm301w93-95.pdf'
				},
				{
					type: 'pdf',
					title: 'Weeks 96-99',
					pdf: '/groups/men/300/301/nlgm301w96-99.pdf'
				}
			]
		},
		{
			title: 'Scripture Summaries & Questions',
			theme: 'dark',
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
			theme: 'light',
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
	calendar
};
