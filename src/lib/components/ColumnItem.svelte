<script lang="ts">
	import type { SectionItem } from '$lib/config/models/types';
	import { itemHref, itemSecondaryHref, toYouTubeEmbedUrl } from '$lib/utils/linkHelpers';

	let { item }: { item: SectionItem } = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

{#if item.type === 'item'}
	<div class="column-item">
		<div class="bullet">{item.bullet ?? '•'}</div>

		<div class="content">
			<span class="title">{item.title}</span>
			<span class="description"> {item.description}</span>
		</div>
	</div>
{:else if item.type === 'book'}
	<article class="group-card group-card--book">
		{#if item.image}
			<div class="group-card__image-wrap">
				<img src={item.image} alt={item.title} class="group-card__image" />
			</div>
		{/if}

		<a class="group-tile group-tile--primary" href={itemHref(item)} target="_blank" rel="noopener">
			{item.title}
		</a>

		<a class="group-tile" href={itemSecondaryHref(item)} target="_blank" rel="noopener">
			Questions
		</a>
	</article>
{:else if item.type === 'link'}
	<a class="group-tile" href={itemHref(item)} target={item.target}>
		{item.title}
	</a>
{:else if item.type === 'video'}
	<div class="section-video">
		{#if item.title}
			<h3>{item.title}</h3>
		{/if}

		<div class="section-video__frame">
			<iframe
				src={toYouTubeEmbedUrl(item.href)}
				title={item.title ?? 'Video'}
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>

		{#if item.description}
			<p>{item.description}</p>
		{/if}
	</div>
{:else}
	<a
		class="group-tile"
		href={itemHref(item)}
		target={item.type === 'pdf' ? '_blank' : '_self'}
		rel="noopener"
	>
		{item.title}
	</a>
{/if}

<style>
	.column-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
		text-align: left; /* 👈 key */
	}

	.content {
		line-height: 1.7;
		font-size: 1rem;
		text-align: left; /* 👈 force left alignment */
	}

	.bullet {
		font-size: 3rem;
		line-height: 1rem;
		margin-top: 0.2rem;
	}

	.title {
		font-weight: 600;
	}

	.description {
		font-weight: 400;
	}
	.group-card {
		text-align: center;
		color: var(--section-text);
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

	.group-tile {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 4.5rem;
		min-width: 16rem;
		padding: 0.9rem 1.5rem;
		background-color: var(--section-button-bg);
		border: 1px solid rgba(0, 0, 0, 0.15);
		color: var(--section-button-text);
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

	.section-video {
		width: 100%;
		min-width: min(100%, 32rem);
		max-width: 56rem;
		margin-inline: auto;
	}

	.section-video__frame {
		aspect-ratio: 16 / 9;
		width: 100%;
		overflow: hidden;
		border-radius: 1rem;
		background: #000;
		box-shadow: 0 12px 30px rgb(0 0 0 / 0.2);
	}

	.section-video__frame iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
