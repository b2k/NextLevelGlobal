import { error } from '@sveltejs/kit';
import { pageByPath } from '$lib/config/groups/pages';
import { groupMenu } from '$lib/config/groups/menu';

export function load({ params }) {
	const path = (params.path?.split('/') ?? []).join('/');

	if (!path) {
		throw error(404, 'Page not found');
	}

	const page = pageByPath.get(path);

	if (!page) {
		throw error(404, `Page not found: ${path}`);
	}

	return {
		page,
		menu: groupMenu,
		path,
		segments: path.split('/')
	};
}
