<script lang="ts">
	import { r } from "$lib/config/translations";

	let { text } = $props<{ text: string }>();
</script>

<div class="group-section__description">
	<!-- eslint-disable svelte/no-at-html-tags -->
	{#each r(text).split('\n\n') as paragraph, i (i)}
		<p>
			{#each paragraph.split(/[\r\n]/) as line, j (j)}
				{@html line}
				<br />
			{/each}
		</p>
	{/each}
	<!-- eslint-enable svelte/no-at-html-tags -->
</div>

<style>
	.group-section__description {
		text-shadow: 0 1px 2px rgb(0 0 0 / 0.45);
        margin: 1.5rem auto;
	}

	.group-section__description :global(a) {
		color: #ffffff;
		font-weight: 700;
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.18em;
		/* background: rgb(15 23 42 / 0.55); */
		padding: 0.05em 0.22em;
		border-radius: 0.25rem;
	}

	.group-section__description :global(a:hover) {
		background: rgb(15 23 42 / 0.75);
	}
    @media (min-width: 768px) {
        .group-section__description {
            text-align: center;
        }
    }
</style>
