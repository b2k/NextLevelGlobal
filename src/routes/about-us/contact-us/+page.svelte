<script>
	// @ts-nocheck

	import { Hero, Actions } from '$lib/components';
	import { Container } from '@sveltestrap/sveltestrap';
</script>

<Hero>
	<h1 class="display-4 fw-bold text-white">Contact Us</h1>
	<p class="lead text-white mt-3">
		We would love to hear from you. Whether you are a pastor, church leader, or someone interested
		in learning more about Next Level, reach out and we will be glad to connect.
	</p>
</Hero>

<Container>
	<h2 class="mt-4 mb-4">Quick Links</h2>

	<Actions
		align="center"
		actions={[
			{
				href: 'mailto:info@nextlevelglobal.org',
				text: 'Email Us',
				variant: 'dark'
			},
			{
				href: '/about-us',
				text: 'About Us',
				variant: 'dark'
			},
			{
				href: '/about-us/beliefs',
				text: 'Beliefs',
				variant: 'dark'
			},
			{
				href: '/about-us/faq',
				text: 'F.A.Q.',
				variant: 'dark'
			}
		]}
	/>
</Container>

<style>
	h2 {
		text-align: center;
	}
</style>
