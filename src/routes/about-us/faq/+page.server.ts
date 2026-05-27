// src/routes/+page.server.ts
import { page } from '$lib/config/pages/about-us/faq/page';

export function load() {
	return { page };
}