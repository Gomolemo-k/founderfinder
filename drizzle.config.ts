import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.ts',   // keep your schema location
  out: './lib/db/migrations',     // keep your migrations folder
  dialect: 'sqlite',              // D1 uses SQLite under the hood
  driver: 'd1-http',              // Cloudflare D1 driver
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
} satisfies Config;
