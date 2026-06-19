export const sortingSearchingData = {
  id: 'dsa-sorting',
  title: 'Sorting & Searching',
  icon: '🔍',
  summary: 'Sorting algorithms, Binary Search, Quickselect, and Divide & Conquer techniques.',
  concepts: ['Binary Search', 'Merge Sort', 'Quick Sort', 'Quickselect', 'Divide and Conquer', 'Search Space', 'O(N log N)'],
  questions: [
    { id: 'sort-001', question: 'What is Binary Search?', difficulty: 'easy', type: 'theory', answer: 'An efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you\'ve narrowed down the possible locations to just one. Time complexity: O(log N).' },
    { id: 'sort-002', question: 'Implement standard Binary Search.', difficulty: 'easy', type: 'practical', answer: 'Use two pointers, `left` and `right`. Calculate `mid = left + Math.floor((right - left) / 2)`. If `target === nums[mid]`, return `mid`. If `target < nums[mid]`, `right = mid - 1`. Else `left = mid + 1`.', code: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2); // Avoids overflow
    if (nums[mid] === target) return mid;
    if (target < nums[mid]) r = mid - 1;
    else l = mid + 1;
  }
  return -1;
}` },
    { id: 'sort-003', question: 'Why use `l + (r - l) / 2` instead of `(l + r) / 2`?', difficulty: 'easy', type: 'theory', answer: 'To prevent Integer Overflow. If `l` and `r` are very large positive integers, their sum `(l + r)` might exceed the maximum allowable integer size (e.g., `2^31 - 1`), causing an overflow before the division. `l + (r - l) / 2` calculates the exact same mathematical value without the risk of overflowing.' },
    { id: 'sort-004', question: 'Search Insert Position.', difficulty: 'easy', type: 'practical', answer: 'Standard Binary Search. When the loop terminates (`l > r`), the `left` pointer will always point to the index where the target *should* be inserted to maintain sorted order.', code: `function searchInsert(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return l; // Return left pointer
}` },
    { id: 'sort-005', question: 'Find First and Last Position of Element in Sorted Array.', difficulty: 'medium', type: 'practical', answer: 'Run Binary Search twice. First, to find the leftmost index (when `nums[mid] == target`, move `right` to `mid - 1` but record `mid`). Second, to find the rightmost index (move `left` to `mid + 1` but record `mid`).', code: `function searchRange(nums, target) {
  const findBound = (isFirst) => {
    let l = 0, r = nums.length - 1, bound = -1;
    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);
      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) r = mid - 1;
        else l = mid + 1;
      } else if (nums[mid] < target) l = mid + 1;
      else r = mid - 1;
    }
    return bound;
  };
  return [findBound(true), findBound(false)];
}` },
    { id: 'sort-006', question: 'Search in Rotated Sorted Array.', difficulty: 'medium', type: 'practical', answer: 'Modified Binary Search. In a rotated sorted array, one half is ALWAYS strictly sorted. Check which half is sorted: `nums[l] <= nums[mid]`. Then check if the target falls within the boundaries of that sorted half. If yes, search there; otherwise, search the other half.' },
    { id: 'sort-007', question: 'Find Minimum in Rotated Sorted Array.', difficulty: 'medium', type: 'practical', answer: 'Use Binary Search. Compare `nums[mid]` with `nums[right]`. If `nums[mid] > nums[right]`, the minimum is in the right half (e.g., `3,4,5,1,2`). Set `l = mid + 1`. Else, the minimum is in the left half (including mid). Set `r = mid`. Return `nums[l]`.' },
    { id: 'sort-008', question: 'Search a 2D Matrix (Sorted rows, first integer of row > last integer of previous row).', difficulty: 'medium', type: 'practical', answer: 'Treat the 2D matrix as a 1D array. A cell at index `i` maps to `matrix[Math.floor(i / cols)][i % cols]`. Perform a standard binary search from `0` to `rows * cols - 1`.' },
    { id: 'sort-009', question: 'Find Peak Element.', difficulty: 'medium', type: 'practical', answer: 'A peak element is greater than its neighbors. Use Binary Search. Compare `nums[mid]` with `nums[mid+1]`. If `nums[mid] > nums[mid+1]`, you are on a descending slope, so a peak MUST exist to the left (including mid). Set `r = mid`. Else, set `l = mid + 1`. Return `l`.' },
    { id: 'sort-010', question: 'Koko Eating Bananas (Binary Search on Answer).', difficulty: 'medium', type: 'practical', answer: 'The speed `k` is between `1` and `max(piles)`. Use Binary Search on the range of possible speeds. For a mid speed, calculate the hours required to eat all bananas. If `hours <= H`, it\'s possible, so try a slower speed (`r = mid - 1`). Else, try a faster speed (`l = mid + 1`).' },
    { id: 'sort-011', question: 'What is the "Binary Search on Answer" pattern?', difficulty: 'medium', type: 'theory', answer: 'When you need to find a minimum/maximum value (capacity, speed, weight) that satisfies a monotonic condition (if X works, X+1 works; if Y fails, Y-1 fails). You define the search space (min/max possible answers) and binary search through it, using a helper function to check if a specific answer is valid.' },
    { id: 'sort-012', question: 'Find the Duplicate Number (Floyd\'s Cycle Detection).', difficulty: 'medium', type: 'practical', answer: 'Given N+1 numbers in range [1, N]. Treat the array as a Linked List where `next = nums[index]`. A duplicate creates a cycle. Use fast/slow pointers. When they meet, reset `slow` to 0, move both 1 step at a time until they meet again. That is the duplicate.' },
    { id: 'sort-013', question: 'Capacity To Ship Packages Within D Days.', difficulty: 'medium', type: 'practical', answer: 'Binary Search on Answer. The minimum possible capacity is `max(weights)` (must be able to carry the heaviest item). The maximum possible capacity is `sum(weights)` (carry everything in 1 day). Binary search the capacity, checking if the required days is `<= D`.' },
    { id: 'sort-014', question: 'Split Array Largest Sum.', difficulty: 'hard', type: 'practical', answer: 'Binary Search on Answer. Find the minimum possible largest sum. Min value is `max(nums)` (if `m == n`), Max value is `sum(nums)` (if `m == 1`). Binary search the target sum, greedy-allocating elements into subarrays. If subarrays > `m`, target is too small.' },
    { id: 'sort-015', question: 'Median of Two Sorted Arrays.', difficulty: 'hard', type: 'theory', answer: 'Binary Search on the SMALLER array. Partition both arrays such that `left_A + left_B = right_A + right_B`. Check validity: `max(left_A) <= min(right_B)` AND `max(left_B) <= min(right_A)`. Time O(log(min(m, n))).' },
    { id: 'sort-016', question: 'What is Selection Sort?', difficulty: 'easy', type: 'theory', answer: 'Divides array into sorted and unsorted parts. Repeatedly finds the minimum element from the unsorted part and swaps it with the first unsorted element. Time: O(N^2). Space: O(1). Not stable.' },
    { id: 'sort-017', question: 'What is Bubble Sort?', difficulty: 'easy', type: 'theory', answer: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements "bubble" to the top. Time: O(N^2). Space: O(1). Stable.' },
    { id: 'sort-018', question: 'What is Insertion Sort?', difficulty: 'easy', type: 'theory', answer: 'Builds the sorted array one item at a time. It takes an element and inserts it into its correct position in the already-sorted part. Efficient for small or nearly sorted datasets. Time: O(N^2). Space: O(1). Stable.' },
    { id: 'sort-019', question: 'Explain Merge Sort.', difficulty: 'medium', type: 'theory', answer: 'Divide and Conquer. Divides the array into halves until each subarray contains 1 element. Then repeatedly merges the sublists to produce new sorted sublists until there is only 1 sorted list remaining. Time: O(N log N) worst/average/best. Space: O(N). Stable.' },
    { id: 'sort-020', question: 'Implement Merge Sort.', difficulty: 'medium', type: 'practical', answer: 'Recursive divide, then merge.', code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  let res = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return res.concat(left.slice(i)).concat(right.slice(j));
}` },
    { id: 'sort-021', question: 'Explain Quick Sort.', difficulty: 'medium', type: 'theory', answer: 'Divide and Conquer. Picks an element as a "pivot". Partitions the array such that elements smaller than pivot go left, and larger go right. Recursively applies to left and right partitions. Time: O(N log N) average, O(N^2) worst (if already sorted and bad pivot). Space: O(log N) stack. Not stable.' },
    { id: 'sort-022', question: 'Implement Quick Sort.', difficulty: 'medium', type: 'practical', answer: 'Partition around a pivot (often the last element).', code: `function quickSort(arr, l = 0, r = arr.length - 1) {
  if (l < r) {
    let pivotIdx = partition(arr, l, r);
    quickSort(arr, l, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, r);
  }
  return arr;
}
function partition(arr, l, r) {
  let pivot = arr[r], i = l - 1;
  for (let j = l; j < r; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
  return i + 1;
}` },
    { id: 'sort-023', question: 'What is Heap Sort?', difficulty: 'medium', type: 'theory', answer: 'Converts the array into a Max-Heap. The largest element is at the root. Swap root with the last element of the heap, reduce heap size, and "heapify down" the new root. Repeat until empty. Time: O(N log N). Space: O(1). Not stable.' },
    { id: 'sort-024', question: 'What is a Stable Sorting Algorithm?', difficulty: 'medium', type: 'theory', answer: 'A stable sort maintains the relative order of records with equal keys. If A and B have the same key, and A appears before B in the input array, A will appear before B in the sorted output array. Merge Sort is stable. Quick Sort and Heap Sort are NOT.' },
    { id: 'sort-025', question: 'What is Counting Sort?', difficulty: 'hard', type: 'theory', answer: 'An integer sorting algorithm. Counts the number of objects having distinct key values. Uses arithmetic to determine the positions of each key in the output sequence. Time: O(N + K) where K is the range of values. Space: O(N + K). Stable. Excellent if K is small.' },
    { id: 'sort-026', question: 'What is Radix Sort?', difficulty: 'hard', type: 'theory', answer: 'A non-comparative integer sorting algorithm. Sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. Uses Counting Sort as a subroutine for each digit. Time: O(d * (N + K)), where d is number of digits.' },
    { id: 'sort-027', question: 'Explain Quickselect.', difficulty: 'hard', type: 'theory', answer: 'A selection algorithm to find the k-th smallest/largest element in an unordered list. It is related to Quick Sort. After partitioning around a pivot, if the pivot is at index `k`, you are done. If `k < pivot`, recurse ONLY on the left partition. If `k > pivot`, recurse ONLY on the right. Average Time: O(N).' },
    { id: 'sort-028', question: 'Kth Largest Element in an Array.', difficulty: 'medium', type: 'practical', answer: 'Use Quickselect for O(N) average time, or a Min-Heap of size K for O(N log K) time. The Min-Heap approach: Add elements to heap. If size > K, pop. The root of the heap is the Kth largest.' },
    { id: 'sort-029', question: 'Sort Colors (Dutch National Flag problem).', difficulty: 'medium', type: 'practical', answer: 'Sort an array of 0s, 1s, and 2s in-place, O(N) time. Use 3 pointers: `low = 0`, `mid = 0`, `high = n-1`. While `mid <= high`: If `arr[mid] == 0`, swap `arr[low]` and `arr[mid]`, increment both. If 1, increment `mid`. If 2, swap `arr[mid]` and `arr[high]`, decrement `high`.' },
    { id: 'sort-030', question: 'Top K Frequent Elements.', difficulty: 'medium', type: 'practical', answer: 'Use a Hash Map to count frequencies. Then use Bucket Sort. Create an array of arrays `buckets` where index is the frequency. Iterate map, put numbers into `buckets[freq]`. Iterate `buckets` backwards to gather the top K elements. Time O(N).' },
    { id: 'sort-031', question: 'Merge Intervals.', difficulty: 'medium', type: 'practical', answer: 'Sort the intervals by their start times. Iterate through the intervals. If the current interval\'s start time is less than or equal to the previous interval\'s end time, merge them by updating the previous interval\'s end time.' },
    { id: 'sort-032', question: 'Meeting Rooms II (Min meeting rooms required).', difficulty: 'medium', type: 'practical', answer: 'Separate start times and end times into two arrays and sort them. Use two pointers (`s` for starts, `e` for ends). If `starts[s] < ends[e]`, a new room is needed (count++, s++). If `starts[s] >= ends[e]`, a room is freed (count--, e++). Track `max_rooms`.' },
    { id: 'sort-033', question: 'Insert Interval.', difficulty: 'medium', type: 'practical', answer: 'Since intervals are already sorted, find where the new interval belongs. Add all intervals ending before new interval. Merge overlapping intervals (update newInterval start/end). Add the merged newInterval. Add remaining intervals.' },
    { id: 'sort-034', question: 'Valid Anagram.', difficulty: 'easy', type: 'practical', answer: 'Sorting approach: `s.split("").sort().join("") === t.split("").sort().join("")`. Time: O(N log N). Better approach: Hash Map / Array frequency counter. Time: O(N).' },
    { id: 'sort-035', question: 'Contains Duplicate.', difficulty: 'easy', type: 'practical', answer: 'Sorting approach: Sort array, iterate and check if `nums[i] == nums[i+1]`. Time: O(N log N). Better approach: Hash Set. Time: O(N).' },
    { id: 'sort-036', question: 'Intersection of Two Arrays.', difficulty: 'easy', type: 'practical', answer: 'If arrays are sorted, use two pointers. If `A[i] < B[j]`, `i++`. If `A[i] > B[j]`, `j++`. If equal, add to result (check for duplicates), `i++`, `j++`. Unsorted arrays: Use a Hash Set.' },
    { id: 'sort-037', question: 'Search a 2D Matrix II (Rows sorted L-R, Cols sorted T-B).', difficulty: 'medium', type: 'practical', answer: 'Start at top-right corner `(r=0, c=cols-1)`. If `target === val`, return true. If `target < val`, it cannot be in this column (cols are sorted), so `c--`. If `target > val`, it cannot be in this row, so `r++`. Time O(M+N).' },
    { id: 'sort-038', question: 'Peak Index in a Mountain Array.', difficulty: 'easy', type: 'practical', answer: 'Binary search. If `arr[mid] < arr[mid+1]`, you are on the ascending slope, peak is to the right (`l = mid + 1`). Otherwise, you are on the descending slope, peak is to the left or IS mid (`r = mid`).' },
    { id: 'sort-039', question: 'Find Minimum in Rotated Sorted Array II (With duplicates).', difficulty: 'hard', type: 'practical', answer: 'Modified Binary Search. The issue with duplicates is `nums[mid] == nums[right]` gives no info about which half has the minimum. In this specific case, you can safely do `right--` to eliminate a duplicate.' },
    { id: 'sort-040', question: 'Valid Perfect Square.', difficulty: 'easy', type: 'practical', answer: 'Binary search from 1 to `num/2`. Calculate `mid * mid`. If equal, return true. If less, `l = mid + 1`. If greater, `r = mid - 1`.' },
    { id: 'sort-041', question: 'Guess Number Higher or Lower.', difficulty: 'easy', type: 'practical', answer: 'Standard Binary search between 1 and `n`. Call the provided API `guess(mid)`. Adjust `left` or `right` based on the API response (-1, 1, or 0).' },
    { id: 'sort-042', question: 'First Bad Version.', difficulty: 'easy', type: 'practical', answer: 'Binary search. If `isBadVersion(mid)` is true, the first bad version is either `mid` or to the left (`r = mid`). If false, it\'s to the right (`l = mid + 1`).' },
    { id: 'sort-043', question: 'Find Smallest Letter Greater Than Target.', difficulty: 'easy', type: 'practical', answer: 'Binary search to find the insert position. If `target < letters[mid]`, `r = mid - 1`. Else `l = mid + 1`. The answer is `letters[l % letters.length]` (wraps around).' },
    { id: 'sort-044', question: 'H-Index.', difficulty: 'medium', type: 'practical', answer: 'Sort the array descending. Iterate `i`. If `citations[i] > i`, the researcher has at least `i+1` papers with `i+1` citations. Return the maximum `i` that satisfies this. Sorting is O(N log N).' },
    { id: 'sort-045', question: 'Largest Number (from array of integers).', difficulty: 'medium', type: 'practical', answer: 'Custom sorting. Sort the array of strings using a custom comparator: `(a, b) => (b + a).localeCompare(a + b)`. This ensures `9` comes before `34` because `934 > 349`. Handle the edge case of all 0s.' },
    { id: 'sort-046', question: 'Wiggle Sort II (nums[0] < nums[1] > nums[2] < nums[3]).', difficulty: 'medium', type: 'practical', answer: 'Sort the array. Find the median. Put the larger half at odd indices and the smaller half at even indices, working backwards to avoid overlapping identical medians.' },
    { id: 'sort-047', question: 'Maximum Gap (Max diff between successive elements in sorted form).', difficulty: 'hard', type: 'theory', answer: 'Requires O(N) time and space. Use Bucket Sort / Pigeonhole Principle. Min gap must be at least `ceil((max - min) / (n - 1))`. Create buckets of this size. Keep track of max and min in each bucket. The max gap is between the min of a bucket and the max of the previous non-empty bucket.' },
    { id: 'sort-048', question: 'Count of Smaller Numbers After Self.', difficulty: 'hard', type: 'theory', answer: 'Use a modified Merge Sort. During the merge step, when an element from the RIGHT array is placed before an element from the LEFT array, it means the right element is smaller. Keep a counter of how many elements from the right have been placed, and add that to the left element\'s answer.' },
    { id: 'sort-049', question: 'Reverse Pairs (i < j and nums[i] > 2 * nums[j]).', difficulty: 'hard', type: 'theory', answer: 'Modified Merge Sort. Before merging the two sorted halves, use a two-pointer approach to count the number of pairs that satisfy the condition. Then perform the standard merge step.' },
    { id: 'sort-050', question: 'Median of Two Sorted Arrays (Approach without Binary Search).', difficulty: 'medium', type: 'practical', answer: 'Use two pointers `i` and `j` for the two arrays. Iterate `(m+n)/2` times, keeping track of the current and previous element. If total length is odd, median is current. If even, median is `(current + prev) / 2`. Time O(M+N).' }
  ]
};
