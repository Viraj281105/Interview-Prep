export const dsaData = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    icon: '📊',
    summary: 'Fundamental data structures, algorithmic techniques, and problem‑solving patterns.',
    concepts: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Sorting', 'Searching', 'Dynamic Programming', 'Complexity Analysis'],
    questions: [
      { id: 'dsa-001', question: 'Explain the time and space complexity of quicksort.', difficulty: 'medium', answer: 'Average case time O(n log n) and space O(log n) due to recursion. Worst‑case time O(n^2) when pivot choices are poor (e.g., already sorted array). Choosing a random pivot or using median‑of‑three mitigates worst‑case.', code: '', codeLanguage: '' },
      { id: 'dsa-002', question: 'How does a hash table resolve collisions using chaining?', difficulty: 'easy', answer: 'Each bucket stores a linked list (or another collection) of entries that hash to the same index. When inserting, the new entry is added to the bucket list. Lookup traverses the list to find a matching key.', code: '', codeLanguage: '' },
      { id: 'dsa-003', question: 'What is the difference between breadth‑first search (BFS) and depth‑first search (DFS) in a graph?', difficulty: 'easy', answer: 'BFS explores neighbors level by level using a queue, finding the shortest path in unweighted graphs. DFS explores as deep as possible along each branch using a stack (or recursion), useful for topological ordering and detecting cycles.', code: '', codeLanguage: '' }
    ]
  }
];
