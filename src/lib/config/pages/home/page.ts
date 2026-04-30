import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'home',
	title: 'Moving towards a Christ centered life',
	menuTitle: '',
	parentPath: '',
	order: 1,
	heroImage: '/home/hero.jpg',
	heroTextColor: 'white',
	theme: 'dark',
	sections: [
		{
			id: 'links',
			title: 'Quick Links',
			theme: 'dark',
			items: [
				{
					type: 'link',
					title: 'Small Groups',
					href: '/groups/small-groups'
				},
				{
					type: 'link',
					title: 'Next Level Men',
					href: '/groups/men'
				},
				{
					type: 'link',
					title: 'Next Level Women',
					href: '/groups/women'
				}
			]
		},
		{
			id: 'what-is-next-level',
			title: 'What is Next Level Global?',
			description: `Next Level Global is an accountability group for believers who want to live Christ-centered lives. Through the use of the spiritual disciplines of daily Bible reading, Bible internalization, and insightful Christian literature, we gather in community to share the transformational power of Christ in our lives. The desire of Next Level Global is to make an impact in the lives of believers so that they may become fully mature in Christ.

Next Level was started out of much prayer and preparation to see men become fully devoted disciples of Christ. Next Level began as an extension of Men's Breakfast at Willow Creek Community Church Chicago Campus in January, 2008.  Since that time Next Level Men has added groups at Midwest Bible Church of Chicago, IL.  and City Lights Church of Chicago, IL.`,
			theme: 'light'
		},
		{
			id: 'our-vision',
			title: 'Our Vision',
			description: `To train Christian believers to be strong in body, soul, and spirit in order to fulfill God's unique calling on their lives thus making them powerful change agents in their families, churches, and nations.`,
			backgroundImage: '/home/vision-bg.jpg',
			theme: 'dark'
		},
		{
			theme: 'light',
			title: 'For Pastors & Leaders',
			description:
				'A special note from pastor Marco David of Midwest Bible Church in Chicago Illinois. Midwest Bible Church welcomed the Next Level discipleship program to their church in 2012 and has seen the lives of the men and women of their congregation transformed through our structured discipleship program.',
			items: [
				{
					type: 'video',
					href: 'https://www.youtube.com/watch?v=OktqsulbiY0'
				}
			]
		},
		{
			theme: 'dark',
			title: 'Testimonials',
			description:
				'Testimonials from recent graduates of the three-year Next Level discipleship program.',
			items: [
				{
					type: 'video',
					href: 'https://www.youtube.com/watch?v=yDuDet5enFQ'
				},
				{
					type: 'video',
					href: 'https://www.youtube.com/watch?v=On7tUBfycQE'
				}
			]
		}
	]
};
