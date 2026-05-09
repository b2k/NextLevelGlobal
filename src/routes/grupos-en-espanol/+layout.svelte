<script lang="ts">
	let { children } = $props();
	import { browser } from '$app/environment';
	if (browser) {
		localStorage?.setItem('lang', 'es');
	}
</script>

{@render children()}
