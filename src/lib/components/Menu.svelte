<script lang="ts">
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
		DropdownMenu,
		DropdownItem
	} from '@sveltestrap/sveltestrap';

	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}
</script>

<Navbar
	fixed="top"
	expand="md"
	container="fluid"
	class="simple-navbar navbar-light"
>
	<NavbarBrand href="/" onclick={closeMenu}>
		<img src="/assets/NextLevelGlobal.png" alt="Next Level Global Logo" />
	</NavbarBrand>

	<NavbarToggler onclick={toggleMenu} />

	<Collapse {isOpen} navbar expand="md">
		<Nav class="ms-auto" navbar>
			<NavItem>
				<NavLink href="/about" onclick={closeMenu}>About</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/missions" onclick={closeMenu}>Missions</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/events" onclick={closeMenu}>Events</NavLink>
			</NavItem>

			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>More</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem href="/give">Give</DropdownItem>
					<DropdownItem href="/contact">Contact</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</Nav>
	</Collapse>
</Navbar>

<style>
	:global(.simple-navbar) {
		background-color: rgba(255, 255, 255, 0.9);
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		z-index: 1050;
	}

	:global(.simple-navbar .navbar-brand) {
		color: #111;
		font-weight: 600;
	}

	:global(.simple-navbar .nav-link) {
		color: #111;
		font-weight: 500;
		transition: color 0.15s ease;
	}

	:global(.simple-navbar .nav-link:hover) {
		color: #0d6efd;
	}

	:global(.simple-navbar .nav-link.active) {
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 6px;
	}

	:global(.simple-navbar .dropdown-menu) {
		border-radius: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	:global(.navbar-brand img) {
		max-height: 70px;
	}

	@media (max-width: 767px) {
		:global(.simple-navbar .navbar-collapse) {
			padding-top: 0.75rem;
		}
	}
</style>