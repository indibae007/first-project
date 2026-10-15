import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  company: text("company").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  topic: text("topic").notNull(),
  message: text("message").notNull().default(""),
  status: text("status").notNull().default("신규"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
