import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-102',
	title: 'Men 102',
	menuTitle: '102',
	parentPath: 'men',
	order: 2,
	heroImage: '/groups/men/100/102/hero.jpg',
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
					title: 'Fight Like a Man',
					buyUrl:
						'https://www.christianbook.com/fight-biblical-battle-plan-personal-purity/emeal-e-z-zwayne/9781424568550/pd/568551?event=ESRCQ%7CPSEN',
					questionsPdf: '/groups/men/100/102/fight-like-a-man.pdf',
					image: '/groups/men/100/102/fight-like-a-man.jpg',
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
					title: 'Week 14-18',
					pdf: '/groups/men/100/102/nlgw14-18.pdf'
				},
				{
					type: 'pdf',
					title: 'Week 19-23',
					pdf: '/groups/men/100/102/nlgw19-23.pdf'
				},
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
    calendar
};