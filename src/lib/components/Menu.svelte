<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import {
		Collapse,
		NavbarToggler,
		NavbarBrand,
		Nav,
		Navbar,
		NavItem,
		NavLink,
		Dropdown,
		DropdownToggle,
		DropdownMenu
	} from '@sveltestrap/sveltestrap';
	import { page } from '$app/state';
	import {
		navDropdowns,
		topNavLinks,
		type NavLinkItem,
		type NavDropdownItem
	} from '$lib/config/navigation';
	import MenuItems from '$lib/components/MenuItems.svelte';

	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	function isActive(item: NavLinkItem): boolean {
		const pathname = page.url.pathname;
		const match = item.match ?? 'prefix';

		if (match === 'exact') return pathname === item.href;
		if (item.href === '/') return pathname === '/';

		return pathname === item.href || pathname.startsWith(`${item.href}/`);
	}

	function isLinkGroupActive(group: NavDropdownItem): boolean {
		if (group.href && isActive({ label: group.label, href: group.href })) return true;
		return group.items.some((item) => isItemOrChildActive(item));
	}

	function isItemOrChildActive(item: NavLinkItem): boolean {
		if (isActive(item)) return true;
		return !!item.items?.some((child) => isItemOrChildActive(child));
	}
</script>

<Navbar fixed="top" expand="md" container="fluid" class="site-navbar navbar-light">
	<NavbarBrand href="/" onclick={closeMenu}>
		<img src="/assets/NextLevelGlobal.png" alt="Next Level Global Logo" />
	</NavbarBrand>

	<NavbarToggler
		aria-label="Toggle navigation"
		aria-expanded={isOpen}
		aria-controls="main-navigation"
		onclick={toggleMenu}
	/>

	<Collapse id="main-navigation" {isOpen} navbar expand="md">
		<Nav class="ms-auto" navbar>
			{#each topNavLinks as link (link.href)}
				<NavItem>
					<NavLink href={link.href} onclick={closeMenu} class={isActive(link) ? 'active' : ''}>
						{link.label}
					</NavLink>
				</NavItem>
			{/each}

			{#each navDropdowns as group (group.label)}
				<Dropdown nav inNavbar>
					<DropdownToggle nav caret class={isLinkGroupActive(group) ? 'active' : ''}>
						{#if group.href}
							<span class="top-dropdown-label">{group.label}</span>
						{:else}
							<span>{group.label}</span>
						{/if}
					</DropdownToggle>

					<DropdownMenu end>
						{#if group.href}
							<li>
								<a
									class:active={isActive({ label: group.label, href: group.href })}
									class="dropdown-item fw-semibold"
									href={group.href}
									onclick={closeMenu}
								>
									{group.label}
								</a>
							</li>
							<li><hr class="dropdown-divider" /></li>
						{/if}

						<MenuItems items={group.items} {closeMenu} />
					</DropdownMenu>
				</Dropdown>
			{/each}
		</Nav>
	</Collapse>
</Navbar>

<style>
	:global(.site-navbar) {
		background-color: rgba(255, 255, 255, 0.96);
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
		z-index: 1050;
		padding-inline: 1rem;
	}

	:global(.site-navbar .navbar-brand img) {
		max-height: 70px;
		width: auto;
	}

	:global(.site-navbar .navbar-nav) {
		align-items: center;
		gap: 0.25rem;
	}

	:global(.site-navbar .nav-link),
	:global(.site-navbar .dropdown-toggle) {
		color: #111;
		font-weight: 500;
		transition:
			color 0.15s ease,
			background-color 0.15s ease;
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
	}

	:global(.site-navbar .nav-link:hover),
	:global(.site-navbar .nav-link:focus),
	:global(.site-navbar .dropdown-toggle:hover),
	:global(.site-navbar .dropdown-toggle:focus) {
		color: #0d6efd;
		background-color: rgba(13, 110, 253, 0.06);
	}

	:global(.site-navbar .nav-link.active),
	:global(.site-navbar .dropdown-toggle.active) {
		color: #0d6efd;
		font-weight: 700;
		background-color: rgba(13, 110, 253, 0.08);
	}

	:global(.site-navbar .dropdown-menu) {
		border-radius: 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
		padding: 0.5rem;
		min-width: 14rem;
	}

	:global(.site-navbar .dropdown-item) {
		border-radius: 0.5rem;
		padding: 0.55rem 0.8rem;
	}

	:global(.site-navbar .dropdown-item:hover),
	:global(.site-navbar .dropdown-item:focus) {
		background-color: rgba(13, 110, 253, 0.08);
		color: #0d6efd;
	}

	:global(.site-navbar .dropdown-divider) {
		margin: 0.4rem 0;
	}

	@media (max-width: 767.98px) {
		:global(.site-navbar .navbar-collapse) {
			padding-top: 0.75rem;
			padding-bottom: 0.5rem;
		}

		:global(.site-navbar .navbar-nav) {
			align-items: stretch;
			gap: 0;
		}

		:global(.site-navbar .nav-link),
		:global(.site-navbar .dropdown-toggle) {
			display: block;
			width: 100%;
		}

		:global(.site-navbar .dropdown-menu) {
			border: 0;
			box-shadow: none;
			padding-inline: 0.75rem;
			margin-top: 0;
		}
	}
</style>
