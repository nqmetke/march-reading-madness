
import { relations } from "drizzle-orm";
import {user} from "./auth-schema"
import { referral_code } from "./referral";

export const userRelations = relations(user, ({ many, one }) => ({
	recieved_code: one(referral_code, {
		fields: [user.referralCode],
		references: [referral_code.id],
	}),
	generated_code: many(referral_code)
}));

export const referralRelations = relations(referral_code, ({ one }) => ({
  createdByUser: one(user, {
    fields: [referral_code.createdBy],
    references: [user.id],
  }),
  usedByUser: one(user, {
    fields: [referral_code.usedBy],
    references: [user.id],
  }),
}));