import { redirect } from "next/navigation";
import { getCachedAuthUser } from "@/lib/get-cached-user";
import { prisma } from "@/lib/prisma";
import { TeamsClient } from "./TeamsClient";

export default async function TeamsPage() {
  const [user, teams] = await Promise.all([
    getCachedAuthUser(),
    prisma.team.findMany({
      include: {
        members: { select: { id: true, name: true, avatar: true, xp: true, level: true } },
        tasks: true,
      },
      orderBy: { totalXp: "desc" },
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  // Serialize Date objects to strings for client components
  const serializedTeams = teams.map((team) => ({
    ...team,
    createdAt: team.createdAt.toISOString(),
    updatedAt: team.updatedAt.toISOString(),
    tasks: team.tasks.map((task) => ({
      ...task,
      deadline: task.deadline?.toISOString() || null,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      submittedAt: task.submittedAt?.toISOString() || null,
      completedAt: task.completedAt?.toISOString() || null,
    })),
  }));

  const serializedUserTeam = user?.team
    ? {
        ...user.team,
        createdAt: user.team.createdAt.toISOString(),
        updatedAt: user.team.updatedAt.toISOString(),
        tasks: user.team.tasks.map((task) => ({
          ...task,
          deadline: task.deadline?.toISOString() || null,
          createdAt: task.createdAt.toISOString(),
          updatedAt: task.updatedAt.toISOString(),
          submittedAt: task.submittedAt?.toISOString() || null,
          completedAt: task.completedAt?.toISOString() || null,
        })),
        members: user.team.members.map((member) => ({
          ...member,
        })),
      }
    : null;

  return <TeamsClient teams={serializedTeams} userTeam={serializedUserTeam} currentUserId={user.id} />;
}