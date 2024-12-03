import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('user') ? JSON.parse(request.cookies.get('user').value).token : null;

  const loginUrl = new URL('/login', request.url);
  const dashboardUrl = new URL('/', request.url);

  // console.log('token: ', token);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  // Optional: Validate the token with the backend (if needed)
  /* const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/validate-token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); */

  /* if (!response.ok) {
    return NextResponse.redirect(loginUrl);
  } */

  return NextResponse.next(); // Proceed to the requested page
}

export const config = {
  matcher: ['/', '/protected-route'], // Apply to specific routes
};
