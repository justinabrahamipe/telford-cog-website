import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/src/lib/db';

// Initialize default password if not exists
async function initializePassword() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Check if password exists
    const result = await sql`
      SELECT * FROM admin_settings
      WHERE key = 'admin_password'
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      // Create default password 'pass'
      await sql`
        INSERT INTO admin_settings (key, value)
        VALUES ('admin_password', 'pass')
      `;
    }
  } catch (error) {
    console.error('Error initializing password:', error);
    throw error;
  }
}

// POST verify password
export async function POST(request: NextRequest) {
  try {
    const { password, action, newPassword } = await request.json();

    await initializePassword();

    // Get current password
    const result = await sql`
      SELECT value FROM admin_settings
      WHERE key = 'admin_password'
      LIMIT 1
    `;

    const currentPassword = result.rows[0]?.value || 'pass';

    if (action === 'verify') {
      // Verify password
      if (password === currentPassword) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
      }
    } else if (action === 'change') {
      // Change password - verify current password first
      if (password !== currentPassword) {
        return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 401 });
      }

      if (!newPassword || newPassword.length < 4) {
        return NextResponse.json({ success: false, error: 'New password must be at least 4 characters' }, { status: 400 });
      }

      // Update password
      await sql`
        UPDATE admin_settings
        SET value = ${newPassword}
        WHERE key = 'admin_password'
      `;

      return NextResponse.json({ success: true, message: 'Password updated successfully' });
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
