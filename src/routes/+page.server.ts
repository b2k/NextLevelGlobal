// src/routes/+page.server.ts
import { page } from '$lib/config/pages/home/page';

export function load() {
	return { page };
}