import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'groups-men-200-summer',
	title: 'Men 200 Summer',
	menuTitle: 'summer',
	parentPath: 'men',
	order: 2,
	heroImage: '/groups/men/200/summer/hero.jpg',
	heroTextColor: 'white',
	theme: 'dark',
	sections: [
	{
		id: 'summer-description',
		title: 'Recommended Summer Reading & Resources',
		description: 'During the summer there are no formal groups, but we encourage men to continue daily Bible reading and prayer. The calendar provides a reading schedule to help you read the Bible using our 4 year reading plan.',
		theme: 'dark'
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
				pdf: '/groups/men/200/growth-plan.pdf'
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
