import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ThemesClient } from "./ThemesClient";

export default async function ThemesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const themes = await prisma.theme.findMany({
    include: {
      objectives: { orderBy: { order: "asc" } },
      roadmaps: { orderBy: { weekNumber: "asc" } },
      resources: true,
    },
    orderBy: { code: "asc" },
  });

  return <ThemesClient themes={themes} />;
}