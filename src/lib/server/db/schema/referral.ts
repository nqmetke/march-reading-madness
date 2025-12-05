import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const referral_code = sqliteTable("referral_code", {
	id: integer("id").primaryKey({ autoIncrement:true }),
	code: text("code").notNull(),
	used: integer({ mode: "boolean" }).default(false),
	createdBy: text("created_by")
		.references(() => user.id),
	usedBy: text("used_by")
		.references(() => user.id)
});
