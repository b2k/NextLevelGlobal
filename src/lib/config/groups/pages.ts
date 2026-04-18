import { men101 } from '../pages/men101';
import type { GroupPage } from './types';

function definePage(path: string, page: Omit<GroupPage, 'path'>): [string, GroupPage] {
	return [path, { ...page, path }];
}

export const pageByPath = new Map<string, GroupPage>([
	definePage('men/101', men101),

	definePage('men/1011', {
		id: 'men-1011',
		title: 'Scripture Summaries & Questions',
		menuTitle: 'Scripture Summaries & Questions',
		parentPath: 'men/101',
		order: 1,
		sections: [
			{
				id: 'scripture-summaries',
				title: 'Scripture Summaries & Questions',
				subtitle: 'Download weekly summaries and discussion questions.',
				theme: {
					backgroundColor: '#f8fafc',
					textColor: '#1e293b',
					accentColor: '#2563eb',
					backgroundImage: '/images/groups/scripture-summaries-bg.jpg',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					overlayColor: '#ffffff',
					overlayOpacity: 0.88
				},
				items: [
					{
						type: 'pdf',
						title: 'Week 1-2',
						pdf: '/pdf/groups/men/101/week-1-2.pdf'
					},
					{
						type: 'pdf',
						title: 'Week 3-6',
						pdf: '/pdf/groups/men/101/week-3-6.pdf'
					},
					{
						type: 'pdf',
						title: 'Week 7-10',
						pdf: '/pdf/groups/men/101/week-7-10.pdf'
					},
					{
						type: 'pdf',
						title: 'Week 11-13',
						pdf: '/pdf/groups/men/101/week-11-13.pdf'
					}
				]
			},
			{
				id: 'scripture-memorization',
				title: 'Scripture Memorization',
				subtitle: 'Purchase the book and download the corresponding questions PDF.',
				theme: {
					backgroundColor: '#1e293b',
					textColor: '#f8fafc',
					accentColor: '#f59e0b',
					backgroundImage: '/images/groups/scripture-memorization-bg.jpg',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					overlayColor: '#0f172a',
					overlayOpacity: 0.72
				},
				items: [
					{
						type: 'book',
						title: 'ESV',
						buyUrl: 'https://www.crossway.org/bibles/',
						questionsPdf: '/pdf/groups/men/101/esv-questions.pdf',
						image: '/images/books/esv.jpg'
					},
					{
						type: 'book',
						title: 'Colossians',
						buyUrl: 'https://www.amazon.com/',
						questionsPdf: '/pdf/groups/men/101/colossians-questions.pdf',
						image: '/images/books/colossians.jpg'
					},
					{
						type: 'book',
						title: '1 Thessalonians & Romans Road',
						buyUrl: 'https://www.amazon.com/',
						questionsPdf: '/pdf/groups/men/101/1-thessalonians-romans-road-questions.pdf',
						image: '/images/books/1-thessalonians-romans-road.jpg'
					}
				]
			}
		]
	}),

	definePage('women/401', {
		id: 'women-401',
		title: 'Women 401',
		menuTitle: '401',
		parentPath: 'women',
		order: 1,
		sections: [
			{
				id: 'overview',
				title: 'Women 401',
				subtitle: 'Group overview and resources.',
				theme: {
					backgroundColor: '#fff7ed',
					textColor: '#431407',
					accentColor: '#c2410c'
				},
				items: []
			}
		],
		calendar: {
			name: 'Women 401 Schedule',
			description: 'Recurring schedule for Women 401',
			events: [
				{
					uid: 'women-401-start@nextlevelglobal.org',
					title: 'Women 401 Begins',
					description: 'Opening week for Women 401',
					allDay: true,
					durationDays: 1,
					startRule: {
						month: 9,
						weekday: 0,
						occurrence: 2
					}
				}
			]
		}
	})
]);
