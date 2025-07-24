import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import { getDb } from '@/lib/db/drizzle';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js, Postgres, and Stripe.',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Server-side prefetch of user and team
  const db = getDb(process.env.DB as any); // Adjust typing if needed
  const cookieStore = cookies();

  const user = await getUser(db, cookieStore);
  const team = await getTeamForUser(db, cookieStore);


  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <SWRConfig
          value={{
            fallback: {
              '/api/user': user,
              '/api/team': team,
            },
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
