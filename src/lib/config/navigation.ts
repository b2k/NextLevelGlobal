export type NavLinkItem = {
	label: string;
	href?: string;
	match?: 'exact' | 'prefix';
	items?: NavLinkItem[];
};

export type NavDropdownItem = {
	label: string;
	href?: string;
	items: NavLinkItem[];
};

export const topNavLinks: NavLinkItem[] = [{ label: 'Home', href: '/', match: 'exact' }];

export const navDropdowns: NavDropdownItem[] = [
	{
		label: 'About Us',
		href: '/about-us',
		items: [
			{ label: 'Beliefs', href: '/beliefs' },
			{ label: 'F.A.Q.', href: '/faq' },
			{ label: 'Contact', href: '/contact' }
		]
	},
	{
		label: 'Next Level Groups',
		items: [
			{ label: 'Overview', href: '/groups' },
			{
				label: 'Small Groups',
				href: '/groups/small-groups'
			},
			{
				label: 'Women',
				href: '/groups/women'
			},
			{
				label: 'Men',
				href: '/groups/men'
			}
		]
	},
	{
		label: 'Media',
		items: [
			{ label: 'Events', href: '/events' },
			{ label: 'Missions', href: '/missions' },
			{ label: 'Give', href: '/give' }
		]
	},
	{
		label: 'Español',
		items: [{ label: 'Grupos en Español', href: '/grupos-en-espanol' }]
	}
];
