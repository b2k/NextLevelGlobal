import { json, error } from '@sveltejs/kit';
import { getScripture } from '$lib/server/scripture/getScripture';
import type { Translation } from '$lib/server/scripture/types';

export async function GET({ url, setHeaders }) {
	const reference = url.searchParams.get('ref');
	const translation = (url.searchParams.get('translation') ?? 'ESV') as Translation;
	const passageId = url.searchParams.get('passageId') ?? undefined;

	if (!reference) {
		throw error(400, 'Missing ref parameter');
	}

	try {
		const result = await getScripture({
			reference,
			translation,
			passageId
		});

		setHeaders({
			'cache-control': 'public, max-age=3600'
		});

		return json(result);
	} catch (err) {
		console.error(err);
		throw error(502, 'Unable to retrieve scripture passage');
	}
}