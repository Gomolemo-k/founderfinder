import { getUser } from '@/lib/db/queries';
import { getDb } from '@/lib/db/drizzle';
import { cookies } from 'next/headers';

export const runtime = 'nodejs'; 

export async function GET() {
  const db = getDb(process.env.DB as unknown as D1Database); 
  const user = await getUser(db, cookies());
  return Response.json(user ?? {});
}
