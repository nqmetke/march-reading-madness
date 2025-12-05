<script lang="ts">
	import { goto, invalidate, invalidateAll } from "$app/navigation";
	import { authClient } from "$lib/auth/auth-client";

	async function handleLogout() {
		await authClient.signOut();
		invalidateAll();
	}
</script>

<button on:click={handleLogout}> Logout </button>

