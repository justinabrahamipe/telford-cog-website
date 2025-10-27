import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Verify database connectivity by running a simple query
    // With Prisma, migrations handle table creation
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      message: 'Database is accessible and ready',
      success: true
    });
  } catch (error) {
    console.error('Database connectivity error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database', details: error },
      { status: 500 }
    );
  }
}
