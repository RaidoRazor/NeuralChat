import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';
import { cookies } from 'next/headers';

const connectionString = process.env.DATABASE_URL || '';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    await client.end();
    if (result.rows.length > 0) {
      // Set a simple session cookie
      const cookieStore = await cookies();
      cookieStore.set('session', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 // 24 hours
      });
      
      return NextResponse.json({ success: true, email });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (e: any) {
    await client.end();
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
} 