<script lang="ts">
	import GroupPageComponent from '$lib/components/PageComponent.svelte';

	const { data, params } = $props();
</script>

<GroupPageComponent {data} {params} />
