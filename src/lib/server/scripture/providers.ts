import { env } from '$env/dynamic/private';

import type { ScriptureResult, Translation } from './types';

type BibleApiTranslation = Extract<Translation, 'KJV' | 'WEB'>;
type LocalTranslation = Extract<Translation, 'NIV' | 'NKJV' | 'RVR60' | 'NVI'>;

type LocalBibleBook = Record<string, Record<string, string>>;

const localBibleBooks = import.meta.glob('./{NIV,NKJV,RVR60,NVI}/*.json') as Record<
	string,
	() => Promise<{ default: LocalBibleBook }>
>;

const localBookCache = new Map<string, LocalBibleBook>();

export const translationCopyright: Record<Translation, string> = {
	KJV: 'King James Version (KJV). Public Domain.',
	WEB: 'World English Bible (WEB). Public Domain.',
	ESV: 'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.',
	NIV: 'Scripture quotations taken from the Holy Bible, New International Version® NIV®. Copyright © Biblica, Inc. Used by permission. All rights reserved worldwide.',
	NKJV: 'Scripture quotations are from the New King James Version®. Copyright © 1982 by Thomas Nelson. Used by permission. All rights reserved.',
	RVR60:
		'Reina-Valera 1960®. © Sociedades Bíblicas en América Latina, 1960. Derechos renovados 1988, Sociedades Bíblicas Unidas. Usado con permiso.',
	NVI: 'La Santa Biblia, Nueva Versión Internacional® NVI®. Copyright © 1999, 2015 by Biblica, Inc.® Usado con permiso. Todos los derechos reservados mundialmente.'
};

