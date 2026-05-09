import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'grupos-en-espanol',
	title: 'Grupos en Español',
	menuTitle: 'grupos-en-espanol',
	parentPath: '',
	order: 1,
	heroImage: '/grupos-en-espanol/hero.jpg',
	theme: 'light',
	sections: [
		{
			id: 'groups',
			title: 'Quick Links',
			theme: 'dark',
			items: [
				{
					type: 'link',
					title: '10',
					href: '/grupos-en-espanol/10'
				},
				{
					type: 'link',
					title: '20',
					href: '/grupos-en-espanol/20'
				},
				{
					type: 'link',
					title: '30',
					href: '/grupos-en-espanol/30'
				}
			]
		}
	],
	description:
		'Nuestras grupos de discipulado forman el núcleo de lo que hacemos. Cada grupo consiste en un plan de lectura bíblica, un libro para ayudar al participante a crecer en varios aspectos de la fe cristiana, y uno o dos versículos para memorizar cada semana.\n\nSe proporcionan preguntas para facilitar la discusión grupal y reforzar el material que se está leyendo. Si parece mucho trabajo, sepa que como creyentes, se espera que leamos nuestras Biblias y oremos unos por otros diariamente. También se espera que estudiemos para mostrarnos aprobados, trabajadores que no necesitan avergonzarse, sino que son capaces de manejar correctamente la palabra de verdad.'
};
