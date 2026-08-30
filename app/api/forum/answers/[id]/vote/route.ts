import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { type } = body;

    if (!type || !["UP", "DOWN"].includes(type)) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
    }

    const answer = await prisma.forumAnswer.findUnique({
      where: { id },
      include: { author: true, post: true },
    });

    if (!answer) {
      return NextResponse.json({ error: "Answer not found" }, { status: 404 });
    }

    const existingVote = await prisma.vote.findUnique({
      where: { userId_answerId: { userId: session.user.id, answerId: id } },
    });

    if (existingVote) {
      if (existingVote.type === type) {
        await prisma.vote.delete({ where: { id: existingVote.id } });
        await prisma.forumAnswer.update({
          where: { id },
          data: { upvotes: { decrement: type === "UP" ? 1 : -1 } },
        });
      } else {
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { type },
        });
        await prisma.forumAnswer.update({
          where: { id },
          data: { upvotes: { increment: type === "UP" ? 2 : -2 } },
        });
      }
    } else {
      await prisma.vote.create({
        data: { userId: session.user.id, answerId: id, type },
      });
      await prisma.forumAnswer.update({
        where: { id },
        data: { upvotes: { increment: type === "UP" ? 1 : -1 } },
      });
    }

    const updatedAnswer = await prisma.forumAnswer.findUnique({
      where: { id },
      select: { upvotes: true },
    });

    if (type === "UP" && answer.authorId !== session.user.id) {
      await prisma.xpLog.create({
        data: {
          userId: answer.authorId,
          amount: 5,
          reason: "answer_upvoted",
          metadata: { postId: answer.postId, answerId: id },
        },
      });

      await prisma.notification.create({
        data: {
          userId: answer.authorId,
          type: "FORUM_REPLY",
          title: "Answer Upvoted",
          message: `Your answer received an upvote`,
          link: `/forum/${answer.postId}`,
        },
      });
    }

    return NextResponse.json({ upvotes: updatedAnswer?.upvotes || 0 });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}