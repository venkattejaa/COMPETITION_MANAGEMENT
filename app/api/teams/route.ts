import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateTeamCode } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Team name must be at least 2 characters" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true, branch: true },
    });

    if (existingUser?.teamId) {
      return NextResponse.json({ error: "You are already in a team" }, { status: 400 });
    }

    const branch = existingUser?.branch || "CSE";
    const code = generateTeamCode(branch);

    const team = await prisma.team.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        code,
        members: { connect: { id: session.user.id } },
      },
      include: { members: true },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId: team.id, isTeamLeader: true },
    });

    await prisma.xpLog.create({
      data: {
        userId: session.user.id,
        teamId: team.id,
        amount: 50,
        reason: "team_created",
      },
    });

    return NextResponse.json({ team });
  } catch (error) {
    console.error("Create team error:", error);
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teams = await prisma.team.findMany({
      include: {
        members: { select: { id: true, name: true, avatar: true, xp: true, level: true } },
        tasks: true,
      },
      orderBy: { totalXp: "desc" },
    });

    return NextResponse.json({ teams });
  } catch (error) {
    console.error("Get teams error:", error);
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}