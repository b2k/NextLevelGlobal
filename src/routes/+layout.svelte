<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/Menu.svelte';
	import '../styles/global.css';

	import { setLang } from '$lib/stores/lang.svelte';
	import { page } from '$app/state';

	let { children } = $props();
	$effect(() => {
		setLang(page.url.pathname.startsWith('/grupos-en-espanol') ? 'es' : 'en');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="container-fluid">
	<Menu />
	<main class="page-content">
		{@render children()}
	</main>
</div>

<style>
	.page-content:not(.hero) {
		padding-top: 110px; /* fixed navbar height */
	}
</style>
