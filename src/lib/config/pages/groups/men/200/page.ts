import type { GroupPage } from '$lib/config/models/types';


export const page: GroupPage = {
	id: 'groups-men-200',
	title: 'Men\'s 200-Level',
	menuTitle: '200',
	parentPath: 'men',
	order: 1,
	heroImage: '/groups/men/200/hero.jpg',
	theme: 'light',
	sections: [
	{
		id: 'groups',
		title: 'Groups',
		theme: 'dark',
		items: [
			{
				type: 'link',
				title: '201',
				href: '/groups/men/200/201'
			},
			{
				type: 'link',
				title: '202',
				href: '/groups/men/200/202'
			},
			{
				type: 'link',
				title: 'Summer',
				href: '/groups/men/200/summer'
			},
			{
				type: 'link',
				title: '203',
				href: '/groups/men/200/203'
			}
		]
	}
],

};