const bookMap: Record<string, number> = {
	genesis: 1,
	gen: 1,
	génesis: 1,
	exodus: 2,
	exod: 2,
	exo: 2,
	éxodo: 2,
	exodo: 2,
	leviticus: 3,
	lev: 3,
	levítico: 3,
	levitico: 3,
	numbers: 4,
	num: 4,
	nums: 4,
	números: 4,
	numeros: 4,
	deuteronomy: 5,
	deut: 5,
	deu: 5,
	deuteronomio: 5,
	joshua: 6,
	josh: 6,
	jos: 6,
	josué: 6,
	josue: 6,
	judges: 7,
	judg: 7,
	jdg: 7,
	jueces: 7,
	jue: 7,
	ruth: 8,
	rut: 8,
	'1 sam': 9,
	'1samuel': 9,
	'1sam': 9,
	'1º samuel': 9,
	'1 samuel': 9,
	'2 samuel': 10,
	'2 sam': 10,
	'2samuel': 10,
	'2sam': 10,
	'2º samuel': 10,
	'1 kings': 11,
	'1 kgs': 11,
	'1king': 11,
	'1kings': 11,
	'1kgs': 11,
	'1 reyes': 11,
	'1º reyes': 11,
	'2 kings': 12,
	'2 kgs': 12,
	'2king': 12,
	'2kings': 12,
	'2kgs': 12,
	'2 reyes': 12,
	'2º reyes': 12,
	'1 chronicles': 13,
	'1 chr': 13,
	'1chronicles': 13,
	'1chr': 13,
	'1 crónicas': 13,
	'1 cronicas': 13,
	'1º crónicas': 13,
	'1º cronicas': 13,
	'2 chronicles': 14,
	'2 chr': 14,
	'2chronicles': 14,
	'2chr': 14,
	'2 crónicas': 14,
	'2 cronicas': 14,
	'2º crónicas': 14,
	'2º cronicas': 14,
	ezra: 15,
	esdras: 15,
	esd: 15,
	nehemiah: 16,
	neh: 16,
	nehemías: 16,
	nehemias: 16,
	esther: 17,
	esth: 17,
	ester: 17,
	job: 18,
	psalms: 19,
	psalm: 19,
	ps: 19,
	psa: 19,
	salmos: 19,
	salmo: 19,
	sal: 19,
	proverbs: 20,
	prov: 20,
	pro: 20,
	proverbios: 20,
	ecclesiastes: 21,
	ecc: 21,
	eccl: 21,
	eclesiastés: 21,
	eclesiastes: 21,
	'song of solomon': 22,
	'song of songs': 22,
	song: 22,
	sos: 22,
	'cantar de los cantares': 22,
	cantares: 22,
	isaiah: 23,
	isa: 23,
	isaías: 23,
	isaias: 23,
	jeremiah: 24,
	jer: 24,
	jeremías: 24,
	jeremias: 24,
	lamentations: 25,
	lam: 25,
	lamentaciones: 25,
	ezekiel: 26,
	ezek: 26,
	eze: 26,
	ezequiel: 26,
	daniel: 27,
	dan: 27,
	hosea: 28,
	hos: 28,
	oseas: 28,
	joel: 29,
	amos: 30,
	amo: 30,
	amós: 30,
	obadiah: 31,
	obad: 31,
	oba: 31,
	abdías: 31,
	abdias: 31,
	jonah: 32,
	jon: 32,
	jonás: 32,
	jonas: 32,
	micah: 33,
	mic: 33,
	miqueas: 33,
	nahum: 34,
	nah: 34,
	habakkuk: 35,
	hab: 35,
	habacuc: 35,
	zephaniah: 36,
	zeph: 36,
	zep: 36,
	sofonías: 36,
	sofonias: 36,
	haggai: 37,
	hag: 37,
	hageo: 37,
	zechariah: 38,
	zech: 38,
	zec: 38,
	zacarías: 38,
	zacarias: 38,
	malachi: 39,
	mal: 39,
	malaquías: 39,
	malaquias: 39,
	matthew: 40,
	matt: 40,
	mat: 40,
	mateo: 40,
	mark: 41,
	mrk: 41,
	marcos: 41,
	luke: 42,
	luk: 42,
	lucas: 42,
	john: 43,
	jhn: 43,
	juan: 43,
	acts: 44,
	act: 44,
	hechos: 44,
	romans: 45,
	rom: 45,
	romanos: 45,
	'1 corinthians': 46,
	'1 cor': 46,
	'1corinthians': 46,
	'1cor': 46,
	'1 corintios': 46,
	'1º corintios': 46,
	'2 corinthians': 47,
	'2 cor': 47,
	'2corinthians': 47,
	'2cor': 47,
	'2 corintios': 47,
	'2º corintios': 47,
	galatians: 48,
	gal: 48,
	gálatas: 48,
	galatas: 48,
	ephesians: 49,
	eph: 49,
	efesios: 49,
	philippians: 50,
	phil: 50,
	php: 50,
	filipenses: 50,
	colossians: 51,
	col: 51,
	colosenses: 51,
	'1 thessalonians': 52,
	'1 thess': 52,
	'1thessalonians': 52,
	'1thess': 52,
	'1 thes': 52,
	'1thes': 52,
	'1 tesalonicenses': 52,
	'1º tesalonicenses': 52,
	'2 thessalonians': 53,
	'2 thess': 53,
	'2thessalonians': 53,
	'2thess': 53,
	'2 thes': 53,
	'2thes': 53,
	'2 tesalonicenses': 53,
	'2º tesalonicenses': 53,
	'1 timothy': 54,
	'1 tim': 54,
	'1timothy': 54,
	'1tim': 54,
	'1 timoteo': 54,
	'1º timoteo': 54,
	'2 timothy': 55,
	'2 tim': 55,
	'2timothy': 55,
	'2tim': 55,
	'2 timoteo': 55,
	'2º timoteo': 55,
	titus: 56,
	tit: 56,
	tito: 56,
	philemon: 57,
	philem: 57,
	phm: 57,
	filemón: 57,
	filemon: 57,
	hebrews: 58,
	heb: 58,
	hebreos: 58,
	james: 59,
	jas: 59,
	santiago: 59,
	'1 peter': 60,
	'1 pet': 60,
	'1peter': 60,
	'1pet': 60,
	'1 pedro': 60,
	'1º pedro': 60,
	'2 peter': 61,
	'2 pet': 61,
	'2peter': 61,
	'2pet': 61,
	'2 pedro': 61,
	'2º pedro': 61,
	'1 john': 62,
	'1john': 62,
	'1 jn': 62,
	'1jn': 62,
	'1 juan': 62,
	'1º juan': 62,
	'2 john': 63,
	'2john': 63,
	'2 jn': 63,
	'2jn': 63,
	'2 juan': 63,
	'2º juan': 63,
	'3 john': 64,
	'3john': 64,
	'3 jn': 64,
	'3jn': 64,
	'3 juan': 64,
	'3º juan': 64,
	jude: 65,
	judas: 65,
	revelation: 66,
	rev: 66,
	apocalypse: 66,
	apocalipsis: 66,
	apoc: 66
};

