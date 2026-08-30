import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LeaderboardClient } from "./LeaderboardClient";

export default async function LeaderboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [teams, users] = await Promise.all([
    prisma.team.findMany({
      orderBy: { totalXp: "desc" },
      take: 50,
      include: {
        members: { select: { id: true, name: true, avatar: true, xp: true, level: true } },
      },
    }),
    prisma.user.findMany({
      orderBy: { xp: "desc" },
      take: 50,
      select: { id: true, name: true, avatar: true, xp: true, level: true, team: { select: { name: true, code: true } } },
    }),
  ]);

  return <LeaderboardClient teams={teams} users={users} currentUserId={session.user.id} />;
}