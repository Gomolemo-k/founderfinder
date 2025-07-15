--- a/lib/db/schema.ts
+++ b/lib/db/schema.ts
@@ -0,0 +1,48 @@
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
 id: serial('id').primaryKey(),
 fullName: text('full_name'),
 email: text('email').notNull().unique(),
 image: text('image'),
 createdAt: timestamp('created_at').defaultNow(),
 updatedAt: timestamp('updated_at').defaultNow(),
});

export const skills = pgTable('skills', {
 id: serial('id').primaryKey(),
 name: text('name').notNull().unique(),
 createdAt: timestamp('created_at').defaultNow(),
 updatedAt: timestamp('updated_at').defaultNow(),
});

export const userSkills = pgTable('user_skills', {
 userId: integer('user_id').notNull().references(() => users.id),
 skillId: integer('skill_id').notNull().references(() => skills.id),
});

export const startupIdeas = pgTable('startup_ideas', {
 id: serial('id').primaryKey(),
 userId: integer('user_id').notNull().references(() => users.id),
 title: text('title').notNull(),
 description: text('description'),
 createdAt: timestamp('created_at').defaultNow(),
 updatedAt: timestamp('updated_at').defaultNow(),
});
