import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/src/lib/db';
import { isAuthenticated } from '@/src/lib/auth';

// GET all gallery images
export async function GET(request: NextRequest) {
  try {
    const result = await sql`
      SELECT * FROM gallery_images
      ORDER BY order_index, created_at DESC
    `;

    return NextResponse.json({ images: result.rows });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

// POST create gallery image
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { image_url, thumbnail_url, title, description, order_index } = await request.json();

    if (!image_url) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO gallery_images (image_url, thumbnail_url, title, description, order_index)
      VALUES (${image_url}, ${thumbnail_url || null}, ${title || ''}, ${description || ''}, ${order_index || 0})
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      image: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}
