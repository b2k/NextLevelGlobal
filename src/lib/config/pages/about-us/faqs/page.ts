import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'about-us-faqs',
	title: '',
	menuTitle: 'faqs',
	parentPath: '',
	order: 1,
	theme: 'light',
	sections: [
		{
			id: 'faqs',
			title: 'Frequently Asked Questions',
			subtitle: 'Here are some of our most frequently asked questions about Next Level.',
			theme: 'light',
			columns: [
				{
					title: '',
					items: [
						{
							type: 'item',
							title: 'When does the program start?',
							description:
								'The Next Level Program begins in mid-January of each year and goes through the first week in December. The online group meets weekly while local church groups meet twice a month.'
						},
						{
							type: 'item',
							title: 'What is involved?',
							description:
								'Next Level is a commitment you make with yourself and with God to find out just how far you can go on your spiritual journey. It involves you exploring and putting into practice the spiritual practices that will advance you to your own personal Next Level. These practices include daily Bible reading, prayer, scripture internalization, and reading Christian literature.'
						},
						{
							type: 'item',
							title: 'What does it require of me?',
							description:
								'We have found that you get out of the program what you put into it. If you want to see real positive growth, then you will need to decide how important that is to you and then chase after it with all your heart.'
						},
						{
							type: 'item',
							title: 'Which Churches incorporate Next Level?',
							description:
								'Currently Next Level meets in person at Midwest Bible Church in Chicago. We also meet virtually nationwide over Zoom.'
						}
					]
				},
				{
					title: '',
					items: [
						{
							type: 'item',
							title: 'If I can’t physically be at the meetings, is there an option for me?',
							description:
								'Next Level Global uses Zoom, a video calling software, so that you can be a part of meetings wherever you are.'
						},
						{
							type: 'item',
							title: 'How do I know if I’m ready for Next Level?',
							description:
								'You feel a longing for something more in your walk with Christ. You want structure in your spiritual life. You feel you have hit a wall on your own and want support and guidance in moving to the next step. You feel lost or unsure of what to do, but you know there is more to the Christian life than what you are currently experiencing and have the desire to find out what that could be. You have decided to be All In for Christ.'
						},
						{
							type: 'item',
							title: 'Are there any financial obligations? What does it cost?',
							description:
								'Besides needing to purchase the reading materials, there is no monetary obligation for Next Level. It may cost you some of your time, and may cost you some of your old habits.'
						}
					]
				}
			],
			items: [
				{
					type: 'pdf',
					title: 'Core Values PDF',
					pdf: '/about-us/beliefs/core-values.pdf'
				},
				{
					type: 'link',
					title: 'How do I get started?',
					description: 'Contact us and someone will get back to you with your next steps.',
					href: '/about-us/contact-us'
				},
				{
					type: 'link',
					title: 'What are some ways to help me memorize scripture?',
					description:
						'Here are some links that can help you memorize your scriptures. CARM, WikiHow',
					href: '/about-us/memorize-scripture'
				}
			]
		},
		{
			id: 'board-of-reference',
			title: 'Board of Reference',
			subtitle: 'Next Level Global is grateful for the wise counsel and support of our Board of Reference.',
			theme: 'light',
			columns: [{
				title: '',
				items: [
					{
						type: 'item',
						title: 'Gene Brush, Founder of Next Level Global, Chicago, IL'
					},
					{
						type: 'item',
						title: 'Marco David, Pastor of Midwest Bible Church, Chicago, IL'
					}]
			},
			{
				title: '',
				items: [
					{
						type: 'item',
						title: 'John Thompson, Navigators Church Ministry, Chicago, IL'
					},
					{
						type: 'item',
						title: 'Jose Figueroa, Family Pastor, Chicago Tabernacle, Chicago, IL'
					}
				]
			}]
		}
	],
	heroTextColor: ''
};
