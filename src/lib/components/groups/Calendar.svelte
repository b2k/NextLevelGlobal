<script lang="ts">
	import type {
		CalendarEntry,
		CalendarEntryKind,
		GroupCalendarConfig
	} from '$lib/config/models/calendars/groupCalendars';
	import { SvelteDate } from 'svelte/reactivity';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	type Props = {
		calendar: GroupCalendarConfig;
		currentDate?: string | Date;
		selectedDate?: string | Date | null;
		path: string;
		onselect?: (date: Date) => void;
	};

	let {
		calendar,
		currentDate = new SvelteDate(),
		selectedDate = $bindable<Date | null>(null),
		path,
		onselect
	}: Props = $props();

	const cookieName = $derived(`customStartDate:${path}`);
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
			bg: '',
			text: '',
			accent: ''
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

	let normalizedEntries = $derived.by(() => {
		return (calendar.entries ?? [])
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
	function monthKey(date: Date): number {
		return date.getFullYear() * 12 + date.getMonth();
	}

	function clampMonth(date: Date, min: Date, max: Date): Date {
		const key = monthKey(date);
		const minKey = monthKey(min);
		const maxKey = monthKey(max);

		if (key < minKey) return startOfMonth(min);
		if (key > maxKey) return startOfMonth(max);
		return startOfMonth(date);
	}

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

	let canGoPrevious = $derived(monthKey(visibleMonth) > monthKey(minVisibleMonth));
	let canGoNext = $derived(monthKey(visibleMonth) < monthKey(maxVisibleMonth));
	let canGoToday = $derived(
		monthKey(minVisibleMonth) <= monthKey(today) && monthKey(today) <= monthKey(maxVisibleMonth)
	);

	let customStartDate = $state('');

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
	});

	async function handleCustomStartDateChange() {
		if (customStartDate) {
			writeCookie(cookieName, customStartDate);
		} else {
			deleteCookie(cookieName);
		}

		location.reload();
	}
	function previousMonth() {
		if (!canGoPrevious) return;
		visibleMonth = addMonths(visibleMonth, -1);
	}

	function nextMonth() {
		if (!canGoNext) return;
		visibleMonth = addMonths(visibleMonth, 1);
	}

	function goToToday() {
		const target = clampMonth(startOfMonth(today), minVisibleMonth, maxVisibleMonth);
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

	function selectDate(date: Date) {
		selectedDate = date;
		onselect?.(date);
	}
</script>
<div class="calendar">
	<div class="calendar-toolbar">
		<div class="calendar-toolbar-left">
			<button
				type="button"
				class={`toolbar-btn today-btn ${!canGoToday ? 'disabled' : ''}`}
				onclick={goToToday}
				disabled={!canGoToday}>Today</button
			>
			<div class="month-nav">
				<button
					type="button"
					class={`toolbar-btn nav-btn ${!canGoPrevious ? 'disabled' : ''}`}
					onclick={previousMonth}
					disabled={!canGoPrevious}
					aria-label="Previous month"
				>
					‹
				</button>
				<button
					type="button"
					class={`toolbar-btn nav-btn ${!canGoNext ? 'disabled' : ''}`}
					onclick={nextMonth}
					disabled={!canGoNext}
					aria-label="Next month"
				>
					›
				</button>
			</div>
			<h3 class="calendar-title">{formatMonth(visibleMonth)}</h3>
		</div>
		<div class="calendar-toolbar-right">
			<label for="custom-start-date" class="custom-start-date-label"> Custom Start Date </label>

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
			<div class="calendar-weekday">{label}</div>
		{/each}
	</div>

	<div class="calendar-grid">
		{#each monthDays as day, d (d)}
			<button
				type="button"
				class="calendar-day"
				class:outside-month={!day.inMonth}
				class:selected={sameDay(day.date, parseDate(selectedDate)) && day.inMonth}
				class:today={sameDay(day.date, today) && !sameDay(day.date, parseDate(selectedDate))}
				onclick={() => selectDate(day.date)}
				aria-pressed={sameDay(day.date, parseDate(selectedDate))}
			>
				<div class="calendar-day-number">{day.date.getDate()}</div>

				<div class="calendar-events">
					{#each day.events as event, e (e)}
						{@const color = getEntryColor(event.kind)}
						<div
							class="calendar-event"
							title={event.title}
							style={`--entry-bg: ${color.bg}; --entry-text: ${color.text}; --entry-accent: ${color.accent};`}
						>
							{event.title}
						</div>
					{/each}
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
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
		background: #fff;
		text-align: left;
		cursor: pointer;
	}
	.calendar-day {
		border-radius: 0 !important;
		box-shadow: none;
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
		margin-bottom: 0.45rem;
	}

	.calendar-events {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		overflow: hidden;
	}

	.calendar-event {
		padding: 0.28rem 0.45rem;
		border-radius: 0.35rem;
		border-left: 4px solid var(--entry-accent);
		background: var(--entry-bg);
		color: var(--entry-text);
		font-size: 0.8rem;
		line-height: 1.25;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 600;
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
	}
</style>
