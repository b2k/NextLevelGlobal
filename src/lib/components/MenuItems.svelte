<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import MenuItems from './MenuItems.svelte';
	import type { NavLinkItem } from '$lib/config/navigation';
	import { page } from '$app/state';

	interface Props {
		items: NavLinkItem[];
		depth?: number;
		closeMenu?: () => void;
	}

	let { items, depth = 0, closeMenu = () => {} }: Props = $props();

	function isActive(item: NavLinkItem): boolean {
		const pathname = page.url.pathname;
		const match = item.match ?? 'prefix';

		if (match === 'exact') return pathname === item.href;
		if (item.href === '/') return pathname === '/';

		return pathname === item.href || pathname.startsWith(`${item.href}/`);
	}

	function hasActiveChild(item: NavLinkItem): boolean {
		return !!item.items?.some((child) => isActive(child) || hasActiveChild(child));
	}

	function resolveWrapper(href: string | undefined): string | null | undefined {
		return href;
	}
</script>

{#each items as item, i (i)}
	{#if item.items?.length}
		<li class="dropdown-submenu">
			<a
				class:active={isActive(item) || hasActiveChild(item)}
				class="dropdown-item submenu-toggle"
				href={resolveWrapper(item.href)}
				onclick={closeMenu}
			>
				<span>{item.label}</span>
				<span class="submenu-caret">›</span>
			</a>

			<ul class="dropdown-menu submenu depth-{depth}">
				<MenuItems items={item.items} {closeMenu} depth={depth + 1} />
			</ul>
		</li>
	{:else}
		<li>
			<a
				class:active={isActive(item)}
				class="dropdown-item"
				href={resolveWrapper(item.href)}
				onclick={closeMenu}
			>
				{item.label}
			</a>
		</li>
	{/if}
{/each}

<style>
	/* Base submenu container */
	:global(.dropdown-submenu) {
		position: relative;
	}

	/* Toggle row (label + caret) */
	:global(.submenu-toggle) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	:global(.submenu-caret) {
		font-size: 0.9rem;
		line-height: 1;
	}

	/* --- DESKTOP BEHAVIOR --- */

	/* All nested menus open LEFT */
	:global(.dropdown-submenu > .submenu) {
		position: absolute;
		top: 0;
		right: 100%;
		left: auto;
		margin-top: -0.5rem;

		display: none;
		min-width: 14rem;

		border-radius: 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
		background: white;
		padding: 0.5rem;
		z-index: 1050;
	}

	/* Show submenu on hover/focus */
	:global(.dropdown-submenu:hover > .submenu),
	:global(.dropdown-submenu:focus-within > .submenu) {
		display: block;
	}

	/* Active state */
	:global(.dropdown-item.active) {
		color: #0d6efd;
		font-weight: 700;
		background-color: rgba(13, 110, 253, 0.08);
	}

	/* Ensure navbar doesn’t clip menus */
	:global(.navbar),
	:global(.navbar .dropdown),
	:global(.navbar .dropdown-menu) {
		overflow: visible;
	}

	/* --- MOBILE BEHAVIOR --- */

	@media (max-width: 767.98px) {
		/* Stack all submenus inline */
		:global(.dropdown-submenu > .submenu) {
			position: static;
			display: block;

			margin: 0;
			margin-left: 0.75rem;

			border: 0;
			box-shadow: none;
			padding-top: 0;
			padding-bottom: 0;
			min-width: 0;
		}

		/* Rotate caret for vertical menus */
		:global(.submenu-caret) {
			transform: rotate(90deg);
		}

		/* Slight indentation per level */
		:global(.dropdown-submenu) {
			padding-left: 0.25rem;
		}
	}
</style>
