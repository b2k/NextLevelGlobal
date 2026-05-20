import { error } from '@sveltejs/kit';
import { pageByPath } from '$lib/config/models/pages';
import { jsonClone } from '$lib/utils/jsonClone.js';
import { resolveCalendarStartDate } from '$lib/config/models/calendars/resolveCalendarStartDate';
import { generateCalendarEntries } from '$lib/config/models/calendars/generateCalendarEntries';
import path from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { CalendarEntry } from '$lib/config/models/calendars/groupCalendars.js';

const PAGE_WIDTH = 792; // 11in
const PAGE_HEIGHT = 612; // 8.5in

export async function GET({ params, url, cookies }) {
	let configPath = params.path;
	const cookiesPath = path.join(...(params.path?.split('/') ?? []).filter(Boolean));

	if (!configPath) throw error(404, 'Calendar not found');

	if (configPath.endsWith('.pdf')) {
		configPath = configPath.slice(0, -4);
	}

	const page = jsonClone(pageByPath.get(configPath));

	if (!page?.calendar) {
		throw error(404, `Calendar not found: ${configPath}`);
	}

	const customStartDate = cookies.get(`customStartDate:${cookiesPath}`);

	const startDate = resolveCalendarStartDate(
		page.calendar.defaultStartDate,
		customStartDate || url.searchParams.get('start-date')
	);

	const entries = startDate ? generateCalendarEntries(page.calendar, startDate) : [];

	page.calendar.defaultStartDate = startDate ?? page.calendar.defaultStartDate;
	page.calendar.entries = entries;

	const pdfBytes = await buildCalendarPdf({
		title: page.calendar.title,
		description: page.calendar.description,
		entries: page.calendar.entries
	});

	return new Response(Buffer.from(pdfBytes), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `inline; filename="${configPath.replace(/\//g, '-')}-calendar.pdf"`,
			'Cache-Control': 'public, max-age=300'
		}
	});
}

type CalendarPdfParams = {
	title: string;
	description?: string;
	entries: CalendarEntry[];
};

async function buildCalendarPdf({ title, description, entries }: CalendarPdfParams) {
	const pdf = await PDFDocument.create();

	const font = await pdf.embedFont(StandardFonts.Helvetica);
	const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

	const months = getMonthsCovered(entries);

	for (const monthDate of months) {
		const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

		//drawBackgroundBorder(page, heroImage);

		const margin = 32;
		const headerHeight = 58;
		const weekdayHeight = 22;
		const gridTop = PAGE_HEIGHT - margin - headerHeight;
		const gridLeft = margin;
		const gridWidth = PAGE_WIDTH - margin * 2;
		const gridHeight = PAGE_HEIGHT - margin * 2 - headerHeight;
		const cellWidth = gridWidth / 7;
		const cellHeight = (gridHeight - weekdayHeight) / 6;

		const monthName = monthDate.toLocaleString('en-US', {
			month: 'long',
			year: 'numeric'
		});

		page.drawText(title ?? 'Calendar', {
			x: margin,
			y: PAGE_HEIGHT - 38,
			size: 18,
			font: bold,
			color: rgb(0.12, 0.12, 0.12)
		});

		page.drawText(monthName, {
			x: margin,
			y: PAGE_HEIGHT - 58,
			size: 13,
			font,
			color: rgb(0.25, 0.25, 0.25)
		});

		if (description) {
			page.drawText(String(description).slice(0, 90), {
				x: PAGE_WIDTH / 2,
				y: PAGE_HEIGHT - 38,
				size: 9,
				font,
				color: rgb(0.35, 0.35, 0.35)
			});
		}

		const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		for (let col = 0; col < 7; col++) {
			const x = gridLeft + col * cellWidth;

			page.drawRectangle({
				x,
				y: gridTop - weekdayHeight,
				width: cellWidth,
				height: weekdayHeight,
				color: rgb(0.93, 0.91, 0.86),
				borderColor: rgb(0.72, 0.68, 0.6),
				borderWidth: 0.5
			});

			page.drawText(weekdays[col], {
				x: x + 6,
				y: gridTop - 15,
				size: 9,
				font: bold,
				color: rgb(0.15, 0.15, 0.15)
			});
		}

		const monthEntries = entries.filter((entry) => sameMonth(toDate(entry.date ?? ''), monthDate));
		const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
		const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
			const index = first.getDay() + day - 1;
			const row = Math.floor(index / 7);
			const col = index % 7;

			const x = gridLeft + col * cellWidth;
			const y = gridTop - weekdayHeight - (row + 1) * cellHeight;

			page.drawRectangle({
				x,
				y,
				width: cellWidth,
				height: cellHeight,
				color: rgb(1, 1, 1),
				opacity: 0.9,
				borderColor: rgb(0.78, 0.75, 0.68),
				borderWidth: 0.5
			});

			page.drawText(String(day), {
				x: x + 5,
				y: y + cellHeight - 13,
				size: 8,
				font: bold,
				color: rgb(0.2, 0.2, 0.2)
			});

			const dayEntries = monthEntries.filter((entry) => sameDay(toDate(entry.date ?? ''), date));

			let itemY = y + cellHeight - 27;

			for (const entry of dayEntries.slice(0, 5)) {
				const color = kindColor(entry.kind);

				page.drawRectangle({
					x: x + 4,
					y: itemY - 2,
					width: cellWidth - 8,
					height: 11,
					color,
					opacity: 0.85
				});

				page.drawText(truncate(entry.title, 34), {
					x: x + 7,
					y: itemY,
					size: 6.5,
					font,
					color: rgb(0.12, 0.12, 0.12)
				});

				itemY -= 13;
			}

			if (dayEntries.length > 5) {
				page.drawText(`+${dayEntries.length - 5} more`, {
					x: x + 7,
					y: itemY,
					size: 6.5,
					font,
					color: rgb(0.35, 0.35, 0.35)
				});
			}
		}
	}

	return await pdf.save();
}

