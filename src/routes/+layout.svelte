<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/Menu.svelte';
	import { browser } from '$app/environment';
	import '../styles/global.css';

	let { children } = $props();
	if (browser) {
		localStorage?.setItem('lang', 'en');
	}
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
