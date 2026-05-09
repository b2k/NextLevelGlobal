import type { GroupPage } from '$lib/config/models/types';


export const page: GroupPage = {
	id: 'women',
	title: 'Women\'s Groups',
	menuTitle: 'Women\'s Groups',
	parentPath: '',
	order: 1,
	heroImage: '/groups/women/hero.jpg',
	theme: 'light',
	sections: [
	{
		id: 'groups',
		title: 'Groups',
		theme: 'dark',
		items: [
			{
				type: 'link',
				title: '101',
				href: '/groups/women/101'
			},
			{
				type: 'link',
				title: '201',
				href: '/groups/women/201'
			},
			{
				type: 'link',
				title: '401',
				href: '/groups/women/401'
			},
			{
				type: 'pdf',
				title: '402',
				pdf: '/groups/women/402'
			}
		]
	}
],

};
