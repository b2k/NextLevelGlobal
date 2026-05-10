import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'groups-women-401',
	title: 'Women 401',
	menuTitle: '401',
	parentPath: '',
	order: 1,
	heroImage: '/groups/women/401/hero.jpg',
	theme: 'light',
	sections: [
	{
		id: 'books',
		title: 'Books',
		theme: 'dark',
		items: [
			{
				type: 'book',
				title: 'The Indwelling Life of Christ',
				pdf: '/groups/women/201/counterfeit-gods.pdf',
				image: '/groups/women/401/life-of-christ.jpg',
				buyUrl: 'https://www.amazon.com/Indwelling-Life-Christ-All-Him/dp/1590525248',
				questionsPdf: ''
			},
			{
				type: 'book',
				title: '7 Reasons You Can Trust the Bible',
				pdf: '',
				image: '/groups/women/401/7-reasons.jpg',
				buyUrl: 'https://www.amazon.com/Reasons-Why-You-Trust-Bible/dp/0802413315',
				questionsPdf: ''
			},
			{
				type: 'book',
				title: 'Beyond the Masquerade',
				pdf: '',
				image: '/groups/women/401/beyond-the-masquerade.jpg',
				buyUrl: 'https://www.amazon.com/Beyond-Masquerade-Unveiling-Authentic-You/dp/1589973771',
				questionsPdf: ''
			}
		]
	}
],
	calendar,

};
