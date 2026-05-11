import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'groups-women-402',
	title: 'Women 402',
	menuTitle: '402',
	parentPath: '',
	order: 1,
	heroImage: '/groups/women/402/hero.jpg',
	theme: 'light',
	sections: [
		{
			id: 'books',
			title: 'Books',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'Love Walked Among Us',
					image: '/groups/women/402/love-among-us.jpg',
					buyUrl:
						'https://www.christianbook.com/love-walked-among-learning-like-jesus/paul-miller/9781612915678/pd/915678?product_redirect=1&search_term=love%20walked%20among%20&Ntt=915678&item_code=&ps_exit=PRODUCT|legacy&Ntk=keywords&event=ESRCP',
					questionsPdf: ''
				},
				{
					type: 'book',
					title: 'Transforming Grace',
					image: '/groups/women/402/transforming-grace.jpg',
					buyUrl:
						'https://www.christianbook.com/transforming-grace-softcover-with-study-guide/jerry-bridges/9781631468643/pd/468642?product_redirect=1&search_term=transofrming%20grace&Ntt=468642&item_code=&ps_exit=PRODUCT|legacy&Ntk=keywords&event=ESRCP',
					questionsPdf: ''
				},
				{
					type: 'book',
					title: 'Women and God',
					image: '/groups/women/402/women-and-god.jpg',
					buyUrl: 'https://www.amazon.com/Women-God-Questions-Beautiful-Truth/dp/1784982792',
					questionsPdf: ''
				}
			]
		}
	]
};
