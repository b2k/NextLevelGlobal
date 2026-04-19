import { resolveFromDefaultDate } from './defaultStartDate';


export function resolveCalendarStartDate(
	defaultStartDate?: string,
	urlStart?: string | null,
    reference = new Date()
): string | null {
	if (urlStart) return resolveFromDefaultDate(urlStart, reference);

	if (defaultStartDate) {
		return resolveFromDefaultDate(defaultStartDate, reference);
	}

	return null;
}
