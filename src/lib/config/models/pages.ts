import type { GroupPage } from './types';

function normalizePath(file: string): string {
	return file.replace('../pages/', '').replace(/\/page\.(ts|js)$/, '');
}

function definePage(path: string, page: Omit<GroupPage, 'path'>): [string, GroupPage] {
	return [path, { ...page, path }];
}

const modules = import.meta.glob('../pages/**/page.ts', { eager: true });

export const pageByPath = new Map<string, GroupPage>(
	Object.entries(modules).map(([file, mod]) => {
		const path = normalizePath(file);
		const page = (mod as { page: Omit<GroupPage, 'path'> }).page;
		return definePage(path, page);
	})
);

export function getPageByPath(path: string): GroupPage | undefined {
	return pageByPath.get(path);
}

export const pages = Array.from(pageByPath.values());
