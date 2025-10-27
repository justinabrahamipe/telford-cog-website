import { NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/prisma';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: {
        orderIndex: 'asc',
      },
      select: {
        id: true,
        imageUrl: true,
        thumbnailUrl: true,
        title: true,
        description: true,
        orderIndex: true,
      },
    });

    // Map to snake_case for frontend compatibility
    const mappedImages = images.map(img => ({
      id: img.id,
      image_url: img.imageUrl,
      thumbnail_url: img.thumbnailUrl,
      title: img.title,
      description: img.description,
      order_index: img.orderIndex,
    }));

    return NextResponse.json({
      success: true,
      images: mappedImages,
    });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
