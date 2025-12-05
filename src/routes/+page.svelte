<script lang="ts">
	import Login from "../components/auth/Login.svelte";
</script>

<h1>March Reading Madness</h1>
<div class="login">
	<Login />
</div>

<style>
	h1 {
		text-align: center;
		font-size: 54px;
	}
	.login {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}
</style>
