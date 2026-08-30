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

    const answer = await prisma.forumAnswer.findUnique({
      where: { id },
      include: { post: true, author: true },
    });

    if (!answer) {
      return NextResponse.json({ error: "Answer not found" }, { status: 404 });
    }

    const isAuthor = answer.post.authorId === session.user.id;
    const isCoordinator = session.user.role === "COORDINATOR";

    if (!isAuthor && !isCoordinator) {
      return NextResponse.json({ error: "Only the question author or coordinators can mark best answer" }, { status: 403 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.forumAnswer.updateMany({
        where: { postId: answer.postId, isBestAnswer: true },
        data: { isBestAnswer: false },
      });

      await tx.forumAnswer.update({
        where: { id },
        data: { isBestAnswer: true },
      });

      await tx.forumPost.update({
        where: { id: answer.postId },
        data: { isSolved: true, bestAnswerId: id },
      });

      if (answer.authorId !== session.user.id) {
        await tx.xpLog.create({
          data: {
            userId: answer.authorId,
            amount: 100,
            reason: "best_answer",
            metadata: { postId: answer.postId, answerId: id },
          },
        });

        await tx.notification.create({
          data: {
            userId: answer.authorId,
            type: "BEST_ANSWER",
            title: "Best Answer!",
            message: `Your answer was marked as the best answer`,
            link: `/forum/${answer.postId}`,
          },
        });

        const achievements = await tx.achievement.findMany({
          where: { conditionType: "best_answers" },
        });

        for (const achievement of achievements) {
          const bestAnswersCount = await tx.forumAnswer.count({
            where: { authorId: answer.authorId, isBestAnswer: true, upvotes: { gte: 5 } },
          });

          if (bestAnswersCount >= achievement.conditionValue) {
            const existing = await tx.userAchievement.findUnique({
              where: { userId_achievementId: { userId: answer.authorId, achievementId: achievement.id } },
            });

            if (!existing) {
              await tx.userAchievement.create({
                data: { userId: answer.authorId, achievementId: achievement.id },
              });

              await tx.xpLog.create({
                data: {
                  userId: answer.authorId,
                  amount: achievement.xpBonus,
                  reason: "achievement_unlocked",
                  metadata: { achievementId: achievement.id },
                },
              });

              await tx.notification.create({
                data: {
                  userId: answer.authorId,
                  type: "ACHIEVEMENT_UNLOCKED",
                  title: "Achievement Unlocked!",
                  message: `You earned the "${achievement.name}" badge`,
                  link: `/profile`,
                },
              });
            }
          }
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mark best answer error:", error);
    return NextResponse.json({ error: "Failed to mark best answer" }, { status: 500 });
  }
}