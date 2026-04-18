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

export const topNavLinks: NavLinkItem[] = [
	{ label: 'Home', href: '/', match: 'exact' },
];

export const navDropdowns: NavDropdownItem[] = [
	{ label: 'About Us', href: '/about-us', items: [
        { label: 'Beliefs', href: '/beliefs' },
        { label: 'F.A.Q.', href: '/faq' },
        { label: 'Contact', href: '/contact' }
    ]},
	{
		label: 'Next Level Groups',
		items: [
			{ label: 'Overview', href: '/groups' },
			{ label: 'Small Groups', 
              items: [			
                { label: 'Next Level 10', href: '/groups/small/10' },
                { label: 'Next Level 20', href: '/groups/small/20' },
                { label: 'Next Level 30', href: '/groups/small/30' }
            ]},
            {
                label: 'Women',
                href: '/groups/women',
                items: [
                    { label: '101', href: '/groups/women/101' },
                    { label: '201', href: '/groups/women/201' },
                    { label: '401', href: '/groups/women/401' },
                    { label: '402', href: '/groups/women/402' }
                ]
            },
            {
                label: 'Men',
                href: '/groups/men',
                items: [
                    { label: '100', 
                      items: [
                        { label: '101', href: '/groups/men/101' },
                        { label: '102', href: '/groups/men/102' },
                        { label: '103', href: '/groups/men/103' },
                      ] 
                    },
                    { label: '200', 
                      items: [
                        { label: '201', href: '/groups/men/201' },
                        { label: '202', href: '/groups/men/202' },
                        { label: '203', href: '/groups/men/203' },
                      ] 
                    },
                    { label: '300', href: '/groups/men/300', 
                      items: [
                        { label: '301', href: '/groups/men/301' },
                        { label: '302', href: '/groups/men/302' },
                        { label: '303', href: '/groups/men/303' },
                        { label: 'OLD 301', href: '/groups/men/old-301' }
                      ] 
                    },
                ]
            },
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