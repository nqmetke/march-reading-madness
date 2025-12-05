import type { LayoutServerLoad } from "./$types";
import { requireLogin } from "$lib/auth/auth-client";

export const load: LayoutServerLoad = async () => {
	const current_user = requireLogin();

	return {
		user: current_user
	};
};
