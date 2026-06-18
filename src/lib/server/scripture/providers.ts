import {
	ESV_API_KEY,
	API_BIBLE_KEY,
	API_BIBLE_RVR60_ID,
	API_BIBLE_NVI_ID
} from '$env/static/private';

import type { ScriptureResult, Translation } from './types';

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
			Authorization: `Token ${ESV_API_KEY}`
		}
	});

	assertOk(response, 'Crossway ESV API');

	const data = await response.json();

	return {
		reference: data.canonical ?? reference,
		translation: 'ESV',
		html: data.passages?.join('\n\n') ?? '',
		source: 'crossway'
	};
}

export async function getFromBibleApi(
	reference: string,
	translation: Extract<Translation, 'KJV' | 'WEB'> = 'WEB'
): Promise<ScriptureResult> {
	const url = new URL(`https://bible-api.com/${encodeURIComponent(reference)}`);
	url.searchParams.set('translation', translation.toLowerCase());

	const response = await fetch(url);
	assertOk(response, 'Bible API');

	const data = await response.json();

	return {
		reference: data.reference ?? reference,
		translation,
		text: data.text ?? '',
		source: 'bible-api'
	};
}

function apiBibleId(translation: Translation) {
	switch (translation) {
		case 'RVR60':
			return API_BIBLE_RVR60_ID;
		case 'NVI':
			return API_BIBLE_NVI_ID;
		default:
			throw new Error(`Unsupported API.Bible translation: ${translation}`);
	}
}

/**
 * API.Bible requires passage IDs like JHN.3.16-JHN.3.18.
 * So for API.Bible, store canonical passageId separately when possible.
 */
export async function getFromApiBible(
	passageId: string,
	translation: Extract<Translation, 'RVR60' | 'NVI'>
): Promise<ScriptureResult> {
	const bibleId = apiBibleId(translation);

	const url = new URL(`https://rest.api.bible/v1/bibles/${bibleId}/passages/${passageId}`);
	url.searchParams.set('content-type', 'html');
	url.searchParams.set('include-notes', 'false');
	url.searchParams.set('include-titles', 'true');
	url.searchParams.set('include-chapter-numbers', 'false');
	url.searchParams.set('include-verse-numbers', 'true');

	const response = await fetch(url, {
		headers: {
			'api-key': API_BIBLE_KEY
		}
	});

	assertOk(response, 'API.Bible');

	const json = await response.json();
	const data = json.data;

	return {
		reference: data.reference ?? passageId,
		translation,
		html: data.content ?? '',
		copyright: data.copyright,
		source: 'api-bible'
	};
}