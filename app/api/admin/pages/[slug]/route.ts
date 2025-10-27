import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// GET single page by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log('[PAGES] Fetching page:', slug);

    const page = await prisma.pageContent.findUnique({
      where: { slug },
    });

    console.log('[PAGES] Page found:', !!page);

    if (!page) {
      // Return empty content if page doesn't exist yet
      return NextResponse.json({
        page: {
          slug,
          title: '',
          content: {},
        }
      });
    }

    return NextResponse.json({ page });
  } catch (error: any) {
    console.error('[PAGES] Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;
    await prisma.pageContent.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    );
  }
}
