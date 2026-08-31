import { redirect } from "next/navigation";
import { getCachedAuthUser } from "@/lib/get-cached-user";
import { prisma } from "@/lib/prisma";
import { ThemesClient } from "./ThemesClient";

export default async function ThemesPage() {
  const [user, themes] = await Promise.all([
    getCachedAuthUser(),
    prisma.theme.findMany({
      include: {
        objectives: { orderBy: { order: "asc" } },
        roadmaps: { orderBy: { weekNumber: "asc" } },
        resources: true,
      },
      orderBy: { code: "asc" },
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  return <ThemesClient themes={themes} />;
}