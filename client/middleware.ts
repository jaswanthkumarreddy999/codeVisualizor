import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Minimal middleware — auth is handled by Spring Boot backend + JWT
// No server-side session checks needed; frontend uses useAuth hook
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
