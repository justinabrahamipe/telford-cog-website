import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/src/lib/db';
import { isAuthenticated } from '@/src/lib/auth';

// GET all sermons
export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT * FROM sermons
      ORDER BY date DESC, created_at DESC
    `;

    return NextResponse.json({ sermons: result.rows });
  } catch (error) {
    console.error('Error fetching sermons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sermons' },
      { status: 500 }
    );
  }
}

// POST create sermon
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, preacher, date, video_url, description, thumbnail_url } = await request.json();

    if (!title || !date) {
      return NextResponse.json(
        { error: 'Title and date are required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO sermons (title, preacher, date, video_url, description, thumbnail_url)
      VALUES (${title}, ${preacher || ''}, ${date}, ${video_url || ''}, ${description || ''}, ${thumbnail_url || ''})
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      sermon: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating sermon:', error);
    return NextResponse.json(
      { error: 'Failed to create sermon' },
      { status: 500 }
    );
  }
}
