export const linkedListsRecursionData = {
  id: 'dsa-linkedlists',
  title: 'Linked Lists & Recursion',
  icon: '🔗',
  summary: 'Pointers, cycles, reversing lists, and recursive problem solving (Backtracking).',
  concepts: ['Singly/Doubly Linked Lists', 'Fast & Slow Pointers', 'Recursion', 'Backtracking', 'Memoization'],
  questions: [
    { id: 'll-001', question: 'What is a Linked List?', difficulty: 'easy', type: 'theory', answer: 'A linear data structure consisting of nodes. Each node contains data and a reference (pointer) to the next node in the sequence. Unlike arrays, elements are not stored in contiguous memory locations.' },
    { id: 'll-002', question: 'Linked List vs Array?', difficulty: 'easy', type: 'theory', answer: 'Array: Contiguous memory, O(1) random access by index, O(N) insertion/deletion (due to shifting). Linked List: Non-contiguous memory, O(N) access (must traverse), O(1) insertion/deletion at a known node (just update pointers).' },
    { id: 'll-003', question: 'Singly vs Doubly Linked List?', difficulty: 'easy', type: 'theory', answer: 'Singly: Each node points only to the next node. Can only be traversed forward. Doubly: Each node points to both the next node and the previous node. Requires more memory per node but allows backward traversal.' },
    { id: 'll-004', question: 'Reverse a Linked List.', difficulty: 'easy', type: 'practical', answer: 'Use three pointers: `prev`, `curr`, and `next`. While `curr` is not null: save `curr.next`, set `curr.next` to `prev`, move `prev` to `curr`, and `curr` to the saved `next`.', code: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr !== null) {
    let nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  return prev;
}` },
    { id: 'll-005', question: 'Detect a Cycle in a Linked List (Floyd\'s Cycle-Finding Algorithm).', difficulty: 'easy', type: 'practical', answer: 'Use two pointers: `slow` (moves 1 step) and `fast` (moves 2 steps). If there is a cycle, the `fast` pointer will eventually catch up and equal the `slow` pointer. If `fast` reaches null, there is no cycle.', code: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}` },
    { id: 'll-006', question: 'Find the starting node of a Cycle in a Linked List.', difficulty: 'medium', type: 'practical', answer: 'First use fast/slow pointers to detect if a cycle exists. If they meet, reset the `slow` pointer to the `head` of the list. Move BOTH pointers 1 step at a time. The node where they meet again is the start of the cycle.' },
    { id: 'll-007', question: 'Merge Two Sorted Linked Lists.', difficulty: 'easy', type: 'practical', answer: 'Create a `dummy` node. Use a `tail` pointer. While both lists have nodes, compare their values. Attach the smaller node to `tail.next`, move the list\'s pointer and the `tail` pointer. Finally, attach any remaining nodes.', code: `function mergeTwoLists(l1, l2) {
  let dummy = new ListNode(0);
  let tail = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) { tail.next = l1; l1 = l1.next; }
    else { tail.next = l2; l2 = l2.next; }
    tail = tail.next;
  }
  tail.next = l1 || l2;
  return dummy.next;
}` },
    { id: 'll-008', question: 'Remove Nth Node From End of List.', difficulty: 'medium', type: 'practical', answer: 'Use a dummy node. Use two pointers, `left` and `right`. Move `right` forward by `N` steps. Then move both pointers one step at a time until `right.next` is null. `left` will now be pointing to the node right BEFORE the one to be removed. `left.next = left.next.next`.', code: `function removeNthFromEnd(head, n) {
  let dummy = new ListNode(0, head);
  let left = dummy, right = head;
  while (n > 0 && right) { right = right.next; n--; }
  while (right) { left = left.next; right = right.next; }
  left.next = left.next.next;
  return dummy.next;
}` },
    { id: 'll-009', question: 'Find the Middle of a Linked List.', difficulty: 'easy', type: 'practical', answer: 'Use fast and slow pointers. `slow` moves 1 step, `fast` moves 2 steps. When `fast` reaches the end (`fast === null` or `fast.next === null`), `slow` will be pointing at the middle node.', code: `function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}` },
    { id: 'll-010', question: 'Palindrome Linked List.', difficulty: 'medium', type: 'practical', answer: '1. Find the middle using fast/slow pointers. 2. Reverse the second half of the list starting from the middle. 3. Compare the first half and the reversed second half node by node. Time O(N), Space O(1).' },
    { id: 'll-011', question: 'Intersection of Two Linked Lists.', difficulty: 'easy', type: 'practical', answer: 'Two pointers `a` and `b` starting at `headA` and `headB`. Traverse. When `a` hits the end, redirect it to `headB`. When `b` hits the end, redirect it to `headA`. They will meet at the intersection node (or null if none) after at most two passes.' },
    { id: 'll-012', question: 'Reorder List (L0 -> Ln -> L1 -> Ln-1 ...).', difficulty: 'medium', type: 'practical', answer: '1. Find the middle of the list. 2. Reverse the second half. 3. Merge the two halves alternatingly (`first.next = second`, `second.next = first.next`).' },
    { id: 'll-013', question: 'Add Two Numbers (Stored as reversed Linked Lists).', difficulty: 'medium', type: 'practical', answer: 'Use a dummy node and a `carry` variable. Iterate while `l1` or `l2` or `carry` exists. Add `l1.val` + `l2.val` + `carry`. `carry = Math.floor(sum / 10)`. Append `sum % 10` as a new node to the result.' },
    { id: 'll-014', question: 'Copy List with Random Pointer.', difficulty: 'medium', type: 'practical', answer: 'Two passes using a Hash Map. First pass: Create a clone for every node and map `original -> clone`. Second pass: Iterate again. Set `clone.next = map.get(curr.next)` and `clone.random = map.get(curr.random)`.' },
    { id: 'll-015', question: 'Copy List with Random Pointer (O(1) space approach).', difficulty: 'hard', type: 'theory', answer: '1. Interleave cloned nodes (`A -> A\' -> B -> B\'). 2. Assign random pointers (`A\'.random = A.random.next`). 3. Restore original list and extract cloned list (`A.next = A.next.next`, `A\'.next = A\'.next.next`).' },
    { id: 'll-016', question: 'Swap Nodes in Pairs.', difficulty: 'medium', type: 'practical', answer: 'Use a dummy node. Maintain a `prev` pointer. While `prev.next` and `prev.next.next` exist, isolate `node1` and `node2`. Update pointers: `prev.next = node2`, `node1.next = node2.next`, `node2.next = node1`. Move `prev` to `node1`.' },
    { id: 'll-017', question: 'Reverse Nodes in k-Group.', difficulty: 'hard', type: 'practical', answer: 'Use a dummy node. In a loop, check if there are `k` nodes remaining. If yes, reverse that specific sub-list of `k` nodes. Update the pointers connecting the newly reversed sub-list to the rest of the list. Repeat.' },
    { id: 'll-018', question: 'LRU Cache Design.', difficulty: 'medium', type: 'practical', answer: 'Requires O(1) `get` and `put`. Use a Hash Map (key -> node) AND a Doubly Linked List (maintains order). MRU is at the tail, LRU is at the head. `get`: look up in map, move node to tail, return val. `put`: if exists, update and move to tail. If new, add to tail. If capacity exceeded, remove head and delete from map.' },
    { id: 'll-019', question: 'LFU Cache Design.', difficulty: 'hard', type: 'practical', answer: 'Requires O(1) ops. Use a Hash Map (`key -> node`). A second Hash Map (`freq -> DoublyLinkedList`). Maintain a `minFreq` variable. `get`: update node\'s freq, move it to the DLL for the new freq, update `minFreq` if old DLL is empty. `put`: If full, remove LRU from DLL at `minFreq`.' },
    { id: 'll-020', question: 'Partition List (around value x).', difficulty: 'medium', type: 'practical', answer: 'Create two dummy nodes, `less` and `greater`. Traverse the original list. If `val < x`, append to `less` list. If `val >= x`, append to `greater` list. Finally, connect the tail of `less` to the head of `greater`, and set `greater.tail.next = null`.' },
    { id: 'll-021', question: 'Rotate List.', difficulty: 'medium', type: 'practical', answer: 'Find the length of the list and the tail node. Connect tail to head (make it circular). Calculate `k = k % length`. The new tail is at `length - k` steps from the head. Break the circle there by setting `newTail.next = null`.' },
    { id: 'll-022', question: 'Sort List.', difficulty: 'medium', type: 'practical', answer: 'Use Merge Sort for O(N log N) time and O(log N) space. 1. Find middle using fast/slow pointers. 2. Split list into two. 3. Recursively sort both halves. 4. Merge the two sorted halves.' },
    { id: 'll-023', question: 'Insertion Sort List.', difficulty: 'medium', type: 'practical', answer: 'Use a dummy node for the sorted portion. Traverse original list. For each node, start from `dummy` and traverse the sorted portion to find where the current node belongs. Insert it. Repeat.' },
    { id: 'll-024', question: 'Remove Duplicates from Sorted List.', difficulty: 'easy', type: 'practical', answer: 'Traverse list. If `curr.val == curr.next.val`, skip the next node by doing `curr.next = curr.next.next`. Else, move `curr` forward.' },
    { id: 'll-025', question: 'Remove Duplicates from Sorted List II (remove all nodes with duplicates).', difficulty: 'medium', type: 'practical', answer: 'Use a dummy node. If `curr.next.val == curr.next.next.val`, find the end of the duplicates, and set `curr.next` to the node AFTER the duplicates. Else, move `curr` forward.' },
    { id: 'll-026', question: 'What is Recursion?', difficulty: 'easy', type: 'theory', answer: 'A method of solving a problem where the solution depends on solutions to smaller instances of the same problem. A recursive function calls itself. It MUST have a Base Case (to stop) and a Recursive Case (to move towards the base case).' },
    { id: 'll-027', question: 'What is a Stack Overflow?', difficulty: 'easy', type: 'theory', answer: 'Occurs when a program uses more memory space in the call stack than is allocated. In recursion, this happens if the base case is missing, incorrect, or takes too many calls to reach (deep recursion).' },
    { id: 'll-028', question: 'What is Tail Call Optimization?', difficulty: 'medium', type: 'theory', answer: 'An optimization where the compiler/interpreter replaces a recursive call with a simple `goto` loop, preventing the stack from growing. It only works if the recursive call is the VERY LAST operation in the function (a tail call).' },
    { id: 'll-029', question: 'What is Backtracking?', difficulty: 'medium', type: 'theory', answer: 'An algorithmic technique for finding all (or some) solutions to computational problems by incrementally building candidates. If a candidate cannot lead to a valid solution, it abandons it ("backtracks") and tries the next option.' },
    { id: 'll-030', question: 'Subsets (Power Set).', difficulty: 'medium', type: 'practical', answer: 'Backtracking. Maintain a `currentSubset` array. At each index, you have two choices: INCLUDE `nums[i]` (push, recurse, pop) or EXCLUDE `nums[i]` (recurse).', code: `function subsets(nums) {
  const res = [];
  function dfs(i, subset) {
    if (i === nums.length) { res.push([...subset]); return; }
    subset.push(nums[i]);
    dfs(i + 1, subset); // Include
    subset.pop();
    dfs(i + 1, subset); // Exclude
  }
  dfs(0, []);
  return res;
}` },
    { id: 'll-031', question: 'Subsets II (Contains duplicates).', difficulty: 'medium', type: 'practical', answer: 'Sort the array first. During backtracking, if you choose to EXCLUDE `nums[i]`, you must skip all subsequent elements that are identical to `nums[i]` to avoid generating duplicate subsets.' },
    { id: 'll-032', question: 'Permutations.', difficulty: 'medium', type: 'practical', answer: 'Backtracking. Maintain a boolean array or Set to track which elements are already in the current permutation. Loop through all elements. If not used, add it, recurse, then remove it.', code: `function permute(nums) {
  const res = [];
  function dfs(curr) {
    if (curr.length === nums.length) { res.push([...curr]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (curr.includes(nums[i])) continue;
      curr.push(nums[i]);
      dfs(curr);
      curr.pop();
    }
  }
  dfs([]);
  return res;
}` },
    { id: 'll-033', question: 'Permutations II (Contains duplicates).', difficulty: 'medium', type: 'practical', answer: 'Sort the array first. Use a boolean `used` array. During the loop, skip the element if it is already `used`. ALSO skip it if it\'s the same as the previous element AND the previous element was NOT used in the current recursive depth (`i > 0 && nums[i] == nums[i-1] && !used[i-1]`).' },
    { id: 'll-034', question: 'Combinations (n choose k).', difficulty: 'medium', type: 'practical', answer: 'Backtracking. Recursive function takes a `start` index. Loop `i` from `start` to `n`. Push `i`, recurse with `start = i + 1`, then pop. Base case: `if (curr.length === k)`.' },
    { id: 'll-035', question: 'Combination Sum (can use same number unlimited times).', difficulty: 'medium', type: 'practical', answer: 'Backtracking. Pass `index` and `total`. Base case: `total == target` (add to res), or `total > target` or `index >= nums.length` (return). Two choices: Include `nums[i]` (recurse with SAME `index`), or Exclude `nums[i]` (recurse with `index + 1`).' },
    { id: 'll-036', question: 'Combination Sum II (use number once, contains duplicates).', difficulty: 'medium', type: 'practical', answer: 'Sort the array. Pass `index`. Loop `i` from `index` to `length`. If `i > index && nums[i] == nums[i-1]`, `continue` (skip duplicate branches). Include `nums[i]`, recurse with `i + 1`, pop.' },
    { id: 'll-037', question: 'Word Search.', difficulty: 'medium', type: 'practical', answer: 'Iterate grid. If cell matches first letter, start DFS. In DFS, check bounds and match. Temporarily mark cell as visited (e.g., set to `#`). Recurse in 4 directions. After recursion, unmark cell (backtrack).' },
    { id: 'll-038', question: 'Palindrome Partitioning.', difficulty: 'medium', type: 'practical', answer: 'Backtracking. Loop `end` index from `start` to string length. If substring `start` to `end` is a palindrome, add it to `currentPartition` and recurse with `start = end + 1`. Pop after recursion.' },
    { id: 'll-039', question: 'Letter Combinations of a Phone Number.', difficulty: 'medium', type: 'practical', answer: 'Create a mapping of digits to letters. Backtracking. Iterate through the letters corresponding to the current digit, add the letter to the current string, and recurse for the next digit.' },
    { id: 'll-040', question: 'N-Queens Problem.', difficulty: 'hard', type: 'practical', answer: 'Place queens row by row. Use three Sets to track attacked columns, positive diagonals (`r+c`), and negative diagonals (`r-c`). If placing at `(r,c)` is safe, add to sets, recurse to next row. If successful, done. If not, remove from sets (backtrack).' },
    { id: 'll-041', question: 'Sudoku Solver.', difficulty: 'hard', type: 'practical', answer: 'Find an empty cell. Try placing digits 1-9. Check validity (row, col, 3x3 box). If valid, place it and recursively solve the rest. If a recursive call returns true, done. If it returns false, backtrack (reset cell to `.`).' },
    { id: 'll-042', question: 'Restore IP Addresses.', difficulty: 'medium', type: 'practical', answer: 'Backtracking. Place exactly 3 dots. At each step, a segment can be 1, 2, or 3 digits. Ensure the segment is `<= 255` and doesn\'t have leading zeros (unless it is exactly `"0"`).' },
    { id: 'll-043', question: 'Generate Parentheses.', difficulty: 'medium', type: 'practical', answer: 'Maintain counts of `openN` and `closedN`. If `openN < n`, append `(` and recurse. If `closedN < openN`, append `)` and recurse. Base case: `openN == n && closedN == n`.' },
    { id: 'll-044', question: 'Matchsticks to Square.', difficulty: 'medium', type: 'practical', answer: 'Sort matchsticks descending (optimization). The perimeter must be divisible by 4. Target side length is `perimeter / 4`. Backtrack with an array of size 4 representing sides. Try placing current matchstick in each of the 4 sides. If valid, recurse.' },
    { id: 'll-045', question: 'Split String Into Max Number of Unique Substrings.', difficulty: 'medium', type: 'practical', answer: 'Backtracking with a Set. Loop `end` from `start` to string length. If the substring is not in the Set, add it, recurse, then remove it. Track the maximum depth reached.' },
    { id: 'll-046', question: 'Find Unique Binary String.', difficulty: 'medium', type: 'practical', answer: 'Cantor\'s Diagonalization is faster, but Backtracking works. Generate all binary strings of length `n`. If the generated string is not in the provided array, return it. Base case `length == n`.' },
    { id: 'll-047', question: 'Fair Distribution of Cookies.', difficulty: 'medium', type: 'practical', answer: 'Backtrack. Maintain an array of size `k` (children). For each cookie, try giving it to each child (add cookie value to child\'s total, recurse, subtract). Track the minimum of the maximum child total.' },
    { id: 'll-048', question: 'M-Coloring Problem.', difficulty: 'medium', type: 'practical', answer: 'Given a graph, color nodes with `m` colors such that no adjacent nodes have the same color. Try all colors for node 1, if valid, recurse for node 2, etc. If no color works, backtrack.' },
    { id: 'll-049', question: 'Rat in a Maze.', difficulty: 'medium', type: 'practical', answer: 'Backtracking in a 2D grid. Start at `(0,0)`, try moving D, L, R, U. Append move direction to string. Mark cell visited (`0`). Recurse. Unmark visited (`1`) and pop direction string.' },
    { id: 'll-050', question: 'Design Linked List (Singly or Doubly).', difficulty: 'medium', type: 'practical', answer: 'Implement a full class with `get(index)`, `addAtHead(val)`, `addAtTail(val)`, `addAtIndex(index, val)`, and `deleteAtIndex(index)`. Keep track of `size` and use a `dummy` head for easier edge-case handling.' }
  ]
};
