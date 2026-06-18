import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'men-100-summer',
	title: 'Men 100 Summer',
	menuTitle: 'Summer',
	parentPath: 'men',
	order: 2,
	heroImage: '/groups/men/100/summer/hero.jpg',
	heroTextColor: 'white',
	theme: 'dark',
	sections: [
		{
			id: 'summer-description',
			title: 'Recommended Summer Reading & Resources',
			description:
				'During the summer there are no formal groups, but we encourage men to continue daily Bible reading and prayer. The calendar provides a reading schedule to help you read the Bible using our 4 year reading plan.',
			theme: 'dark'
		},
		{
			id: 'scripture-summaries',
			title: 'Scripture Summaries & Questions',
			subtitle: 'Download weekly summaries and discussion questions.',
			theme: 'light',
			items: [
				{
					type: 'pdf',
					title: 'Weeks 24-27',
					pdf: '/groups/men/100/summer/nlgm-summer100-w24-27.pdf'
				},
				{
					type: 'pdf',
					title: 'Weeks 28-30',
					pdf: '/groups/men/100/summer/nlgm-summer100-w28-30.pdf'
				},
				{
					type: 'pdf',
					title: 'Weeks 31-33',
					pdf: '/groups/men/100/summer/nlgm-summer100-w31-33.pdf'
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
