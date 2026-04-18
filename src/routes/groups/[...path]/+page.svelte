<script lang="ts">
	import { resolve } from '$app/paths';
	import GroupSection from '$lib/components/groups/GroupSection.svelte';
	import { titleCase } from '$lib/utils/formatters.js';

	let { data } = $props();

	const calendarPath = $derived(`/groups/${data.path}/calendar.ics`);

	let subscribeUrl = $state('');
	$effect(() => {
		if (typeof window !== 'undefined') {
			subscribeUrl = `${window.location.origin}${calendarPath}`.replace(/^http/, 'webcal');
		}
	});

	const breadcrumbs = $derived(data.segments.map((segment: string, index: number) => ({
		label: titleCase(segment),
		href: data.segments.slice(0, index + 1).join('/')
	})));
</script>

<svelte:head>
	<title>{data.page.title} | Next Level Global</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8">
	<nav class="mb-6 text-sm">
		<ul class="breadcrumb flex flex-wrap items-center gap-2 text-slate-600">
			<li><a href={resolve('/groups')} class="hover:underline">Groups</a></li>
			{#each breadcrumbs as crumb, c (c)}
				<li>/</li>
				<li>
					<a href={resolve('/groups/[...path]', { path: crumb.href })} class="hover:underline">{crumb.label}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<header class="mb-8">
		<h1 class="text-4xl font-bold tracking-tight">{data.page.title}</h1>

		<div class="mt-4 flex flex-wrap gap-3">
			{#if data.page.calendar}
				<a href={calendarPath} class="inline-flex rounded-md bg-slate-900 px-4 py-2 text-white">
					Download Calendar
				</a>

				{#if subscribeUrl}
					<a href={subscribeUrl} class="inline-flex rounded-md border border-slate-300 px-4 py-2">
						Subscribe
					</a>
				{/if}
			{/if}
		</div>
	</header>

	<div class="space-y-8">
		{#each data.page.sections as section, i (i)}
			<GroupSection {section} />
		{/each}
	</div>
</div>
<style>
.breadcrumb {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.5rem;
}
</style>