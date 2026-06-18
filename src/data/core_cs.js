export const coreCsData = [
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    icon: '🧠',
    summary: 'Foundational concepts in computer science that underpin all software engineering topics.',
    concepts: ['Operating Systems', 'Networking', 'Concurrency', 'Compilers', 'Algorithms', 'Data Structures', 'Complexity Theory', 'Theory of Computation', 'Security', 'Distributed Systems'],
    questions: [
      { id: 'core-001', question: 'What is a deadlock and how can it be prevented?', difficulty: 'hard', answer: 'A deadlock occurs when two or more threads hold resources and each waits for the other to release a resource, causing a circular wait. Prevention strategies: resource ordering (impose a global order), lock timeout, using a lock hierarchy, or employing a deadlock‑detecting algorithm (wait‑for graph).', code: '', codeLanguage: '' },
      { id: 'core-002', question: 'Explain the difference between TCP and UDP.', difficulty: 'easy', answer: 'TCP is connection‑oriented, provides reliable ordered delivery with flow control and congestion control. UDP is connection‑less, offers best‑effort delivery without ordering or reliability, suitable for low‑latency applications like streaming or gaming.', code: '', codeLanguage: '' },
      { id: 'core-003', question: 'What is the CAP theorem?', difficulty: 'medium', answer: 'CAP states that a distributed data store can provide at most two of the following three guarantees: Consistency, Availability, and Partition tolerance. In the presence of a network partition, you must choose between consistency and availability.', code: '', codeLanguage: '' }
    ]
  }
];
