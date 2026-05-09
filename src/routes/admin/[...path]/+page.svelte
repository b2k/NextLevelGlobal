<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import { Themes } from '$lib/config/models/themes';
	import { enhance } from '$app/forms';
	import type {
		GroupCalendarConfig,
		CalendarEntry
	} from '$lib/config/models/calendars/groupCalendars.js';
	import type { GroupPage, PageSection } from '$lib/config/models/types.js';

	let { data, form } = $props();

	let page = $state(data.page ?? ({} as GroupPage));
	let calendar = $state(data.calendar ?? ({} as GroupCalendarConfig));
	let calendarGrid = $state(data.calendarGrid ?? ({} as Record<string, Record<string, string>>));
	let fixedEvents = $state(data.fixedEvents ?? ([] as CalendarEntry[]));
	let dayNames = $state(data.dayNames ?? ([] as string[]));
	let startingWeek = $state(calendar.startingWeek ?? 1);
	let lastStartingWeek = $state(startingWeek);

	$effect(() => {
		if (startingWeek !== lastStartingWeek) {
			// Shift the calendar grid keys based on the change in starting week
			const weekDifference = startingWeek - lastStartingWeek;
			const newCalendarGrid: Record<string, Record<string, string>> = {};

			for (const [weekKey, days] of Object.entries(calendarGrid)) {
				const newWeekKey = String(Number(weekKey) + weekDifference);
				const newDays = {} as Record<string, string>;
				for (const dayKey of Object.keys(days)) {
					newDays[dayKey] = days[dayKey].replace(`Week ${weekKey}`, `Week ${newWeekKey}`);
				}
				newCalendarGrid[newWeekKey] = newDays;
			}
			calendar.startingWeek = startingWeek;
			calendarGrid = newCalendarGrid;
			lastStartingWeek = startingWeek;
		}
	});
	const themes = Themes;

	function addWeek() {
		const weeks = Object.keys(calendarGrid).map(Number);
		const nextWeek = weeks.length ? Math.max(...weeks) + 1 : 1;

		calendarGrid[nextWeek] = {};
		for (let day = 0; day < 7; day++) {
			calendarGrid[nextWeek][day] = '';
		}
	}

	function removeLastWeek() {
		const weeks = Object.keys(calendarGrid).map(Number);
		if (!weeks.length) return;

		const lastWeek = Math.max(...weeks);
		delete calendarGrid[lastWeek];
	}

	function ensureNextWeek(week: number) {
		const hasText = Object.values(calendarGrid[week] ?? {}).some((value) => String(value).trim());
		const weeks = Object.keys(calendarGrid).map(Number);
		const lastWeek = Math.max(...weeks);

		if (hasText && week === lastWeek) {
			addWeek();
		}
	}

	function addSection() {
		if (!page) return;
		page.sections ??= [] as unknown as GroupPage['sections'];
		page.sections.push({
			id: `section-${page.sections.length + 1}`,
			title: 'New Section',
			theme: 'light',
			items: []
		});
	}

	function removeSection(index: number) {
		if (!page) return;
		page.sections.splice(index, 1);
	}

	function moveSection(index: number, direction: -1 | 1) {
		if (!page) return;
		const nextIndex = index + direction;
		if (nextIndex < 0 || nextIndex >= page.sections.length) return;

		const [section] = page.sections.splice(index, 1);
		page.sections.splice(nextIndex, 0, section);
	}

	function addItem(section: PageSection) {
		section.items ??= [] as PageSection['items'];
		section.items?.push({
			type: 'pdf',
			title: 'New Item',
			pdf: ''
		});
	}

	function removeItem(section: PageSection, index: number) {
		section.items?.splice(index, 1);
	}

	function addEvent() {
		fixedEvents.push({
			kind: 'event',
			title: '',
			date: '',
			startTime: '',
			endTime: ''
		});
	}

	function removeEvent(index: number) {
		fixedEvents.splice(index, 1);
	}

	let pageJson = $derived(JSON.stringify(page));
	let calendarJson = $derived(JSON.stringify(calendar));
	let calendarGridJson = $derived(JSON.stringify(calendarGrid));
	let fixedEventsJson = $derived(JSON.stringify(fixedEvents));

	let weekNumbers = $derived(
		Object.keys(calendarGrid)
			.map(Number)
			.sort((a, b) => a - b)
	);
</script>

<svelte:head>
	<title>Admin Editor - {data.path}</title>
</svelte:head>

