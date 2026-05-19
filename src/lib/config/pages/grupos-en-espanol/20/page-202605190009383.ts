import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'grupos-en-espanol-20',
	title: 'Small Groups 20',
	description: 'Next Level 20 is the second in a series of three introductory small group discipleship programs. See links below for more details or \n<a href=\"/about-us/contact-us\">Contact us</a> to learn more about how to get involved in a Next Level 20 small group.',
	menuTitle: '20',
	parentPath: 'small-groups',
	order: 1,
	heroImage: '/groups/small-groups/20/hero.jpg',
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
				title: 'La Búsqueda de Significado',
				buyUrl: 'https://www.amazon.com/Search-Significance-Spanish-Robert-McGee/dp/1517755417',
				questionsPdf: '/grupos-en-espanol/20/Busqueda_de_la_Significancia_Espacio_Respuestas_ES.pdf',
				image: '/grupos-en-espanol/20/la-busquea-de-significado.jpg',
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
				title: 'Acts of the Apostles',
				pdf: '/groups/small-groups/20/nlgsg20-acts.pdf'
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
				title: 'Download Verses',
				pdf: '/groups/small-groups/20/lcv-20.pdf'
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
	calendar,

};
