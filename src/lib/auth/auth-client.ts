import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";
import type { auth } from "$lib/auth/auth-server";
import { redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';

export const requireLogin = () => {
	const { locals, url } = getRequestEvent();
	if (!locals.user) {
		const redirectTo = url.pathname + url.search;
		const params = new URLSearchParams({ redirectTo });

		redirect(307, `/?${params}`);
	}

	return locals.user;
};
export const authClient = createAuthClient({
	plugins: [
		inferAdditionalFields<typeof auth>(),
	],
});

