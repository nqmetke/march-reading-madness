<script lang="ts">
	import { createAuthClient } from "better-auth/svelte";
	import { authClient } from "$lib/auth/auth-client";
	import { goto, invalidate } from "$app/navigation";

	export const { signIn, signUp, useSession, signOut } = createAuthClient();

	let email = $state("");
	let password = $state("");
	let error = $state("");
	let name = $state("");
	let referralCode = $state("");
	let formVisible = $state("Login");

	function switchView() {
		email = "";
		password = "";
		error = "";
		name = "";
		referralCode = "";

		if (formVisible == "Login") {
			formVisible = "Sign Up";
		} else {
			formVisible = "Login";
		}
	}

	async function handleLogin() {
		try {
			await authClient.signIn.email(
				{ email: email, password: password },
				{
					onSuccess: (ctx) => {
						window.location.href = "/app/dashboard";
					},
					onError: (ctx) => {
						error = ctx.error.message || "Login failed";
					},
				},
			);
		} catch (e: any) {
			error = e.message || "Login failed";
		}
	}

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
						goto("/app/dashboard");
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

<div id="component">
	<div class="form">
		{#if formVisible == "Login"}
			<form id="login" onsubmit={handleLogin}>
				<div class="formContent">
					<h1>Login</h1>
					<input
						type="email"
						bind:value={email}
						placeholder="Email"
						required
					/>
					<input
						type="password"
						bind:value={password}
						placeholder="Password"
						required
					/>
					<button type="submit">Login</button>
					<p class="error">{error}</p>
				</div>
			</form>
		{/if}
		{#if formVisible == "Sign Up"}
			<form id="signUp" onsubmit={handleSignup}>
				<div class="formContent">
					<h1>Sign Up</h1>
					<input
						type="email"
						bind:value={email}
						placeholder="Email"
						required
					/>
					<input
						type="password"
						bind:value={password}
						placeholder="Password"
						required
					/>
					<input
						type="text"
						bind:value={name}
						placeholder="Name"
						required
					/>
					<input
						type="text"
						bind:value={referralCode}
						placeholder="Referral Code"
						required
					/>
					<button type="submit">Sign Up</button>
					<p class="error">{error}</p>
				</div>
			</form>
		{/if}
	</div>
	<span>
		{#if formVisible == "Login"}
			Not a member yet?
		{:else}
			Returning Member?
		{/if}
		<button class="simple" onclick={switchView}
			>{formVisible == "Login" ? "Sign Up" : "Login"}</button
		>
	</span>
</div>

<style>
	#component {
		display: block;
		max-width: 500px;
	}
	.formContent {
		display: flex;
		flex-direction: column;
		justify-content: start;
	}
</style>
