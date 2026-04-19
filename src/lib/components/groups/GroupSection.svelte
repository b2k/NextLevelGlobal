<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import { resolve } from '$app/paths';
	import { getTheme } from '$lib/config/groups/themes';
	import type { PageSection, ThemeName, SectionItem } from '$lib/config/groups/types';

	let { section, pageTheme = 'light' } = $props<{ section: PageSection; pageTheme?: ThemeName }>();

	const resolvedTheme = $derived(getTheme(section.theme ?? pageTheme));

	const style = $derived.by(
		() => `
		--section-bg: ${resolvedTheme.section.background};
		--section-text: ${resolvedTheme.section.text};
		--section-accent: ${resolvedTheme.section.accent};
	`
	);

	function itemHref(item: SectionItem) {
		if (item.type === 'pdf') return item.pdf;
		if (item.type === 'book') return item.buyUrl;
		return item.href;
	}

	function itemSecondaryHref(item: SectionItem) {
		return item.type === 'book' ? item.questionsPdf : '';
	}
</script>

<section class="group-section {section.theme ?? pageTheme}" {style}>
	<div class="group-section__inner">
		<header class="group-section__header">
			<h2 class="group-section__title">{section.title}</h2>

			{#if section.subtitle}
				<p class="group-section__subtitle">{section.subtitle}</p>
			{/if}
		</header>

		{#if section.columns?.length}
			<div class="group-section__columns">
				{#each section.columns as column, i (i)}
					<div class="group-column">
						{#if column.title}
							<h3 class="group-column__title">{column.title}</h3>
						{/if}

						<div class="group-column__items">
							{#each column.items as item, j (j)}
								{#if item.type === 'book'}
									<article class="group-card group-card--book">
										{#if item.image}
											<div class="group-card__image-wrap">
												<img src={item.image} alt={item.title} class="group-card__image" />
											</div>
										{/if}

										<a
											class="group-tile group-tile--primary"
											href={itemHref(item)}
											target="_blank"
											rel="noopener"
										>
											{item.title}
										</a>

										<a
											class="group-tile"
											href={itemSecondaryHref(item)}
											target="_blank"
											rel="noopener"
										>
											Questions
										</a>
									</article>
								{:else}
									<a class="group-tile" href={itemHref(item)} target="_blank" rel="noopener">
										{item.title}
									</a>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else if section.items?.length}
			<div class="group-section__grid">
				{#each section.items as item, i (i)}
					{#if item.type === 'book'}
						<article class="group-card group-card--book">
							{#if item.image}
								<div class="group-card__image-wrap">
									<img src={item.image} alt={item.title} class="group-card__image" />
								</div>
							{/if}

							<h3>{item.title}</h3>

							{#if item.description}
								<p>{item.description}</p>
							{/if}

							<div class="group-card__actions">
								<a
									class="group-tile group-tile--primary"
									href={item.buyUrl}
									target="_blank"
									rel="noopener"
								>
									Purchase
								</a>
								<a
									class="group-tile"
									href={resolve(item.questionsPdf)}
									target="_blank"
									rel="noopener"
								>
									Questions PDF
								</a>
							</div>
						</article>
					{:else}
						<a class="group-tile" href={itemHref(item)} target="_blank" rel="noopener">
							{item.title}
						</a>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.group-section {
		background: var(--section-bg);
		color: var(--section-text);
		width: 100%;
	}

	.group-section__inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 1.25rem;
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

	.group-card {
		text-align: center;
		color: var(--section-text);
	}

	.group-card h3 {
		margin-top: 0;
		line-height: 1.25;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--section-text);
	}

	.group-card p {
		color: var(--section-text);
	}

	.group-column__items {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.1rem;
		width: 100%;
	}

	.group-card--book {
		max-width: 320px;
		margin: 0 auto;
	}

	.group-card__image-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 1.25rem;
	}

	.group-card__image {
		display: block;
		max-width: 100%;
		max-height: 320px;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.group-card__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.group-tile {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 4.5rem;
		min-width: 16rem;
		padding: 0.9rem 1.5rem;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.15);
		color: #111;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 0.95rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		text-align: center;
		line-height: 1.25;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.group-tile:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
	}

	.group-tile--primary {
		background: var(--section-accent);
		color: white;
		border-color: var(--section-accent);
	}

	@media (min-width: 900px) {
		.group-section__columns {
			grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
			gap: 3rem;
		}

		.group-section__inner {
			padding: 5rem 2rem;
		}
	}
</style>
