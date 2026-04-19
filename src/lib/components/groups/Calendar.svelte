<script lang="ts">
	import type { GroupCalendarConfig } from "$lib/config/calendars/groupCalendars";
	import { SvelteDate } from "svelte/reactivity";

	type Props = {
        calendar: GroupCalendarConfig;
        startDate?: string | Date;
		currentDate?: string | Date;
		selectedDate?: string | Date | null;
		onselect?: (date: Date) => void;
	};

	let {
        calendar,
        startDate = calendar.defaultStartDate ?? new SvelteDate(),
		currentDate = new SvelteDate(),
		selectedDate = $bindable<Date | null>(null),
		onselect
	}: Props = $props();

    let endDate = $derived.by(() => calendar.entries
		.sort((a, b) => b.date?.localeCompare(a.date ?? '') ?? 0)[0]?.date);

	function parseDate(value: string | Date): Date {
		if (value instanceof Date) return stripTime(value);

		if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
			const [y, m, d] = value.split('-').map(Number);
			return new SvelteDate(y, m - 1, d);
		}

		if (/^\d{2}\/\d{2}-\d{4}$/.test(value)) {
			const [m, d, y] = value.split(/[/-]/).map(Number);
			return new SvelteDate(y, m - 1, d);
		}
		return stripTime(new SvelteDate(value));
	}

	function stripTime(date: Date): Date {
		return new SvelteDate(date.getFullYear(), date.getMonth(), date.getDate());
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

	function sameDay(a: Date | null | undefined, b: string | Date | null | undefined): boolean {
		if (typeof b === 'string') b = parseDate(b);
		if (!a || !b) return false;
		return (
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function isBefore(a: Date, b: Date): boolean {
		return a.getTime() < b.getTime();
	}

	function isAfter(a: Date, b: Date): boolean {
		return a.getTime() > b.getTime();
	}

	function clampDate(date: Date, min: Date, max: Date): Date {
		if (isBefore(date, min)) return min;
		if (isAfter(date, max)) return max;
		return date;
	}

	const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let normalizedStart = $derived(startOfMonth(parseDate(startDate)));
	let rawStart = $derived(parseDate(startDate));
	let rawEnd = $derived(parseDate(endDate||''));
	let normalizedEnd = $derived(startOfMonth(parseDate(endDate||'')));
	let normalizedCurrent = $derived(clampDate(parseDate(currentDate), rawStart, rawEnd));

	let months = $derived.by(() => {
		const result: Date[] = [];
		let cursor = normalizedStart;

		while (!isAfter(cursor, normalizedEnd)) {
			result.push(cursor);
			cursor = addMonths(cursor, 1);
		}

		return result;
	});

	type DayCell = {
		date: Date;
		inMonth: boolean;
		disabled: boolean;
	};

	function buildMonthGrid(month: Date, minDate: Date, maxDate: Date): DayCell[] {
		const first = startOfMonth(month);
		const last = endOfMonth(month);

		const gridStart = new SvelteDate(first);
		gridStart.setDate(first.getDate() - first.getDay());

		const gridEnd = new SvelteDate(last);
		gridEnd.setDate(last.getDate() + (6 - last.getDay()));

		const days: DayCell[] = [];
		const cursor = new SvelteDate(gridStart);

		while (!isAfter(cursor, gridEnd)) {
			const day = stripTime(cursor);
			days.push({
				date: day,
				inMonth: day.getMonth() === month.getMonth(),
				disabled: isBefore(day, minDate) || isAfter(day, maxDate)
			});
			cursor.setDate(cursor.getDate() + 1);
		}

		return days;
	}

	let container: HTMLDivElement | undefined;
	let monthElements: (HTMLElement | undefined)[] = [];

	function monthKey(date: Date): string {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
	}

	function scrollToCurrentMonth(months: Date[], monthElements: (HTMLElement | undefined)[]) {
		if (!container) return;

		const targetKey = monthKey(startOfMonth(normalizedCurrent));
		const index = months.findIndex((month) => monthKey(month) === targetKey);
		const el = index >= 0 ? monthElements[index] : undefined;

		if (!el) return;

		container.scrollTo({
			top: el.offsetTop - 8,
			behavior: 'auto'
		});
	}

	let initialized = false;

	$effect(() => {
		monthElements.length = months.length;
	});

	$effect(() => {

		if (!initialized) {
			queueMicrotask(() => {
				scrollToCurrentMonth(months, monthElements);
				initialized = true;
			});
		}
	});

	function selectDate(date: Date, disabled: boolean) {
		if (disabled) return;
		selectedDate = date;
		onselect?.(date);
	}

	function formatMonth(date: Date): string {
		return date.toLocaleDateString(undefined, {
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<div class="calendar" bind:this={container}>
	<div class="calendar-inner">
		{#each months as month, i (monthKey(month))}
			<section class="calendar-month" bind:this={monthElements[i]} >
				<div class="calendar-month-header">
					<h3>{formatMonth(month)}</h3>
				</div>

				<div class="calendar-weekdays">
					{#each weekdayLabels as label, j (j)}
						<div class="calendar-weekday">{label}</div>
					{/each}
				</div>

				<div class="calendar-grid">
					{#each buildMonthGrid(month, rawStart, rawEnd) as day, j (j)}
						<button
							type="button"
							class:outside-month={!day.inMonth}
							class:disabled-day={day.disabled}
							class:selected={sameDay(day.date, selectedDate)}
							class:today={sameDay(day.date, normalizedCurrent) && !sameDay(day.date, selectedDate)}
							class="calendar-day"
							disabled={day.disabled}
							aria-pressed={sameDay(day.date, selectedDate)}
							onclick={() => selectDate(day.date, day.disabled)}
						>
							{day.date.getDate()}
						</button>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>

<style>
	.calendar {
		height: 100%;
		max-height: 70vh;
		overflow-y: auto;
		border: 1px solid #d6d9de;
		border-radius: 0.75rem;
		background: #fff;
	}

	.calendar-inner {
		padding: 1rem;
	}

	.calendar-month {
		margin-bottom: 1.5rem;
		scroll-margin-top: 0.5rem;
	}

	.calendar-month:last-child {
		margin-bottom: 0;
	}

	.calendar-month-header {
		position: sticky;
		top: 0;
		z-index: 2;
		padding: 0.65rem 0;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid #e3e6ea;
		background: rgba(255, 255, 255, 0.96);
		backdrop-filter: blur(3px);
	}

	.calendar-month-header h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #223046;
	}

	.calendar-weekdays,
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: 0.25rem;
	}

	.calendar-weekdays {
		margin-bottom: 0.35rem;
	}

	.calendar-weekday {
		padding: 0.35rem 0;
		text-align: center;
		font-size: 0.75rem;
		font-weight: 600;
		color: #6c788a;
	}

	.calendar-day {
		height: 2.75rem;
		padding: 0;
		border: 1px solid transparent;
		border-radius: 0.45rem;
		background: #fff;
		color: #223046;
		font-size: 0.95rem;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.calendar-day:hover:not(:disabled) {
		background: #f3f6f9;
		border-color: #d7dfe8;
	}

	.calendar-day.outside-month {
		color: #b7bec8;
	}

	.calendar-day.disabled-day {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.calendar-day.selected {
		background: #2f6fed;
		border-color: #2f6fed;
		color: #fff;
		font-weight: 600;
	}

	.calendar-day.selected:hover:not(:disabled) {
		background: #285fca;
		border-color: #285fca;
	}

	.calendar-day.today:not(.selected) {
		border-color: #aeb8c5;
		box-shadow: inset 0 0 0 1px #aeb8c5;
		font-weight: 600;
	}

	@media (max-width: 576px) {
		.calendar-inner {
			padding: 0.75rem;
		}

		.calendar-day {
			height: 2.4rem;
			font-size: 0.9rem;
		}

		.calendar-month-header h3 {
			font-size: 1rem;
		}
	}
</style>