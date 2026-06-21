export type Translation = 'ESV' | 'KJV' | 'WEB' | 'RVR60' | 'NVI' | 'NIV' | 'NKJV';

export type ScriptureResult = {
	reference: string;
	translation: Translation;
	text?: string;
	html?: string;
	copyright?: string;
	source: 'crossway' | 'bible-api' | 'api-bible';
};
