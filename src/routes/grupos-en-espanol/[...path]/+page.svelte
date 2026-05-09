<script lang="ts">
	import PageComponent from '$lib/components/PageComponent.svelte';

	const { data, params } = $props();
</script>

<PageComponent {data} {params} />