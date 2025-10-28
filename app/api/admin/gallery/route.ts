import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// GET all gallery images
export async function GET(_request: NextRequest) {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: [
        { orderIndex: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ images });
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

    const image = await prisma.galleryImage.create({
      data: {
        imageUrl: image_url,
        thumbnailUrl: thumbnail_url || null,
        title: title || '',
        description: description || '',
        orderIndex: order_index || 0,
      },
    });

    return NextResponse.json({
      success: true,
      image,
    });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}
