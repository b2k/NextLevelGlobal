import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'small-groups-10',
	title: 'Small Groups 10',
	description: `Next Level 10 is the first in a series of three introductory small group discipleship programs. Each 10 week program is meant to build upon each other and is designed to get you ready to engage fully with the more expansive Next Level 3-year discipleship program.

Join us for a 10 week introduction to daily spiritual disciplines. We read the gospel of John, "What Every Christian Ought to Know" by Adrian Rogers, and memorize 10 life-changing scripture verses from the gospel of John. This is a great place to start if you are new to small groups or want to get started with the rhythm of Christian discipleship. 

<a href="/about-us/contact-us">Contact us</a> to learn more about how to get involved in a Next Level 10 small group.`,
	menuTitle: '10',
	parentPath: 'small-groups',
	order: 1,
	heroImage: '/groups/small-groups/10/hero.jpg',
	heroTextColor: 'white',
	theme: 'dark',
	sections: [
		{
			id: 'books',
			title: 'Book',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'What Every Christian Ought to Know',
					buyUrl:
						'https://www.christianbook.com/christian-ought-solid-grounding-growing-faith/adrian-rogers/9781433677854/pd/677850',
					questionsPdf: '/groups/small-groups/10/what-every-christian.pdf',
					image: '/groups/small-groups/10/what-every-christian.png',
					description: 'Download the weekly discussion questions PDF.'
				}
			]
		},
		{
			id: 'scripture-summaries',
			title: 'Scripture Summaries & Questions',
			subtitle:
				'These summaries and questions are designed to help you engage with the gospel of John on a deeper level. We recommend following the provided reading schedule to read the gospel of John in 10 weeks. Each week has a summary and discussion questions to help you reflect on what you read. These questions are also designed to faciliate group discussion, providing a framework for growing together in Christian community.',
			theme: 'light',
			items: [
				{
					type: 'pdf',
					title: 'Gospel of John',
					pdf: '/groups/small-groups/10/nlgsg10.pdf'
				}
			]
		},
		{
			id: 'memory-verses',
			title: 'Memory Verses',
			theme: 'dark',
			items: [
				{
					type: 'pdf',
					title: 'NIV',
					pdf: '/groups/small-groups/10/lcv-10-esv.pdf'
				},
				{
					type: 'pdf',
					title: 'NIV',
					pdf: '/groups/small-groups/10/lcv-10-niv.pdf'
				},
				{
					type: 'pdf',
					title: 'NKJV',
					pdf: '/groups/small-groups/10/lcv-10-nkjv.pdf'
				}
			]
		},
		{
			id: 'additional-resources',
			title: 'Additional Resources',
			theme: 'light',
			items: [
				{
					type: 'link',
					title: 'Contact Us',
					href: '/about-us/contact-us'
				},
				{
					type: 'pdf',
					title: 'Next Level Vision',
					pdf: '/groups/men/vision.pdf'
				},
				{
					type: 'pdf',
					title: 'Commitment',
					pdf: '/groups/men/commitment.pdf'
				}
			]
		}
	],
	calendar
};
