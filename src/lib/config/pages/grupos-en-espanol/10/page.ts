import type { GroupPage } from '$lib/config/models/types';
import { calendar } from './calendar';

export const page: GroupPage = {
	id: 'grupos-en-espanol-10',
	title: 'Siguiente Nivel 10',
	description: 'Siguiente Nivel 10 es el primero de una serie de tres programas introductorios de discipulado en grupos pequeños. Cada programa de 10 semanas se construye sobre el anterior y está diseñado para prepararte para participar plenamente en el programa de discipulado de Next Level, que tiene una duración de 4 años.\n\nÚnete a nosotros en una introducción de 10 semanas a las disciplinas espirituales diarias. Leemos el evangelio de Juan, memorizamos 10 versículos transformadores del evangelio de Juan, y leer Lo Que Cada Cristiano Debe Conocer de Adrian Rogers',
	menuTitle: '10',
	parentPath: 'small-groups',
	order: 1,
	heroImage: '/groups/small-groups/10/hero.jpg',
	heroTextColor: 'white',
	theme: 'dark',
	sections: [
	{
		id: 'books',
		title: 'Libros',
		theme: 'dark',
		items: [
			{
				type: 'book',
				title: 'Lo Que Cada Cristiano Debe Conocer',
				buyUrl: 'https://www.amazon.com/gp/product/0311462928/ref=ewc_pr_img_1?smid=AEA112BQU4RJH&psc=1',
				questionsPdf: '/grupos-en-espanol/10/lo_que_todo_cristiano_debe_saber__rodgers.pdf',
				image: '/grupos-en-espanol/10/lo-que-cada-cristiano-debe-conocer.jpg',
				description: 'Descargue el PDF de las preguntas de discusión semanales.'
			}
		]
	},
	{
		id: 'scripture-summaries',
		title: 'Resumenes y preguntas de las Escrituras',
		subtitle: 'Estos resúmenes y preguntas están diseñados para ayudarle a profundizar en el evangelio de Juan. Recomendamos seguir el plan de lectura proporcionado para leer el evangelio de Juan en 10 semanas. Cada semana incluye un resumen y preguntas de discusión para ayudarle a reflexionar sobre lo que ha leído. Estas preguntas también están diseñadas para facilitar la discusión en grupo, proporcionando un marco para crecer juntos en comunidad cristiana.',
		theme: 'light',
		items: [
			{
				type: 'pdf',
				title: 'Evangelio de Juan',
				pdf: '/grupos-en-espanol/10/siguiente_nivel_10_preguntas_de_libro_de_juan.pdf'
			}
		]
	},
	{
		id: 'memory-verses',
		title: 'Versículos para memorizar',
		theme: 'dark',
		items: [
			{
				type: 'pdf',
				title: 'NVI',
				pdf: '/grupos-en-espanol/10/siguiente_nivel_10_-_versículos_para_memorizar.pdf'
			},
			{
				type: 'pdf',
				title: 'RV 1960',
				pdf: '/grupos-en-espanol/10/next_level_siguiente_nivel_10_version_reina_valera_1960.pdf'
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
				title: 'Escríbenos',
				href: 'mailto:info@nextlevelglobal.org'
			},
			{
				type: 'pdf',
				title: 'Next Level Vision',
				pdf: '/grupos-en-espanol/vision-es.pdf'
			},
			{
				type: 'pdf',
				title: 'Commitment',
				pdf: '/grupos-en-espanol/commitment-es.pdf'
			}
		]
	}
],
	calendar,

};
