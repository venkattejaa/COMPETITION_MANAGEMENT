import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, year, branch, githubUrl, linkedinUrl, skills } = body;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name?.trim(),
        year: year ? parseInt(year) : null,
        branch: branch?.trim() || null,
        githubUrl: githubUrl?.trim() || null,
        linkedinUrl: linkedinUrl?.trim() || null,
        skills: Array.isArray(skills) ? skills : (skills ? skills.split(",").map((s: string) => s.trim()).filter(Boolean) : []),
      },
      select: { id: true, name: true, email: true, year: true, branch: true, githubUrl: true, linkedinUrl: true, skills: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        year: true,
        branch: true,
        githubUrl: true,
        linkedinUrl: true,
        skills: true,
        xp: true,
        level: true,
        streakDays: true,
        lastActive: true,
        teamId: true,
        isTeamLeader: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}