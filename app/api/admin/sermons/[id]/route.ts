import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// PUT update sermon
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
    const { title, preacher, date, video_url, description, thumbnail_url } = await request.json();

    const sermon = await prisma.sermon.update({
      where: { id: parseInt(id) },
      data: {
        title,
        preacher: preacher || '',
        date: new Date(date),
        videoUrl: video_url || '',
        description: description || '',
        thumbnailUrl: thumbnail_url || '',
      },
    });

    return NextResponse.json({
      success: true,
      sermon,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Sermon not found' },
        { status: 404 }
      );
    }
    console.error('Error updating sermon:', error);
    return NextResponse.json(
      { error: 'Failed to update sermon' },
      { status: 500 }
    );
  }
}

// DELETE sermon
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
    await prisma.sermon.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting sermon:', error);
    return NextResponse.json(
      { error: 'Failed to delete sermon' },
      { status: 500 }
    );
  }
}
