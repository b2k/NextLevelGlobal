import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'women',
	title: 'Women 201',
	menuTitle: '201',
	parentPath: '',
	order: 1,
	heroImage: '/groups/women/201/hero.jpg',
	theme: 'light',
	calendar
};
