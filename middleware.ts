import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // 1. If not logged in, they can access landing (/) and visualizer (guest mode)
  if (!session) {
    return NextResponse.next();
  }

  // 2. If logged in but profile is not complete, redirect to onboarding
  // Except for the onboarding page itself and the profile API
  const isProfileComplete = (session.user as any).isProfileComplete;
  
  if (!isProfileComplete && 
      pathname !== '/onboarding' && 
      !pathname.startsWith('/api/user/profile') &&
      !pathname.startsWith('/api/auth') &&
      pathname !== '/' // Allow link to logout or see landing
  ) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // 3. Prevent going back to onboarding if already complete
  if (isProfileComplete && pathname === '/onboarding') {
    return NextResponse.redirect(new URL('/visualizer', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
