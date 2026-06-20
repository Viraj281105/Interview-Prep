export const mockCompanies = [
  { 
    id: 'google', 
    name: 'Google', 
    type: 'Product-based', 
    difficulty: 'Hard', 
    description: 'Known for algorithmic rigor. Expect dynamic programming, graphs, and system design in onsite rounds.', 
    experienceCount: 142,
    hiringProcess: [
      { title: "Application Screening", desc: "Resume parsing. Referrals highly recommended to bypass the ATS." },
      { title: "Online Assessment (OA)", desc: "2 coding problems on HackerRank or specialized platform. 90 mins. Usually Medium to Hard difficulty." },
      { title: "Technical Phone Screen", desc: "45 mins live coding on Google Docs or CoderPad. Focus on Data Structures (Trees, Graphs) and Time Complexity." },
      { title: "Onsite Loop (4-5 Rounds)", desc: "3-4 Technical Rounds (DSA & System Design), 1 'Googlyness' Behavioral Round. Each 45 mins." }
    ],
    experiences: [
      {
        role: 'Software Engineer, L3',
        date: 'March 2026',
        status: 'Offer',
        upvotes: 89,
        rounds: [
          { name: 'Technical Interview 1', details: 'Focused on Graph traversal. Given a grid, find the shortest path with specific obstacles using BFS.' },
          { name: 'Technical Interview 2', details: 'Dynamic Programming question similar to Coin Change but with constraints.' },
          { name: 'Technical Interview 3', details: 'System Design for a junior role. Asked to design an API rate limiter.' },
          { name: 'Googlyness / HR', details: 'Standard behavioral. "Tell me about a time you disagreed with a manager." Focus on conflict resolution.' }
        ]
      },
      {
        role: 'Frontend Engineer, L4',
        date: 'February 2026',
        status: 'Rejected',
        upvotes: 42,
        rounds: [
          { name: 'Technical Phone Screen', details: 'Build a complex UI component (Typeahead with debounce and caching) in Vanilla JS.' },
          { name: 'Onsite 1 (DSA)', details: 'String manipulation question involving sliding windows. Struggled with edge cases.' }
        ]
      }
    ]
  },
  { 
    id: 'amazon', 
    name: 'Amazon', 
    type: 'Product-based', 
    difficulty: 'Medium', 
    description: 'Heavy focus on Leadership Principles (LPs). Be prepared for behavioral questions integrated with technical rounds.', 
    experienceCount: 215,
    hiringProcess: [
      { title: "Online Assessment (OA)", desc: "2 coding questions (Medium) and a Work Style Simulation (Behavioral). 120 mins." },
      { title: "Technical Phone Screen", desc: "Live coding focusing on standard DSA (Arrays, Strings) + 2 Leadership Principle questions." },
      { title: "Onsite Loop (4-5 Rounds)", desc: "The 'Loop'. Each round has a dedicated technical question and 2 specific LPs. One round includes the 'Bar Raiser'." }
    ],
    experiences: [
      {
        role: 'SDE II',
        date: 'January 2026',
        status: 'Offer',
        upvotes: 120,
        rounds: [
          { name: 'Technical + LP', details: 'LP: "Tell me about a time you dive deep." Tech: Design Amazon locker pickup system.' },
          { name: 'Bar Raiser', details: 'Heavy LP focus (Deliver Results, Disagree & Commit). Tech: String parsing algorithm.' }
        ]
      }
    ]
  },
  { 
    id: 'microsoft', 
    name: 'Microsoft', 
    type: 'Product-based', 
    difficulty: 'Medium', 
    description: 'Focus on core computer science fundamentals, OS concepts, and system design. Very developer-centric.', 
    experienceCount: 180,
    hiringProcess: [
      { title: "Online Assessment", desc: "Typically 2-3 questions on Codility focusing on string manipulation and arrays. 90 mins." },
      { title: "Technical Phone Screen", desc: "45 mins. Coding on Coderpad. Usually straightforward tree or linked list questions." },
      { title: "Onsite Loop (4 Rounds)", desc: "Mix of Object-Oriented Design, System Design, and algorithmic problem solving." }
    ],
    experiences: [
      {
        role: 'Software Engineer',
        date: 'April 2026',
        status: 'Offer',
        upvotes: 56,
        rounds: [
          { name: 'Technical 1', details: 'Reverse a Linked List and detect a cycle.' },
          { name: 'System Design', details: 'Design a distributed cache system.' },
          { name: 'As-App', details: 'Discussion with hiring manager about past projects and cultural fit.' }
        ]
      }
    ]
  },
  { 
    id: 'goldman-sachs', 
    name: 'Goldman Sachs', 
    type: 'Fintech', 
    difficulty: 'Hard', 
    description: 'Strong focus on math, puzzles, object-oriented programming, and low-latency systems.', 
    experienceCount: 89,
    hiringProcess: [
      { title: "CoderPad Round", desc: "Math-heavy algorithmic problems (e.g. fractional knapsack, prime factorization)." },
      { title: "Superday (Onsite)", desc: "3-4 back-to-back rounds. Focus on Java/C++ internals, concurrency, and OOP." }
    ],
    experiences: []
  },
  { 
    id: 'atlassian', 
    name: 'Atlassian', 
    type: 'Product-based', 
    difficulty: 'Medium', 
    description: 'Values code quality, testing, and practical application development. System design is crucial.', 
    experienceCount: 112,
    hiringProcess: [
      { title: "Code Craft Round", desc: "Given a basic working codebase, asked to refactor it, add features, and write unit tests." },
      { title: "System Design", desc: "Design a feature like Jira's commenting system or Confluence real-time editing." },
      { title: "Values Interview", desc: "Focus on Atlassian's core values (e.g., 'Don't #@!% the customer')." }
    ],
    experiences: []
  },
  { 
    id: 'uber', 
    name: 'Uber', 
    type: 'Product-based', 
    difficulty: 'Hard', 
    description: 'Expect complex system design focusing on scale and geospatial data, along with hard algorithmic problems.', 
    experienceCount: 95,
    hiringProcess: [
      { title: "CodeSignal OA", desc: "High bar. Need near perfect score (840+) to proceed." },
      { title: "Technical Phone Screen", desc: "Hard algorithmic question (often DP or Graphs)." },
      { title: "Onsite Loop", desc: "Architecture deep dive, System Design (e.g. Design Uber Eats driver dispatch), and 2 coding rounds." }
    ],
    experiences: []
  }
];
