<script lang="ts">
	let { text } = $props<{ text: string }>();
</script>

<div class="group-section__description">
	{#each text.split('\n\n') as paragraph, i (i)}
		<p>
            {#each paragraph.split(/[\r\n]/) as line, j (j)}
                {line}
                <br />
            {/each}
        </p>
	{/each}
</div>
