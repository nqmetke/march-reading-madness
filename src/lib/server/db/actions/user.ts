import { json } from '@sveltejs/kit';
import { db } from "..";
import {user, referral_code} from "../schema";
import { eq } from 'drizzle-orm';

export async function getUser (user_id: string) {
    const result = await db
            .select()
            .from(user)
            .where(eq(user.id, user_id));
    
    return json(result[0] ?? null);
};

export async function getUserReferrals(user_id: string) {
    const generatedCodes = await db.query.referral_code.findMany({
    where: eq(referral_code.createdBy, user_id),
    with: {
        usedByUser: {
            columns: {
                name: true,
            }
        }
    }
    });
    return json(generatedCodes ?? null);
}

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