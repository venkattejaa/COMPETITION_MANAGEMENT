import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfileClient } from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      team: {
        include: { members: { select: { id: true, name: true, avatar: true, xp: true, level: true } } },
      },
      achievements: { include: { achievement: true }, orderBy: { earnedAt: "desc" } },
      forumPosts: { 
        take: 5, 
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { answers: true } } },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Serialize Date objects to strings for client components
  const serializedUser = {
    ...user,
    lastActive: user.lastActive.toISOString(),
    team: user.team ? {
      ...user.team,
      createdAt: user.team.createdAt.toISOString(),
      updatedAt: user.team.updatedAt.toISOString(),
      members: user.team.members,
    } : null,
    achievements: user.achievements.map(ua => ({
      ...ua,
      earnedAt: ua.earnedAt.toISOString(),
      achievement: ua.achievement,
    })),
    forumPosts: user.forumPosts.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      _count: post._count,
    })),
  };

  return <ProfileClient user={serializedUser} isOwnProfile={true} />;
}