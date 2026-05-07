export function parseLocalDate(value: string | Date): Date | null {
	if (value instanceof Date) {
		return value;
	}
	const trimmed = value.trim();

	let year: number;
	let month: number;
	let day: number;

	let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
	if (m) {
		year = +m[1];
		month = +m[2];
		day = +m[3];
	} else {
		m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
		if (!m) return null;

		month = +m[1];
		day = +m[2];
		year = +m[3];
	}

	const d = new Date(year, month - 1, day);

	if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
		return null;
	}

	return d;
}

function formatLocalDate(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
}

/**
 * Rolls a calendar start date forward to the year of the reference date.
 * This allows a calendar to be defined with a fixed start date, but have it 
 * automatically adjust so that we don't have to edit our calendars each year.
 * @param defaultStartDate The default start date to resolve from. This should be in the format "YYYY-MM-DD" or "M/D/YYYY". 
 * @param reference The reference date to use for calculating the resolved start date. Defaults to the current date.
 * @returns The resolved start date in the format "YYYY-MM-DD", or null if the default start date is invalid.   
 */
export function resolveFromDefaultDate(
	defaultStartDate: string,
	reference = new Date()
): string | null {
	const base = parseLocalDate(defaultStartDate);
	if (!base) return null;

	const yearDelta = reference.getFullYear() - base.getFullYear();

	const resolved = new Date(base);
	resolved.setDate(resolved.getDate() + yearDelta * 52 * 7);

	return formatLocalDate(resolved);
}
