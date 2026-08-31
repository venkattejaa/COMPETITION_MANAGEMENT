import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "COORDINATOR") {
    redirect("/dashboard");
  }

  const teams = await prisma.team.findMany({
    include: {
      members: {
        select: { id: true, name: true, email: true, role: true, isTeamLeader: true },
      },
    },
    orderBy: { code: "asc" },
  });

  const themes = await prisma.theme.findMany({
    select: { code: true, name: true },
    orderBy: { code: "asc" },
  });

  return <AdminDashboardClient teams={teams as any} themes={themes} />;
}
