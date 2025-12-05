<script lang="ts">
	import type { PageProps } from "./$types";
	import Logout from "../../../components/auth/Logout.svelte";
	import ReferralCodes from "../../../components/auth/ReferralCodes.svelte";
	let { data }: PageProps = $props();
</script>

<h1>Hello, {data.session.user.name}</h1>
<ReferralCodes user_id={data.session.user.id} />
<Logout />
