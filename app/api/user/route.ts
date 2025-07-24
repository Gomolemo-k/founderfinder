import { getUser } from '@/lib/db/queries';
import { getDb } from '@/lib/db/drizzle';
import { cookies } from 'next/headers';

export const runtime = 'edge'; 

export async function GET(_: Request, context: { env: { DB: D1Database } }) {
  const db = getDb(context.env.DB);
  const user = await getUser(db, cookies());
  return Response.json(user ?? {});
}
