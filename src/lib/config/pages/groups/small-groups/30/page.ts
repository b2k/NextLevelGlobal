import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'groups-small-groups-30',
	title: 'Small Groups 30',
	description: 'Next Level 30 is the final of three introductory small group programs. See links below for more details or \n<a href=\"/about-us/contact-us\">Contact us</a> to learn more about how to get involved in a Next Level 30 small group.',
	menuTitle: '30',
	parentPath: 'small-groups',
	order: 1,
	heroImage: '/groups/small-groups/30/hero.jpg',
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
				title: 'True Spirituality',
				buyUrl: 'https://www.christianbook.com/true-spirituality-becoming-romans-christian-book/chip-ingram/9781476727639/pd/727630?event=CPOF',
				questionsPdf: '/groups/small-groups/30/true-spirituality.pdf',
				image: '/groups/small-groups/30/true-spirituality.jpg',
				description: 'Download the weekly discussion questions PDF.'
			}
		]
	},
	{
		id: 'scripture-summaries',
		title: 'Scripture Summaries & Questions',
		subtitle: '',
		theme: 'light',
		items: [
			{
				type: 'pdf',
				title: 'Romans ',
				pdf: '/groups/small-groups/30/nlgsg30-romans.pdf'
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
				title: 'ESV',
				pdf: '/groups/small-groups/30/lcv-romans-12-esv.pdf'
			},
			{
				type: 'pdf',
				title: 'NIV',
				pdf: '/groups/small-groups/30/lcv-romans-12-niv.pdf'
			},
			{
				type: 'pdf',
				title: 'NKJV',
				pdf: '/groups/small-groups/30/lcv-romans-12-nkjv.pdf'
			}
		],
		subtitle: 'Romans 12'
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
	calendar,

};
