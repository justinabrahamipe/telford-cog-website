import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/src/lib/db';
import { isAuthenticated } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated (optional for first-time setup)
    // const authenticated = await isAuthenticated();
    // if (!authenticated) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const result = await initDatabase();

    if (result.success) {
      return NextResponse.json({
        message: 'Database initialized successfully',
        success: true
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to initialize database', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
