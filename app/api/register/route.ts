import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

const connectionString = process.env.DATABASE_URL || '';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const client = new Client({ connectionString });
  await client.connect();
  await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email TEXT UNIQUE, password TEXT)');
  try {
    await client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password]);
    await client.end();
    return NextResponse.json({ success: true });
  } catch (e: any) {
    await client.end();
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
} 