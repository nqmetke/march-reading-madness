<script>
	// Svelte 5 Rune to manage the state of the mobile menu
	let open = $state(false);

	// Define your navigation links
	const links = [{ name: "Home", href: "/app/home" }];

	// Function to toggle the menu open/closed
	const toggleMenu = () => {
		open = !open;
	};
</script>

<nav>
	<div class="navbar-content">
		<ul class="desktop-links">
			{#each links as link}
				<li><a href={link.href}>{link.name}</a></li>
			{/each}
		</ul>
		<ul class="desktop-links">
			<li><a href="/app/dashboard">Profile</a></li>
		</ul>
		<button class="menu-button" onclick={toggleMenu}>
			{open ? "Close" : "Menu"}
		</button>
	</div>

	{#if open}
		<ul class="mobile-menu">
			{#each links as link}
				<li>
					<a href={link.href} onclick={toggleMenu}>{link.name}</a>
				</li>
				<li><a href="/app/dashboard">Profile</a></li>
			{/each}
		</ul>
	{/if}
</nav>

<style>
	/* Base Navigation Container */
	nav {
		background-color: var(
			--color-background
		); /* Use the green for the navbar */
		color: var(--color-text);
		padding: 0 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	/* Container for the Brand and Desktop Links */
	.navbar-content {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		max-width: 1200px; /* Optional: Center the content on large screens */
		margin: 0 auto;
		height: 60px; /* Fixed height for the navbar */
	}

	/* --- Desktop Links (Default) --- */
	.desktop-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: none; /* Hidden by default (Mobile-First approach) */
	}

	.desktop-links li {
		display: inline-block;
		margin-left: 20px;
	}

	.desktop-links a {
		text-decoration: none;
		color: var(--color-text);
		padding: 10px 0;
		transition: color 0.3s;
		font-size: 20px;
	}

	.desktop-links a:hover {
		color: var(--color-primary); /* Highlight links with the primary pink */
	}

	/* --- Mobile Menu Button --- */
	.menu-button {
		background-color: transparent;
		border: 1px solid var(--color-text);
		color: var(--color-text);
		padding: 8px 12px;
		border-radius: 4px;
		cursor: pointer;
		float: right;
	}

	/* --- Mobile Dropdown Menu --- */
	.mobile-menu {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid rgba(75, 68, 70, 0.1); /* Subtle divider */
	}

	.mobile-menu li {
		border-bottom: 1px solid rgba(75, 68, 70, 0.05);
	}

	.mobile-menu a {
		display: block;
		padding: 15px 20px;
		text-decoration: none;
		color: var(--color-text);
		font-weight: 500;
	}

	/* --- MEDIA QUERY for Desktop View --- */
	@media (min-width: 768px) {
		/* Show desktop links and hide the menu button */
		.navbar-content {
			justify-content: space-between;
		}
		.desktop-links {
			display: flex;
		}

		.menu-button {
			display: none;
		}

		/* Hide the mobile dropdown */
		.mobile-menu {
			display: none;
		}
	}
</style>
