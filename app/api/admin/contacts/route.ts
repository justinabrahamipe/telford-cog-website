import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// GET all contacts
export async function GET(_request: NextRequest) {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: [
        { orderIndex: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST create contact
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, details, icon_type, action_url, color_theme, order_index } = await request.json();

    if (!title || !details || !action_url) {
      return NextResponse.json(
        { error: 'Title, details, and action URL are required' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        title,
        description: description || null,
        details,
        iconType: icon_type || 'email',
        actionUrl: action_url,
        colorTheme: color_theme || 'primary',
        orderIndex: order_index || 0,
      },
    });

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
