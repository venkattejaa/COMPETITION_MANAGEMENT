import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const themes = await prisma.theme.findMany({
      orderBy: { code: 'asc' },
    });
    return NextResponse.json({ success: true, themes });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch themes' },
      { status: 500 }
    );
  }
}
