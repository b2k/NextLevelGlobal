// src/lib/stores/lang.svelte.ts
export type Lang = 'en' | 'es';

class LangState {
	current = $state<Lang>('en');

	set(value: Lang) {
		this.current = value;
	}
}

export const lang = new LangState();

export function setLang(value: Lang) {
	lang.set(value);
}
