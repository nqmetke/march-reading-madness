import { db } from "$lib/server/db"
import type { PageServerLoad } from "./$types";
import { referral_code } from "$lib/server/db/schema";
import { eq } from 'drizzle-orm'

export const load: PageServerLoad = async ({ locals }) => {
	const referrals = await db.select()
		.from(referral_code)
		.where(eq(locals.user.id, referral_code.createdBy))
	return {
		referrals
	};
};
