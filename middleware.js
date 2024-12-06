import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('user') ? JSON.parse(request.cookies.get('user').value).token : null;

  const loginUrl = new URL('/login', request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/pos', '/products', '/products/create']
};
