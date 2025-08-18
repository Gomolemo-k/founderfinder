import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  DB: D1Database;
}

export const db = (env: Env) => drizzle(env.DB);