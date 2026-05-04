import type { GroupPage } from '$lib/config/models/types';


export const page: GroupPage = {
	id: 'groups',
	title: 'Groups',
	menuTitle: 'Groups',
	parentPath: '',
	order: 1,
	heroImage: '/groups/hero.jpg',
	theme: 'light',
	sections: [
	{
		id: 'groups',
		title: '',
		theme: 'dark',
		items: [
			{
				type: 'link',
				title: 'Small Groups',
				href: '/groups/small-groups'
			},
			{
				type: 'link',
				title: 'Men\'s Groups',
				href: '/groups/men'
			},
			{
				type: 'link',
				title: 'Women\'s Groups',
				href: '/groups/women'
			}
		]
	}
],
	description: 'Our discipleship groups form the core of what we do. Each group consists of a Bible reading plan, a book to help the participant to grow in various aspects of the Christian faith, and one or two memory verses to memorize each week. \n\nQuestions are provided to facilitate group discussion and to reinforce the material being read. If it seems like a lot of work, know that as believers, we are expected to read our Bibles and pray for each other daily. We are also expected to study to show our selves approved, workers who do not need to be ashamed, but are rightly able to handle the word of truth.',

};
