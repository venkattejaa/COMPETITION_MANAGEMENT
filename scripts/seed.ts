import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding themes...')

  const themes = [
    {
      code: 'LQ',
      name: 'Logic Quest',
      tagline: 'An alien civilization has left behind a mysterious message scattered across four RFID blocks.',
      description: 'Explore the arena by following the marked path. Scan and decrypt RFID data on each block. Determine the correct destination for the block. Pick up the block and transport it to its designated location. Repeat until all four blocks are placed correctly.',
      difficulty: 'INTERMEDIATE',
      years: [2, 3, 4],
      mode: 'Simulator + Hardware',
      techStack: ['RFID Decryption', 'CPU Design', 'Path Planning'],
      objectives: [
        'Explore the arena by following the marked path',
        'Scan and decrypt RFID data on each block',
        'Determine the correct destination for the block',
        'Pick up the block and transport it to its designated location',
        'Repeat until all four blocks are placed correctly'
      ]
    },
    {
      code: 'KD',
      name: 'Khoj-o-Drone',
      tagline: 'A quadcopter looking for survivors in a disaster-stricken area.',
      description: 'Autonomously explore the disaster zone. Navigate through hazardous, cluttered environments. Detect trapped survivors.',
      difficulty: 'ADVANCED',
      years: [3, 4],
      mode: 'Simulator + Hardware',
      techStack: ['Drone Flight Control', 'Path Planning', 'Computer Vision'],
      objectives: [
        'Autonomously explore the disaster zone',
        'Navigate through hazardous, cluttered environments',
        'Detect trapped survivors',
        'Estimate and record survivor locations',
        'Maintain stable flight throughout',
        'Transmit coordinates to ground station',
        'Prioritize critical survivors within mission time'
      ]
    },
    {
      code: 'SC',
      name: 'Strata Cobot',
      tagline: 'A mobile robot and robotic arm working in sync on an extraterrestrial planet.',
      description: 'Build control logic for dual-robot autonomous coordination. Mobile robot: global/local path planning, obstacle avoidance, trajectory control.',
      difficulty: 'ADVANCED',
      years: [2, 3, 4],
      mode: 'Simulator + Hardware',
      techStack: ['SLAM', 'Robotic Arm Control', 'Autonomous Exploration', 'Image Processing'],
      objectives: [
        'Build control logic for dual-robot autonomous coordination',
        'Mobile robot: global/local path planning, obstacle avoidance, trajectory control',
        'Robotic arm: image processing, pose estimation, motion planning, grasp planning',
        'Coordinate both robots as a single system',
        'Achieve synchronized handoff from field to containers'
      ]
    },
    {
      code: 'HE',
      name: 'Hola The Explorer',
      tagline: 'Three robots. One buried city. A vault that only opens for a team.',
      description: 'Three robots independently explore arena and avoid obstacles. Each robot discovers hidden checkpoints and collects clue fragments.',
      difficulty: 'EXPERT',
      years: [3, 4],
      mode: 'Simulator + Hardware',
      techStack: ['Multi-Robot Coordination', 'Multi-Agent Path Planning', 'Collision Avoidance', 'Task Allocation'],
      objectives: [
        'Three robots independently explore arena and avoid obstacles',
        'Each robot discovers hidden checkpoints and collects clue fragments',
        'Robots share clue fragments with main server to decode treasure location',
        'Coordinate motion to transport weighted objects'
      ]
    },
    {
      code: 'NV',
      name: 'Niti Vahan',
      tagline: 'An autonomous vehicle that uses camera-based lane detection and control to navigate a city arena.',
      description: 'Encode traffic rules as mathematical constraints for predictive control. Generate disciplined path: stops at junctions, signals turns, completes milestones.',
      difficulty: 'INTERMEDIATE', // PRD says Beginner-Intermediate
      years: [1, 2, 3, 4],
      mode: 'Simulator + Hardware',
      techStack: ['Computer Vision', 'Traffic Signal Logic', 'Path Optimization', 'Control Systems'],
      objectives: [
        'Encode traffic rules as mathematical constraints for predictive control',
        'Generate disciplined path: stops at junctions, signals turns, completes milestones',
        'Maintain dynamic stability respecting tire physical limits',
        'Execute precise parking in designated zone',
        'Prove smart control logic produces safer, orderly movement'
      ]
    },
    {
      code: 'EB',
      name: 'Echo Balancer',
      tagline: 'An autonomous two-wheel self-balancing bike navigating cave-like environments.',
      description: 'Maintain stable balance on two wheels without touching ground. Navigate cave-like environment using wall-following algorithm.',
      difficulty: 'INTERMEDIATE',
      years: [2, 3, 4],
      mode: 'Simulator + Hardware',
      techStack: ['Balance Control', 'Ultrasonic Sensing', 'PID Tuning', 'Furuta Pendulum'],
      objectives: [
        'Maintain stable balance on two wheels without touching ground',
        'Navigate cave-like environment using wall-following algorithm',
        'Detect magnet polarity along the path to verify correct direction'
      ]
    },
    {
      code: 'PB',
      name: 'PacBot',
      tagline: 'A Pac-Man inspired bot — escape the maze without getting caught while maximizing points.',
      description: 'Find path collecting maximum points while avoiding Ghosts. Decide how aggressively to collect points before heading to exit.',
      difficulty: 'BEGINNER',
      years: [1, 2, 3, 4],
      mode: 'Simulator + Hardware',
      techStack: ['Maze Solving', 'Pathfinding Algorithms', 'Grid Navigation', 'Game Theory'],
      objectives: [
        'Find path collecting maximum points while avoiding Ghosts',
        'Decide how aggressively to collect points before heading to exit',
        'Reach exit before escape routes are cut off',
        'Reroute in real-time as Ghost positions change every second',
        'Balance between chasing points and surviving'
      ]
    }
  ]

  for (const t of themes) {
    const { objectives, ...themeData } = t;
    const createdTheme = await prisma.theme.upsert({
      where: { code: t.code },
      update: {},
      create: {
        ...themeData,
        difficulty: t.difficulty as any,
      },
    });

    for (let i = 0; i < objectives.length; i++) {
      await prisma.themeObjective.upsert({
        where: { id: `${t.code}-obj-${i + 1}` },
        update: { title: objectives[i], description: objectives[i], order: i + 1, themeId: createdTheme.id },
        create: { id: `${t.code}-obj-${i + 1}`, title: objectives[i], description: objectives[i], order: i + 1, themeId: createdTheme.id },
      });
    }
  }
  
  console.log('Seeded themes successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
