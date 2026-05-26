import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'memorize-scripture',
	title: '',
	menuTitle: 'How to Memorize Scripture',
	parentPath: '',
	order: 1,
	theme: 'light',
	sections: [
		{
			id: 'memorize-scripture',
			title: 'How to Memorize Scripture',
			subtitle:
				'We believe in practicing what we preach. For that reason every leader in our program has memorized the passages for the groups they are leading. Below are some effective strategies for memorization.',
			theme: 'light',
			columns: [
				{
					title: '',
					items: [
						{
							type: 'item',
							title: 'You memorize things all the time.',
							description:
								'In order to function in daily life, you have already memorized many things. You likely have memorized phone numbers, addresses, lyrics, details about your favorite sports teams and other important information. You have the ability to memorize scripture as well. Believe in yourself and your ability to succeed.'
						},
						{
							type: 'item',
							title: 'How do you eat an elephant?',
							description:
								'One bite at a time. The same is true for memorizing scripture. It can be overwhelming to try to memorize large passages of scripture, but if you break it down into smaller sections and then work on those sections one at a time, you will find that it is much more manageable.'
						},
						{
							type: 'item',
							title: 'Start early and be consistent.',
							description:
								'Memorizing scripture requires regular practice and dedication. Start early and make it a consistent part of your daily routine. This will help reinforce your memory and make the process more manageable.'
						},
						{
							type: 'item',
							title: 'Don’t be afraid to ask for help.',
							description:
								'Memorizing scripture can be challenging, and it’s okay to seek assistance from others. Whether it’s a study partner, a mentor, or a group leader, asking for help can provide guidance, encouragement, and accountability.'
						}
					]
				},
				{
					title: '',
					items: [
						{
							type: 'item',
							title: "Develop a victor's mindset.",
							description:
								"All too often, we focus on our limitations rather than our potential. Developing a victor's mindset means believing in your ability to overcome challenges and achieve your goals, even when the path is difficult. "
						},
						{
							type: 'item',
							title: 'Involve your whole body in the process.',
							description:
								'Memorizing scripture is not just a mental exercise. Involving your whole body in the process can enhance your memory and understanding. This can include writing out verses, speaking them aloud, and using gestures or movements to reinforce the words. Engaging multiple senses can help create stronger associations and make the verses more memorable.'
						},
						{
							type: 'item',
							title: 'Take a break when needed.',
							description:
								'Memorizing scripture can be intense, and it’s important to give yourself time to rest and recharge. Taking breaks can help prevent burnout and improve your overall retention and understanding of the material.'
						}
					]
				}
			]
		},
		{
			id: 'resources',
			title: 'Resources',
			subtitle: 'Here are some additional resources to help you in your memorization journey.',
			theme: 'dark',
			items: [
				{
					type: 'link',
					title: 'CARM',
					href: 'https://carm.org/how-to-memorize-scripture'
				},
				{
					type: 'link',
					title: 'WikiHow',
					href: 'https://www.wikihow.life/Memorize-a-Bible-Verse'
				}
			]
		},
		{
			id: 'next-steps',
			title: 'Next Steps',
			subtitle:
				"If you are interested in learning more about our program or have any questions, please don't hesitate to reach out. We are here to support you on your journey of memorizing scripture and growing in your faith.",
			theme: 'light',
			items: [
				{
					type: 'link',
					title: 'About Us',
					href: '/about-us'
				},
				{
					type: 'link',
					title: 'Contact Us',
					description: 'Contact us and someone will get back to you with your next steps.',
					href: '/about-us/contact-us'
				},
				{
					type: 'link',
					title: 'FAQ',
					href: '/about-us/faqs'
				}
			]
		}
	],
	heroTextColor: ''
};
