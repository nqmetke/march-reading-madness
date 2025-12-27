import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";
import { date } from "drizzle-orm/pg-core";

export const book = sqliteTable("book", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	author: text("author"),
	pageCount: integer("page_count"),
});

export const book_instance = sqliteTable("book_instance", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	user: text("user_id").references(() => user.id),
	book: integer("book_id").references(() => book.id),
	format: text("format"),
	pageCount: integer("pageCount"),
	status: text("status")
});

export const reading_log = sqliteTable("reading_log", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	book_instance: integer("book_instance").references(() => book_instance.id),
	page: integer("page"),
	percentage:  integer("percentage")
});
