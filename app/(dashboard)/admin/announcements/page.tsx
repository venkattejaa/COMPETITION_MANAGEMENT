import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminAnnouncementsClient from "./AdminAnnouncementsClient";

export default async function AdminAnnouncementsPage() {
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

  return <AdminAnnouncementsClient user={user} />;
}
