<script lang="ts">
	import { createAuthClient } from "better-auth/svelte";
	import { authClient } from "$lib/auth/auth-client";
	import { goto } from "$app/navigation";

	export const { signIn, signUp, useSession, signOut } = createAuthClient();
	let email = $state("");
	let password = $state("");
	let name = $state("");
	let referralCode = $state("");
	let error = $state("");

	async function handleSignup() {
		try {
			await authClient.signUp.email(
				{
					email,
					password,
					name,
					referralCode,
				},
				{
					onSuccess: (_) => {
						// optional callback
						goto("/dashboard");
					},
					onError: (ctx) => {
						error = ctx.error.message || "Sign Up failed";
					},
				},
			);
			// Redirect on success
		} catch (e: any) {
			error = e.message || "Sign Up failed";
		}
	}
</script>

<for onsubmit={handleSignup}>
	<h1>Sign Up</h1>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input
		type="password"
		bind:value={password}
		placeholder="Password"
		required
	/>
	<input type="text" bind:value={name} placeholder="Name" required />
	<input
		type="text"
		bind:value={referralCode}
		placeholder="Referral Code"
		required
	/>
	<button type="submit">Sign Up</button>
	<p class="error">{error}</p>
</form>

