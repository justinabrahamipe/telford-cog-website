import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

// GET all leaders
export async function GET(_request: NextRequest) {
  try {
    const leaders = await prisma.leader.findMany({
      orderBy: [
        { orderIndex: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({ leaders });
  } catch (error) {
    console.error('Error fetching leaders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaders' },
      { status: 500 }
    );
  }
}

// POST create leader
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, designation, description, image_url, type, order_index, facebook_url, whatsapp_url } = await request.json();

    if (!name || !designation) {
      return NextResponse.json(
        { error: 'Name and designation are required' },
        { status: 400 }
      );
    }

    const leader = await prisma.leader.create({
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
  } catch (error) {
    console.error('Error creating leader:', error);
    return NextResponse.json(
      { error: 'Failed to create leader' },
      { status: 500 }
    );
  }
}
