import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const themes = [
  {
    code: "LQ",
    name: "Logic Quest",
    tagline: "An alien civilization has left behind a mysterious message scattered across four RFID blocks.",
    description: "Logic Quest challenges teams to build an autonomous robot that can explore an arena, decrypt RFID data on blocks, and transport them to designated locations. This theme combines path planning, RFID decryption, and CPU design concepts.",
    difficulty: "INTERMEDIATE" as const,
    years: [2, 3, 4],
    mode: "Simulator + Hardware",
    techStack: ["RFID Decryption", "CPU Design", "Path Planning", "Python", "GPIO"],
    objectives: [
      { id: "lq-1", title: "Explore the arena by following the marked path", description: "Navigate the robot along the predefined path using line following or path planning algorithms", order: 1 },
      { id: "lq-2", title: "Scan and decrypt RFID data on each block", description: "Interface with MFRC522 RFID module to read and decrypt data from blocks", order: 2 },
      { id: "lq-3", title: "Determine the correct destination for the block", description: "Process decrypted data to identify target location for each block", order: 3 },
      { id: "lq-4", title: "Pick up the block and transport it to its designated location", description: "Implement pick-and-place mechanism with precise positioning", order: 4 },
      { id: "lq-5", title: "Repeat until all four blocks are placed correctly", description: "Complete the full cycle for all four blocks autonomously", order: 5 },
    ],
    roadmap: [
      { weekNumber: 1, title: "Python Basics + GPIO Programming", description: "Learn Python fundamentals and Raspberry Pi GPIO control for hardware interfacing", estimatedHours: 10, resources: [] },
      { weekNumber: 2, title: "RFID Module (MFRC522) Interfacing", description: "Interface RFID reader, read tag data, implement decryption logic", estimatedHours: 12, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 3, title: "Path Planning Algorithms (DFS, BFS)", description: "Implement graph traversal algorithms for arena navigation", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 4, title: "CPU Design Basics", description: "Understand basic CPU architecture concepts for decryption logic", estimatedHours: 12, resources: [], prerequisites: ["week-2"] },
      { weekNumber: 5, title: "Simulation in Gazebo", description: "Set up Gazebo simulation environment for virtual testing", estimatedHours: 10, resources: [], prerequisites: ["week-3"] },
      { weekNumber: 6, title: "Hardware Integration & Testing", description: "Integrate all components on physical robot, test and debug", estimatedHours: 20, resources: [], prerequisites: ["week-4", "week-5"] },
    ],
  },
  {
    code: "KD",
    name: "Khoj-o-Drone",
    tagline: "A quadcopter looking for survivors in a disaster-stricken area.",
    description: "Khoj-o-Drone challenges teams to build an autonomous drone that can explore disaster zones, navigate through cluttered environments, detect survivors using computer vision, and transmit coordinates to a ground station.",
    difficulty: "ADVANCED" as const,
    years: [3, 4],
    mode: "Simulator + Hardware",
    techStack: ["Drone Flight Control", "Path Planning", "Computer Vision", "PX4/ArduPilot", "MAVLink", "ROS2"],
    objectives: [
      { id: "kd-1", title: "Autonomously explore the disaster zone", description: "Implement autonomous exploration algorithm for unknown environments", order: 1 },
      { id: "kd-2", title: "Navigate through hazardous, cluttered environments", description: "Obstacle avoidance and 3D path planning in complex environments", order: 2 },
      { id: "kd-3", title: "Detect trapped survivors", description: "Computer vision pipeline for human detection using thermal/visual cameras", order: 3 },
      { id: "kd-4", title: "Estimate and record survivor locations", description: "GPS coordinate estimation and GIS mapping of detected survivors", order: 4 },
      { id: "kd-5", title: "Maintain stable flight throughout", description: "PID tuning and flight controller optimization for stable hover", order: 5 },
      { id: "kd-6", title: "Transmit coordinates to ground station", description: "MAVLink telemetry and ground station communication", order: 6 },
      { id: "kd-7", title: "Prioritize critical survivors within mission time", description: "Task prioritization and mission planning algorithms", order: 7 },
    ],
    roadmap: [
      { weekNumber: 1, title: "Drone Dynamics & Physics", description: "Understand quadcopter physics, forces, and control theory", estimatedHours: 12, resources: [] },
      { weekNumber: 2, title: "PX4/ArduPilot Basics", description: "Set up flight controller firmware, parameters, and basic configuration", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 3, title: "MAVLink Protocol & QGroundControl", description: "Learn MAVLink messaging, telemetry, and ground control station usage", estimatedHours: 10, resources: [], prerequisites: ["week-2"] },
      { weekNumber: 4, title: "Computer Vision for Object Detection", description: "Implement YOLO/OpenCV for survivor detection in thermal/visual feeds", estimatedHours: 20, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 5, title: "GPS Coordinate Systems & GIS Basics", description: "Coordinate transformations, geofencing, and mapping", estimatedHours: 8, resources: [], prerequisites: ["week-3"] },
      { weekNumber: 6, title: "Gazebo Drone Simulation (Iris Model)", description: "Set up PX4 Gazebo simulation with Iris quadcopter model", estimatedHours: 15, resources: [], prerequisites: ["week-2", "week-4"] },
      { weekNumber: 7, title: "Path Planning in 3D Space", description: "RRT*, A* in 3D, collision avoidance algorithms", estimatedHours: 18, resources: [], prerequisites: ["week-6"] },
      { weekNumber: 8, title: "Hardware Flight Testing", description: "Real-world flight tests, tuning, and system integration", estimatedHours: 25, resources: [], prerequisites: ["week-7"] },
    ],
  },
  {
    code: "SC",
    name: "Strata Cobot",
    tagline: "A mobile robot and robotic arm working in sync on an extraterrestrial planet.",
    description: "Strata Cobot challenges teams to build a dual-robot system: a mobile base with SLAM navigation and a robotic arm for manipulation. Both robots must coordinate autonomously for exploration and sample collection.",
    difficulty: "ADVANCED" as const,
    years: [2, 3, 4],
    mode: "Simulator + Hardware",
    techStack: ["SLAM", "Robotic Arm Control", "Autonomous Exploration", "Image Processing", "ROS2", "MoveIt2"],
    objectives: [
      { id: "sc-1", title: "Build control logic for dual-robot autonomous coordination", description: "Design communication and coordination protocol between mobile base and arm", order: 1 },
      { id: "sc-2", title: "Mobile robot: global/local path planning, obstacle avoidance", description: "Implement SLAM-based navigation with dynamic obstacle avoidance", order: 2 },
      { id: "sc-3", title: "Robotic arm: image processing, pose estimation, motion planning", description: "Object detection, pose estimation, and MoveIt2 trajectory planning", order: 3 },
      { id: "sc-4", title: "Coordinate both robots as a single system", description: "Synchronized handoff from field to containers", order: 4 },
      { id: "sc-5", title: "Achieve synchronized handoff from field to containers", description: "End-to-end autonomous sample collection and deposition", order: 5 },
    ],
    roadmap: [
      { weekNumber: 1, title: "ROS2 Fundamentals & Workspace Setup", description: "Set up ROS2 workspace, packages, and development environment", estimatedHours: 12, resources: [] },
      { weekNumber: 2, title: "SLAM (gmapping / Cartographer)", description: "Implement simultaneous localization and mapping for mobile base", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 3, title: "MoveIt2 for Arm Motion Planning", description: "Configure MoveIt2 for robotic arm, collision checking, trajectory planning", estimatedHours: 18, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 4, title: "OpenCV for Ore Detection & Classification", description: "Computer vision pipeline for mineral/ore identification", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 5, title: "Pose Estimation (ArUco / AprilTags)", description: "Marker-based pose estimation for precise grasping", estimatedHours: 12, resources: [], prerequisites: ["week-4"] },
      { weekNumber: 6, title: "Multi-Robot Coordination", description: "Topic sharing, action servers, and coordinated behaviors", estimatedHours: 20, resources: [], prerequisites: ["week-2", "week-3"] },
      { weekNumber: 7, title: "Gazebo Simulation with Both Robots", description: "Full system simulation in Gazebo with mobile base and arm", estimatedHours: 15, resources: [], prerequisites: ["week-6"] },
      { weekNumber: 8, title: "Grasp Planning & Hardware Integration", description: "Grasp planning algorithms and physical robot integration", estimatedHours: 25, resources: [], prerequisites: ["week-7"] },
    ],
  },
  {
    code: "HE",
    name: "Hola The Explorer",
    tagline: "Three robots. One buried city. A vault that only opens for a team.",
    description: "Hola The Explorer is the most advanced theme requiring three robots to coordinate autonomously. They must explore, share information, decode clues, and coordinate to transport weighted objects.",
    difficulty: "EXPERT" as const,
    years: [3, 4],
    mode: "Simulator + Hardware",
    techStack: ["Multi-Robot Coordination", "Multi-Agent Path Planning", "Collision Avoidance", "Task Allocation", "ROS2", "Distributed Systems"],
    objectives: [
      { id: "he-1", title: "Three robots independently explore arena and avoid obstacles", description: "Distributed exploration with individual obstacle avoidance", order: 1 },
      { id: "he-2", title: "Each robot discovers hidden checkpoints and collects clue fragments", description: "Sensor-based clue detection and fragment collection", order: 2 },
      { id: "he-3", title: "Robots share clue fragments with main server to decode treasure location", description: "Distributed communication and consensus algorithms", order: 3 },
      { id: "he-4", title: "Coordinate motion to transport weighted objects", description: "Multi-robot cooperative transport with force coordination", order: 4 },
    ],
    roadmap: [
      { weekNumber: 1, title: "Multi-Agent Systems Theory", description: "Foundations of distributed robotics, consensus, coordination", estimatedHours: 15, resources: [] },
      { weekNumber: 2, title: "Distributed Path Planning (ORCA, RVO)", description: "Reciprocal velocity obstacles for collision-free multi-robot navigation", estimatedHours: 18, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 3, title: "Communication Protocols Between Robots", description: "ROS2 DDS, custom protocols, bandwidth optimization", estimatedHours: 12, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 4, title: "Task Allocation Algorithms", description: "Auction-based, market-based, and consensus-based allocation", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 5, title: "Sensor Fusion for Clue Detection", description: "Multi-modal sensor fusion for reliable clue identification", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 6, title: "Centralized vs Decentralized Decision Making", description: "Architecture trade-offs and hybrid approaches", estimatedHours: 12, resources: [], prerequisites: ["week-3", "week-4"] },
      { weekNumber: 7, title: "Gazebo Multi-Robot Simulation", description: "Three-robot simulation with inter-robot communication", estimatedHours: 20, resources: [], prerequisites: ["week-5", "week-6"] },
      { weekNumber: 8, title: "System Integration & Stress Testing", description: "Full integration, reliability testing, competition readiness", estimatedHours: 30, resources: [], prerequisites: ["week-7"] },
    ],
  },
  {
    code: "NV",
    name: "Niti Vahan",
    tagline: "An autonomous vehicle that uses camera-based lane detection and control to navigate a city arena.",
    description: "Niti Vahan challenges teams to build an autonomous vehicle capable of lane detection, traffic signal recognition, path optimization, and precise parking using camera-based vision and control systems.",
    difficulty: "INTERMEDIATE" as const,
    years: [1, 2, 3, 4],
    mode: "Simulator + Hardware",
    techStack: ["Computer Vision", "Traffic Signal Logic", "Path Optimization", "Control Systems", "OpenCV", "PID/MPC"],
    objectives: [
      { id: "nv-1", title: "Encode traffic rules as mathematical constraints for predictive control", description: "Model traffic rules as optimization constraints", order: 1 },
      { id: "nv-2", title: "Generate disciplined path: stops at junctions, signals turns", description: "Path planning with traffic rule compliance", order: 2 },
      { id: "nv-3", title: "Maintain dynamic stability respecting tire physical limits", description: "Vehicle dynamics modeling and stability control", order: 3 },
      { id: "nv-4", title: "Execute precise parking in designated zone", description: "Automated parking with sensor fusion", order: 4 },
      { id: "nv-5", title: "Prove smart control logic produces safer, orderly movement", description: "Validation and demonstration of control system", order: 5 },
    ],
    roadmap: [
      { weekNumber: 1, title: "Python + OpenCV Basics", description: "Image processing fundamentals, color spaces, filtering", estimatedHours: 10, resources: [] },
      { weekNumber: 2, title: "Lane Detection (Hough Transform, Color Filtering)", description: "Robust lane line detection in various lighting conditions", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 3, title: "Traffic Sign Recognition", description: "Template matching and CNN-based sign classification", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 4, title: "PID Controller for Lane Keeping", description: "Tune PID for lateral control, handle curves and intersections", estimatedHours: 12, resources: [], prerequisites: ["week-2"] },
      { weekNumber: 5, title: "Model Predictive Control (MPC) Basics", description: "Implement MPC for predictive trajectory optimization", estimatedHours: 18, resources: [], prerequisites: ["week-4"] },
      { weekNumber: 6, title: "Path Optimization (A*, Dijkstra)", description: "Global path planning with traffic rule constraints", estimatedHours: 12, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 7, title: "Gazebo Autonomous Vehicle Simulation", description: "Vehicle simulation with camera sensors and physics", estimatedHours: 15, resources: [], prerequisites: ["week-5", "week-6"] },
      { weekNumber: 8, title: "Parking Algorithm & Hardware Integration", description: "Parallel/perpendicular parking and real vehicle integration", estimatedHours: 20, resources: [], prerequisites: ["week-7"] },
    ],
  },
  {
    code: "EB",
    name: "Echo Balancer",
    tagline: "An autonomous two-wheel self-balancing bike navigating cave-like environments.",
    description: "Echo Balancer challenges teams to build a self-balancing two-wheeled robot that can maintain balance, navigate cave-like environments using wall-following, and detect magnet polarity for direction verification.",
    difficulty: "INTERMEDIATE" as const,
    years: [2, 3, 4],
    mode: "Simulator + Hardware",
    techStack: ["Balance Control", "Ultrasonic Sensing", "PID Tuning", "Furuta Pendulum", "IMU", "Kalman Filter"],
    objectives: [
      { id: "eb-1", title: "Maintain stable balance on two wheels without touching ground", description: "Inverted pendulum control with real-time balancing", order: 1 },
      { id: "eb-2", title: "Navigate cave-like environment using wall-following algorithm", description: "Ultrasonic sensor-based wall following and corridor navigation", order: 2 },
      { id: "eb-3", title: "Detect magnet polarity along the path to verify correct direction", description: "Magnetometer-based polarity detection for path validation", order: 3 },
    ],
    roadmap: [
      { weekNumber: 1, title: "Control Systems Basics", description: "Transfer functions, stability analysis, state-space representation", estimatedHours: 12, resources: [] },
      { weekNumber: 2, title: "PID Controller Theory & Tuning", description: "Ziegler-Nichols, Cohen-Coon, and manual tuning methods", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 3, title: "Inverted Pendulum Physics & Modeling", description: "Dynamic modeling of two-wheel balancing robot", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 4, title: "IMU (MPU6050) Interfacing & Kalman Filtering", description: "Sensor fusion for accurate angle estimation", estimatedHours: 12, resources: [], prerequisites: ["week-3"] },
      { weekNumber: 5, title: "Ultrasonic Sensor (HC-SR04) Wall Following", description: "Distance measurement and wall-following control logic", estimatedHours: 10, resources: [], prerequisites: ["week-4"] },
      { weekNumber: 6, title: "Magnetometer (HMC5883L) Polarity Detection", description: "Magnetic field sensing for direction verification", estimatedHours: 8, resources: [], prerequisites: ["week-4"] },
      { weekNumber: 7, title: "Simulation in MATLAB/Python", description: "Dynamic simulation of balancing robot", estimatedHours: 12, resources: [], prerequisites: ["week-5", "week-6"] },
      { weekNumber: 8, title: "Hardware Balancing & Tuning", description: "Physical robot assembly, PID tuning, field testing", estimatedHours: 25, resources: [], prerequisites: ["week-7"] },
    ],
  },
  {
    code: "PB",
    name: "PacBot",
    tagline: "A Pac-Man inspired bot — escape the maze without getting caught while maximizing points.",
    description: "PacBot is a beginner-friendly theme where teams build a maze-solving robot that must collect maximum points while avoiding ghosts and reaching the exit before escape routes are cut off.",
    difficulty: "BEGINNER" as const,
    years: [1, 2, 3, 4],
    mode: "Simulator + Hardware",
    techStack: ["Maze Solving", "Pathfinding Algorithms", "Grid Navigation", "Game Theory", "Python", "BFS/DFS/A*"],
    objectives: [
      { id: "pb-1", title: "Find path collecting maximum points while avoiding Ghosts", description: "Pathfinding with dynamic obstacles and scoring optimization", order: 1 },
      { id: "pb-2", title: "Decide how aggressively to collect points before heading to exit", description: "Risk-reward decision making with game theory", order: 2 },
      { id: "pb-3", title: "Reach exit before escape routes are cut off", description: "Time-constrained path planning to exit", order: 3 },
      { id: "pb-4", title: "Reroute in real-time as Ghost positions change every second", description: "Dynamic replanning with D* Lite or ARA*", order: 4 },
      { id: "pb-5", title: "Balance between chasing points and surviving", description: "Strategic optimization of score vs survival", order: 5 },
    ],
    roadmap: [
      { weekNumber: 1, title: "Python Programming + Data Structures", description: "Lists, dictionaries, sets, graphs, priority queues", estimatedHours: 12, resources: [] },
      { weekNumber: 2, title: "Graph Theory (BFS, DFS, Dijkstra, A*)", description: "Fundamental pathfinding algorithms and implementations", estimatedHours: 15, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 3, title: "Maze Representation (2D Arrays, Adjacency Lists)", description: "Grid-based and graph-based maze representations", estimatedHours: 10, resources: [], prerequisites: ["week-2"] },
      { weekNumber: 4, title: "Game AI Basics (Minimax, Greedy Algorithms)", description: "Adversarial search and heuristic evaluation functions", estimatedHours: 12, resources: [], prerequisites: ["week-2"] },
      { weekNumber: 5, title: "Real-Time Path Replanning (D* Lite, ARA*)", description: "Incremental search algorithms for dynamic environments", estimatedHours: 15, resources: [], prerequisites: ["week-3", "week-4"] },
      { weekNumber: 6, title: "Sensor Integration (Encoders, IR Sensors)", description: "Odometry, wall detection, and sensor fusion", estimatedHours: 10, resources: [], prerequisites: ["week-1"] },
      { weekNumber: 7, title: "Gazebo Maze Simulation", description: "Maze environment simulation with dynamic ghosts", estimatedHours: 12, resources: [], prerequisites: ["week-5", "week-6"] },
      { weekNumber: 8, title: "Hardware Maze Runner & Optimization", description: "Physical robot, sensor calibration, performance optimization", estimatedHours: 20, resources: [], prerequisites: ["week-7"] },
    ],
  },
];

