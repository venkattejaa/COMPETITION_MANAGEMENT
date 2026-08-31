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
      select: { role: true },
    });

    if (user?.role !== "COORDINATOR") {
      return NextResponse.json({ error: "Access denied. Admin rights required." }, { status: 403 });
    }

    const { teamId, themeCode } = await req.json();
    if (!teamId || !themeCode) {
      return NextResponse.json({ error: "Missing teamId or themeCode" }, { status: 400 });
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: { assignedTheme: themeCode },
    });

    return NextResponse.json({ success: true, team: updatedTeam });
  } catch (error) {
    console.error("Assign theme error:", error);
    return NextResponse.json({ error: "Failed to assign theme" }, { status: 500 });
  }
}
