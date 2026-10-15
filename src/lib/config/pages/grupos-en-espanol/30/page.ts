import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'grupos-en-espanol-30',
	title: 'Grupos Pequeños 30',
	description:
		'Next Level 30 es el último de una serie de tres programas introductorios de discipulado en grupos pequeños. Consulte los enlaces a continuación para obtener más detalles o <a href="/about-us/contact-us">contáctenos</a> para obtener más información sobre cómo participar en un grupo pequeño de Next Level 30.',
	menuTitle: '30',
	parentPath: 'grupos-en-espanol',
	order: 2,
	heroImage: '/groups/small-groups/30/hero.jpg',
	heroTextColor: 'white',
	theme: 'dark',
	sections: [
		{
			id: 'books',
			title: 'Libro',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'Viviendo sobre el límite',
					buyUrl: 'https://es.scribd.com/document/712604698/Viviendo-sobre-el-Limite-R12',
					questionsPdf: '/grupos-en-espanol/30/verdadera-espiritualidad-preguntas-es.pdf',
					image: '/grupos-en-espanol/30/viviendo-sobre-el-limite.jpg',
					description: 'Descargue las preguntas de discusión semanal en español.'
				}
			]
		},
		{
			id: 'scripture-summaries',
			title: 'Resúmenes Bíblicos y Preguntas',
			theme: 'light',
			items: [
				{
					type: 'pdf',
					title: 'Romanos',
					pdf: '/grupos-en-espanol/30/romanos-preguntas-es.pdf'
				}
			]
		},
		{
			id: 'memory-verses',
			title: 'Versículos para Memorizar',
			subtitle: 'Romanos 12:1-3, 9-21',
			theme: 'dark',
			items: [
				{
					type: 'pdf',
					title: 'NVI',
					pdf: '/grupos-en-espanol/30/romanos-12-nvi.pdf'
				},
				{
					type: 'pdf',
					title: 'RVR1960',
					pdf: '/grupos-en-espanol/30/romanos-12-rvr60.pdf'
				}
			]
		},
		{
			id: 'additional-resources',
			title: 'Recursos Adicionales',
			theme: 'light',
			items: [
				{ type: 'link', title: 'Contáctenos', href: '/about-us/contact-us' },
				{ type: 'pdf', title: 'Visión de Next Level', pdf: '/grupos-en-espanol/vision-es.pdf' },
				{ type: 'pdf', title: 'Compromiso', pdf: '/grupos-en-espanol/commitment-es.pdf' }
			]
		}
	],
	calendar
};
