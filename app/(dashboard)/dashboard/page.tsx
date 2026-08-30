import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      team: {
        include: {
          members: {
            select: { id: true, name: true, avatar: true, xp: true, level: true },
          },
          tasks: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Serialize Date objects to strings for client components
  const serializedUser = {
    ...user,
    team: user.team
      ? {
          ...user.team,
          tasks: user.team.tasks.map((task) => ({
            ...task,
            deadline: task.deadline?.toISOString() || null,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString(),
            submittedAt: task.submittedAt?.toISOString() || null,
            completedAt: task.completedAt?.toISOString() || null,
          })),
        }
      : null,
  };

  return <DashboardClient user={serializedUser} />;
}