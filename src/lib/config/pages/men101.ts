import type { GroupPage } from "../groups/types";

export const men101: GroupPage = {
	id: 'men-101',
	title: 'Men 101',
	menuTitle: '101',
	parentPath: 'men',
	order: 1,
	heroImage: '/images/groups/men-101-hero.jpg',
	sections: [
		{
			id: 'overview',
			title: 'Overview',
			subtitle: 'A discipleship group focused on Scripture, memorization, and growth.',
			theme: {
				backgroundColor: '#f8fafc',
				textColor: '#0f172a',
				accentColor: '#2563eb',
				backgroundImage: '/images/groups/men-101-overview.jpg',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				overlayColor: '#ffffff',
				overlayOpacity: 0.15
			}
		},
		{
			id: 'books',
			title: 'Book',
			theme: {
				backgroundColor: '#323232',
				textColor: '#0f172a',
				accentColor: '#2563eb',
				backgroundImage: '/images/groups/men-101-overview.jpg',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				overlayColor: '#ffffff',
				overlayOpacity: 0.85
			},
			items: [
				{
					type: 'link',
					title: 'Man Code Questions',
					href: '/groups/men/101/the_man_code_by_mark_henry_questions.pdf',
					description: 'Weekly summaries'
				}
			]
		},
		{
			id: 'summaries',
			title: 'Scripture Summaries',
			subtitle: 'Weekly scripture summaries and questions on reading',
			theme: {
				backgroundColor: '#f8fafc',
				textColor: '#0f172a',
				accentColor: '#2563eb',
				backgroundImage: '/images/groups/men-101-overview.jpg',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				overlayColor: '#ffffff',
				overlayOpacity: 0.85
			},
			items: [
				{
					type: 'link',
					title: '',
					href: '/groups/men/1011',
					description: 'Weekly summaries'
				}
			]
		}
	],
	calendar: {
		name: 'Men 101 Schedule',
		description: 'Recurring schedule for Men 101',
		events: [
			{
				uid: 'men-101-start@nextlevelglobal.org',
				title: 'Men 101 Begins',
				description: 'Opening week for Men 101',
				allDay: true,
				durationDays: 1,
				startRule: {
					month: 1,
					weekday: 0,
					occurrence: 3
				}
			}
		]
	}
};
