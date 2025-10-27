import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdminSession, deleteAdminSession } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = await getCurrentAdminSession();

    if (sessionToken) {
      await deleteAdminSession(sessionToken);
    }

    // Clear cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
