import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword } from '@/src/lib/auth';

// POST verify or change password
export async function POST(request: NextRequest) {
  try {
    const { password, action, newPassword } = await request.json();

    if (action === 'verify') {
      // Verify password using auth.ts function
      const isValid = await verifyAdminPassword(password);

      if (isValid) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
      }
    } else if (action === 'change') {
      // Verify current password first
      const isValid = await verifyAdminPassword(password);
      if (!isValid) {
        return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
      }

      if (!newPassword || newPassword.length < 4) {
        return NextResponse.json({ success: false, error: 'New password must be at least 4 characters' }, { status: 400 });
      }

      // Password is stored in environment variables
      // User needs to update .env.local and redeploy
      return NextResponse.json({
        success: false,
        error: 'Password must be changed in the ADMIN_PASSWORD environment variable and redeployed'
      }, { status: 400 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Password API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