function assertOk(response: Response, provider: string) {
	if (!response.ok) {
		throw new Error(`${provider} failed: ${response.status} ${response.statusText}`);
	}
}

export async function getFromCrossway(reference: string): Promise<ScriptureResult> {
	const url = new URL('https://api.esv.org/v3/passage/html/');
	url.searchParams.set('q', reference);
	url.searchParams.set('include-footnotes', 'false');
	url.searchParams.set('include-headings', 'true');
	url.searchParams.set('include-passage-references', 'false');
	url.searchParams.set('include-verse-numbers', 'true');
	url.searchParams.set('include-short-copyright', 'true');
	url.searchParams.set('include-audio-link', 'false');
	url.searchParams.set('wrapping-div', 'true');
	url.searchParams.set('div-classes', 'scripture-passage');

	const response = await fetch(url, {
		headers: {
			Authorization: `Token ${env.ESV_API_KEY}`
		}
	});

	assertOk(response, 'Crossway ESV API');

	const data = await response.json();

	return {
		reference: data.canonical ?? reference,
		translation: 'ESV',
		html: data.passages?.join('\n\n') ?? '',
		copyright: translationCopyright.ESV,
		source: 'crossway'
	};
}

export async function getFromBibleApi(
	reference: string,
	translation: BibleApiTranslation = 'WEB'
): Promise<ScriptureResult> {
	const segments = parseReference(reference);

	if (!segments.length) {
		throw new Error(`Unsupported ${translation} reference format: ${reference}`);
	}

	const htmlParts = await Promise.all(
		segments.map(async (segment) => {
			const segmentReference = formatBibleApiReference(segment);

			const url = new URL(`https://bible-api.com/${encodeURIComponent(segmentReference)}`);
			url.searchParams.set('translation', translation.toLowerCase());

			const response = await fetch(url);
			assertOk(response, `Bible API ${segmentReference}`);

			const data = await response.json();
			const title = segments.length > 1 ? `<h3>${properCase(segmentReference)}</h3>` : '';

			return `${title}${
				data.verses
					?.map(
						(v: { verse: number; text: string }) =>
							`<p><sup class="verse-num"><b>${v.verse}</b></sup> ${escapeHtml(v.text.trim())}</p>`
					)
					.join('') ?? ''
			}`;
		})
	);

	return {
		reference,
		translation,
		html: htmlParts.join('\n'),
		copyright: translationCopyright[translation],
		source: 'bible-api'
	};
}

function formatBibleApiReference(segment: ParsedReferenceSegment): string {
	const start = segment.startVerse
		? `${segment.chapter}:${segment.startVerse}`
		: `${segment.chapter}`;

	if (!segment.endVerse) {
		return `${segment.book} ${start}`;
	}

	const endChapter = segment.endChapter ?? segment.chapter;

	if (endChapter !== segment.chapter) {
		return `${segment.book} ${start}-${endChapter}:${segment.endVerse}`;
	}

	return `${segment.book} ${start}-${segment.endVerse}`;
}

export async function getFromLocalJson(
	reference: string,
	translation: LocalTranslation
): Promise<ScriptureResult> {
	const segments = parseReference(reference);

	if (!segments.length) {
		throw new Error(`Unsupported ${translation} reference format: ${reference}`);
	}

	const books = new Map<string, Awaited<ReturnType<typeof loadLocalBook>>>();

	const htmlParts = await Promise.all(
		segments.map(async (segment) => {
			const bookNumber = bookMap[normalizeBookName(segment.book)];
			let book = books.get(segment.book);
			if (!book) {
				book = await loadLocalBook(translation, bookNumber);
				books.set(segment.book, book);
			}

			return renderLocalPassage(book, segment, segments.length > 1);
		})
	);

	return {
		reference,
		translation,
		html: htmlParts.join('\n'),
		copyright: translationCopyright[translation],
		source: `${translation.toLowerCase()}-json`
	};
}

export function getFromNivJson(reference: string) {
	return getFromLocalJson(reference, 'NIV');
}

export function getFromNkjvJson(reference: string) {
	return getFromLocalJson(reference, 'NKJV');
}

