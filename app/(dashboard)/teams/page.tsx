import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TeamsClient } from "./TeamsClient";

export default async function TeamsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { team: { include: { members: true, tasks: true } } },
  });

  const teams = await prisma.team.findMany({
    include: {
      members: { select: { id: true, name: true, avatar: true, xp: true, level: true } },
      tasks: true,
    },
    orderBy: { totalXp: "desc" },
  });

  // Serialize Date objects to strings for client components
  const serializedTeams = teams.map(team => ({
    ...team,
    createdAt: team.createdAt.toISOString(),
    updatedAt: team.updatedAt.toISOString(),
    tasks: team.tasks.map(task => ({
      ...task,
      deadline: task.deadline?.toISOString() || null,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      submittedAt: task.submittedAt?.toISOString() || null,
      completedAt: task.completedAt?.toISOString() || null,
    })),
  }));

  const serializedUserTeam = user?.team ? {
    ...user.team,
    createdAt: user.team.createdAt.toISOString(),
    updatedAt: user.team.updatedAt.toISOString(),
    tasks: user.team.tasks.map(task => ({
      ...task,
      deadline: task.deadline?.toISOString() || null,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      submittedAt: task.submittedAt?.toISOString() || null,
      completedAt: task.completedAt?.toISOString() || null,
    })),
    members: user.team.members.map(member => ({
      ...member,
      createdAt: member.createdAt.toISOString(),
      updatedAt: member.updatedAt.toISOString(),
    })),
  } : null;

  return <TeamsClient teams={serializedTeams} userTeam={serializedUserTeam} currentUserId={session.user.id} />;
}