function getMonthsCovered(entries: CalendarEntry[]): Date[] {
	const dates = entries.map((entry) => toDate(entry.date ?? '')).filter(Boolean);

	if (!dates.length) {
		const now = new Date();
		return [new Date(now.getFullYear(), now.getMonth(), 1)];
	}

	dates.sort((a, b) => a.getTime() - b.getTime());

	const first = new Date(dates[0].getFullYear(), dates[0].getMonth(), 1);
	const last = new Date(
		dates[dates.length - 1].getFullYear(),
		dates[dates.length - 1].getMonth(),
		1
	);

	const months = [];
	const cursor = new Date(first);

	while (cursor <= last) {
		months.push(new Date(cursor));
		cursor.setMonth(cursor.getMonth() + 1);
	}

	return months;
}

function toDate(value: string | Date): Date {
	if (value instanceof Date) return value;

	if (typeof value === 'string') {
		const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
		if (match) {
			return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
		}
	}

	return new Date(value);
}

function sameMonth(a: Date, b: Date) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function sameDay(a: Date, b: Date) {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function truncate(value: string, max: number): string {
	const text = String(value ?? '');
	return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function kindColor(kind: string | undefined): ReturnType<typeof rgb> {
	switch (kind) {
		case 'week':
			return rgb(0.99, 0.91, 0.68);
		case 'reading':
			return rgb(0.86, 0.92, 1);
		case 'memory':
			return rgb(0.86, 0.97, 0.88);
		case 'book':
			return rgb(0.92, 0.89, 1);
		case 'psalm':
			return rgb(1, 0.9, 0.9);
		case 'meeting':
			return rgb(0.93, 0.94, 0.96);
		default:
			return rgb(0.94, 0.94, 0.94);
	}
}

// function drawBackgroundBorder(page: PDFPage, heroImage: string | undefined) {
// 	// Placeholder hook. pdf-lib can embed the actual image,
// 	// but this route needs the resolved file path or fetched image bytes.
// 	// For now this gives a soft border that mimics the page theme.

// 	page.drawRectangle({
// 		x: 14,
// 		y: 14,
// 		width: PAGE_WIDTH - 28,
// 		height: PAGE_HEIGHT - 28,
// 		borderColor: rgb(0.58, 0.5, 0.38),
// 		borderWidth: 2
// 	});
// }
