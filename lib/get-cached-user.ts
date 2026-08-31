import { cache } from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getCachedAuthUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      team: {
        include: {
          members: {
            select: { id: true, name: true, avatar: true, xp: true, level: true, role: true, isTeamLeader: true },
          },
          tasks: true,
        },
      },
    },
  });

  return user;
});
