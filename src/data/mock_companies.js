export const mockCompanies = [
  { 
    id: 'google', 
    name: 'Google', 
    type: 'Product-based', 
    difficulty: 'Hard', 
    color: 'from-blue-500 to-green-500',
    tags: ['FAANG', 'Algorithms', 'System Design', 'C++'],
    description: 'Known for algorithmic rigor. Expect dynamic programming, graphs, and system design in onsite rounds.', 
    experienceCount: 142,
    hiringProcess: [
      { title: "Application Screening", desc: "Resume parsing. Referrals highly recommended to bypass the ATS." },
      { title: "Online Assessment (OA)", desc: "2 coding problems on HackerRank. 90 mins. Usually Medium to Hard difficulty." },
      { title: "Technical Phone Screen", desc: "45 mins live coding. Focus on Data Structures and Time Complexity." },
      { title: "Onsite Loop", desc: "4-5 Technical Rounds (DSA & System Design), 1 'Googlyness' Behavioral Round." }
    ]
  },
  { 
    id: 'meta', 
    name: 'Meta', 
    type: 'Product-based', 
    difficulty: 'Hard', 
    color: 'from-blue-600 to-indigo-600',
    tags: ['FAANG', 'React', 'Frontend', 'Scale'],
    description: 'Heavy focus on speed and accuracy. Questions are often variants of top LeetCode problems.', 
    experienceCount: 204,
    hiringProcess: [
      { title: "Recruiter Screen", desc: "Quick chat about background and expectations." },
      { title: "Technical Phone Screen", desc: "45 mins. Expect 2 medium questions. Speed is critical." },
      { title: "Onsite Loop", desc: "2 Coding, 1 System Design (or Product Architecture), 1 Behavioral (Jedi)." }
    ]
  },
  { 
    id: 'amazon', 
    name: 'Amazon', 
    type: 'Product-based', 
    difficulty: 'Medium', 
    color: 'from-orange-400 to-amber-500',
    tags: ['FAANG', 'Leadership', 'OOD', 'Java'],
    description: 'Heavy focus on Leadership Principles (LPs). Be prepared for behavioral questions integrated with technical rounds.', 
    experienceCount: 215,
    hiringProcess: [
      { title: "Online Assessment (OA)", desc: "2 coding questions (Medium) and a Work Style Simulation (Behavioral)." },
      { title: "Onsite Loop", desc: "Each round has a technical question and 2 specific LPs. One round is the 'Bar Raiser'." }
    ]
  },
  { 
    id: 'netflix', 
    name: 'Netflix', 
    type: 'Product-based', 
    difficulty: 'Hard', 
    color: 'from-red-500 to-rose-700',
    tags: ['FAANG', 'Microservices', 'Culture', 'Senior'],
    description: 'Hires mostly senior engineers. High bar for system design, culture fit, and domain expertise.', 
    experienceCount: 85,
    hiringProcess: [
      { title: "Take-Home Project", desc: "A realistic engineering problem related to their domain." },
      { title: "Technical Screen", desc: "Deep dive into the take-home project and core concepts." },
      { title: "Onsite Loop", desc: "Intense system design, deep domain knowledge, and culture fit." }
    ]
  },
  { 
    id: 'microsoft', 
    name: 'Microsoft', 
    type: 'Product-based', 
    difficulty: 'Medium', 
    color: 'from-blue-400 to-cyan-500',
    tags: ['FAANG', 'C#', 'OS', 'Fundamentals'],
    description: 'Focus on core computer science fundamentals, OS concepts, and system design.', 
    experienceCount: 180,
    hiringProcess: [
      { title: "Online Assessment", desc: "Typically 2-3 questions on Codility focusing on string manipulation and arrays." },
      { title: "Onsite Loop", desc: "Mix of Object-Oriented Design, System Design, and algorithmic problem solving." }
    ]
  },
  { 
    id: 'stripe', 
    name: 'Stripe', 
    type: 'Fintech', 
    difficulty: 'Hard', 
    color: 'from-indigo-500 to-purple-600',
    tags: ['Fintech', 'Integration', 'APIs', 'Ruby'],
    description: 'Unique interview process focusing on practical coding, debugging, and API integration rather than algorithmic puzzles.', 
    experienceCount: 92,
    hiringProcess: [
      { title: "Bug Squash Round", desc: "Given an existing codebase, find and fix bugs." },
      { title: "Integration Round", desc: "Use an API to fetch data and process it." },
      { title: "System Design", desc: "Design a scalable API or financial ledger system." }
    ]
  }
];
