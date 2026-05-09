import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'women',
	title: 'Women 101',
	menuTitle: '101',
	parentPath: '',
	order: 1,
	heroImage: '/groups/women/101/hero.jpg',
	theme: 'light',
	sections: [
	{
		id: 'groups',
		title: 'Books',
		theme: 'dark',
		items: [
			{
				type: 'book',
				title: 'What Every Christian Ought to Know',
				image: '/groups/women/101/ought-to-know_orig.jpg',
				buyUrl: '/groups/women/101/books',
				questionsPdf: '/groups/women/101/christian_ought_to_know.pdf'
			},
			{
				type: 'book',
				title: 'Listening for God',
				image: '/groups/women/101/listening-for-god.jpg',
				buyUrl: '/groups/women/101/books',
				questionsPdf: '/groups/women/101/listening-for-god.pdf'
			},
			{
				type: 'book',
				title: 'Red Sea Rules',
				image: '/groups/women/101/red-sea-rules.png',
				buyUrl: '/groups/women/101/books',
				questionsPdf: '/groups/women/101/red-sea-rules.pdf'
			},
		]
	}
],
	calendar,

};
