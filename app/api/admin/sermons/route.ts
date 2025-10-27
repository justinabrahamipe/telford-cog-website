import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// GET all sermons
export async function GET(request: NextRequest) {
  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: [
        { date: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ sermons });
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

    const sermon = await prisma.sermon.create({
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
  } catch (error) {
    console.error('Error creating sermon:', error);
    return NextResponse.json(
      { error: 'Failed to create sermon' },
      { status: 500 }
    );
  }
}
