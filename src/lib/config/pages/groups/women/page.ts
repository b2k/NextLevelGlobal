import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'women',
	title: "Women's Groups",
	menuTitle: "Women's Groups",
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
					title: '100-Level',
					href: '/groups/women/100'
				},
				{
					type: 'link',
					title: '200-Level',
					href: '/groups/women/200'
				},
				{
					type: 'link',
					title: '300-Level',
					href: '/groups/women/300'
				}
			]
		}
	]
};
