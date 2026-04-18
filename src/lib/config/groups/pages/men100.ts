import type { GroupPage } from '../types';

export const men100: GroupPage = {
	id: 'men-100',
	title: "Men's 100-Level Groups",
	menuTitle: "100-Level",
	parentPath: 'men',
	order: 1,
	heroImage: '/groups/men/100/hero.jpg',
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
					href: '/groups/men/100/101',
				},
				{
					type: 'link',
					title: '102',
					href: '/groups/men/100/102',
				},
				{
					type: 'link',
					title: '102',
					href: '/groups/men/100/102',
				},
				{
					type: 'link',
					title: '103',
					href: '/groups/men/100/103',
				},
			]
		}
	],
};
