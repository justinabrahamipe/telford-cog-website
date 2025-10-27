import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, createAdminSession } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('[LOGIN] Login attempt started');
    const { password } = await request.json();

    if (!password) {
      console.log('[LOGIN] No password provided');
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Verify password
    console.log('[LOGIN] Verifying password...');
    const isValid = await verifyAdminPassword(password);
    console.log('[LOGIN] Password valid:', isValid);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create session
    console.log('[LOGIN] Creating session...');
    const sessionToken = await createAdminSession();
    console.log('[LOGIN] Session created:', sessionToken.substring(0, 10) + '...');

    // Set cookie
    const response = NextResponse.json({ success: true });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    };
    console.log('[LOGIN] Setting cookie with options:', cookieOptions);
    response.cookies.set('admin_session', sessionToken, cookieOptions);

    console.log('[LOGIN] Login successful');
    return response;
  } catch (error) {
    console.error('[LOGIN] Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
