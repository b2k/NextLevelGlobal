// src/routes/+page.server.ts
import { page } from '$lib/config/pages/about-us/memorize-scripture/page';

export function load() {
	return { page };
}