--- a/lib/db/schema.ts
+++ b/lib/db/schema.ts
@@ -1,5 +1,5 @@
// lib/db/schema.ts
-import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
+import { pgTable, serial, text, timestamp, jsonb, boolean, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
@@ -11,6 +11,13 @@
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripePriceId: text('stripe_price_id'),
+});
+
+export const profiles = pgTable('profiles', {
+  id: serial('id').primaryKey(),
+  userId: integer('user_id').notNull().unique(),
+  firstName: text('first_name'),
+  lastName: text('last_name'),
  stripeSubscriptionStatus: text('stripe_subscription_status'),
});

export const profiles = pgTable('profiles', {
@@ -108,7 +115,7 @@