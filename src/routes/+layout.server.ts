
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('layout:load');
	const userSession = locals.user ? {
		isLoggedIn: true,
		user: locals.user,
	} : {
		isLoggedIn: false
	};

	return {
		session: userSession
	};
};
