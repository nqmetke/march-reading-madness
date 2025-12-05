import { db } from "..";
import { referral_code } from "../schema";
import { eq } from 'drizzle-orm';

export async function generateReferralCode(user_id: string) {
	const referralCodeSize = 8;
	const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
	var result = ""
	for (let i = 0; i < referralCodeSize; i++) {
		result += charset[randomInt(0, charset.length - 1)]
	}
	await db.insert(referral_code).values({

		code: result,
		createdBy: user_id
	});
	return result
}

export async function deleteReferralCode(referral_id: number) {
	let to_delete = await db.select()
		.from(referral_code)
		.where(eq(referral_code.id, referral_id))
	if (!to_delete[0].used) {
		await db.delete(referral_code)
			.where(eq(referral_code.id, referral_id));
		return true
	}
	else {
		return false
	}
}
