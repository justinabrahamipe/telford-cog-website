import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/src/lib/auth';

export async function GET(_request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();

    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
