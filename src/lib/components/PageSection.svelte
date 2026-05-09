<script lang="ts">
	import type { PageSection, ThemeName } from '$lib/config/models/types';
	import { getTheme } from '$lib/config/models/themes';
	import Description from './Description.svelte';
	import ColumnItem from './ColumnItem.svelte';
	import SectionItem from './SectionItem.svelte';
	import { r } from '$lib/config/translations';

	let { section, pageTheme = 'light' } = $props<{ section: PageSection; pageTheme?: ThemeName }>();

	const resolvedTheme = $derived(getTheme(section.theme ?? pageTheme));

	const style = $derived.by(
		() => `
		--section-bg: ${resolvedTheme.section.background};
		--section-text: ${resolvedTheme.section.text};
		--section-accent: ${resolvedTheme.section.accent};
		--section-button-bg: ${resolvedTheme.section.buttonPrimaryBg};
		--section-button-text: ${resolvedTheme.section.buttonPrimaryText};
		--section-bg-image: ${section.backgroundImage ? `url('${section.backgroundImage}')` : 'none'};
	`
	);
</script>

<section class="group-section {section.theme ?? pageTheme}" {style}>
	<div
		class={`group-section__inner 
			${
				section.title || section.subtitle
					? 'group-section__inner--with-header'
					: 'group-section__inner--no-header'
			}`}
	>
		{#if section.title || section.subtitle}
			<header class="group-section__header">
				<h2 class="group-section__title">{r(section.title)}</h2>

				{#if section.subtitle}
					<p class="group-section__subtitle">{r(section.subtitle)}</p>
				{/if}
			</header>
		{/if}
		{#if section.description}
			<Description text={section.description} />
		{/if}

		{#if section.columns?.length}
			<div class="group-section__columns">
				{#each section.columns as column, i (i)}
					<div class="group-column">
						{#if column.title}
							<h3 class="group-column__title">{r(column.title)}</h3>
						{/if}

						<div class="group-column__items">
							{#each column.items as item, j (j)}
								<ColumnItem {item} />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
		{#if section.items?.length}
			<div class="group-section__grid">
				{#each section.items as item, i (i)}
					<SectionItem {item} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.group-section {
		background: var(--section-bg);
		background-image: var(--section-bg-image);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		color: var(--section-text);
		width: 100%;
	}

	.group-section__inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.group-section__inner--with-header {
		padding: 4rem 1.25rem;
	}
	.group-section__inner--no-header {
		padding-top: 0;
	}

	.group-section__header {
		text-align: center;
		margin-bottom: 2.5rem;
		color: var(--section-text);
	}

	.group-section__title {
		margin: 0;
		font-size: clamp(1.75rem, 2.6vw, 2.5rem);
		font-weight: 800;
		line-height: 1.25;
		letter-spacing: -0.01em;
		color: var(--section-text);
	}

	.group-section__subtitle {
		margin: 0.75rem auto 0;
		max-width: 44rem;
		line-height: 1.6;
		opacity: 0.9;
		color: var(--section-text);
	}

	.group-section__grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem 1.25rem;
	}

	.group-section__columns {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 2.5rem;
		align-items: start;
	}

	.group-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.group-column__title {
		margin: 0 0 1.75rem;
		font-size: clamp(1.4rem, 2vw, 2.1rem);
		font-weight: 600;
		line-height: 1.25;
		letter-spacing: -0.01em;
		color: var(--section-text);
	}

	.group-column__items {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		width: 100%;
	}

	@media (min-width: 900px) {
		.group-section__columns {
			grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
			gap: 3rem;
		}

		.group-section__inner--with-header {
			padding: 5rem 2rem;
		}
		.group-section__inner--no-header {
			padding-top: 0;
			padding-bottom: 5rem;
		}
	}
</style>
