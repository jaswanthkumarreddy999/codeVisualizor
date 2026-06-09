import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Minimal middleware — auth is handled by Spring Boot backend + JWT
// Exclude /api/* so Next.js rewrites can proxy them to the Spring Boot backend
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Exclude _next/static, _next/image, favicon, AND /api/* routes
  // /api/* must be excluded so next.config.ts rewrites can proxy to Spring Boot
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
