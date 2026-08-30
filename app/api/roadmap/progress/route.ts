import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { nodeId, action } = await req.json();

    if (!nodeId || !action) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    if (!session.user.teamId) {
      return NextResponse.json({ error: "User is not in a team" }, { status: 400 });
    }

    // In a real application, we would check if the node is already completed.
    // For this MVP, we will just record the progress log.
    const progressLog = await prisma.progressLog.create({
      data: {
        userId: session.user.id,
        teamId: session.user.teamId,
        action: action, // e.g. "completed_node"
        details: { nodeId },
        xpEarned: 150, // Arbitrary gamification XP
      }
    });

    // Also update team total XP and user XP
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xp: { increment: 150 } }
    });

    await prisma.team.update({
      where: { id: session.user.teamId },
      data: { 
        totalXp: { increment: 150 },
        // Roughly update progress percent based on completed items in MVP
        progressPercent: { increment: 5 } 
      }
    });

    return NextResponse.json({ success: true, log: progressLog });
  } catch (error: any) {
    console.error("Roadmap progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
