<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	/* eslint-disable svelte/no-at-html-tags */
	import type {
		CalendarEntry,
		CalendarEntryKind,
		GroupCalendarConfig
	} from '$lib/config/models/calendars/groupCalendars';
	import { SvelteDate } from 'svelte/reactivity';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { createCalendarByReferenceDate } from '$lib/config/models/calendars/generateCalendarEntries';
	import { r } from '$lib/config/translations';
	import { lang } from '$lib/stores/lang.svelte';
	import {
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		ModalHeader,
		Spinner
	} from '@sveltestrap/sveltestrap';

	type Props = {
		calendar: GroupCalendarConfig;
		currentDate?: string | Date;
		selectedDate?: string | Date | null;
		path: string;
		onselect?: (date: Date) => void;
		visibleYear: number;
	};

	let {
		calendar,
		currentDate = new SvelteDate(),
		selectedDate = $bindable<Date | null>(null),
		path,
		onselect,
		visibleYear = $bindable<number>(new Date().getFullYear())
	}: Props = $props();

	const cookieName = $derived(`customStartDate:${path}`);
	const scriptureTranslationStorageKey = $derived(`scriptureTranslation:${path}`);
	const scriptureTranslations = ['ESV', 'KJV', 'WEB', 'NIV', 'NKJV', 'RVR60', 'NVI'];
	const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	function stripTime(date: Date): Date {
		return new SvelteDate(date.getFullYear(), date.getMonth(), date.getDate());
	}

	function parseDate(value: string | Date | null | undefined): Date | null {
		if (!value) return null;
		if (value instanceof Date) return stripTime(value);

		if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			const [y, m, d] = value.split('-').map(Number);
			return new SvelteDate(y, m - 1, d);
		}

		if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
			const [m, d, y] = value.split('/').map(Number);
			return new SvelteDate(y, m - 1, d);
		}

		const parsed = new SvelteDate(value);
		if (isNaN(parsed.getTime())) return null;
		return stripTime(parsed);
	}

	function sameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
		if (!a || !b) return false;
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function startOfMonth(date: Date): Date {
		return new SvelteDate(date.getFullYear(), date.getMonth(), 1);
	}

	function endOfMonth(date: Date): Date {
		return new SvelteDate(date.getFullYear(), date.getMonth() + 1, 0);
	}

	function addMonths(date: Date, months: number): Date {
		return new SvelteDate(date.getFullYear(), date.getMonth() + months, 1);
	}

	function formatMonth(date: Date): string {
		return date.toLocaleDateString(undefined, {
			month: 'long',
			year: 'numeric'
		});
	}

	type NormalizedEntry = {
		date: Date;
		title: string;
		kind: CalendarEntryKind;
		raw: CalendarEntry;
	};

	type ScripturePassage = {
		reference: string;
		translation?: string;
		text?: string;
		html?: string;
		copyright?: string;
		source?: string;
		error?: string;
	};

	type CalendarEntryColor = {
		bg: string;
		text: string;
		accent: string;
	};

	const defaultEntryColor: CalendarEntryColor = {
		bg: '#F9FAFB',
		text: '#374151',
		accent: '#CBD5E1'
	};

	const calendarEntryColors: Record<CalendarEntryKind, CalendarEntryColor> = {
		week: {
			bg: '#F3F4F6',
			text: '#374151',
			accent: '#9CA3AF'
		},
		reading: {
			bg: '#E8F0FE',
			text: '#1D4ED8',
			accent: '#3B82F6'
		},
		memory: {
			bg: '#ECFDF5',
			text: '#065F46',
			accent: '#10B981'
		},
		book: {
			bg: '#FEF3E8',
			text: '#C2410C',
			accent: '#F97316'
		},
		psalm: {
			bg: '#F3E8FF',
			text: '#7C3AED',
			accent: '#A78BFA'
		},
		meeting: {
			bg: '#FEE2E2',
			text: '#B91C1C',
			accent: '#EF4444'
		},
		event: {
			bg: '#FFF1F2',
			text: '#BE123C',
			accent: '#F43F5E'
		},
		other: {
			bg: '',
			text: '',
			accent: ''
		}
	};

	function getEntryColor(kind: CalendarEntryKind): CalendarEntryColor {
		return calendarEntryColors[kind] ?? defaultEntryColor;
	}

	let generatedEntries = $state<CalendarEntry[]>([]);

	$effect(() => {
		const { entries } = createCalendarByReferenceDate(calendar, customStartDate, visibleMonth);
		generatedEntries = entries ?? [];
	});

	let normalizedEntries = $derived.by(() => {
		return (generatedEntries ?? [])
			.filter((entry) => entry.date)
			.map((entry) => {
				return {
					date: parseDate(entry.date)!,
					title: entry.title ?? '',
					kind: entry.kind,
					raw: entry
				} satisfies NormalizedEntry;
			})
			.filter((entry): entry is NormalizedEntry => Boolean(entry))
			.sort((a, b) => a.date.getTime() - b.date.getTime());
	});

	let today = $derived(parseDate(currentDate) ?? stripTime(new SvelteDate()));

	$effect(() => {
		visibleYear = visibleMonth.getFullYear();
	});

	let minVisibleMonth = $derived.by(() => {
		const configured = parseDate((calendar as { startDate?: string | Date }).startDate);
		if (configured) return startOfMonth(configured);

		const firstEntry = normalizedEntries[0]?.date;
		return firstEntry ? startOfMonth(firstEntry) : startOfMonth(today);
	});

	let maxVisibleMonth = $derived.by(() => {
		const configured = parseDate((calendar as { endDate?: string | Date }).endDate);
		if (configured) return startOfMonth(configured);

		const lastEntry = normalizedEntries[normalizedEntries.length - 1]?.date;
		return lastEntry ? startOfMonth(lastEntry) : startOfMonth(today);
	});

	let visibleMonth = $state(startOfMonth(stripTime(new SvelteDate())));

	let customStartDate = $state('');
	let preferredScriptureTranslation = $state('');

	function readCookie(name: string): string {
		if (!browser) return '';

		const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
		return match ? decodeURIComponent(match[1]) : '';
	}

	function writeCookie(name: string, value: string) {
		document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
	}

	function deleteCookie(name: string) {
		document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
	}

	onMount(() => {
		customStartDate = readCookie(cookieName);

		if (browser) {
			preferredScriptureTranslation =
				localStorage.getItem(scriptureTranslationStorageKey) ||
				(lang.current === 'es' ? 'RVR60' : 'ESV');
		}
	});

	async function handleCustomStartDateChange(event: Event) {
		const input = event.target as HTMLInputElement;
		console.log('Custom start date changed:', input.value);
		customStartDate = input.value;
		if (customStartDate) {
			writeCookie(cookieName, customStartDate);
		} else {
			deleteCookie(cookieName);
		}
	}
	function previousMonth() {
		visibleMonth = addMonths(visibleMonth, -1);
	}

	function nextMonth() {
		visibleMonth = addMonths(visibleMonth, 1);
	}

	function previousYear() {
		visibleMonth = new SvelteDate(visibleMonth.getFullYear() - 1, visibleMonth.getMonth(), 1);
	}

	function nextYear() {
		visibleMonth = new SvelteDate(visibleMonth.getFullYear() + 1, visibleMonth.getMonth(), 1);
	}

	function goToToday() {
		const target = startOfMonth(today);
		visibleMonth = target;

		if (today >= minVisibleMonth && today <= endOfMonth(maxVisibleMonth)) {
			selectedDate = today;
			onselect?.(today);
		}
	}
	type DayCell = {
		date: Date;
		inMonth: boolean;
		events: NormalizedEntry[];
	};

	function buildMonthGrid(month: Date, entries: NormalizedEntry[]): DayCell[] {
		const first = startOfMonth(month);
		const last = endOfMonth(month);

		const gridStart = new SvelteDate(first);
		gridStart.setDate(first.getDate() - first.getDay());

		const gridEnd = new SvelteDate(last);
		gridEnd.setDate(last.getDate() + (6 - last.getDay()));

		const days: DayCell[] = [];
		const cursor = new SvelteDate(gridStart);

		while (cursor <= gridEnd) {
			const day = stripTime(cursor);

			days.push({
				date: day,
				inMonth: day.getMonth() === month.getMonth(),
				events: entries.filter((entry) => sameDay(entry.date, day))
			});

			cursor.setDate(cursor.getDate() + 1);
		}

		return days;
	}

	let monthDays = $derived(buildMonthGrid(visibleMonth, normalizedEntries));

	let expandedDateKey = $state<string | null>(null);

	function dateKey(date: Date): string {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const d = String(date.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	function selectDate(date: Date) {
		selectedDate = date;
		onselect?.(date);
	}

	function toggleDate(date: Date) {
		selectDate(date);

		const key = dateKey(date);
		expandedDateKey = expandedDateKey === key ? null : key;
	}

	function handleDayKeydown(event: KeyboardEvent, date: Date) {
		if (event.key !== 'Enter' && event.key !== ' ') return;

		event.preventDefault();
		toggleDate(date);
	}
	let scriptureModalOpen = $state(false);
	let selectedScriptureEntry = $state<NormalizedEntry | null>(null);
	let selectedPassage = $state<ScripturePassage | null>(null);
	let scriptureLoading = $state(false);
	let scriptureError = $state('');

	function isScriptureEntry(entry: NormalizedEntry): boolean {
		return entry.kind === 'reading' || entry.kind === 'memory' || entry.kind === 'psalm';
	}

	function getScriptureReference(entry: NormalizedEntry): string {
		const raw = entry.raw as CalendarEntry & { scripture?: { reference?: string } };
		return (raw.scripture?.reference || entry.title).replace(/LCV[:\s]*/i, '').trim();
	}

	function getScriptureTranslation(entry?: NormalizedEntry | null): string {
		const raw = entry?.raw as
			| (CalendarEntry & { scripture?: { translation?: string } })
			| undefined;
		return (
			raw?.scripture?.translation ||
			preferredScriptureTranslation ||
			(lang.current === 'es' ? 'RVR60' : 'ESV')
		);
	}

	function handlePreferredTranslationChange(event: Event) {
		const translation = (event.target as HTMLSelectElement).value;
		preferredScriptureTranslation = translation;

		if (browser) {
			localStorage.setItem(scriptureTranslationStorageKey, translation);
		}

		if (selectedScriptureEntry) {
			openScripture(selectedScriptureEntry, translation);
		}
	}

	function getExternalPassageUrl(entry: NormalizedEntry): string {
		const reference = getScriptureReference(entry);
		const translation = getScriptureTranslation(entry);

		return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=${encodeURIComponent(translation)}`;
	}

	function closeScripture() {
		scriptureModalOpen = false;
		selectedScriptureEntry = null;
		selectedPassage = null;
		scriptureError = '';
	}

	async function openScripture(entry: NormalizedEntry, translationOverride?: string) {
		selectedScriptureEntry = entry;
		selectedPassage = null;
		scriptureError = '';
		scriptureLoading = true;
		scriptureModalOpen = true;

		const params = new URLSearchParams({
			ref: getScriptureReference(entry),
			translation: translationOverride || getScriptureTranslation(entry)
		});

		try {
			const response = await fetch(`/api/scripture?${params.toString()}`);

			if (!response.ok) {
				throw new Error(await response.text());
			}

			selectedPassage = await response.json();
		} catch (error) {
			console.error(error);
			scriptureError = 'Passage text is not available for this translation.';
		} finally {
			scriptureLoading = false;
		}
	}
</script>

<div class="calendar">
	<div class="calendar-toolbar">
		<div class="calendar-toolbar-left">
			<button type="button" class="toolbar-btn today-btn" onclick={goToToday}
				>{r('Today', lang.current)}</button
			>
			<div class="month-nav">
				<button
					type="button"
					class="toolbar-btn nav-btn"
					onclick={previousYear}
					aria-label="Previous year"
				>
					«
				</button>
				<button
					type="button"
					class="toolbar-btn nav-btn"
					onclick={previousMonth}
					aria-label="Previous month"
				>
					‹
				</button>
			</div>
			<h3 class="calendar-title">{r(formatMonth(visibleMonth), lang.current)}</h3>
			<button type="button" class="toolbar-btn nav-btn" onclick={nextMonth} aria-label="Next month">
				›
			</button>
			<button type="button" class="toolbar-btn nav-btn" onclick={nextYear} aria-label="Next year">
				»
			</button>
		</div>
		<div class="calendar-toolbar-right">
			<label for="custom-start-date" class="custom-start-date-label">
				{r('Custom Start Date', lang.current)}
			</label>

			<input
				id="custom-start-date"
				type="date"
				class="custom-start-date"
				bind:value={customStartDate}
				aria-describedby="custom-start-date-help"
				onchange={handleCustomStartDateChange}
			/>
		</div>
	</div>

	<div class="calendar-weekdays">
		{#each weekdayLabels as label, w (w)}
			<div class="calendar-weekday">{r(label, lang.current)}</div>
		{/each}
	</div>

	<div class="calendar-grid">
		{#each monthDays as day, d (d)}
			{@const isSelected = sameDay(day.date, parseDate(selectedDate))}
			{@const isExpanded = expandedDateKey === dateKey(day.date)}
			<div
				class="calendar-day"
				class:outside-month={!day.inMonth}
				class:selected={isSelected && day.inMonth}
				class:expanded={isExpanded}
				class:today={sameDay(day.date, today) && !isSelected}
				role="button"
				tabindex="0"
				aria-label={`${isExpanded ? r('Shrink', lang.current) : r('Enlarge', lang.current)} day for ${day.date.toLocaleDateString()}`}
				aria-expanded={isExpanded}
				onclick={() => toggleDate(day.date)}
				onkeydown={(event) => handleDayKeydown(event, day.date)}
			>
				<div class="calendar-day-header">
					<div class="calendar-day-number">{day.date.getDate()}</div>
				</div>

				<div class="calendar-events">
					{#each day.events as event, e (e)}
						{@const color = getEntryColor(event.kind)}
						<button
							type="button"
							class="calendar-event"
							class:expanded-event={isExpanded}
							class:scripture-link={isExpanded && isScriptureEntry(event)}
							title={isExpanded && isScriptureEntry(event)
								? r('View Scripture', lang.current)
								: r(event.title, lang.current)}
							style={`--entry-bg: ${color.bg}; --entry-text: ${color.text}; --entry-accent: ${color.accent};`}
							onclick={(clickEvent) => {
								clickEvent.stopPropagation();

								if (isExpanded && isScriptureEntry(event)) {
									openScripture(event);
									return;
								}

								toggleDate(day.date);
							}}
						>
							{#if isExpanded}
								<span class="calendar-event-kind">{r(event.kind, lang.current)}</span>
							{/if}

							<span class="calendar-event-title">{r(event.title, lang.current)}</span>
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<Modal isOpen={scriptureModalOpen} toggle={closeScripture} size="lg">
	<ModalHeader toggle={closeScripture}>
		<div class="scripture-modal-header">
			<span class="scripture-modal-title">
				{selectedPassage?.reference ??
					(selectedScriptureEntry
						? r(getScriptureReference(selectedScriptureEntry), lang.current)
						: r('Scripture', lang.current))}
			</span>

			<select
				class="form-select form-select-sm scripture-translation-select"
				aria-label={r('Scripture translation', lang.current)}
				value={getScriptureTranslation(selectedScriptureEntry)}
				onchange={handlePreferredTranslationChange}
				onclick={(event) => event.stopPropagation()}
			>
				{#each scriptureTranslations as translation, t (t)}
					<option value={translation}>{translation}</option>
				{/each}
			</select>
		</div>
	</ModalHeader>

	<ModalBody>
		{#if scriptureLoading}
			<div class="d-flex align-items-center gap-2 text-muted">
				<Spinner size="sm" />
				<span>{r('Loading passage...', lang.current)}</span>
			</div>
		{:else if selectedPassage?.html}
			<div class="scripture-passage">
				{@html selectedPassage.html}
			</div>
		{:else if selectedPassage?.text}
			<p class="scripture-text mb-0">{selectedPassage.text}</p>
		{:else}
			<p class="text-muted">
				{scriptureError || r('Passage text is not available for this translation.', lang.current)}
			</p>

			{#if selectedScriptureEntry}
				<a
					class="btn btn-outline-primary btn-sm"
					href={getExternalPassageUrl(selectedScriptureEntry)}
					target="_blank"
					rel="noreferrer"
				>
					{r('Open passage online', lang.current)}
				</a>
			{/if}
		{/if}

		{#if selectedPassage?.copyright}
			<div class="scripture-copyright small text-muted mt-3">
				{@html selectedPassage.copyright}
			</div>
		{/if}
	</ModalBody>

	<ModalFooter>
		{#if selectedScriptureEntry && (selectedPassage?.text || selectedPassage?.html)}
			<a
				class="btn btn-outline-primary"
				href={getExternalPassageUrl(selectedScriptureEntry)}
				target="_blank"
				rel="noreferrer"
			>
				{r('Open online', lang.current)}
			</a>
		{/if}
		<Button color="secondary" onclick={closeScripture}>{r('Close', lang.current)}</Button>
	</ModalFooter>
</Modal>

<style>
	.calendar {
		width: 100%;
		background: #fff;
		border: 1px solid #d9dee7;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.calendar-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid #d9dee7;
		background: #f5f7fa;
	}

	.calendar-toolbar-left {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.calendar-title {
		margin: 0;
		font-size: 1.6rem;
		font-weight: 600;
		color: #243247;
	}

	.month-nav {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.toolbar-btn {
		border: 1px solid #cfd6e0;
		background: #fff;
		color: #243247;
		border-radius: 999px;
		cursor: pointer;
		font: inherit;
	}

	.today-btn {
		padding: 0.55rem 1rem;
		font-weight: 600;
	}

	.nav-btn {
		width: 2.2rem;
		height: 2.2rem;
		font-size: 1.25rem;
		line-height: 1;
	}

	.toolbar-btn:hover {
		background: #f0f4f8;
	}

	.calendar-weekdays,
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.calendar-weekdays {
		background: #fff;
		border-bottom: 1px solid #d9dee7;
	}

	.calendar-weekday {
		padding: 0.85rem 0.5rem;
		text-align: center;
		font-size: 0.85rem;
		font-weight: 700;
		color: #5f6c80;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.calendar-day {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		min-height: 150px;
		padding: 0.4rem;
		border: 0;
		border-right: 1px solid #d9dee7;
		border-bottom: 1px solid #d9dee7;
		border-radius: 0 !important;
		box-shadow: none;
		background: #fff;
		text-align: left;
		cursor: pointer;
	}

	.calendar-day:focus-visible {
		outline: 3px solid rgba(47, 111, 237, 0.35);
		outline-offset: -3px;
	}

	.calendar-day.expanded {
		grid-column: span 2;
		min-height: 260px;
		z-index: 1;
	}
	.calendar-day:nth-child(7n) {
		border-right: 0;
	}

	.calendar-day:hover {
		background: #f9fbfd;
	}

	.calendar-day.outside-month {
		background: #fafbfc;
		color: #a5afbc;
	}

	.calendar-day.selected {
		background: #eef4ff;
		box-shadow: inset 0 0 0 2px #2f6fed;
	}

	.calendar-day.today:not(.selected) .calendar-day-number {
		background: #2f6fed;
		color: #fff;
	}

	.calendar-day-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.45rem;
	}

	.calendar-day-number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		height: 2rem;
		padding: 0 0.45rem;
		border-radius: 0.35rem;
		font-size: 0.95rem;
		font-weight: 700;
		color: #223046;
	}

	.calendar-events {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		overflow: hidden;
	}

	.calendar-event {
		display: block;
		width: 100%;
		padding: 0.28rem 0.45rem;
		border: 0;
		border-left: 4px solid var(--entry-accent);
		border-radius: 0.35rem;
		background: var(--entry-bg);
		color: var(--entry-text);
		font: inherit;
		font-size: 0.8rem;
		font-weight: 600;
		line-height: 1.25;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;
	}

	.calendar-event:hover,
	.calendar-event:focus-visible {
		filter: brightness(0.98);
		outline: 2px solid var(--entry-accent);
		outline-offset: 1px;
	}

	.calendar-event.expanded-event {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		white-space: normal;
		overflow: visible;
		text-overflow: unset;
	}

	.calendar-event-kind {
		flex: 0 0 auto;
		min-width: 4.4rem;
		font-size: 0.7rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		opacity: 0.8;
	}

	.calendar-event-title {
		min-width: 0;
	}

	.calendar-toolbar-right {
		display: flex;
		align-items: center;
		margin-left: auto;
	}

	.custom-start-date {
		border: 1px solid #cfd6e0;
		background: #fff;
		color: #243247;
		border-radius: 999px;
		padding: 0.55rem 0.9rem;
		font: inherit;
		min-width: 11.5rem;
	}

	.custom-start-date:hover,
	.custom-start-date:focus {
		background: #f9fbfd;
		outline: none;
		border-color: #9fb0c6;
	}
	.calendar-toolbar-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-left: auto;
	}

	.custom-start-date-label {
		font-size: 0.85rem;
		font-weight: 500;
		color: #243247;
		white-space: nowrap;
	}

	.calendar-event.scripture-link .calendar-event-title {
		text-decoration: underline;
		text-underline-offset: 0.15rem;
	}

	.calendar-event.scripture-link {
		cursor: pointer;
	}

	.scripture-modal-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
	}

	.scripture-modal-title {
		font-weight: 600;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.scripture-translation-select {
		width: auto;
		min-width: 6.5rem;
	}

	.scripture-text {
		white-space: pre-line;
	}

	.scripture-passage :global(.v),
	.scripture-passage :global(.verse),
	.scripture-passage :global(.verse-num) {
		font-weight: 600;
		color: #2f6fed;
	}
	.scripture-passage :global(h1),
	.scripture-passage :global(h2),
	.scripture-passage :global(h3),
	.scripture-passage :global(h4),
	.scripture-passage :global(h5),
	.scripture-passage :global(h6) {
		font-weight: 700;
		color: #1e40af;
	}
	.scripture-passage :global(p) {
		color: #374151;
	}

	.scripture-copyright {
		border-top: 1px solid #e5e7eb;
		padding-top: 0.75rem;
		line-height: 1.4;
	}

	@media (max-width: 700px) {
		.calendar-toolbar {
			align-items: flex-start;
			gap: 0.75rem;
			flex-direction: column;
		}

		.calendar-toolbar-right {
			width: 100%;
			margin-left: 0;
		}

		.custom-start-date {
			width: 100%;
		}
	}

	@media (max-width: 900px) {
		.calendar-day {
			min-height: 120px;
		}

		.calendar-title {
			font-size: 1.25rem;
		}
	}

	@media (max-width: 700px) {
		.calendar {
			overflow-x: auto;
		}

		.calendar-weekdays,
		.calendar-grid {
			min-width: 840px;
		}

		.calendar-day.expanded {
			grid-column: 1 / -1;
		}
	}
</style>
