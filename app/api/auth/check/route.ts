import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false });
  }

  // Here you would typically verify the session token
  // For now, we'll just check if the cookie exists
  return NextResponse.json({ authenticated: true });
} 