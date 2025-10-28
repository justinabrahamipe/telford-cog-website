import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// GET all pages
export async function GET(_request: NextRequest) {
  try {
    const pages = await prisma.pageContent.findMany({
      orderBy: {
        slug: 'asc',
      },
    });

    return NextResponse.json({ pages });
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
    console.log('[PAGES] Checking authentication...');
    const authenticated = await isAuthenticated();
    console.log('[PAGES] Authenticated:', authenticated);

    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug, title, content } = await request.json();
    console.log('[PAGES] Saving page:', slug);

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upsert page content
    const page = await prisma.pageContent.upsert({
      where: { slug },
      update: {
        title,
        content,
      },
      create: {
        slug,
        title,
        content,
      },
    });

    console.log('[PAGES] Page saved successfully');

    return NextResponse.json({
      success: true,
      page,
    });
  } catch (error: any) {
    console.error('[PAGES] Error saving page:', error);
    return NextResponse.json(
      { error: 'Failed to save page', details: error.message },
      { status: 500 }
    );
  }
}
