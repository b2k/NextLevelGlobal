import type { ScriptureResult, Translation } from './types';
import { getFromApiBible, getFromBibleApi, getFromCrossway } from './providers';

export async function getScripture(args: {
	reference: string;
	translation?: Translation;
	passageId?: string;
}): Promise<ScriptureResult> {
	const translation = args.translation ?? 'ESV';

	switch (translation) {
		case 'ESV':
			return getFromCrossway(args.reference);

		case 'KJV':
		case 'WEB':
			return getFromBibleApi(args.reference, translation);

		case 'RVR60':
		case 'NVI':
			if (!args.passageId) {
				throw new Error(
					`${translation} requires an API.Bible passageId, for example JHN.3.16-JHN.3.18`
				);
			}

			return getFromApiBible(args.passageId, translation);
	}
}