const defaultTasks = [
  { taskNumber: "TASK_0", title: "Registration & Team Formation", stage: "STAGE_1" as const, maxXp: 50 },
  { taskNumber: "TASK_1", title: "Theme Selection & Preference Submission", stage: "STAGE_1" as const, maxXp: 50 },
  { taskNumber: "TASK_2", title: "Stage 1: Learning Modules Completion", stage: "STAGE_1" as const, maxXp: 200 },
  { taskNumber: "TASK_3", title: "Stage 2: Theme Commitment & Prototype", stage: "STAGE_2" as const, maxXp: 300 },
  { taskNumber: "TASK_4", title: "Stage 2: Simulation & Testing", stage: "STAGE_2" as const, maxXp: 300 },
  { taskNumber: "TASK_5", title: "Stage 2: Hardware Integration", stage: "STAGE_2" as const, maxXp: 400 },
  { taskNumber: "TASK_6", title: "National Finale Preparation", stage: "FINALE" as const, maxXp: 500 },
];

const achievements = [
  { code: "first_blood", name: "First Blood", description: "First task submission", icon: "zap", xpBonus: 100, conditionType: "task_count", conditionValue: 1 },
  { code: "speed_demon", name: "Speed Demon", description: "Submit task 48h before deadline", icon: "bolt", xpBonus: 150, conditionType: "early_submission", conditionValue: 48 },
  { code: "bug_hunter", name: "Bug Hunter", description: "Report a critical blocker and get it resolved", icon: "bug", xpBonus: 200, conditionType: "blocker_resolved", conditionValue: 1 },
  { code: "mentor", name: "Mentor", description: "Answer 10 questions with 5+ upvotes each", icon: "graduation-cap", xpBonus: 500, conditionType: "answer_upvotes", conditionValue: 10 },
  { code: "theme_master", name: "Theme Master", description: "Complete all Stage 1 tasks for a theme", icon: "trophy", xpBonus: 300, conditionType: "stage_complete", conditionValue: 1 },
  { code: "finalist_hopeful", name: "Finalist Hopeful", description: "Reach Stage 2", icon: "flag", xpBonus: 250, conditionType: "stage_reached", conditionValue: 2 },
  { code: "unstoppable", name: "Unstoppable", description: "30-day activity streak", icon: "flame", xpBonus: 400, conditionType: "streak_days", conditionValue: 30 },
  { code: "night_owl", name: "Night Owl", description: "Active after 11 PM", icon: "moon", xpBonus: 50, conditionType: "late_night_activity", conditionValue: 1 },
  { code: "team_player", name: "Team Player", description: "All 4 members contribute equally", icon: "users", xpBonus: 200, conditionType: "equal_contribution", conditionValue: 4 },
  { code: "resource_curator", name: "Resource Curator", description: "Share 5+ quality resources", icon: "book-open", xpBonus: 150, conditionType: "resources_shared", conditionValue: 5 },
  { code: "code_wizard", name: "Code Wizard", description: "Submit 3+ code templates", icon: "code", xpBonus: 200, conditionType: "code_templates", conditionValue: 3 },
  { code: "streak_starter", name: "Streak Starter", description: "7-day activity streak", icon: "calendar", xpBonus: 100, conditionType: "streak_days", conditionValue: 7 },
  { code: "forum_champion", name: "Forum Champion", description: "5 best answers marked", icon: "message-square", xpBonus: 300, conditionType: "best_answers", conditionValue: 5 },
  { code: "early_bird", name: "Early Bird", description: "Complete onboarding within 24 hours", icon: "sunrise", xpBonus: 100, conditionType: "fast_onboarding", conditionValue: 24 },
  { code: "perfectionist", name: "Perfectionist", description: "All tasks completed with 100% score", icon: "star", xpBonus: 500, conditionType: "perfect_tasks", conditionValue: 7 },
];

