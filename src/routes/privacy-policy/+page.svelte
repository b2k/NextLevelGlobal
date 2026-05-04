<script>
	// @ts-nocheck

	import { Hero, Actions } from '$lib/components';
	import { Container } from '@sveltestrap/sveltestrap';
</script>

<Hero>
	<h1 class="display-4 fw-bold text-white">Privacy Policy</h1>
	<p class="lead text-white mt-3">
		Next Level Global is dedicated to providing a safe haven for participants in our discipleship
		programs. We do not share your information with any outside parties. We invite anyone who has
		accepted Jesus as their savior to participate, and will only ever use your contact information
		to communicate with you through your group mentor or the leadership of Next Level Global.
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
				href: '/groups',
				text: 'Groups',
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
