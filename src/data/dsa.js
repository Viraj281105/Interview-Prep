export const dsaData = [
  {
    id: 'dsa-arrays',
    title: 'Arrays & Strings',
    icon: '🧮',
    summary: 'Fundamental sequential data structures and algorithms including two pointers, sliding window, and hashing.',
    concepts: ['Two Pointers', 'Sliding Window', 'Prefix Sum', 'Hash Maps', 'String Manipulation', 'In-place Operations'],
    questions: [
      {
        id: 'dsa-arr-001',
        question: 'Explain the Sliding Window technique.',
        difficulty: 'medium',
        answer: 'The sliding window technique is used to perform operations on a specific window size of a given array or string, such as finding the longest subarray with a target sum or the longest substring without repeating characters. It uses two pointers (start and end) to dynamically expand and contract the window, reducing nested loops from O(n^2) to O(n) time complexity.',
        code: "function maxSubArraySum(arr, k) {\n  let maxSum = 0, windowSum = 0;\n  for(let i=0; i<k; i++) windowSum += arr[i];\n  maxSum = windowSum;\n  for(let i=k; i<arr.length; i++) {\n    windowSum = windowSum - arr[i-k] + arr[i];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}",
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-arr-002',
        question: 'How do you detect an anagram?',
        difficulty: 'easy',
        answer: 'You can use a Hash Map (or frequency array for lowercase English letters) to count the occurrences of each character in the first string. Then, iterate through the second string, decrementing the counts. If the map ends up completely empty/zeroed, they are anagrams. Time complexity is O(N) and Space is O(1) if character set is fixed.',
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-arr-003',
        question: 'What is Kadane\'s Algorithm?',
        difficulty: 'medium',
        answer: 'Kadane\'s algorithm is a dynamic programming technique used to find the maximum contiguous subarray sum in an array of numbers (which may include negative numbers) in O(n) time. It maintains a current maximum running sum and a global maximum sum. If the current running sum becomes negative, it resets to zero.',
        code: "function maxSubArray(nums) {\n  let currentMax = nums[0];\n  let globalMax = nums[0];\n  for(let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    if (currentMax > globalMax) globalMax = currentMax;\n  }\n  return globalMax;\n}",
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'dsa-trees',
    title: 'Trees & Graphs',
    icon: '🌳',
    summary: 'Non-linear hierarchical and network data structures used for search, routing, and relations.',
    concepts: ['Binary Search Tree', 'AVL / Red-Black', 'DFS (Depth First Search)', 'BFS (Breadth First Search)', 'Trie', 'Dijkstra', 'Topological Sort', 'Union Find'],
    questions: [
      {
        id: 'dsa-tree-001',
        question: 'What is the difference between BFS and DFS in a Tree/Graph?',
        difficulty: 'easy',
        answer: 'BFS (Breadth-First Search) explores the tree level by level using a Queue. It is ideal for finding the shortest path in unweighted graphs. DFS (Depth-First Search) goes as deep as possible down one path before backtracking, typically using a Stack (or recursion). DFS is used for topological sorting, detecting cycles, and solving maze puzzles.',
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-tree-002',
        question: 'Explain how a Trie (Prefix Tree) works.',
        difficulty: 'hard',
        answer: 'A Trie is a tree-like data structure used to store a dynamic set or associative array where the keys are usually strings. Unlike a BST, no node stores the key associated with that node; instead, its position in the tree defines the key. Useful for autocomplete, spell checking, and finding longest prefix matches. Time complexity for insert/search is O(L), where L is the length of the string.',
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-tree-003',
        question: 'What is Topological Sorting?',
        difficulty: 'medium',
        answer: 'Topological sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge U -> V, vertex U comes before V. It is widely used in scheduling jobs from given dependencies, building systems (like Webpack or Makefiles), and resolving package dependencies. Can be implemented using DFS or Kahn\'s Algorithm (using in-degrees).',
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-tree-004',
        question: 'How do you detect a cycle in a Directed Graph vs Undirected Graph?',
        difficulty: 'hard',
        answer: 'Undirected Graph: Use DFS and keep track of the \'parent\' node. If you visit an already visited node that is NOT the parent, there is a cycle. Alternatively, use Union-Find. Directed Graph: Use DFS and keep track of nodes in the "current recursion stack". If you visit a node currently in the recursion stack, there is a cycle (a back edge). Union-Find cannot detect cycles in directed graphs easily.',
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'dsa-dp',
    title: 'Dynamic Programming',
    icon: '🧠',
    summary: 'Optimization techniques for solving complex problems by breaking them down into simpler overlapping subproblems.',
    concepts: ['Memoization (Top-Down)', 'Tabulation (Bottom-Up)', 'Overlapping Subproblems', 'Optimal Substructure', 'Knapsack Problem', 'LCS'],
    questions: [
      {
        id: 'dsa-dp-001',
        question: 'What are the two key properties a problem must have to use Dynamic Programming?',
        difficulty: 'medium',
        answer: '1. Overlapping Subproblems: The problem can be broken down into subproblems which are reused several times (e.g., Fibonacci). 2. Optimal Substructure: The optimal solution to the problem can be constructed from optimal solutions of its subproblems (e.g., Shortest Path).',
        codeLanguage: 'text'
      },
      {
        id: 'dsa-dp-002',
        question: 'Explain Memoization vs Tabulation.',
        difficulty: 'medium',
        answer: 'Memoization (Top-Down): Starts with the complex problem and breaks it down recursively, storing the results of subproblems in a cache (hash map or array) to avoid recalculating them. Tabulation (Bottom-Up): Starts with the smallest subproblems, solving them iteratively, and stores results in a table (usually an array), building up to the main problem. Tabulation avoids recursion overhead and stack overflow issues.',
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-dp-003',
        question: 'Describe the 0/1 Knapsack Problem.',
        difficulty: 'hard',
        answer: 'Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value. It\'s "0/1" because you either include an item entirely or exclude it. Solved using a 2D DP array dp[i][w] representing max value using first i items and weight limit w. Transition: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-weight[i]]).',
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'dsa-sorting',
    title: 'Sorting & Searching',
    icon: '🔍',
    summary: 'Fundamental algorithms to order data and search efficiently.',
    concepts: ['Binary Search', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort'],
    questions: [
      {
        id: 'dsa-sort-001',
        question: 'Explain the difference between Merge Sort and Quick Sort.',
        difficulty: 'medium',
        answer: 'Both are O(N log N) divide-and-conquer sorting algorithms. Merge Sort divides the array into halves, sorts them, and merges them back. It guarantees O(N log N) worst-case time but requires O(N) auxiliary space. Quick Sort picks a "pivot", partitions the array into elements smaller and larger than the pivot, and recursively sorts the partitions. It has an O(N^2) worst-case but is generally faster in practice due to better cache locality and requires only O(log N) space (in-place).',
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-sort-002',
        question: 'How does Binary Search work and what are its requirements?',
        difficulty: 'easy',
        answer: 'Binary Search finds the position of a target value within a SORTED array. It compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half. Time complexity is O(log N). The array MUST be sorted beforehand.',
        code: "function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
        codeLanguage: 'javascript'
      }
    ]
  },
  {
    id: 'dsa-heaps',
    title: 'Heaps & Priority Queues',
    icon: '⛰️',
    summary: 'Specialized tree-based data structures satisfying the heap property.',
    concepts: ['Min-Heap', 'Max-Heap', 'Heapify', 'Priority Queue', 'Kth Largest Element'],
    questions: [
      {
        id: 'dsa-heap-001',
        question: 'What is a Heap data structure?',
        difficulty: 'medium',
        answer: 'A Heap is a specialized complete binary tree that satisfies the heap property. In a Max-Heap, for any given node C, if P is a parent node of C, then the key of P is greater than or equal to the key of C. In a Min-Heap, the key of P is less than or equal to the key of C. It is commonly implemented using an array, where children of index i are at 2i+1 and 2i+2.',
        codeLanguage: 'javascript'
      },
      {
        id: 'dsa-heap-002',
        question: 'How do you find the Kth largest element in an unsorted array?',
        difficulty: 'medium',
        answer: '1. Sorting the array takes O(N log N). 2. Using a Min-Heap of size K takes O(N log K) time. We iterate through the array, adding elements to the heap. If the heap size exceeds K, we extract the minimum. At the end, the root of the Min-Heap is the Kth largest element. 3. Quickselect takes O(N) average time but O(N^2) worst case.',
        codeLanguage: 'javascript'
      }
    ]
  }
];
