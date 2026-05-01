import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'groups-small-groups',
	title: "Small Groups",
	menuTitle: "Small Groups",
	parentPath: '',
	order: 1,
	heroImage: '/groups/small-groups/hero.jpg',
	theme: 'light',
	sections: [
		{
			id: 'groups',
			title: 'Groups',
			theme: 'dark',
			items: [
				{
					type: 'link',
					title: '10',
					href: '/groups/small-groups/10'
				},
				{
					type: 'link',
					title: '20',
					href: '/groups/small-groups/20'
				},
				{
					type: 'link',
					title: '30',
					href: '/groups/small-groups/30'
				}
			]
		}
	]
};