<div class="admin-editor">
	<header class="toolbar">
		<div>
			<p class="eyebrow">Admin Editor</p>
			<h1>{data.path}</h1>
		</div>

		<form method="POST" action="?/save" use:enhance>
			<input type="hidden" name="page" value={pageJson} />
			<input type="hidden" name="calendar" value={calendarJson} />
			<input type="hidden" name="calendarGrid" value={calendarGridJson} />
			<input type="hidden" name="fixedEvents" value={fixedEventsJson} />

			<button type="submit" class="primary">Save</button>
			<button
				type="button"
				class="secondary"
				onclick={() => {
					let href = location.href.split('?')[0];
					location.href = href.replace('/admin/', '/');
				}}>Back</button
			>
		</form>
	</header>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	{#if form?.ok}
		<p class="success">Saved.</p>
	{/if}

	<section class="panel">
		<h2>New Page</h2>

		<form method="POST" action="?/clone" class="clone-form">
			<label>
				Source
				<input name="sourcePath" placeholder="men/100/101" value={data.path} />
			</label>

			<label>
				Target
				<input name="targetPath" placeholder="men/100/103" />
			</label>

			<button type="submit">Clone</button>
		</form>
	</section>

	<section class="panel">
		<h2>Page Settings</h2>

		<div class="form-grid">
			<label>
				ID
				<input bind:value={page.id} />
			</label>

			<label>
				Title
				<input bind:value={page.title} />
			</label>

			<label>
				Subtitle
				<input bind:value={page.subtitle} />
			</label>
			<label>
				Menu Title
				<input bind:value={page.menuTitle} />
			</label>

			<label>
				Parent Path
				<input bind:value={page.parentPath} />
			</label>

			<label>
				Order
				<input type="number" bind:value={page.order} />
			</label>

			<label>
				Theme
				<select bind:value={page.theme}>
					{#each themes as theme (theme)}
						<option value={theme}>{theme}</option>
					{/each}
				</select>
			</label>

			<label>
				Hero Image
				<input bind:value={page.heroImage} />
			</label>

			<label>
				Hero Text Color
				<input bind:value={page.heroTextColor} />
			</label>
		</div>
		<label>
			Description
			<textarea rows="3" bind:value={page.description}></textarea>
		</label>
	</section>

	<section class="panel">
		<div class="section-header">
			<h2>Sections</h2>
			<button type="button" onclick={addSection}>+ Add Section</button>
		</div>

		{#each page.sections ?? [] as section, sectionIndex (sectionIndex)}
			<article class="section-card">
				<div class="section-actions">
					<strong>Section {sectionIndex + 1}</strong>

					<div>
						<button type="button" onclick={() => moveSection(sectionIndex, -1)}>↑</button>
						<button type="button" onclick={() => moveSection(sectionIndex, 1)}>↓</button>
						<button type="button" class="danger" onclick={() => removeSection(sectionIndex)}>
							Delete
						</button>
					</div>
				</div>

				<div class="form-grid">
					<label>
						ID
						<input bind:value={section.id} />
					</label>

					<label>
						Title
						<input bind:value={section.title} />
					</label>

					<label>
						Subtitle
						<input bind:value={section.subtitle} />
					</label>

					<label>
						Theme
						<select bind:value={section.theme}>
							{#each themes as theme (theme)}
								<option value={theme}>{theme}</option>
							{/each}
						</select>
					</label>
				</div>

				<div class="items">
					<div class="section-header">
						<h3>Items</h3>
						<button type="button" onclick={() => addItem(section)}>+ Add Item</button>
					</div>

					{#each section.items ?? [] as item, itemIndex (itemIndex)}
						<div class="item-card">
							<div class="form-grid">
								<label>
									Type
									<select bind:value={item.type}>
										<option value="book">Book</option>
										<option value="pdf">PDF</option>
										<option value="link">Link</option>
										<option value="other">Other</option>
										<option value="video">Video</option>
									</select>
								</label>

								<label>
									Title
									<input bind:value={item.title} />
								</label>
								{#if item.type === 'link' || item.type === 'video'}
									<label>
										URL
										<input bind:value={item.href} />
									</label>
								{/if}

								{#if item.type === 'pdf'}
									<label>
										PDF
										<input bind:value={item.pdf} />
									</label>
								{/if}

								{#if item.type === 'book'}
									<label>
										Image
										<input bind:value={item.image} />
									</label>
									<label>
										Buy URL
										<input bind:value={item.buyUrl} />
									</label>

									<label>
										Questions PDF
										<input bind:value={item.questionsPdf} />
									</label>
								{/if}
							</div>

							<label>
								Description
								<textarea rows="3" bind:value={item.description}></textarea>
							</label>

							<button type="button" class="danger" onclick={() => removeItem(section, itemIndex)}>
								Delete Item
							</button>
						</div>
					{/each}
				</div>

				{#if section.columns}
					<!--  <details>
						<summary>Advanced column data</summary>
						<textarea rows="12" bind:value={section.columnsJson}></textarea>
					</details> -->
				{/if}
			</article>
		{/each}
	</section>

	<section class="panel">
		<h2>Calendar Settings</h2>

		<div class="form-grid">
			<label>
				Title
				<input bind:value={calendar.title} />
			</label>

			<label>
				Default Start Date
				<input type="date" bind:value={calendar.defaultStartDate} />
			</label>

			<label>
				Starting Week
				<input type="number" bind:value={calendar.startingWeek} />
			</label>
		</div>

		<label>
			Description
			<textarea rows="3" bind:value={calendar.description}></textarea>
		</label>
	</section>

	<section class="panel calendar-panel">
		<div class="section-header">
			<h2>Weekly Calendar Entries</h2>

			<div class="button-row">
				<button type="button" class="danger" onclick={removeLastWeek}>- Remove Last Week</button>
				<button type="button" class="primary" onclick={addWeek}>+ Add Week</button>
			</div>
		</div>

		<p class="hint">
			Use lines like <code>R|Matthew 1</code>, <code>B|Man Code CH 1</code>,
			<code>L|LCV: Col. 3:1</code>, <code>P|Psalm 1 &amp; 2</code>, <code>M|Mtg 6:30pm MBC</code>, or
			<code>W|Week 1</code>.
		</p>

		<div class="calendar-grid">
			<div class="calendar-heading">Week</div>
			{#each dayNames as dayName (dayName)}
				<div class="calendar-heading">{dayName}</div>
			{/each}

			{#each weekNumbers as week (week)}
				{#if week == startingWeek}
					<div class="week-cell">
						<input type="number" name="startingWeek" bind:value={startingWeek} />
					</div>
				{:else}
					<div class="week-cell">{week}</div>
				{/if}

				<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
				{#each dayNames as _, day (day)}
					<textarea
						rows="5"
						bind:value={calendarGrid[week][day]}
						oninput={() => ensureNextWeek(week)}
					></textarea>
				{/each}
			{/each}
		</div>
	</section>

	<section class="panel">
		<div class="section-header">
			<h2>Fixed Events</h2>
			<button type="button" onclick={addEvent}>+ Add Event</button>
		</div>

		<p class="hint">
			These do not move when <code>defaultStartDate</code> changes.
		</p>

		<div class="events-grid">
			<div class="calendar-heading">Event Name</div>
			<div class="calendar-heading">Date</div>
			<div class="calendar-heading">Start Time</div>
			<div class="calendar-heading">End Time</div>
			<div class="calendar-heading"></div>

			{#each fixedEvents as event, index (index)}
				<input bind:value={event.title} placeholder="Graduation" />
				<input type="date" bind:value={event.date} />
				<input bind:value={event.startTime} placeholder="9:30am" />
				<input bind:value={event.endTime} placeholder="11:30am" />
				<button type="button" class="danger" onclick={() => removeEvent(index)}>Delete</button>
			{/each}
		</div>
	</section>
</div>

<style>
	.admin-editor {
		max-width: 1600px;
		margin: 0 auto;
		padding: 2rem;
		color: #1f2937;
	}

	.toolbar,
	.section-header,
	.section-actions,
	.button-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.eyebrow {
		margin: 0;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		color: #6b7280;
	}

	h1,
	h2,
	h3 {
		margin: 0 0 1rem;
	}

	.panel,
	.section-card,
	.item-card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 1rem;
		padding: 1rem;
		margin-top: 1rem;
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.06);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-size: 0.9rem;
		font-weight: 600;
	}

	input,
	select,
	textarea {
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		padding: 0.6rem;
		font: inherit;
	}

	textarea {
		resize: vertical;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.85rem;
	}

	button {
		border: 1px solid #d1d5db;
		background: #f9fafb;
		border-radius: 0.5rem;
		padding: 0.55rem 0.8rem;
		cursor: pointer;
	}

	button.primary {
		background: #111827;
		color: white;
		border-color: #111827;
	}

	button.danger {
		color: #991b1b;
		border-color: #fecaca;
		background: #fff5f5;
	}

	.clone-form {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		gap: 1rem;
		align-items: end;
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: 80px repeat(7, minmax(150px, 1fr));
		gap: 0.5rem;
		overflow-x: auto;
	}

	.events-grid {
		display: grid;
		grid-template-columns: minmax(240px, 1fr) 180px 160px 160px auto;
		gap: 0.5rem;
		align-items: center;
	}

	.calendar-heading,
	.week-cell {
		font-weight: 700;
		background: #f3f4f6;
		border-radius: 0.5rem;
		padding: 0.6rem;
	}

	.week-cell {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hint {
		color: #6b7280;
	}

	.error {
		color: #991b1b;
		background: #fee2e2;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}

	.success {
		color: #166534;
		background: #dcfce7;
		padding: 0.75rem;
		border-radius: 0.5rem;
	}
</style>
