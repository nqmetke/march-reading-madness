<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
	import Navbar from "../components/navigation/Navbar.svelte";
	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{#if data.session.isLoggedIn}
	<Navbar />
{/if}
{@render children()}
