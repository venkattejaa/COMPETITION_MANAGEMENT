import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { ForumPostDetailClient } from "./ForumPostDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ForumPostDetailPage({ params }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const post = await prisma.forumPost.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, avatar: true, xp: true, level: true, role: true } },
      answers: {
        orderBy: [{ isBestAnswer: "desc" }, { upvotes: "desc" }, { createdAt: "asc" }],
        include: {
          author: { select: { id: true, name: true, avatar: true, xp: true, level: true, role: true } },
          votes: { where: { userId: session.user.id }, select: { type: true } },
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  await prisma.forumPost.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  return <ForumPostDetailClient post={post} currentUserId={session.user.id} />;
}