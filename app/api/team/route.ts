import { getTeamForUser } from '@/lib/db/queries';
import { getDb } from '@/lib/db/drizzle';
import { cookies } from 'next/headers';

export async function GET() {
  const db = getDb(process.env.DB as unknown as D1Database);
  const team = await getTeamForUser(db, cookies());
  return Response.json(team);
}