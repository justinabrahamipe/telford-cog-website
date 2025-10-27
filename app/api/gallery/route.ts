import { NextResponse } from 'next/server';
import { sql } from '../../../src/lib/db';

export async function GET() {
  try {
    const result = await sql`
      SELECT id, image_url, thumbnail_url, title, description, order_index
      FROM gallery_images
      ORDER BY order_index ASC
    `;

    return NextResponse.json({
      success: true,
      images: result.rows,
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
