<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Menu from '$lib/components/Menu.svelte';
  import '../styles/global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="container-fluid">
<Menu/>
<main class="page-content">
  {@render children()}
</main>
</div>

<style>
  .page-content:not(.hero) {
    padding-top: 110px; /* fixed navbar height */
  }
</style>
