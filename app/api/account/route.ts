import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) {
    return NextResponse.json({ email: null });
  }
  // В вашей логике session = email
  return NextResponse.json({ email: sessionCookie.value });
} 