import type { GroupPage } from '$lib/config/models/types';

export const page: GroupPage = {
	id: 'groups-women-101-books',
	title: 'Women 101 Book Purchase Links',
	menuTitle: 'books',
	parentPath: '',
	order: 1,
	heroImage: '/groups/women/101/hero.jpg',
	theme: 'light',
	sections: [
		{
			id: 'book-images',
			title: 'Books',
			theme: 'dark',
			items: [
				{
					type: 'book',
					title: 'What Every Christian Ought to Know',
					image: '/groups/women/101/ought-to-know_orig.jpg'
				},
				{
					type: 'book',
					title: 'Listening for God',
					image: '/groups/women/101/listening-for-god.jpg'
				},
				{
					type: 'book',
					title: 'Red Sea Rules',
					image: '/groups/women/101/red-sea-rules.png'
				}
			]
		},
		{
			id: 'book-buy-links',
			title: '',
			theme: 'dark',
			columns: [
				{
					title: '',
					items: [
						{
							type: 'link',
							title: 'Used: Thrift Books',
							target: '_blank',
							href: 'https://www.thriftbooks.com/w/what-every-christian-ought-to-know-solid-grounding-for-a-growing-faith_adrian-rogers_steve-rogers/382584/item/4070180/?mkwid=%7cdc&pcrid=77172150940746&pkw=&pmt=be&slid=&product=4070180&plc=&pgrid=1234751854564121&ptaid=pla-4580771613628160%3aaud-805998392&utm_source=bing&utm_medium=cpc&utm_campaign=Shopping+-+High+Vol+Scarce+-+Under+%2410&utm_term=&utm_content=%7cdc%7cpcrid%7c77172150940746%7cpkw%7c%7cpmt%7cbe%7cproduct%7c4070180%7cslid%7c%7cpgrid%7c1234751854564121%7cptaid%7cpla-4580771613628160%3aaud-805998392%7c&msclkid=f4df8466165211956a2ce37c538f880d#idiq=4070180&edition=7347006'
						},
						{
							type: 'link',
							title: 'Love Worth Finding',
							target: '_blank',
							href: 'https://www.lwf.org/products/what-every-christian-ought-to-know-book-b123'
						},
						{
							type: 'link',
							title: 'Amazon',
							target: '_blank',
							href: 'https://www.amazon.com/What-Every-Christian-Ought-Know/dp/1433677857'
						}
					]
				},
				{
					title: '',
					items: [
						{
							type: 'link',
							title: 'Used: Thrift Books',
							target: '_blank',
							href: 'https://www.thriftbooks.com/w/listening-for-god-how-an-ordinary-person-can-learn-to-hear-god-speak_marilyn-hontz/347141/?resultid=567ec633-a75c-4df2-b042-720784ba6311#edition=3711486&idiq=5505'
						},
						{
							type: 'link',
							title: 'Amazon',
							target: '_blank',
							href: 'https://www.amazon.com/Listening-God-ordinary-person-learn/dp/0842385398'
						}
					]
				},
				{
					title: '',
					items: [
						{
							type: 'link',
							title: 'Used: Thrift Books',
							target: '_blank',
							href: 'https://www.thriftbooks.com/w/the-red-sea-rules-10-god-given-strategies-for-difficult-times_robert-morgan/18651799/item/1368869/?mkwid=%7cdc&pcrid=77447028765158&pkw=&pmt=be&slid=&product=1368869&plc=&pgrid=1239149900899965&ptaid=pla-4581046492312226%3aaud-805998392&utm_source=bing&utm_medium=cpc&utm_campaign=Shopping+-+High+Vol+Backlist+-+Under+%241'
						},
						{
							type: 'link',
							title: 'Christian Books',
							target: '_blank',
							href: 'https://www.christianbook.com/rules-updated-same-will-lead-out/robert-morgan/9780529104403/pd/9104403?utm_source=bing&kw=red%20sea%20rules&mt=e&dv=c&event=PPCSRC&p=1229931&cb_src=bing&cb_typ=search&cb_cmp=71948463&cb_adg=1055684766&cb_kyw=red%20sea%20rules&snav=BSEARCH&msclkid=11f866305d15183d8310012a15a34581&utm_source=bing&utm_me'
						},
						{
							type: 'link',
							title: 'Amazon',
							target: '_blank',
							href: 'https://www.amazon.com/s?k=red+sea+rules&adgrpid=1343603779444908&hvadid=83975385313247&hvbmt=be&hvdev=c&hvlocphy=102094&hvnetw=o&hvqmt=e&hvtargid=kwd-83975591657041%3Aloc-190&hydadcr=13626_13337413&msclkid=a1f5b08e3c5d1f021bffd79474ebd49e&tag=mh0b-20&ref=pd_sl_4413pgf6ge_e'
						}
					]
				}
			]
		}
	]
};
