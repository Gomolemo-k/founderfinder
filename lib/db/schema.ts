--- a/lib/db/schema.ts
+++ b/lib/db/schema.ts
@@ -0,0 +1,48 @@
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
 id: serial('id').primaryKey(),
 fullName: text('full_name'),
 email: text('email').notNull().unique(),
 password: text('password').notNull(),
 createdAt: timestamp('created_at').defaultNow(),
 updatedAt: timestamp('updated_at').defaultNow(),
});

export const profiles = pgTable('profiles', {
 id: serial('id').primaryKey(),
 userId: integer('user_id')
 .notNull()
 .references(() => users.id),
 bio: text('bio'),
 skills: text('skills'),
 experience: text('experience'),
 desiredRoles: text('desired_roles'),
 createdAt: timestamp('created_at').defaultNow(),
 updatedAt: timestamp('updated_at').defaultNow(),
});

export const startupIdeas = pgTable('startup_ideas', {
 id: serial('id').primaryKey(),
 userId: integer('user_id')
 .notNull()
 .references(() => users.id),
 title: text('title').notNull(),
 description: text('description'),
 createdAt: timestamp('created_at').defaultNow(),
 updatedAt: timestamp('updated_at').defaultNow(),
});

export const roles = pgTable('roles', {
 id: serial('id').primaryKey(),
 name: text('name').notNull(),
});
