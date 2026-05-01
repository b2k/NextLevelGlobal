import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'beliefs',
	title: "Beliefs",
	menuTitle: "Beliefs",
	parentPath: '',
	order: 1,
	heroImage: '/beliefs/hero.jpg',
	theme: 'light',
	sections: [
		{
			id: 'core-values',
			title: 'Core Values',
			theme: 'dark',
			items: [
				{
					type: 'item',
					description: `Jesus Christ is our Lord and Savior who deserves our full love and devotion. It is the goal of every disciple to know Christ intimately and to abide in Him through obedience to His Word and dependence on His guidance.  Philippians 1:21;3:8-10; John 15:7`
				},
				{
					type: 'link',
					title: '200-Level',
					href: '/groups/men/200'
				},
				{
					type: 'link',
					title: '300-Level',
					href: '/groups/men/300'
				}
			]
		}
	],
	heroTextColor: ''
};
