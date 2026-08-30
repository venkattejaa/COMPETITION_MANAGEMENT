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
    const { content } = body;

    if (!content || content.trim().length < 10) {
      return NextResponse.json({ error: "Answer must be at least 10 characters" }, { status: 400 });
    }

    const post = await prisma.forumPost.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const answer = await prisma.forumAnswer.create({
      data: {
        content: content.trim(),
        authorId: session.user.id,
        postId: id,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true, xp: true, level: true } },
      },
    });

    await prisma.xpLog.create({
      data: {
        userId: session.user.id,
        amount: 25,
        reason: "answer_posted",
        metadata: { postId: id, answerId: answer.id },
      },
    });

    if (post.authorId !== session.user.id) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: "FORUM_REPLY",
          title: "New Answer",
          message: `${session.user.name} answered your question`,
          link: `/forum/${id}`,
        },
      });
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Create answer error:", error);
    return NextResponse.json({ error: "Failed to create answer" }, { status: 500 });
  }
}