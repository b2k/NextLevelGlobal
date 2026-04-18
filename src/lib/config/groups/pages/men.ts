import type { GroupPage } from '../types';

export const men: GroupPage = {
	id: 'men',
	title: "Men's Groups",
	menuTitle: "Men's Groups",
	parentPath: '',
	order: 1,
	heroImage: '/groups/men/hero.jpg',
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
					href: '/groups/men/100',
				},
				{
					type: 'link',
					title: '200-Level',
					href: '/groups/men/200',
				},
				{
					type: 'link',
					title: '300-Level',
					href: '/groups/men/300',
				},
			]
		},
	]
};
