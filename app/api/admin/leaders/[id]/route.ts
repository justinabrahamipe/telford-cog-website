import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// PUT update leader
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
    const { name, designation, description, image_url, type, order_index, facebook_url, whatsapp_url } = await request.json();

    const leader = await prisma.leader.update({
      where: { id: parseInt(id) },
      data: {
        name,
        designation,
        description: description || null,
        imageUrl: image_url || null,
        type: type || 'official',
        orderIndex: order_index || 0,
        facebookUrl: facebook_url || null,
        whatsappUrl: whatsapp_url || null,
      },
    });

    return NextResponse.json({
      success: true,
      leader,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Leader not found' },
        { status: 404 }
      );
    }
    console.error('Error updating leader:', error);
    return NextResponse.json(
      { error: 'Failed to update leader' },
      { status: 500 }
    );
  }
}

// DELETE leader
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
    await prisma.leader.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting leader:', error);
    return NextResponse.json(
      { error: 'Failed to delete leader' },
      { status: 500 }
    );
  }
}
