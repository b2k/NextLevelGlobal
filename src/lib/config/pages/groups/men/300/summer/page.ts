import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'groups-men-300-summer',
	title: 'Men 300 Summer',
	menuTitle: 'summer',
	parentPath: 'men',
	order: 2,
	heroImage: '/groups/men/300/summer/hero.jpg',
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
		id: 'scripture-summaries',
		title: 'Scripture Summaries & Questions',
		subtitle: 'Download weekly summaries and discussion questions.',
		theme: 'light',
		items: [
			{
				type: 'pdf',
				title: 'Weeks 110-112',
				pdf: '/groups/men/300/summer/nlgm300w110-112.pdf'
			},
			{
				type: 'pdf',
				title: 'Weeks 113-115',
				pdf: '/groups/men/300/summer/nlgm300w113-115.pdf'
			},
			{
				type: 'pdf',
				title: 'Weeks 116-118',
				pdf: '/groups/men/300/summer/nlgm300w116-118.pdf'
			},
			{
				type: 'pdf',
				title: 'Weeks 119-120',
				pdf: '/groups/men/300/summer/nlgm300w119-120.pdf'
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
	calendar,

};
