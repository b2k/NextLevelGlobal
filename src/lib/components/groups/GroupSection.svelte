<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageSection } from '$lib/config/groups/types';

	let { section } = $props<{ section: PageSection }>();

	const theme = $derived(section.theme ?? {});

	const style = $derived.by(() => `
		--section-bg: ${theme.backgroundColor ?? '#ffffff'};
		--section-text: ${theme.textColor ?? '#111827'};
		--section-accent: ${theme.accentColor ?? '#2563eb'};
		--section-bg-image: ${theme.backgroundImage ? `url('${theme.backgroundImage}')` : 'none'};
		--section-bg-position: ${theme.backgroundPosition ?? 'center'};
		--section-bg-size: ${theme.backgroundSize ?? 'cover'};
		--section-bg-repeat: ${theme.backgroundRepeat ?? 'no-repeat'};
		--section-overlay: ${theme.overlayColor ?? 'transparent'};
		--section-overlay-opacity: ${theme.overlayOpacity ?? 0};
	`);
</script>

<section class="group-section" style={style}>
	<details open class="group-section__overlay">
		<summary class="sr-only">{section.title}</summary>
		<header class="mb-6">
			{#if section.subtitle}
				<p class="mt-2 text-sm opacity-90">{section.subtitle}</p>
			{/if}
		</header>

		<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each section.items as item, i (i)}
				{#if item.type === 'pdf'}
					<article class="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
						<h3 class="text-lg font-semibold">{item.title}</h3>
						{#if item.description}
							<p class="mt-2 text-sm opacity-90">{item.description}</p>
						{/if}
						<div class="mt-4">
							<a
								class="inline-flex rounded-md px-4 py-2 font-medium"
								style="background-color: var(--section-accent); color: white;"
								href={resolve(item.pdf)}
								target="_blank"
								rel="noopener"
							>
								Open PDF
							</a>
						</div>
					</article>
				{:else if item.type === 'book'}
					<article class="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
						{#if item.image}
							<img
								src={item.image}
								alt={item.title}
								class="mb-4 h-48 w-full rounded-lg object-cover"
							/>
						{/if}

						<h3 class="text-lg font-semibold">{item.title}</h3>

						{#if item.description}
							<p class="mt-2 text-sm opacity-90">{item.description}</p>
						{/if}

						<div class="mt-4 flex flex-wrap gap-3">
							<a
								class="inline-flex rounded-md px-4 py-2 font-medium"
								style="background-color: var(--section-accent); color: white;"
								href={resolve(item.buyUrl)}
								target="_blank"
								rel="noopener"
							>
								Purchase
							</a>

							<a
								class="inline-flex rounded-md border px-4 py-2 font-medium"
								style="border-color: var(--section-accent); color: var(--section-text);"
								href={resolve(item.questionsPdf)}
								target="_blank"
								rel="noopener"
							>
								Questions PDF
							</a>
						</div>
					</article>
				{:else if item.type === 'link'}
					<article class="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
						<h3 class="text-lg font-semibold">{item.title}</h3>
						{#if item.description}
							<p class="mt-2 text-sm opacity-90">{item.description}</p>
						{/if}
						<div class="mt-4">
							<a
								class="inline-flex rounded-md px-4 py-2 font-medium"
								style="background-color: var(--section-accent); color: white;"
								href={resolve(item.href)}
							>
								Open
							</a>
						</div>
					</article>
				{/if}
			{/each}
		</div>
	</details>
</section>

<style>
	.group-section {
		position: relative;
		overflow: hidden;
		border-radius: 1rem;
		background-color: var(--section-bg);
		color: var(--section-text);
		background-image: var(--section-bg-image);
		background-position: var(--section-bg-position);
		background-size: var(--section-bg-size);
		background-repeat: var(--section-bg-repeat);
	}

	.group-section__overlay {
		padding: 2rem;
		background: color-mix(
			in srgb,
			var(--section-overlay) calc(var(--section-overlay-opacity) * 100%),
			transparent
		);
	}
</style>