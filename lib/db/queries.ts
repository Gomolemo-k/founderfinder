import { desc, and, eq, isNull } from 'drizzle-orm';
import { getDb } from './drizzle'; 
import { activityLogs, teamMembers, teams, users } from './schema'; 
import { verifyToken } from '@/lib/auth/session';
import { cookies as getCookies } from 'next/headers';


export async function getUser(db: ReturnType<typeof getDb>, cookies: ReturnType<typeof getCookies>) {
  const sessionCookie = (await cookies).get('session');
  if (!sessionCookie?.value) return null;

  const sessionData = await verifyToken(sessionCookie.value);
  if (!sessionData?.user?.id || new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  return user[0] ?? null;
}

export async function getTeamByStripeCustomerId(db: ReturnType<typeof getDb>, customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result[0] ?? null;
}

export async function updateTeamSubscription(
  db: ReturnType<typeof getDb>,
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date()
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(db: ReturnType<typeof getDb>, userId: number) {
  const result = await db
    .select({
      user: users,
      team: teams
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .leftJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs(db: ReturnType<typeof getDb>, cookies: ReturnType<typeof getCookies>) {
  const user = await getUser(db, cookies);
  if (!user) throw new Error('User not authenticated');

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getTeamForUser(db: ReturnType<typeof getDb>, cookies: ReturnType<typeof getCookies>) {
  const user = await getUser(db, cookies);
  if (!user) return null;

  const result = await db.query.teamMembers.findFirst({
    where: eq(teamMembers.userId, user.id),
    with: {
      team: {
        with: {
          teamMembers: {
            with: {
              user: {
                columns: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      }
    }
  });

  return result?.team ?? null;
}
