import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/src/lib/db';
import { isAuthenticated } from '@/src/lib/auth';

// GET all pages
export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT * FROM pages
      ORDER BY slug
    `;

    return NextResponse.json({ pages: result.rows });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

// POST create/update page
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug, title, content } = await request.json();

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upsert page content
    const result = await sql`
      INSERT INTO pages (slug, title, content, updated_at)
      VALUES (${slug}, ${title}, ${JSON.stringify(content)}, NOW())
      ON CONFLICT (slug)
      DO UPDATE SET
        title = ${title},
        content = ${JSON.stringify(content)},
        updated_at = NOW()
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      page: result.rows[0],
    });
  } catch (error) {
    console.error('Error saving page:', error);
    return NextResponse.json(
      { error: 'Failed to save page' },
      { status: 500 }
    );
  }
}
