import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";
import { db } from "../server/db/index.ts";
import { referral_code } from "../server/db/schema/referral.ts";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	plugins: [
		sveltekitCookies(getRequestEvent)
	],
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			referralCode: {
				type: "string",
				required: true,      // make it required for signup
				input: true,
				returned: true,       // allow user to provide it
			},
		}
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user, ctx) => {
					const referral = (user as { referralCode?: unknown }).referralCode;

					if (typeof referral !== "string") {
						throw new APIError("BAD_REQUEST", { message: "Invalid referral code type." });
					}

					if (!referral) {
						throw new APIError("BAD_REQUEST", {
							message: "Referral code required.",
						});
					}

					const found = await db
						.select()
						.from(referral_code)
						.where(eq(referral_code.code, referral));
					if (found.length === 0) {
						throw new APIError("BAD_REQUEST", {
							message: "Invalid referral code.",
						});
					}

					if (found[0].used) {
						throw new APIError("BAD_REQUEST", {
							message: "Referral code already used",
						});
					}

					(user as any).referralCode = found[0].id;

					await db
						.update(referral_code)
						.set({ used: true })
						.where(eq(referral_code.id, found[0].id));
					console.log(user.id)

				},
				after: async (user, context) => {
					console.log(user)
					await db
						.update(referral_code)
						.set({ usedBy: user.id })
						.where(eq(referral_code.id, (user as any).referralCode));
				},
			}
		}
	}
});
