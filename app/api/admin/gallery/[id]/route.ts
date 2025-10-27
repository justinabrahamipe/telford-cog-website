import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// PUT update gallery image
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { image_url, thumbnail_url, title, description, order_index } = await request.json();

    const image = await prisma.galleryImage.update({
      where: { id: parseInt(id) },
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
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    );
  }
}

// DELETE gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.galleryImage.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
