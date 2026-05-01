import type { SectionItem } from "$lib/config/models/types";

	export function itemHref(item: SectionItem) {
		if (item.type === 'pdf') return item.pdf;
		if (item.type === 'book') return item.buyUrl;
		return item.href;
	}

	export function itemSecondaryHref(item: SectionItem) {
		return item.type === 'book' ? item.questionsPdf : '';
	}
	export function toYouTubeEmbedUrl(url: string) {
		const parsed = new URL(url);

		if (parsed.hostname.includes('youtu.be')) {
			return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
		}

		const id = parsed.searchParams.get('v');
		return id ? `https://www.youtube.com/embed/${id}` : url;
	}
