import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { ThemeDetailClient } from "./ThemeDetailClient";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function ThemeDetailPage({ params }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { code } = await params;

  const theme = await prisma.theme.findUnique({
    where: { code: code.toUpperCase() },
    include: {
      objectives: { orderBy: { order: "asc" } },
      roadmaps: { orderBy: { weekNumber: "asc" }, include: { resources: true } },
      resources: true,
    },
  });

  if (!theme) {
    notFound();
  }

  return <ThemeDetailClient theme={theme} />;
}