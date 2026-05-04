// src/routes/+page.server.ts
import { page } from '$lib/config/pages/about-us/beliefs/page';

export function load() {
	return { page };
}