export const heapsStacksQueuesData = {
  id: 'dsa-heaps',
  title: 'Heaps, Stacks & Queues',
  icon: '🥞',
  summary: 'LIFO/FIFO data structures, Monotonic Stacks, and Priority Queues.',
  concepts: ['LIFO', 'FIFO', 'Min/Max Heap', 'Priority Queue', 'Monotonic Stack', 'Circular Queue'],
  
  learningLinks: [
    { title: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
    { title: 'LeetCode Explore', url: 'https://leetcode.com/explore/' }
  ],
  questions: [
    { id: 'hsq-001', question: 'What is a Stack?', difficulty: 'easy', type: 'theory', answer: 'A linear data structure that follows the Last-In, First-Out (LIFO) principle. The last element added to the stack will be the first one removed. Operations: Push, Pop, Peek.' },
    { id: 'hsq-002', question: 'What is a Queue?', difficulty: 'easy', type: 'theory', answer: 'A linear data structure that follows the First-In, First-Out (FIFO) principle. The first element added will be the first one removed. Operations: Enqueue, Dequeue, Front, Rear.' },
    { id: 'hsq-003', question: 'How can you implement a Stack in JavaScript?', difficulty: 'easy', type: 'practical', answer: 'Use a JavaScript Array. `push()` adds to the top, `pop()` removes from the top, and `array[array.length - 1]` peeks at the top element. All operations are O(1) time.' },
    { id: 'hsq-004', question: 'How can you implement a Queue in JavaScript efficiently?', difficulty: 'medium', type: 'practical', answer: 'While you can use an Array (`push` and `shift`), `shift()` is O(N) because it re-indexes all elements. For O(1) dequeue, use a Linked List or a simple Object with `head` and `tail` pointers.', code: `class Queue {
  constructor() { this.items = {}; this.head = 0; this.tail = 0; }
  enqueue(val) { this.items[this.tail++] = val; }
  dequeue() {
    if (this.head === this.tail) return undefined;
    const val = this.items[this.head];
    delete this.items[this.head++];
    return val;
  }
}` },
    { id: 'hsq-005', question: 'Implement a Queue using Stacks.', difficulty: 'medium', type: 'practical', answer: 'Use two Stacks (`pushStack` and `popStack`). Enqueue always pushes to `pushStack`. Dequeue pops from `popStack`. If `popStack` is empty, pop ALL elements from `pushStack` and push them into `popStack` (reversing their order). Amortized O(1) time.' },
    { id: 'hsq-006', question: 'Implement a Stack using Queues.', difficulty: 'medium', type: 'practical', answer: 'Use a single Queue. When pushing a new element, enqueue it, then dequeue all previously existing elements and enqueue them back. This moves the newly added element to the front of the queue (top of the stack).' },
    { id: 'hsq-007', question: 'Min Stack (Stack that supports getMin() in O(1) time).', difficulty: 'medium', type: 'practical', answer: 'Maintain two stacks: one for the actual values, and one for the minimums. When pushing `x`, push `x` to main stack. Push `min(x, minStack.peek())` to the min stack. When popping, pop from both.' },
    { id: 'hsq-008', question: 'Valid Parentheses.', difficulty: 'easy', type: 'practical', answer: 'Iterate the string. Push opening brackets to a Stack. If you encounter a closing bracket, pop from the stack and check if it\'s the matching opening bracket. If the stack is empty at the end, it\'s valid.' },
    { id: 'hsq-009', question: 'Evaluate Reverse Polish Notation (Postfix).', difficulty: 'medium', type: 'practical', answer: 'Use a Stack. Iterate the tokens. If it\'s a number, push it. If it\'s an operator, pop the top two numbers, apply the operator (`second op first`), and push the result back. At the end, the stack contains the final result.' },
    { id: 'hsq-010', question: 'Daily Temperatures.', difficulty: 'medium', type: 'practical', answer: 'Use a Monotonic Decreasing Stack. Store INDICES in the stack. Iterate array. While current temp > temp at stack\'s top index, pop the stack. The answer for the popped index is `currentIndex - poppedIndex`. Push current index.' },
    { id: 'hsq-011', question: 'What is a Monotonic Stack?', difficulty: 'hard', type: 'theory', answer: 'A stack whose elements are strictly increasing or strictly decreasing. It is used to find the "Next Greater Element" or "Next Smaller Element" in O(N) time by maintaining the monotonic property.' },
    { id: 'hsq-012', question: 'Next Greater Element I.', difficulty: 'easy', type: 'practical', answer: 'Use a Monotonic Decreasing Stack and a Hash Map. Iterate through the array. While the current element is greater than the top of the stack, pop the stack and map `popped -> current`. Push current. Anything left in stack maps to -1.' },
    { id: 'hsq-013', question: 'Largest Rectangle in Histogram.', difficulty: 'hard', type: 'practical', answer: 'Use a Monotonic Increasing Stack of indices. When you encounter a height SMALLER than the top of the stack, pop. The height is `arr[popped]`. The width is `currentIndex - newTopIndex - 1`. Calculate area. Push current index.' },
    { id: 'hsq-014', question: 'Trapping Rain Water (Stack Approach).', difficulty: 'hard', type: 'practical', answer: 'Use a Monotonic Decreasing Stack. When `height[i]` > top of stack, pop the stack. The popped element is the "bottom" of a puddle. The new top is the left boundary, `i` is the right boundary. Water = `min(height[left], height[right]) - height[bottom] * width`.' },
    { id: 'hsq-015', question: 'Decode String (e.g., `3[a2[c]]`).', difficulty: 'medium', type: 'practical', answer: 'Use a Stack. Iterate string. If digit, build `k`. If `[`, push current `string` and `k` to stack, reset them. If `]`, pop `k` and `prevString` from stack. `string = prevString + string.repeat(k)`. If letter, append to `string`.' },
    { id: 'hsq-016', question: 'Asteroid Collision.', difficulty: 'medium', type: 'practical', answer: 'Use a Stack. Iterate. If asteroid is positive, push it. If negative, while stack is not empty AND top is positive AND top < absolute(negative), pop stack. If top === absolute(negative), pop and destroy both. If top > absolute, negative is destroyed.' },
    { id: 'hsq-017', question: 'Remove All Adjacent Duplicates In String.', difficulty: 'easy', type: 'practical', answer: 'Use a Stack. Iterate string. If current char equals top of stack, pop stack. Else, push current char. Join the stack at the end.' },
    { id: 'hsq-018', question: 'Basic Calculator (supports +, -, (, )).', difficulty: 'hard', type: 'practical', answer: 'Maintain a `result`, `currentNumber`, and `sign` (1 or -1). If `(`, push `result` and `sign` to stack, reset them. If `)`, pop `sign` and `result`, add `currentNumber * oldSign` to `oldResult`. Time O(N).' },
    { id: 'hsq-019', question: 'Online Stock Span.', difficulty: 'medium', type: 'practical', answer: 'Use a Monotonic Decreasing Stack storing `[price, span]`. When a new price comes, initialize `span = 1`. While stack is not empty and top `price <= current price`, pop and add its span to current `span`. Push `[price, span]`.' },
    { id: 'hsq-020', question: 'Design Circular Queue.', difficulty: 'medium', type: 'practical', answer: 'Use a fixed-size array. Maintain `head`, `tail`, and `size`. Enqueue: `tail = (tail + 1) % capacity`. Dequeue: `head = (head + 1) % capacity`. Full if `size === capacity`.' },
    { id: 'hsq-021', question: 'Task Scheduler.', difficulty: 'medium', type: 'practical', answer: 'Find the task with max frequency (`maxFreq`). The max possible idle slots are `(maxFreq - 1) * n`. Iterate other frequencies, subtract `min(freq, maxFreq - 1)` from idle slots. Total time is `tasks.length + max(0, idleSlots)`.' },
    { id: 'hsq-022', question: 'What is a Heap (Priority Queue)?', difficulty: 'easy', type: 'theory', answer: 'A specialized tree-based data structure that satisfies the heap property. Min-Heap: Parent is always less than or equal to children (root is minimum). Max-Heap: Parent is always greater than or equal to children (root is maximum).' },
    { id: 'hsq-023', question: 'How is a Heap typically represented in memory?', difficulty: 'medium', type: 'theory', answer: 'As a flat Array. For a node at index `i`: Left child is at `2i + 1`. Right child is at `2i + 2`. Parent is at `Math.floor((i - 1) / 2)`.' },
    { id: 'hsq-024', question: 'Time Complexities of Heap operations?', difficulty: 'medium', type: 'theory', answer: 'Insert (Push): O(log N) - requires "bubbling up". Extract Min/Max (Pop): O(log N) - requires swapping root with last element and "bubbling down". Peek Min/Max: O(1).' },
    { id: 'hsq-025', question: 'Kth Largest Element in an Array (Heap approach).', difficulty: 'medium', type: 'practical', answer: 'Use a Min-Heap of size K. Iterate array. Add element to heap. If heap size > K, remove the minimum (root). The heap will contain the K largest elements, and the root will be the Kth largest. Time O(N log K).' },
    { id: 'hsq-026', question: 'K Closest Points to Origin.', difficulty: 'medium', type: 'practical', answer: 'Use a Max-Heap of size K. Store `[distance, [x, y]]`. If size > K, pop the maximum distance. The heap will contain the K closest points. Time O(N log K).' },
    { id: 'hsq-027', question: 'Merge K Sorted Lists.', difficulty: 'hard', type: 'practical', answer: 'Use a Min-Heap. Put the `head` node of every linked list into the Min-Heap. Pop the minimum node, append it to result, and push its `next` node into the heap. Repeat until heap is empty. Time O(N log K).' },
    { id: 'hsq-028', question: 'Find Median from Data Stream.', difficulty: 'hard', type: 'practical', answer: 'Maintain two Heaps: a Max-Heap for the smaller half, and a Min-Heap for the larger half. Ensure `Max-Heap size >= Min-Heap size`. Median is top of Max-Heap (if sizes differ) or average of both tops (if sizes equal).' },
    { id: 'hsq-029', question: 'Top K Frequent Words.', difficulty: 'medium', type: 'practical', answer: 'Count frequencies in Hash Map. Use a Priority Queue (Min-Heap). Compare by frequency. If frequencies equal, compare lexicographically in REVERSE (because it\'s a Min-Heap). Keep size K. Reverse final output. Time O(N log K).' },
    { id: 'hsq-030', question: 'Reorganize String (No two adjacent chars are the same).', difficulty: 'medium', type: 'practical', answer: 'Count frequencies. Use a Max-Heap ordered by frequency. Pop the top TWO elements, append to result, decrement frequencies, and push back if freq > 0. If heap has 1 element left and its freq > 1, return empty string.' },
    { id: 'hsq-031', question: 'Sliding Window Maximum.', difficulty: 'hard', type: 'practical', answer: 'Use a Deque (Double-ended queue) storing INDICES. Maintain monotonically decreasing values. Remove indices from front if they are outside window `(i - k)`. While current value > `deque.back()`, pop back. Push current. Front is the max.' },
    { id: 'hsq-032', question: 'Implement a Deque (Double Ended Queue).', difficulty: 'medium', type: 'theory', answer: 'A Deque allows insertion and deletion at BOTH ends in O(1) time. Usually implemented internally as a Doubly Linked List or a Circular Buffer.' },
    { id: 'hsq-033', question: 'Implement a standard Min-Heap in JavaScript.', difficulty: 'hard', type: 'practical', answer: 'Requires an array and `bubbleUp`/`bubbleDown` methods.', code: `class MinHeap {
  constructor() { this.heap = []; }
  push(val) { this.heap.push(val); this.bubbleUp(this.heap.length - 1); }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }
  bubbleUp(i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  // bubbleDown implementation requires checking both children and swapping with the smaller one.
}` },
    { id: 'hsq-034', question: 'Car Fleet.', difficulty: 'medium', type: 'practical', answer: 'Sort cars by position descending. Calculate time to reach target: `(target - pos) / speed`. Use a Stack. If stack is empty or current time > stack top, push current time (it\'s a new fleet). Else, it catches up and joins the fleet (do nothing).' },
    { id: 'hsq-035', question: 'Generate Parentheses.', difficulty: 'medium', type: 'practical', answer: 'Backtracking (Recursion). Keep track of `openN` and `closedN`. If `openN < n`, branch and add `(`. If `closedN < openN`, branch and add `)`. If both equal `n`, add string to result.' },
    { id: 'hsq-036', question: 'Simplify Path.', difficulty: 'medium', type: 'practical', answer: 'Split string by `/`. Use a Stack. If token is `..`, pop from stack. If token is `.` or empty, do nothing. Else, push token to stack. Finally, `return "/" + stack.join("/")`.' },
    { id: 'hsq-037', question: '132 Pattern.', difficulty: 'medium', type: 'practical', answer: 'Find `i < j < k` such that `nums[i] < nums[k] < nums[j]`. Keep track of `minArr` (min up to `i`). Iterate backwards for `j`. Maintain a stack of potential `k` candidates. If `nums[j] > minArr[j]`, pop stack until `top > minArr[j]`. If `top < nums[j]`, true.' },
    { id: 'hsq-038', question: 'Design Browser History.', difficulty: 'medium', type: 'practical', answer: 'Use two Stacks (Back and Forward) or a Doubly Linked List. Visit: Push current to Back, clear Forward. Back: Pop Back, push to Forward. Forward: Pop Forward, push to Back.' },
    { id: 'hsq-039', question: 'Shortest Subarray with Sum at Least K.', difficulty: 'hard', type: 'theory', answer: 'Use Prefix Sums and a Monotonic Deque of indices. Deque maintains strictly increasing prefix sums. For each `i`, while `prefix[i] - prefix[deque.front()] >= K`, calculate length and shift front. While `prefix[i] <= prefix[deque.back()]`, pop back.' },
    { id: 'hsq-040', question: 'Maximal Rectangle (Using Stack).', difficulty: 'hard', type: 'practical', answer: 'Convert each row to a histogram (height of consecutive 1s). Apply the "Largest Rectangle in Histogram" stack-based O(N) algorithm for each row. Keep track of the global maximum area.' },
    { id: 'hsq-041', question: 'Last Stone Weight.', difficulty: 'easy', type: 'practical', answer: 'Use a Max-Heap. Push all stones. While heap has > 1 stone, pop two max. If `y > x`, push `y - x` back to heap. Return heap size ? heap.pop() : 0.' },
    { id: 'hsq-042', question: 'Kth Smallest Element in a Sorted Matrix.', difficulty: 'medium', type: 'practical', answer: 'Use a Min-Heap. Push the first element of each row `[val, r, c]`. Pop the min K-1 times. Every time you pop, if `c + 1` exists in that row, push `[matrix[r][c+1], r, c+1]`.' },
    { id: 'hsq-043', question: 'Smallest Range Covering Elements from K Lists.', difficulty: 'hard', type: 'practical', answer: 'Use a Min-Heap. Push the first element from each list. Track the `currentMax`. Pop the min element. The current range is `[min, currentMax]`. Move to the next element in the list the min came from, push it, update `currentMax`. Repeat.' },
    { id: 'hsq-044', question: 'Minimum Number of Refueling Stops.', difficulty: 'hard', type: 'practical', answer: 'Use a Max-Heap. Maintain current fuel. Iterate stations. If you can\'t reach a station, pop the largest fuel from the Max-Heap (representing a gas station you passed but didn\'t use) and add it. Repeat until you can reach the station or heap is empty.' },
    { id: 'hsq-045', question: 'Design Twitter (Get News Feed).', difficulty: 'medium', type: 'practical', answer: 'Users map to Set of followees. Map of user to List of tweets (with timestamps). To get feed: get user + all followees. Get the top 10 most recent tweets from these users. Can be done efficiently by merging K sorted lists using a Max-Heap.' },
    { id: 'hsq-046', question: 'Construct Target Array With Multiple Sums.', difficulty: 'hard', type: 'theory', answer: 'Work backwards. Use a Max-Heap. The largest element MUST be the sum of all elements in the previous step. Max element = `prev_sum + rest_of_array`. `prev_element = max_element % rest_of_array`. Push `prev_element` back into heap.' },
    { id: 'hsq-047', question: 'Maximum Frequency Stack.', difficulty: 'hard', type: 'practical', answer: 'Map `val -> freq`. Map `freq -> Stack of vals`. Maintain `maxFreq`. Push: increment freq, push to `freqStacks[freq]`, update `maxFreq`. Pop: pop from `freqStacks[maxFreq]`. If stack is empty, decrement `maxFreq`. Decrement freq for value.' },
    { id: 'hsq-048', question: 'Find K Pairs with Smallest Sums.', difficulty: 'medium', type: 'practical', answer: 'Use a Min-Heap. Push `[nums1[0] + nums2[0], 0, 0]`. Pop min. Add `[nums1[i], nums2[j]]` to result. Push `[nums1[i+1] + nums2[j], i+1, j]` and `[nums1[i] + nums2[j+1], i, j+1]`. Use a Set to avoid pushing duplicate pairs.' },
    { id: 'hsq-049', question: 'Remove K Digits (to make smallest number).', difficulty: 'medium', type: 'practical', answer: 'Use a Monotonic Increasing Stack. Iterate digits. While `k > 0` AND stack is not empty AND `current_digit < stack.top()`, pop stack and decrement `k`. Push digit. Finally, slice off any remaining `k` and remove leading zeros.' },
    { id: 'hsq-050', question: 'Stock Price Fluctuation (Design).', difficulty: 'medium', type: 'practical', answer: 'Hash Map for `timestamp -> price`. `latestTime` integer. Two Heaps: Max-Heap and Min-Heap storing `[price, timestamp]`. When getting min/max, lazy-delete: pop top element if its price doesn\'t match the Hash Map\'s price for that timestamp.' }
  ]
};
