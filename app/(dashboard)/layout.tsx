import { redirect } from "next/navigation";
import { getCachedAuthUser } from "@/lib/get-cached-user";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCachedAuthUser();

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
