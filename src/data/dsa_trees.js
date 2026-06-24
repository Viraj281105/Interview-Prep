export const treesGraphsData = {
  id: 'dsa-trees',
  title: 'Trees & Graphs',
  icon: '🌲',
  summary: 'Hierarchical and relational data structures, DFS, BFS, and shortest path algorithms.',
  concepts: ['Binary Trees', 'BST', 'DFS', 'BFS', 'Topological Sort', 'Dijkstra', 'Trie', 'Union Find'],
  
  learningLinks: [
    { title: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
    { title: 'LeetCode Explore', url: 'https://leetcode.com/explore/' }
  ],
  questions: [
    { id: 'tree-001', question: 'What is a Binary Tree?', difficulty: 'easy', type: 'theory', answer: 'A tree data structure in which each node has at most two children, referred to as the left child and the right child.' },
    { id: 'tree-002', question: 'What is a Binary Search Tree (BST)?', difficulty: 'easy', type: 'theory', answer: 'A binary tree where the value of every node in a node\'s left subtree is strictly less than the node\'s value, and the value of every node in its right subtree is strictly greater than the node\'s value. In-order traversal of a BST yields a sorted array.' },
    { id: 'tree-003', question: 'Explain Pre-order, In-order, and Post-order Traversals (DFS).', difficulty: 'medium', type: 'theory', answer: 'Depth-First Search traversals. Pre-order: Root, Left, Right (used to copy a tree). In-order: Left, Root, Right (used to get sorted elements of a BST). Post-order: Left, Right, Root (used to delete a tree, since you must delete children before the parent).' },
    { id: 'tree-004', question: 'Explain Level-order Traversal (BFS).', difficulty: 'medium', type: 'theory', answer: 'Breadth-First Search traversal. Visits all the nodes at the present depth level before moving on to the nodes at the next depth level. Implemented iteratively using a Queue.' },
    { id: 'tree-005', question: 'Invert a Binary Tree.', difficulty: 'easy', type: 'practical', answer: 'Swap the left and right children of every node in the tree using recursion (DFS).', code: `function invertTree(root) {
  if (!root) return null;
  let temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}` },
    { id: 'tree-006', question: 'Find the Maximum Depth of a Binary Tree.', difficulty: 'easy', type: 'practical', answer: 'The depth is 1 + the maximum depth of its left and right subtrees. Solve recursively.', code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}` },
    { id: 'tree-007', question: 'Check if two Binary Trees are Identical.', difficulty: 'easy', type: 'practical', answer: 'Traverse both trees simultaneously. If both nodes are null, return true. If one is null or values differ, return false. Recursively check left and right subtrees.', code: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}` },
    { id: 'tree-008', question: 'Check if a Binary Tree is a Subtree of another tree.', difficulty: 'easy', type: 'practical', answer: 'Traverse the main tree (root). For every node, check if the tree starting at that node is identical to the `subRoot`.', code: `function isSubtree(root, subRoot) {
  if (!subRoot) return true;
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
// isSameTree defined in previous answer` },
    { id: 'tree-009', question: 'Lowest Common Ancestor (LCA) of a BST.', difficulty: 'medium', type: 'practical', answer: 'Leverage the BST property. Start at the root. If both p and q are less than root, LCA is in left subtree. If both are greater, LCA is in right subtree. Otherwise, the current root is the LCA (they split).', code: `function lowestCommonAncestorBST(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) root = root.left;
    else if (p.val > root.val && q.val > root.val) root = root.right;
    else return root;
  }
}` },
    { id: 'tree-010', question: 'Lowest Common Ancestor (LCA) of a generic Binary Tree.', difficulty: 'medium', type: 'practical', answer: 'Use DFS. If root is null, p, or q, return root. Recursively search left and right. If both return non-null, the current root is the LCA. If only one returns non-null, pass that up.', code: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ? left : right;
}` },
    { id: 'tree-011', question: 'Binary Tree Level Order Traversal (return array of arrays per level).', difficulty: 'medium', type: 'practical', answer: 'Use BFS with a Queue. For each level, determine its size, dequeue that many elements, add them to a level array, and enqueue their children.', code: `function levelOrder(root) {
  if (!root) return [];
  const res = [], q = [root];
  while (q.length > 0) {
    const levelSize = q.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      let node = q.shift();
      currentLevel.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(currentLevel);
  }
  return res;
}` },
    { id: 'tree-012', question: 'Validate a Binary Search Tree.', difficulty: 'medium', type: 'practical', answer: 'Use DFS. Pass a valid range (min, max) down the tree. The root\'s value must be > min and < max. Left child must be < root.val, right child > root.val.', code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && 
         isValidBST(root.right, root.val, max);
}` },
    { id: 'tree-013', question: 'Kth Smallest Element in a BST.', difficulty: 'medium', type: 'practical', answer: 'Use iterative In-order traversal (which visits elements in sorted order). Decrement k every time you pop a node from the stack. When k == 0, you found the element.', code: `function kthSmallest(root, k) {
  const stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) { stack.push(curr); curr = curr.left; }
    curr = stack.pop();
    k--;
    if (k === 0) return curr.val;
    curr = curr.right;
  }
}` },
    { id: 'tree-014', question: 'Construct Binary Tree from Preorder and Inorder Traversal.', difficulty: 'medium', type: 'practical', answer: 'The first element in Preorder is always the root. Find this root in the Inorder array to split the tree into Left and Right subtrees. Recursively build.', code: `function buildTree(preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;
  let root = new TreeNode(preorder[0]);
  let mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}` },
    { id: 'tree-015', question: 'Binary Tree Maximum Path Sum.', difficulty: 'hard', type: 'practical', answer: 'A path can start and end at any node. Use DFS. For each node, compute the max path sum of its left and right subtrees (ignore negative sums). Update a global maximum representing a path passing *through* the current node. Return the max path extending downwards from the current node.', code: `function maxPathSum(root) {
  let max = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    let left = Math.max(0, dfs(node.left));
    let right = Math.max(0, dfs(node.right));
    max = Math.max(max, node.val + left + right); // Path through root
    return node.val + Math.max(left, right); // Path extending downwards
  }
  dfs(root);
  return max;
}` },
    { id: 'tree-016', question: 'Serialize and Deserialize a Binary Tree.', difficulty: 'hard', type: 'practical', answer: 'Use Preorder Traversal with a delimiter (e.g., `,`) and a special character for null nodes (e.g., `N`). To deserialize, split the string into an array and use an iterator/pointer to recursively rebuild the tree in preorder fashion.', code: `function serialize(root) {
  if (!root) return 'N';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}
function deserialize(data) {
  const vals = data.split(',');
  let i = 0;
  function build() {
    if (vals[i] === 'N') { i++; return null; }
    let node = new TreeNode(parseInt(vals[i++]));
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}` },
    { id: 'tree-017', question: 'What is a Trie (Prefix Tree)?', difficulty: 'medium', type: 'theory', answer: 'A tree-like data structure used to efficiently store and retrieve keys in a dataset of strings. Each node represents a character. Useful for autocomplete, spell checkers, and IP routing.' },
    { id: 'tree-018', question: 'Implement a Trie.', difficulty: 'medium', type: 'practical', answer: 'Use a `TrieNode` class containing a hash map of children and an `isEnd` boolean. Implement `insert`, `search`, and `startsWith`.', code: `class TrieNode {
  constructor() { this.children = {}; this.isEnd = false; }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let curr = this.root;
    for (let c of word) {
      if (!curr.children[c]) curr.children[c] = new TrieNode();
      curr = curr.children[c];
    }
    curr.isEnd = true;
  }
  search(word) {
    let node = this.traverse(word);
    return node !== null && node.isEnd === true;
  }
  startsWith(prefix) { return this.traverse(prefix) !== null; }
  traverse(word) {
    let curr = this.root;
    for (let c of word) {
      if (!curr.children[c]) return null;
      curr = curr.children[c];
    }
    return curr;
  }
}` },
    { id: 'tree-019', question: 'Word Search II (Find words from a dictionary in a 2D grid).', difficulty: 'hard', type: 'practical', answer: 'Use a Trie + DFS. Insert all words into a Trie. Iterate through the grid. If the cell matches a Trie root child, start a DFS. Pass the TrieNode down the DFS to prune invalid paths immediately. Time O(M*N * 4^L).' },
    { id: 'tree-020', question: 'What is a Graph?', difficulty: 'easy', type: 'theory', answer: 'A non-linear data structure consisting of Nodes (Vertices) and Edges that connect them. Can be Directed (one-way) or Undirected (two-way), and Weighted or Unweighted.' },
    { id: 'tree-021', question: 'Adjacency Matrix vs Adjacency List.', difficulty: 'medium', type: 'theory', answer: 'Matrix: A 2D array where `matrix[i][j] = 1` if edge exists. Space O(V^2), good for dense graphs. Fast O(1) edge lookup. List: Array/Hash Map of Linked Lists/Arrays. `list[i]` contains neighbors of vertex `i`. Space O(V+E), good for sparse graphs. Slower edge lookup, fast traversal.' },
    { id: 'tree-022', question: 'Number of Islands (Find connected components in a grid).', difficulty: 'medium', type: 'practical', answer: 'Iterate the 2D grid. When you find a `1` (land), increment island count and launch a DFS/BFS to mark all adjacent `1`s as visited (e.g., turn them to `0`) so they aren\'t counted again.', code: `function numIslands(grid) {
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') return;
    grid[r][c] = '0'; // mark visited
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  };
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}` },
    { id: 'tree-023', question: 'Clone a Graph.', difficulty: 'medium', type: 'practical', answer: 'Use DFS or BFS and a Hash Map to keep track of already cloned nodes to avoid infinite loops (cycles). Map original node to the cloned node.', code: `function cloneGraph(node, map = new Map()) {
  if (!node) return null;
  if (map.has(node)) return map.get(node);
  let clone = new _Node(node.val);
  map.set(node, clone);
  for (let neighbor of node.neighbors) {
    clone.neighbors.push(cloneGraph(neighbor, map));
  }
  return clone;
}` },
    { id: 'tree-024', question: 'Course Schedule (Detect Cycle in a Directed Graph).', difficulty: 'medium', type: 'practical', answer: 'Represent courses and prerequisites as a directed graph. Use DFS with a `visiting` state (in the current path) and a `visited` state (completely processed). If you encounter a `visiting` node, there is a cycle (cannot finish courses).', code: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({length: numCourses}, () => []);
  for (let [crs, pre] of prerequisites) adj[crs].push(pre);
  const visiting = new Set(), visited = new Set();
  
  function dfs(crs) {
    if (visiting.has(crs)) return false; // cycle detected
    if (visited.has(crs)) return true;
    visiting.add(crs);
    for (let pre of adj[crs]) {
      if (!dfs(pre)) return false;
    }
    visiting.delete(crs);
    visited.add(crs);
    return true;
  }
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
}` },
    { id: 'tree-025', question: 'What is Topological Sorting?', difficulty: 'medium', type: 'theory', answer: 'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge U -> V, vertex U comes before V in the ordering. Used for scheduling tasks with dependencies (e.g., build systems, course schedules).' },
    { id: 'tree-026', question: 'Implement Kahn\'s Algorithm for Topological Sort.', difficulty: 'medium', type: 'practical', answer: 'Calculate the in-degree (number of incoming edges) for all nodes. Push nodes with in-degree 0 to a Queue. While Queue is not empty, pop a node, add it to result, and decrement the in-degree of its neighbors. If a neighbor\'s in-degree becomes 0, push it to the Queue.', code: `function topologicalSort(numNodes, edges) {
  const adj = Array.from({length: numNodes}, () => []);
  const inDegree = new Array(numNodes).fill(0);
  for (let [u, v] of edges) { adj[u].push(v); inDegree[v]++; }
  
  const q = [], res = [];
  for (let i = 0; i < numNodes; i++) { if (inDegree[i] === 0) q.push(i); }
  
  while (q.length) {
    let node = q.shift();
    res.push(node);
    for (let neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) q.push(neighbor);
    }
  }
  return res.length === numNodes ? res : []; // Empty if cycle exists
}` },
    { id: 'tree-027', question: 'Pacific Atlantic Water Flow.', difficulty: 'medium', type: 'practical', answer: 'Instead of doing DFS from every cell to see if it reaches both oceans, do DFS *from* the oceans inward (going uphill). Keep two boolean matrices (canReachPacific, canReachAtlantic). Cells that are true in both are the answer.' },
    { id: 'tree-028', question: 'Rotting Oranges (Shortest path/time in a grid).', difficulty: 'medium', type: 'practical', answer: 'Use multi-source BFS. Put all initially rotten oranges in a Queue. Keep track of `fresh` count. Process level by level (minutes). For each rotten orange, rot its fresh neighbors, decrement `fresh` count, and push them to the Queue. Return minutes if `fresh === 0`, else -1.' },
    { id: 'tree-029', question: 'Word Ladder (Find shortest transformation sequence).', difficulty: 'hard', type: 'practical', answer: 'Use BFS to find the shortest path in an unweighted graph. The graph is implicit: nodes are words, edges exist if words differ by exactly 1 letter. Generate all possible 1-letter mutations of the current word and check if they exist in the dictionary (Hash Set).' },
    { id: 'tree-030', question: 'Dijkstra\'s Algorithm.', difficulty: 'hard', type: 'theory', answer: 'Finds the shortest path from a single source node to all other nodes in a weighted graph with NON-NEGATIVE edges. It uses a Priority Queue (Min-Heap) to greedily select the unvisited node with the smallest known distance.' },
    { id: 'tree-031', question: 'Bellman-Ford Algorithm.', difficulty: 'hard', type: 'theory', answer: 'Finds shortest path in a weighted graph. Unlike Dijkstra, it CAN handle negative edge weights. It works by relaxing all edges V-1 times. If it can be relaxed a V-th time, a negative weight cycle exists. Time complexity O(V*E).' },
    { id: 'tree-032', question: 'Floyd-Warshall Algorithm.', difficulty: 'expert', type: 'theory', answer: 'Finds shortest paths between ALL pairs of vertices. Uses Dynamic Programming. `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])` for all k. Time complexity O(V^3).' },
    { id: 'tree-033', question: 'What is a Minimum Spanning Tree (MST)?', difficulty: 'medium', type: 'theory', answer: 'A subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles, and with the minimum possible total edge weight.' },
    { id: 'tree-034', question: 'Kruskal\'s Algorithm.', difficulty: 'hard', type: 'theory', answer: 'Finds an MST. Sort all edges from lowest to highest weight. Iterate through the edges. If adding an edge doesn\'t create a cycle (checked using Union-Find), add it to the MST. Stop when MST has V-1 edges.' },
    { id: 'tree-035', question: 'Prim\'s Algorithm.', difficulty: 'hard', type: 'theory', answer: 'Finds an MST. Starts with a single vertex. Greedily grows the tree by picking the minimum weight edge that connects a vertex in the tree to a vertex outside the tree (using a Min-Heap/Priority Queue). Similar to Dijkstra.' },
    { id: 'tree-036', question: 'What is the Union-Find (Disjoint Set) data structure?', difficulty: 'hard', type: 'theory', answer: 'Maintains a collection of disjoint sets. Supports two near-O(1) operations: `Find` (determine which set a specific element is in) and `Union` (join two sets into a single set). Essential for cycle detection in undirected graphs and Kruskal\'s.' },
    { id: 'tree-037', question: 'Implement Union-Find with Path Compression and Union by Rank.', difficulty: 'hard', type: 'practical', answer: '`parent` array tracks roots. `rank` array tracks tree height to keep it flat. Path Compression makes all nodes on the path point directly to the root during `find`.', code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}` },
    { id: 'tree-038', question: 'Redundant Connection (Find the edge that creates a cycle).', difficulty: 'medium', type: 'practical', answer: 'Iterate through the edges of an undirected graph. For each edge `(u, v)`, perform a `Union`. If `Find(u) === Find(v)`, they are already in the same set, meaning this edge creates a cycle. Return it.' },
    { id: 'tree-039', question: 'Network Delay Time.', difficulty: 'hard', type: 'practical', answer: 'Classic Dijkstra\'s Algorithm problem. Find the shortest path from the source node to ALL other nodes. The total time taken for the signal to reach all nodes is the maximum of these shortest paths.' },
    { id: 'tree-040', question: 'Alien Dictionary (Find order of characters in a new language).', difficulty: 'hard', type: 'practical', answer: '1. Build a directed graph comparing adjacent words. Find the first differing character: `word1[i] -> word2[i]`. 2. Perform Topological Sort using Kahn\'s algorithm or DFS. If there\'s a cycle, the dictionary is invalid.' },
    { id: 'tree-041', question: 'Graph Valid Tree (Check if undirected graph is a valid tree).', difficulty: 'medium', type: 'practical', answer: 'A valid tree must have exactly `n-1` edges and be fully connected (no cycles). You can use DFS/BFS to ensure all nodes are reached and no back-edges exist, OR use Union-Find (if an edge connects two already unioned nodes, it\'s a cycle).' },
    { id: 'tree-042', question: 'Number of Connected Components in an Undirected Graph.', difficulty: 'medium', type: 'practical', answer: 'Can be solved with DFS/BFS or Union-Find. Initialize `count = n`. For each edge `(u, v)`, if `Union(u, v)` succeeds (they were in different sets), decrement `count`. Return `count`.' },
    { id: 'tree-043', question: 'Word Ladder II (Return ALL shortest transformation sequences).', difficulty: 'expert', type: 'practical', answer: 'Use BFS to find the shortest path and build an adjacency list pointing backwards from children to parents. Then use DFS (backtracking) from the end word to the start word to reconstruct all the shortest paths.' },
    { id: 'tree-044', question: 'Find Median from Data Stream.', difficulty: 'hard', type: 'theory', answer: 'Maintain two Heaps. A Max-Heap for the smaller half of numbers, and a Min-Heap for the larger half. Keep their sizes balanced (Max-Heap size >= Min-Heap size). If total count is odd, median is the top of Max-Heap. If even, average of the tops.' },
    { id: 'tree-045', question: 'Design Add and Search Words Data Structure (supports `.` wildcard).', difficulty: 'medium', type: 'practical', answer: 'Use a Trie. Normal insertion. For searching: use DFS on the Trie. If the character is a `.`, recursively check ALL children of the current node. If any path returns true, the word is found.' },
    { id: 'tree-046', question: 'Count Good Nodes in Binary Tree (Path from root has no greater values).', difficulty: 'medium', type: 'practical', answer: 'Use DFS. Pass the maximum value seen so far along the path down to the children. If the current node\'s value is >= `maxSoFar`, increment a counter and update `maxSoFar`.', code: `function goodNodes(root, maxSoFar = -Infinity) {
  if (!root) return 0;
  let count = root.val >= maxSoFar ? 1 : 0;
  maxSoFar = Math.max(maxSoFar, root.val);
  count += goodNodes(root.left, maxSoFar);
  count += goodNodes(root.right, maxSoFar);
  return count;
}` },
    { id: 'tree-047', question: 'Diameter of Binary Tree.', difficulty: 'easy', type: 'practical', answer: 'The diameter is the longest path between any two nodes. Use DFS to calculate the depth of the tree. The diameter passing through any node is `leftDepth + rightDepth`. Maintain a global max variable updated during the DFS.', code: `function diameterOfBinaryTree(root) {
  let max = 0;
  function dfs(node) {
    if (!node) return 0;
    let left = dfs(node.left);
    let right = dfs(node.right);
    max = Math.max(max, left + right);
    return Math.max(left, right) + 1;
  }
  dfs(root);
  return max;
}` },
    { id: 'tree-048', question: 'Symmetric Tree (Mirror Image).', difficulty: 'easy', type: 'practical', answer: 'Check if the left and right subtrees are mirrors of each other. Recursive helper function takes two nodes: `node1.val === node2.val` AND `helper(node1.left, node2.right)` AND `helper(node1.right, node2.left)`.', code: `function isSymmetric(root) {
  if (!root) return true;
  function isMirror(t1, t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2 || t1.val !== t2.val) return false;
    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
  }
  return isMirror(root.left, root.right);
}` },
    { id: 'tree-049', question: 'Right Side View of Binary Tree.', difficulty: 'medium', type: 'practical', answer: 'Use BFS (Level Order Traversal). At each level, the last node processed in the queue is the one visible from the right side. Add its value to the result array.', code: `function rightSideView(root) {
  if (!root) return [];
  const res = [], q = [root];
  while (q.length > 0) {
    const levelSize = q.length;
    for (let i = 0; i < levelSize; i++) {
      let node = q.shift();
      if (i === levelSize - 1) res.push(node.val); // Last node in level
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }
  return res;
}` },
    { id: 'tree-050', question: 'Flatten Binary Tree to Linked List (In-place).', difficulty: 'medium', type: 'practical', answer: 'Post-order DFS (Right, Left, Root). Keep track of a global `prev` node. For each node, `node.right = prev`, `node.left = null`, and `prev = node`.' }
  ]
};
