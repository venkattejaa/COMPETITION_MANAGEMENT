import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email, teamCode } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Find or create Team Captain user in database
    let user = await prisma.user.findUnique({
      where: { email },
      include: { team: true },
    });

    if (!user) {
      // Create team if doesn't exist
      const team = await prisma.team.upsert({
        where: { code: teamCode || 'EYRC-2026-01' },
        update: {},
        create: {
          name: 'Alpha Robotics Lab',
          code: teamCode || 'EYRC-2026-01',
          assignedTheme: 'LQ',
          totalXp: 2450,
          progressPercent: 45,
        },
      });

      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0].toUpperCase(),
          role: 'TEAM_LEADER',
          isTeamLeader: true,
          teamId: team.id,
          xp: 850,
        },
        include: { team: true },
      });
    }

    const response = NextResponse.json({ success: true, user });
    
    // Set a simple auth cookie
    response.cookies.set('eyrc_user_session', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      teamId: user.teamId,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
