// src/routes/+page.server.ts
import { page } from '$lib/config/home/page';

export function load() {
	return { page };
}