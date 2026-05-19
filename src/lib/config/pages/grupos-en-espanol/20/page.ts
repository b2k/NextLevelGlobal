import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'grupos-en-espanol-20',
	title: 'Small Groups 20',
	description: 'Next Level 20 es el segundo de una serie de tres programas introductorios de discipulado en grupos pequeños. Consulte los enlaces a continuación para obtener más detalles o <a href=\"/about-us/contact-us\">contáctenos</a> para obtener más información sobre cómo participar en un grupo pequeño de Next Level 20.\n',
	menuTitle: '20',
	parentPath: 'small-groups',
	order: 1,
	heroImage: '/grupos-en-espanol/20/hero.jpg',
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
		title: 'Resúmenes Bíblicos y Preguntas',
		subtitle: '',
		theme: 'light',
		items: [
			{
				type: 'pdf',
				title: 'Hechos de los Apóstoles',
				pdf: '/grupos-en-espanol/20/Hechos_Preguntas_Next_Level_20_ES.pdf'
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
				title: 'NVI',
				pdf: '/grupos-en-espanol/20/Versiculos_NVI.pdf'
			},
			{
				type: 'pdf',
				title: 'RV 1960',
				pdf: '/grupos-en-espanol/20/Versiculos_RVR1960.pdf'
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
