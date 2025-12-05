import { db } from "$lib/server/db"
import type { PageServerLoad } from "./$types";
import { referral_code } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm'
import { requireLogin } from "$lib/auth/auth-client";

export const load: PageServerLoad = async () => {
	const current_user = requireLogin();
	const referrals = await db.select()
		.from(referral_code)
		.where(eq(current_user.id, referral_code.createdBy))

	return {
		referrals
	};
};
