import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      xp: true,
      level: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const isAdmin = user.role === "COORDINATOR";

  return (
    <DashboardLayout user={user} isAdmin={isAdmin}>
      {children}
    </DashboardLayout>
  );
}
