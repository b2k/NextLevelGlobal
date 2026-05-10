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
	sections: [
	{
		id: 'books',
		title: 'Books',
		theme: 'dark',
		items: [
			{
				type: 'book',
				title: 'Women and God',
				pdf: '/groups/women/201/counterfeit-gods.pdf',
				image: '/groups/women/201/women-and-god.jpg',
				buyUrl: '',
				questionsPdf: ''
			},
			{
				type: 'book',
				title: 'Counterfeit Gods',
				pdf: '',
				image: '/groups/women/201/counterfeit-gods.jpg',
				buyUrl: 'https://www.amazon.com/Counterfeit-Gods-Empty-Promises-Matters/dp/1594485496/ref=sr_1_1?crid=2N3DQGEUM7M5C&dib=eyJ2IjoiMSJ9.0oAlARwvOJOKCL5EvLbqIb8PNL8GiD5PzBa9mF4FyH0P0EAeYTdzrJlw_8ZfbuWkkLR_qfleATgm8ysCaK9WQ0ooqpSPDItnmrjZDxLBMQJGKnMkiEY8S75vmTkpTB0crx9DBCTt9ZuXoH0hLZOVt7BG11nGPeCPQ0ds26u74r38XwFbFiN1amXT634WpV86o1qlbyPm7p0Akg3WPxVjb55u_MBlsJFOozoWCDkm5CA.XJ0BOyc7SNbici_l4vFd7OBHJ9vQFn2LzvaQ-tlk10o&dib_tag=se&keywords=counterfeit+gods&qid=1778428086&sprefix=counterfeit+gods%2Caps%2C159&sr=8-1',
				questionsPdf: '/groups/women/201/counterfeit-gods.pdf'
			},
			{
				type: 'book',
				title: 'A Praying Life',
				pdf: '',
				image: '/groups/women/201/praying-life.jpg',
				buyUrl: 'https://www.amazon.com/Praying-Life-Connecting-Distracting-World/dp/1631466836/ref=sr_1_1?crid=1HOLQI1S822JM&dib=eyJ2IjoiMSJ9.G9pd2W1ozpBE-HjeG5D9ncInTLWiARtA-CvBSNF5m2K07Owp4JmFXxQ4NeITUiRx_CwRwTmWY0vK6db-Y6aro2vg5k3L7QO1T03cIpZIpF2zebPHqfl6HDcy1PyGNcLj9ldPJlY1w9McUoTMja8HNL04dVtBxgJW0VXfy8PK4fzkK3Z2fmMucIMN4helpYiyWzXmWslo7n14I13ovd9FHFRk1dtuSDwARQgJ5MKsemw.pfpGMsQy75aXXz3uDU22nIpTLj4hApsKWwyqHFER6qo&dib_tag=se&keywords=a+praying+life+by+paul+miller&qid=1778428204&sprefix=a+praying%2Caps%2C166&sr=8-1',
				questionsPdf: '/groups/women/201/praying-life.pdf'
			}
		]
	}
],
	calendar,

};
