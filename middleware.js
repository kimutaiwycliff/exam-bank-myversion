// middleware.js
import { NextResponse } from 'next/server';
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow access to the root route
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Get the access token from cookies or localStorage (if stored there)
  const accessToken = req.cookies.get('accessToken')?.value;

  // If no access token or token is invalid, redirect to login
  if (!accessToken) {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the token is valid, allow the request to proceed
  return NextResponse.next();
}

// Define which routes to apply the middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - / (root route)
     * - /login (login page)
     * - /_next/ (Next.js internals)
     * - /api/auth (authentication API routes, if any)
     * - /favicon.ico (favicon file)
     */
    '/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
