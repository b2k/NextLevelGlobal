export type NavLinkItem = {
	label: string;
	href?: string;
	match?: 'exact' | 'prefix';
	items?: NavLinkItem[];
};

export type NavDropdownItem = {
	label: string;
	href?: string;
	items?: NavLinkItem[];
};

export const topNavLinks: NavLinkItem[] = [{ label: 'Home', href: '/', match: 'exact' }];

export const navDropdowns: NavDropdownItem[] = [
	{
		label: 'About Us',
		items: [
			{ label: 'Overview', href: '/about-us' },
			{ label: 'Beliefs', href: '/about-us/beliefs' },
			{ label: 'F.A.Q.', href: '/about-us/faq' },
			{ label: 'Contact', href: '/about-us/contact-us' }
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
		label: 'Privacy Policy',
		href: '/privacy-policy'
	},
	{
		label: 'Español',
		items: [{ label: 'Grupos en Español', href: '/grupos-en-espanol' }]
	}
];
