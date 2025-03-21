import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect all routes under /staff/
  if (pathname.startsWith('/staff/')) {
    // Get cookies from request headers (Edge Runtime friendly)
    const cookies = req.headers.get('cookie') || '';
    const accessToken = cookies
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1];

    // Redirect to login if no token
    if (!accessToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

// No need for `matcher` if we handle pathname check manually
