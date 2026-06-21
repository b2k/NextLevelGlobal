import type { ScriptureResult, Translation } from './types';
import {
	getFromApiBible,
	getFromBibleApi,
	getFromCrossway,
	getFromNivJson,
	getFromNkjvJson,
	getFromNviJson,
	getFromRvr60Json
} from './providers';
import { r } from '$lib/config/translations';

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

		case 'NIV':
			return getFromNivJson(args.reference);

		case 'NKJV':
			return getFromNkjvJson(args.reference);

		case 'RVR60':
			return getFromRvr60Json(r(args.reference, 'es') ?? args.reference);
		case 'NVI':
			return getFromNviJson(r(args.reference, 'es') ?? args.reference);
	}
}
