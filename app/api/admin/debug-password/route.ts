import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    // Check if admin_settings table exists and has password
    const setting = await prisma.adminSettings.findUnique({
      where: { key: 'admin_password' },
    });

    if (setting) {
      return NextResponse.json({
        success: true,
        message: 'Password found in database',
        hasPassword: true,
        passwordLength: setting.value.length,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'admin_settings table exists but no password entry',
        hasPassword: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      message: 'Error checking database',
    });
  }
}

// POST to manually insert password if needed
export async function POST() {
  try {
    await prisma.adminSettings.upsert({
      where: { key: 'admin_password' },
      update: { value: 'pass' },
      create: { key: 'admin_password', value: 'pass' },
    });

    return NextResponse.json({
      success: true,
      message: 'Password inserted/updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
    });
  }
}
