<script lang="ts">
	import { resolve } from '$app/paths';
	import Calendar from './groups/Calendar.svelte';
	import GroupSection from './PageSection.svelte';
	import { getTheme } from '$lib/config/models/themes';
	import { titleCase } from '$lib/utils/formatters.js';
	import Description from './Description.svelte';
	import { dev } from '$app/environment';

	let { data, params } = $props();

	let pageTheme = $derived(data.page.theme ?? 'light');

	const resolvedTheme = $derived(getTheme(pageTheme));

	const style = $derived.by(
		() => `
		--section-bg: ${resolvedTheme.section.background};
		--section-text: ${resolvedTheme.section.text};
		--section-accent: ${resolvedTheme.section.accent};
		--section-card-bg: ${resolvedTheme.section.cardBackground};
		--section-card-border: ${resolvedTheme.section.cardBorder};
		--section-button-bg: ${resolvedTheme.section.buttonPrimaryBg};
		--section-button-text: ${resolvedTheme.section.buttonPrimaryText};
		--hero-text: ${data.page.heroTextColor ?? resolvedTheme.page.heroText};
	`
	);

	const calendarPath = $derived(
		`/groups/calendar/${data.path}.ics?start-date=${data.page.calendar?.defaultStartDate ?? ''}`
	);

	let subscribeUrl = $state('');
	$effect(() => {
		if (typeof window !== 'undefined') {
			subscribeUrl = `${window.location.origin}${calendarPath}`.replace(/^http/, 'webcal');
		}
	});

	const breadcrumbs = $derived(
		data.segments?.map((segment: string, index: number) => ({
			label: titleCase(segment),
			href: data.segments.slice(0, index + 1).join('/')
		}))
	);
</script>

<svelte:head>
	<title>{data.page.title} | Next Level Global</title>
</svelte:head>

<div class="group-page {pageTheme}" {style}>
	<div
		class={`group-page__hero ${data.page.heroImage ? 'hero-image' : ''}`}
		style={`--hero-image: url('${data.page.heroImage ?? ''}')`}
	>
		<div class="group-page__hero-overlay">
			<div class="group-page__hero-inner">
				{#if breadcrumbs && breadcrumbs.length > 0}
					<nav class="group-page__breadcrumbs text-sm" aria-label="Breadcrumb">
						<ol class="breadcrumb">
							<li><a href={resolve('/groups')}>Groups</a></li>
							{#each breadcrumbs as crumb, c (c)}
								<li class="breadcrumb__sep" aria-hidden="true">/</li>
								<li>
									<a href={resolve('/groups/[...path]', { path: crumb.href })}>{crumb.label}</a>
								</li>
							{/each}
							{#if dev}
								<li>
									<a class="breadcrumb__edit " href={resolve('/admin/[...path]', { path: `${data.path}` })}>Edit</a>
								</li>
							{/if}
						</ol>
					</nav>
				{/if}

				<header class="group-page__header">
					<h1>{data.page.title}</h1>

					{#if data.page.subtitle}
						<p>{data.page.subtitle}</p>
					{/if}
				</header>

				{#if data.page.description}
					<Description text={data.page.description} />
				{/if}
			</div>
		</div>
	</div>

	{#if data.page.calendar}
		<div class="group-page__actions">
			<!-- Calendar component will go here -->
			<Calendar calendar={data?.page.calendar} path={params.path} />
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={calendarPath} class="btn btn--primary" data-sveltekit-reload>Download Calendar</a>

			{#if subscribeUrl}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={subscribeUrl} class="btn btn--secondary" data-sveltekit-reload>Subscribe</a>
			{/if}
		</div>
	{/if}

	<div class="group-page__sections">
		{#each data.page.sections as section, i (i)}
			<GroupSection {section} pageTheme={data.page.theme} />
		{/each}
	</div>
</div>

<style>
	.group-page {
		background: var(--page-bg);
		min-height: 100%;
		color: var(--page-text);
	}

	.group-page__hero {
		position: relative;
		min-height: clamp(18rem, 34vw, 28rem);
		background-color: #111;
		background-image: var(--hero-image);
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		color: var(--hero-text, white);
	}
	.group-page__hero.hero-image {
		background-image: var(--hero-image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	.group-page__hero-overlay {
		min-height: inherit;
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.35)),
			linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1));
	}

	.group-page__hero-inner {
		min-height: inherit;
		display: grid;
		grid-template-rows: auto 1fr;
		padding: 1rem 1.25rem 2rem;
	}

	.group-page__breadcrumbs {
		align-self: start;
	}

	.breadcrumb {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.82);
	}

	.breadcrumb a {
		color: inherit;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.breadcrumb__sep {
		opacity: 0.65;
	}
	.breadcrumb__edit {
		font-size: 0.875rem;
		padding: 0.25rem 0.5rem;
		background: rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.9);
		border-radius: 0.25rem;
	}

	.group-page__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
		min-height: 100%;
		padding: 2rem 1rem;
	}

	.group-page__header h1 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 4rem);
		line-height: 1.05;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
	}
	.hero-image h1 {
		color: var(--hero-text, var(--color-text-primary));
	}

	.group-page__header p {
		margin: 0;
		max-width: 52rem;
		font-size: 1.05rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
	}

	.group-page__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
		padding: 0 1rem 1rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem 1.2rem;
		font-weight: 700;
		text-decoration: none;
		border-radius: 0.5rem;
		transition:
			transform 0.15s ease,
			background-color 0.15s ease,
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.btn:hover {
		transform: translateY(-1px);
	}

	.btn--primary {
		background: var(--btn-primary-bg, #1d4ed8);
		color: var(--btn-primary-text, #fff);
		border: 1px solid transparent;
	}

	.btn--primary:hover {
		background: var(--btn-primary-hover-bg, #1e40af);
		color: var(--btn-primary-text, #fff);
	}

	.btn--secondary {
		background: var(--btn-secondary-bg, #fff);
		color: var(--btn-secondary-text, #1f2937);
		border: 1px solid var(--btn-secondary-border, #cbd5e1);
	}

	.btn--secondary:hover {
		background: var(--btn-secondary-hover-bg, #f8fafc);
		color: var(--btn-secondary-text, #1f2937);
		border-color: var(--btn-secondary-border, #94a3b8);
	}

	.group-page__sections {
		display: flex;
		flex-direction: column;
		gap: 0;
		width: 100%;
	}

	@media (min-width: 768px) {
		.group-page__hero-inner {
			padding: 1.25rem 2rem 2.5rem;
		}
	}
	@media (max-width: 768px) {
		.group-page__hero.hero-image {
			background-attachment: scroll;
		}
	}
</style>
