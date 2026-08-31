import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🎯 Creating demo users and team...");

  // Create coordinator
  const coordinator = await prisma.user.upsert({
    where: { email: "coordinator@eyrc.dev" },
    update: {},
    create: {
      email: "coordinator@eyrc.dev",
      name: "Venkat (Coordinator)",
      role: "COORDINATOR",
      xp: 5000,
      level: 4,
      streakDays: 15,
      skills: ["ROS2", "Python", "OpenCV", "Embedded Systems"],
      year: 4,
      branch: "CSE",
    },
  });
  console.log(`✅ Coordinator: ${coordinator.email}`);

  // Create demo team
  const team = await prisma.team.upsert({
    where: { code: "EYRC-CSE-001" },
    update: {},
    create: {
      name: "Circuit Breakers",
      code: "EYRC-CSE-001",
      description: "A passionate team of engineers ready to conquer eYRC 2026-27",
      assignedTheme: "LQ",
      currentStage: "STAGE_1",
      currentTask: "TASK_2",
      progressPercent: 45,
      totalXp: 2450,
    },
  });
  console.log(`✅ Team: ${team.name} (${team.code})`);

  // Create team leader
  const leader = await prisma.user.upsert({
    where: { email: "leader@eyrc.dev" },
    update: { teamId: team.id, isTeamLeader: true },
    create: {
      email: "leader@eyrc.dev",
      name: "Arjun Kumar",
      role: "TEAM_LEADER",
      xp: 1200,
      level: 2,
      streakDays: 7,
      skills: ["Python", "ROS2", "Path Planning"],
      year: 3,
      branch: "CSE",
      teamId: team.id,
      isTeamLeader: true,
    },
  });
  console.log(`✅ Team Leader: ${leader.email}`);

  // Create team members
  const members = [
    { email: "member1@eyrc.dev", name: "Priya Sharma", skills: ["OpenCV", "Python"], year: 2, xp: 800, level: 1 },
    { email: "member2@eyrc.dev", name: "Rahul Patel", skills: ["Embedded", "C++"], year: 2, xp: 650, level: 1 },
    { email: "member3@eyrc.dev", name: "Sneha Reddy", skills: ["MATLAB", "Control Systems"], year: 3, xp: 900, level: 1 },
  ];

  for (const m of members) {
    const user = await prisma.user.upsert({
      where: { email: m.email },
      update: { teamId: team.id },
      create: {
        email: m.email,
        name: m.name,
        role: "MEMBER",
        xp: m.xp,
        level: m.level,
        streakDays: Math.floor(Math.random() * 10),
        skills: m.skills,
        year: m.year,
        branch: "CSE",
        teamId: team.id,
      },
    });
    console.log(`✅ Member: ${user.email}`);
  }

  // Create tasks for the team
  const tasks = [
    { title: "Registration & Team Formation", taskNumber: "TASK_0", stage: "STAGE_1" as const, status: "COMPLETED" as const, maxXp: 50 },
    { title: "Theme Selection & Preference Submission", taskNumber: "TASK_1", stage: "STAGE_1" as const, status: "COMPLETED" as const, maxXp: 50 },
    { title: "Stage 1: Learning Modules Completion", taskNumber: "TASK_2", stage: "STAGE_1" as const, status: "IN_PROGRESS" as const, maxXp: 200, deadline: new Date("2026-11-15") },
    { title: "Stage 2: Theme Commitment & Prototype", taskNumber: "TASK_3", stage: "STAGE_2" as const, status: "NOT_STARTED" as const, maxXp: 300, deadline: new Date("2026-12-15") },
    { title: "Stage 2: Simulation & Testing", taskNumber: "TASK_4", stage: "STAGE_2" as const, status: "NOT_STARTED" as const, maxXp: 300, deadline: new Date("2027-01-15") },
    { title: "Stage 2: Hardware Integration", taskNumber: "TASK_5", stage: "STAGE_2" as const, status: "NOT_STARTED" as const, maxXp: 400, deadline: new Date("2027-02-15") },
    { title: "National Finale Preparation", taskNumber: "TASK_6", stage: "FINALE" as const, status: "NOT_STARTED" as const, maxXp: 500, deadline: new Date("2027-03-15") },
  ];

  for (const t of tasks) {
    await prisma.task.create({
      data: {
        ...t,
        teamId: team.id,
        completedAt: t.status === "COMPLETED" ? new Date() : null,
      },
    });
  }
  console.log(`✅ Created ${tasks.length} tasks for team`);

  // Create a second team for leaderboard
  const team2 = await prisma.team.upsert({
    where: { code: "EYRC-ECE-002" },
    update: {},
    create: {
      name: "Robo Warriors",
      code: "EYRC-ECE-002",
      description: "ECE team specializing in embedded systems",
      assignedTheme: "PB",
      currentStage: "STAGE_1",
      currentTask: "TASK_1",
      progressPercent: 25,
      totalXp: 1200,
    },
  });

  await prisma.user.upsert({
    where: { email: "warrior1@eyrc.dev" },
    update: { teamId: team2.id },
    create: {
      email: "warrior1@eyrc.dev",
      name: "Amit Singh",
      role: "TEAM_LEADER",
      xp: 600,
      level: 1,
      skills: ["Python", "Data Structures"],
      year: 2,
      branch: "ECE",
      teamId: team2.id,
      isTeamLeader: true,
    },
  });
  console.log(`✅ Team 2: ${team2.name}`);

  // Create some forum posts
  await prisma.forumPost.create({
    data: {
      title: "How to set up ROS2 workspace for Logic Quest?",
      content: "I'm having trouble setting up my ROS2 Humble workspace on Ubuntu 22.04. Can someone share the step-by-step process?",
      authorId: leader.id,
      themeTag: "LQ",
      category: "CONCEPT",
      urgency: "MEDIUM",
      views: 42,
      upvotes: 5,
    },
  });

  await prisma.forumPost.create({
    data: {
      title: "RFID module not reading tags correctly",
      content: "My MFRC522 reads tags intermittently. I've checked wiring multiple times. Anyone faced this issue?",
      authorId: leader.id,
      themeTag: "LQ",
      category: "HARDWARE",
      urgency: "HIGH",
      views: 28,
      upvotes: 3,
    },
  });

  await prisma.forumPost.create({
    data: {
      title: "Best algorithm for PacBot maze solving?",
      content: "Should I use A* or D* Lite for the PacBot maze? The ghosts move dynamically so I need replanning.",
      authorId: (await prisma.user.findUnique({ where: { email: "warrior1@eyrc.dev" } }))!.id,
      themeTag: "PB",
      category: "CONCEPT",
      urgency: "LOW",
      views: 67,
      upvotes: 12,
    },
  });
  console.log("✅ Created forum posts");

  console.log("\n🎉 Demo data seeded successfully!");
  console.log("\n📋 Login credentials:");
  console.log("  Coordinator: coordinator@eyrc.dev (any password)");
  console.log("  Team Leader: leader@eyrc.dev (any password)");
  console.log("  Team Member: member1@eyrc.dev (any password)");
}

main()
  .catch((e) => {
    console.error("❌ Demo seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
