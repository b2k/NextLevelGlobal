import type { GroupPage } from '$lib/config/models/types';


export const page: GroupPage = {
	id: 'groups-men-300',
	title: 'Men\'s 300-Level',
	menuTitle: '300',
	parentPath: 'men',
	order: 1,
	heroImage: '/groups/men/300/hero.jpg',
	theme: 'light',
	sections: [
	{
		id: 'groups',
		title: 'Groups',
		theme: 'dark',
		items: [
			{
				type: 'link',
				title: '301',
				href: '/groups/men/300/301'
			},
			{
				type: 'link',
				title: '302',
				href: '/groups/men/300/302'
			},
			{
				type: 'link',
				title: 'Summer',
				href: '/groups/men/300/summer'
			},
			{
				type: 'link',
				title: '303',
				href: '/groups/men/300/303'
			}
		]
	}
],

};