export function getFromRvr60Json(reference: string) {
	return getFromLocalJson(reference, 'RVR60');
}

export function getFromNviJson(reference: string) {
	return getFromLocalJson(reference, 'NVI');
}

async function loadLocalBook(translation: LocalTranslation, book: number) {
	const bookFile = `${book.toString().padStart(2, '0')}.json`;
	const path = `./${translation}/${bookFile}`;
	const cacheKey = `${translation}:${bookFile}`;

	const cached = localBookCache.get(cacheKey);
	if (cached) return cached;

	const loader = localBibleBooks[path];

	if (!loader) {
		throw new Error(
			`Missing local scripture book file: src/lib/server/scripture/${translation}/${bookFile}`
		);
	}

	const module = await loader();
	localBookCache.set(cacheKey, module.default);

	return module.default;
}

function renderLocalPassage(
	book: LocalBibleBook,
	parsed: ParsedReferenceSegment,
	includeTitle: boolean = false
): string {
	const paragraphs: string[] = [];
	const lastChapter = parsed.endChapter ?? parsed.chapter;

	for (let chapter = parsed.chapter; chapter <= lastChapter; chapter++) {
		const verses = book[String(chapter)];

		if (!verses) continue;

		const verseNumbers = Object.keys(verses)
			.map(Number)
			.filter((verse) => {
				if (chapter === parsed.chapter && parsed.startVerse && verse < parsed.startVerse) {
					return false;
				}

				if (chapter === lastChapter && parsed.endVerse && verse > parsed.endVerse) {
					return false;
				}

				return true;
			})
			.sort((a, b) => a - b);

		for (const verse of verseNumbers) {
			paragraphs.push(
				`<p><sup class="verse-num"><b>${verse}</b></sup> ${escapeHtml(verses[String(verse)].trim())}</p>`
			);
		}
	}

	if (includeTitle) {
		paragraphs.unshift(
			`<h3>${properCase(parsed.book)} ${parsed.chapter}${parsed.startVerse ? `:${parsed.startVerse}` : ''}${parsed.endVerse ? `-${parsed.endChapter !== parsed.chapter ? parsed.endChapter + ':' : ''}${parsed.endVerse}` : ''}</h3>`
		);
	}

	return paragraphs.join('');
}
function properCase(str: string): string {
	return str
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}
export type ParsedReferenceSegment = {
	book: string;
	chapter: number;
	startVerse?: number;
	endChapter?: number;
	endVerse?: number;
};

export function parseReference(reference: string): ParsedReferenceSegment[] {
	const normalized = normalizeReference(reference)
		.replace(/[–—]/g, '-')
		.replace(/\s+/g, ' ')
		.trim();

	const segments: ParsedReferenceSegment[] = [];
	let currentBook: number | undefined;
	let currentChapter: number | undefined;

	for (const part of normalized.split(/\s*;\s*/)) {
		for (const rawPiece of part.split(/\s*,\s*/)) {
			const piece = rawPiece.trim();
			if (!piece) continue;

			const match = piece.match(/^(?:(.+?)\s+)?(\d+)(?::(\d+))?(?:\s*-\s*(?:(\d+):)?(\d+))?$/i);

			if (!match) return [];

			const [, rawBook, rawChapter, rawStartVerse, rawEndChapter, rawEndVerse] = match;

			if (rawBook) {
				currentBook = bookMap[normalizeBookName(rawBook)];
				if (!currentBook) return [];
			}

			if (!currentBook) return [];

			currentChapter = Number(rawChapter);

			const startVerse = rawStartVerse ? Number(rawStartVerse) : undefined;
			const endChapter = rawEndChapter ? Number(rawEndChapter) : currentChapter;
			const endVerse = rawEndVerse ? Number(rawEndVerse) : startVerse;

			segments.push({
				book: rawBook ?? Object.keys(bookMap).find((key) => bookMap[key] === currentBook) ?? '',
				chapter: currentChapter,
				startVerse,
				endChapter,
				endVerse
			});
		}
	}

	return segments;
}

function normalizeReference(reference: string) {
	return reference
		.trim()
		.replace(/\s+/g, ' ')
		.replace(/^[“”"']+|[“”"']+$/g, '')
		.replace(/ [PQ]-?(\d+)$/g, '');
}

function normalizeBookName(book: string) {
	return book.toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ').trim();
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}
