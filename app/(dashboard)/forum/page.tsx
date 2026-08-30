import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ForumClient } from "./ForumClient";

export default async function ForumPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const posts = await prisma.forumPost.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, name: true, avatar: true, xp: true, level: true } },
      answers: {
        take: 1,
        orderBy: { createdAt: "desc" },
        include: { author: { select: { id: true, name: true, avatar: true } } },
      },
      _count: { select: { answers: true } },
    },
  });

  const themes = await prisma.theme.findMany({
    select: { code: true, name: true },
    orderBy: { code: "asc" },
  });

  // Convert Date objects to strings for client components
  const serializedPosts = posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    answers: post.answers.map(answer => ({
      ...answer,
      createdAt: answer.createdAt.toISOString(),
      updatedAt: answer.updatedAt.toISOString(),
    })),
  }));

  return <ForumClient posts={serializedPosts} themes={themes} userId={session.user.id} />;
}