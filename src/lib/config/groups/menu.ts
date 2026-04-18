import type { MenuItem } from './types';

export const groupMenu: MenuItem[] = [
	{
		title: 'Men',
		path: 'men',
		children: [
			{
				title: '101',
				path: 'men/100/101',
				children: [
					{
						title: 'Scripture Summaries & Questions',
						path: 'men/1011'
					}
				]
			}
		]
	},
	{
		title: 'Women',
		path: 'women',
		children: [
			{
				title: '401',
				path: 'women/401'
			}
		]
	}
];