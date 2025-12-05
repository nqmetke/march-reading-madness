<!-- 
    I want this to get the get the user id from props, get all their generated referral codes
and display them in a list with the code, the day generated, and either a "Not used" field, or
the name of the person who used it.
-->

<script lang="ts">
	import { onMount } from "svelte";

	let { user_id } = $props();
	let referrals: any[] = $state([]);

	async function handleClick() {
		const response = await fetch(`/api/user/${user_id}/referrals`, {
			method: "PUT",
		});

		let res = await response.json();
		console.log(res.code);
		const full_list = await fetch(`/api/user/${user_id}/referrals`);
		referrals = await full_list.json();
	}

	async function deleteCode(referral_id: number) {
		await fetch(`/api/user/${user_id}/referrals/${referral_id}`, {
			method: "DELETE",
		});
		const full_list = await fetch(`/api/user/${user_id}/referrals`);
		referrals = await full_list.json();
	}

	onMount(async () => {
		const response = await fetch(`/api/user/${user_id}/referrals`);
		referrals = await response.json();
	});
</script>

<div>
	<button onclick={handleClick}> Generate Code </button>
	<table class="referral-list">
		<thead>
			<tr>
				<th scope="col">Referral Code</th>
				<th scope="col">Status</th>
				<th scope="col">Used By</th>
			</tr>
		</thead>
		<tbody>
			{#each referrals as referral}
				<tr>
					<td>{referral["code"]}</td>
					<td>
						{#if referral["used"]}
							Used
						{:else}
							Pending
						{/if}
					</td>
					<td>
						{#if referral["usedByUser"] != null}
							{referral["usedByUser"].name}
						{/if}
					</td>
					{#if !referral["usedByUser"]}
						<td>
							<button
								onclick={() => {
									deleteCode(referral["id"]);
								}}>Delete</button
							>
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
</style>
