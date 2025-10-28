import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// PUT update contact
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
    const { title, description, details, icon_type, action_url, color_theme, order_index } = await request.json();

    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
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
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE contact
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
    await prisma.contact.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
