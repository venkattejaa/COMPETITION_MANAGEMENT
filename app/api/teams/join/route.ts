import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Team code is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true },
    });

    if (existingUser?.teamId) {
      return NextResponse.json({ error: "You are already in a team" }, { status: 400 });
    }

    const team = await prisma.team.findUnique({
      where: { code: code.toUpperCase() },
      include: { members: true },
    });

    if (!team) {
      return NextResponse.json({ error: "Invalid team code" }, { status: 404 });
    }

    if (team.members.length >= 4) {
      return NextResponse.json({ error: "Team is full (max 4 members)" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId: team.id, isTeamLeader: false },
    });

    await prisma.xpLog.create({
      data: {
        userId: session.user.id,
        teamId: team.id,
        amount: 50,
        reason: "team_joined",
      },
    });

    await prisma.notification.create({
      data: {
        userId: team.members.find((m) => m.isTeamLeader)?.id || team.members[0].id,
        type: "TEAM_INVITE",
        title: "New Team Member",
        message: `${session.user.name} joined your team!`,
        link: `/teams/${team.id}`,
      },
    });

    return NextResponse.json({ team });
  } catch (error) {
    console.error("Join team error:", error);
    return NextResponse.json({ error: "Failed to join team" }, { status: 500 });
  }
}