import { redirect } from "next/navigation";
import { getCachedAuthUser } from "@/lib/get-cached-user";
import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getCachedAuthUser();

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