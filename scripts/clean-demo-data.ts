import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Cleaning up demo data...");

  const demoEmails = [
    "leader@eyrc.dev",
    "member1@eyrc.dev",
    "member2@eyrc.dev",
    "member3@eyrc.dev",
    "warrior1@eyrc.dev",
  ];

  const demoTeamCodes = [
    "EYRC-CSE-001",
    "EYRC-ECE-002",
    "EYRC-CSE-783",
  ];

  // 1. Delete notifications
  const deletedNotifs = await prisma.notification.deleteMany({});
  console.log(`Deleted ${deletedNotifs.count} notifications.`);

  // 2. Delete forum posts & answers by demo users
  const deletedPosts = await prisma.forumPost.deleteMany({
    where: { author: { email: { in: demoEmails } } },
  });
  console.log(`Deleted ${deletedPosts.count} demo forum posts.`);

  // 3. Delete tasks for demo teams
  const deletedTasks = await prisma.task.deleteMany({
    where: { team: { code: { in: demoTeamCodes } } },
  });
  console.log(`Deleted ${deletedTasks.count} demo tasks.`);

  // 4. Delete demo users
  const deletedUsers = await prisma.user.deleteMany({
    where: { email: { in: demoEmails } },
  });
  console.log(`Deleted ${deletedUsers.count} demo users.`);

  // 5. Delete demo teams
  const deletedTeams = await prisma.team.deleteMany({
    where: { code: { in: demoTeamCodes } },
  });
  console.log(`Deleted ${deletedTeams.count} demo teams.`);

  console.log("✨ Clean up completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
