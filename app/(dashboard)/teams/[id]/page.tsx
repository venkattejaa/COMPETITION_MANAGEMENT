import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { TeamDetailClient } from "./TeamDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TeamDetailPage({ params }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      members: { select: { id: true, name: true, avatar: true, xp: true, level: true, streakDays: true, githubUrl: true, linkedinUrl: true, skills: true } },
      tasks: { orderBy: { taskNumber: "asc" } },
    },
  });

  if (!team) {
    notFound();
  }

  // Serialize Date objects to strings for client components
  const serializedTeam = {
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
    members: team.members.map(member => ({
      ...member,
      lastActive: new Date().toISOString(), // Not in select, adding placeholder
    })),
  };

  const isMember = team.members.some((m) => m.id === session.user.id);
  const isLeader = team.members.some((m) => m.id === session.user.id && m.id === team.members[0]?.id); // Simplified

  return <TeamDetailClient team={serializedTeam} isMember={isMember} isLeader={isLeader} currentUserId={session.user.id} />;
}