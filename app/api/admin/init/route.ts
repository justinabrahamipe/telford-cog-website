import { NextResponse } from 'next/server';
import { sql } from '@/src/lib/db';

export async function GET() {
  try {
    // Create admin_settings table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS admin_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Insert default admin password if not exists
    await sql`
      INSERT INTO admin_settings (key, value)
      VALUES ('admin_password', 'pass')
      ON CONFLICT (key) DO NOTHING
    `;

    return NextResponse.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}
