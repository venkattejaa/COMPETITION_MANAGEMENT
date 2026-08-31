import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pdfData = [
  // Team 1051
  {
    teamCode: "eYRC#1051",
    teamName: "Team eYRC#1051",
    description: "DCSE Team 1051",
    members: [
      { name: "Sugali Venkata Teja Naik", email: "venkattejanaik@zohomail.com", role: "TEAM_LEADER", isLeader: true, branch: "CSE", year: 2 },
      { name: "Shaik Thanveer Basha", email: "thanveershaik2010@gmail.com", role: "MEMBER", isLeader: false, branch: "CSE", year: 2 }
    ]
  },
  // Team 1789
  {
    teamCode: "eYRC#1789",
    teamName: "Team eYRC#1789",
    description: "DECE Team 1789",
    members: [
      { name: "Poojithsharanroy.p", email: "poojithroy3210@gmail.com", role: "TEAM_LEADER", isLeader: true, branch: "ECE", year: 2 },
      { name: "M Bharath", email: "mbharathec032@gmail.com", role: "MEMBER", isLeader: false, branch: "ECE", year: 2 },
      { name: "Rapakula sushanth", email: "sushanthshu1@gmail.com", role: "MEMBER", isLeader: false, branch: "ECE", year: 2 }
    ]
  },
  // Team 5111
  {
    teamCode: "eYRC#5111",
    teamName: "Team eYRC#5111",
    description: "DCSE Team 5111",
    members: [
      { name: "THARIGONDA SHAIK REHAMAN", email: "Amannnshaik786@gmail.com", role: "TEAM_LEADER", isLeader: true, branch: "CSE", year: 1 },
      { name: "PALLA UTTEJ KUMAR", email: "uttejkumarpalla@gmail.com", role: "MEMBER", isLeader: false, branch: "CSE", year: 1 }
    ]
  },
  // Team 4086
  {
    teamCode: "eYRC#4086",
    teamName: "Team eYRC#4086",
    description: "DECE Team 4086",
    members: [
      { name: "Shaik Mohammad Hassain", email: "hassainshaikmohammad@gmail.com", role: "TEAM_LEADER", isLeader: true, branch: "ECE", year: 1 },
      { name: "Gowrakka gari Yashwanth", email: "yashwanthyash1109@gmail.com", role: "MEMBER", isLeader: false, branch: "ECE", year: 1 },
      { name: "Sirikonda Aravind kumar", email: "sirikondaaravind17@gmail.com", role: "MEMBER", isLeader: false, branch: "ECE", year: 1 }
    ]
  },
  // Team 5476
  {
    teamCode: "eYRC#5476",
    teamName: "Team eYRC#5476",
    description: "DME Team 5476",
    members: [
      { name: "R.BALA", email: "senthilbala593@gmail.com", role: "TEAM_LEADER", isLeader: true, branch: "ME", year: 1 },
      { name: "Kanaparthi nikhilesh", email: "kanaparthinikhilesh@gmail.com", role: "MEMBER", isLeader: false, branch: "ME", year: 1 },
      { name: "S.Munichandra Raju", email: "Munichandraraju841@gmail.com", role: "MEMBER", isLeader: false, branch: "ME", year: 1 },
      { name: "M.Ishanth", email: "ishanthitachi@gmail.com", role: "MEMBER", isLeader: false, branch: "ME", year: 1 }
    ]
  },
  // Team 5491
  {
    teamCode: "eYRC#5491",
    teamName: "Team eYRC#5491",
    description: "DCSE Team 5491",
    members: [
      { name: "V. Nirmala", email: "vnirmalareddy7993@gmail.com", role: "TEAM_LEADER", isLeader: true, branch: "CSE", year: 2 }
    ]
  },
  // Team 2990
  {
    teamCode: "eYRC#2990",
    teamName: "Team eYRC#2990",
    description: "DECE Team 2990",
    members: [
      { name: "D.khushal kumar", email: "d.khushalkumar2008@gmail.com", role: "TEAM_LEADER", isLeader: true, branch: "ECE", year: 2 }
    ]
  },
  // Team 4077
  {
    teamCode: "eYRC#4077",
    teamName: "Team eYRC#4077",
    description: "DECE Team 4077",
    members: [
      { name: "Manikantan Bala Harshith", email: "harshith94266@gmail.com", role: "TEAM_LEADER", isLeader: true, branch: "ECE", year: 1 },
      { name: "C bhargava Reddy", email: "chintalapallibhargavreddy@gmail.com", role: "MEMBER", isLeader: false, branch: "CSE", year: 1 },
      { name: "Kummari Guru Bharath", email: "kummaribharath289@gmail.com", role: "MEMBER", isLeader: false, branch: "ECE", year: 1 },
      { name: "Kummari Mohan", email: "mohankummari070@gmail.com", role: "MEMBER", isLeader: false, branch: "ECE", year: 1 }
    ]
  }
];

async function main() {
  console.log("🚀 Syncing official PDF Teams and Participants...");

  for (const group of pdfData) {
    // 1. Create or find Team
    const team = await prisma.team.upsert({
      where: { code: group.teamCode },
      update: { name: group.teamName, description: group.description },
      create: {
        code: group.teamCode,
        name: group.teamName,
        description: group.description,
        currentStage: "STAGE_1",
        currentTask: "TASK_0",
        progressPercent: 0,
        totalXp: 0,
      },
    });

    console.log(`✅ Synced Team: ${team.code} (${team.name})`);

    // 2. Create or update members
    for (const mem of group.members) {
      await prisma.user.upsert({
        where: { email: mem.email.toLowerCase() },
        update: {
          name: mem.name,
          role: mem.role as any,
          isTeamLeader: mem.isLeader,
          teamId: team.id,
          branch: mem.branch,
          year: mem.year,
        },
        create: {
          email: mem.email.toLowerCase(),
          name: mem.name,
          role: mem.role as any,
          isTeamLeader: mem.isLeader,
          teamId: team.id,
          branch: mem.branch,
          year: mem.year,
        },
      });

      console.log(`   └─ User: ${mem.name} <${mem.email}> -> Team ${team.code}`);
    }
  }

  console.log("🎉 PDF Team sync complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
