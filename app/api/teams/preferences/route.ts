import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true, isTeamLeader: true },
    });

    if (!user?.teamId) {
      return NextResponse.json({ error: "You must belong to a team to submit theme preferences" }, { status: 400 });
    }

    const body = await req.json();
    const { preferredTheme1, preferredTheme2 } = body;

    if (!preferredTheme1 || !preferredTheme2) {
      return NextResponse.json({ error: "Please select 2 distinct theme preferences" }, { status: 400 });
    }

    if (preferredTheme1 === preferredTheme2) {
      return NextResponse.json({ error: "Preference 1 and Preference 2 must be different themes" }, { status: 400 });
    }

    const team = await prisma.team.update({
      where: { id: user.teamId },
      data: {
        preferredTheme1,
        preferredTheme2,
        assignedTheme: preferredTheme1,
      },
    });

    return NextResponse.json({ team });
  } catch (error) {
    console.error("Save theme preferences error:", error);
    return NextResponse.json({ error: "Failed to save theme preferences" }, { status: 500 });
  }
}
