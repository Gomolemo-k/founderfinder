import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  DB: D1Database;
}

// Accept env as a parameter to ensure correct type
export const getDb = (env: Env) => drizzle(env.DB);