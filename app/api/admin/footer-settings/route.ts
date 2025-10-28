import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all footer settings
export async function GET() {
  try {
    const settings = await prisma.footerSettings.findMany({
      orderBy: { key: 'asc' },
    });

    // Convert array to object for easier access
    const settingsObj = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer settings' },
      { status: 500 }
    );
  }
}

// PUT: Update footer settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updates = Object.entries(body);

    // Update each setting
    for (const [key, value] of updates) {
      await prisma.footerSettings.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating footer settings:', error);
    return NextResponse.json(
      { error: 'Failed to update footer settings' },
      { status: 500 }
    );
  }
}
