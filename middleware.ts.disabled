import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';

const protectedRoutes = '/dashboard';

// Helper function to safely create URLs
function createSafeUrl(path: string, baseUrl: string | URL): URL | null {
  try {
    return new URL(path, baseUrl);
  } catch (error) {
    console.error('Invalid URL construction:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const isProtectedRoute = pathname.startsWith(protectedRoutes);

  // Safe URL creation for redirects
  const safeRedirectUrl = createSafeUrl('/sign-in', request.url);
  
  if (isProtectedRoute && !sessionCookie) {
    if (!safeRedirectUrl) {
      // Fallback: create a basic response instead of redirect
      return new NextResponse('Authentication required', { status: 401 });
    }
    return NextResponse.redirect(safeRedirectUrl);
  }

  let res = NextResponse.next();

  if (sessionCookie && request.method === 'GET') {
    try {
      const parsed = await verifyToken(sessionCookie.value);
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookies.set({
        name: 'session',
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString()
        }),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresInOneDay
      });
    } catch (error) {
      console.error('Error updating session:', error);
      res.cookies.delete('session');
      if (isProtectedRoute) {
        if (!safeRedirectUrl) {
          return new NextResponse('Authentication required', { status: 401 });
        }
        return NextResponse.redirect(safeRedirectUrl);
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs'
};