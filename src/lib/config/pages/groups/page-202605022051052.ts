import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'groups',
	title: 'Groups',
	menuTitle: 'Groups',
	parentPath: '',
	order: 1,
	heroImage: '/groups/hero.jpg',
	theme: 'light',
	sections: [
		{
			id: 'groups',
			title: '',
			theme: 'dark',
			items: [
				{
					type: 'link',
					title: 'Small Groups',
					href: '/groups/small-groups'
				},
				{
					type: 'link',
					title: "Men's Groups",
					href: '/groups/men'
				},
				{
					type: 'link',
					title: "Women's Groups",
					href: '/groups/women'
				}
			]
		}
	]
};