async function main() {
  console.log("🌱 Starting database seed...");

  for (const theme of themes) {
    const { roadmap, objectives, ...themeData } = theme;

    const createdTheme = await prisma.theme.upsert({
      where: { code: theme.code },
      update: themeData,
      create: themeData,
    });

    console.log(`✅ Theme created/updated: ${theme.code}`);

    for (const obj of objectives) {
      await prisma.themeObjective.upsert({
        where: { id: obj.id },
        update: { ...obj, themeId: createdTheme.id },
        create: { ...obj, themeId: createdTheme.id },
      });
    }

    for (const node of roadmap) {
      const { resources, prerequisites, ...nodeData } = node;
      const createdNode = await prisma.roadmapNode.upsert({
        where: { id: `${theme.code}-week-${node.weekNumber}` },
        update: { ...nodeData, themeId: createdTheme.id },
        create: { ...nodeData, themeId: createdTheme.id, id: `${theme.code}-week-${node.weekNumber}` },
      });

      if (prerequisites && prerequisites.length > 0) {
        for (const prereq of prerequisites) {
          await prisma.roadmapNode.update({
            where: { id: createdNode.id },
            data: { prerequisites: { push: `${theme.code}-${prereq}` } },
          });
        }
      }
    }
  }

  for (const task of defaultTasks) {
    await prisma.taskTemplate.upsert({
      where: { taskNumber: task.taskNumber },
      update: task,
      create: task,
    });
  }

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { code: achievement.code },
      update: achievement,
      create: achievement,
    });
  }

  console.log("✅ All seed data created successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });