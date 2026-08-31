import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PreferencesClient } from "./PreferencesClient";

export default async function PreferencesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      team: true,
    },
  });

  const themes = await prisma.theme.findMany({
    orderBy: { code: "asc" },
  });

  return (
    <PreferencesClient
      themes={themes}
      userTeam={user?.team || null}
      isTeamLeader={user?.isTeamLeader || false}
    />
  );
}
