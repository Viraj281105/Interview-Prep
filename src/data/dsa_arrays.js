export const arraysStringsData = {
  id: 'dsa-arrays',
  title: 'Arrays & Strings',
  icon: '🧮',
  summary: 'Foundational data structures, two pointers, sliding window, and string manipulation.',
  concepts: ['Two Pointers', 'Sliding Window', 'Prefix Sum', 'Hash Maps', 'In-place Manipulation', 'Palindromes', 'Substrings'],
  
  learningLinks: [
    { title: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/' },
    { title: 'LeetCode Explore', url: 'https://leetcode.com/explore/' }
  ],
  questions: [
    { id: 'arr-001', question: 'What is an Array?', difficulty: 'easy', type: 'theory', answer: 'A linear data structure consisting of a collection of elements, each identified by an array index. Elements are stored in contiguous memory locations, allowing O(1) random access.' },
    { id: 'arr-002', question: 'Explain the Two Pointers technique.', difficulty: 'medium', type: 'theory', answer: 'A technique where two pointers iterate through the data structure in tandem until one or both hit a certain condition. Often used in sorted arrays to find pairs (moving from both ends to the center) or for fast/slow pointer traversals.' },
    { id: 'arr-003', question: 'Explain the Sliding Window technique.', difficulty: 'medium', type: 'theory', answer: 'A subset of two pointers used to solve problems looking for a contiguous subarray or substring. A "window" of elements is maintained, expanding (moving the right pointer) to include elements, and contracting (moving the left pointer) to remove them when a condition is violated.' },
    { id: 'arr-004', question: 'How do you reverse a string in-place?', difficulty: 'easy', type: 'practical', answer: 'Use two pointers, one at the start and one at the end. Swap the characters at these pointers, then increment the start and decrement the end until they meet in the middle.', code: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++; right--;
  }
}` },
    { id: 'arr-005', question: 'What is the Time and Space complexity of reversing an array in-place?', difficulty: 'easy', type: 'theory', answer: 'Time Complexity: O(N) because we iterate through half the array to perform N/2 swaps. Space Complexity: O(1) because we only use a constant amount of extra space for the two pointers.' },
    { id: 'arr-006', question: 'Find two numbers in a SORTED array that add up to a target.', difficulty: 'easy', type: 'practical', answer: 'Use two pointers. One at index 0, one at the end. If `sum == target`, return. If `sum < target`, increment left pointer to increase sum. If `sum > target`, decrement right pointer to decrease sum.', code: `function twoSumSorted(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    let sum = arr[l] + arr[r];
    if (sum === target) return [l, r];
    if (sum < target) l++;
    else r--;
  }
  return [];
}` },
    { id: 'arr-007', question: 'Find two numbers in an UNSORTED array that add up to a target.', difficulty: 'easy', type: 'practical', answer: 'Use a Hash Map. Iterate through the array. For each element, calculate the `complement` (target - element). If the complement exists in the map, return the indices. Otherwise, add the element and its index to the map.', code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}` },
    { id: 'arr-008', question: 'Find the maximum sum of a contiguous subarray (Kadane\'s Algorithm).', difficulty: 'medium', type: 'practical', answer: 'Keep a running sum (`currentMax`). If `currentMax` drops below zero, reset it to the current element. Keep track of the `globalMax` seen so far. Time O(N), Space O(1).', code: `function maxSubArray(nums) {
  let max = nums[0], currentMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    max = Math.max(max, currentMax);
  }
  return max;
}` },
    { id: 'arr-009', question: 'Find the length of the longest substring without repeating characters.', difficulty: 'medium', type: 'practical', answer: 'Use a Sliding Window with a Hash Set/Map. Expand the `right` pointer. If a duplicate is found, shrink the `left` pointer until the duplicate is removed from the window. Track the `max` length.', code: `function lengthOfLongestSubstring(s) {
  let set = new Set(), left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}` },
    { id: 'arr-010', question: 'How do you check if two strings are anagrams?', difficulty: 'easy', type: 'practical', answer: 'Use a frequency counter array (size 26 for lowercase letters) or Hash Map. Increment counts for string 1, decrement for string 2. If any count is non-zero, they are not anagrams.', code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}` },
    { id: 'arr-011', question: 'Given an array, move all 0s to the end while maintaining relative order.', difficulty: 'easy', type: 'practical', answer: 'Use a two-pointer approach. `nonZeroIndex` keeps track of where the next non-zero should go. Iterate with `i`. If `arr[i]` is not zero, swap it with `arr[nonZeroIndex]` and increment `nonZeroIndex`.', code: `function moveZeroes(nums) {
  let nonZeroIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[nonZeroIdx], nums[i]] = [nums[i], nums[nonZeroIdx]];
      nonZeroIdx++;
    }
  }
}` },
    { id: 'arr-012', question: 'Explain Prefix Sum arrays.', difficulty: 'medium', type: 'theory', answer: 'An array where the element at index `i` stores the sum of all elements from index `0` to `i` of the original array. Useful for answering range sum queries in O(1) time after O(N) preprocessing: `Sum(i, j) = Prefix[j] - Prefix[i-1]`.' },
    { id: 'arr-013', question: 'Find the product of array except self (without division).', difficulty: 'medium', type: 'practical', answer: 'Use two passes. Pass 1: Calculate the prefix products and store them in the result array. Pass 2: Calculate the suffix products on the fly (iterating backwards) and multiply them with the values in the result array.', code: `function productExceptSelf(nums) {
  const res = new Array(nums.length).fill(1);
  let prefix = 1, suffix = 1;
  for (let i = 0; i < nums.length; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}` },
    { id: 'arr-014', question: 'Group anagrams from an array of strings.', difficulty: 'medium', type: 'practical', answer: 'Use a Hash Map. For each string, generate a key by either sorting the string or using a character count array joined as a string. Push the original string into the map\'s array for that key.', code: `function groupAnagrams(strs) {
  const map = new Map();
  for (let s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}` },
    { id: 'arr-015', question: 'Find the longest palindromic substring.', difficulty: 'medium', type: 'practical', answer: 'Expand Around Center. Iterate through the string. For each character, treat it as the center of a palindrome and expand outwards (both odd length and even length palindromes). Track the max length found.', code: `function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) { maxLen = r - l + 1; start = l; }
      l--; r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd
    expand(i, i + 1); // even
  }
  return s.substring(start, start + maxLen);
}` },
    { id: 'arr-016', question: 'Check if a string is a valid palindrome (ignoring non-alphanumeric).', difficulty: 'easy', type: 'practical', answer: 'Use two pointers (start and end). If a character is not alphanumeric, skip it. If they are both alphanumeric, compare them case-insensitively. If they don\'t match, return false.', code: `function isPalindrome(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
    while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}` },
    { id: 'arr-017', question: 'Container with Most Water (find two lines that form a container holding the most water).', difficulty: 'medium', type: 'practical', answer: 'Two pointers, one at start, one at end. The area is limited by the shorter line: `min(height[l], height[r]) * (r - l)`. To maximize area, always move the pointer pointing to the SHORTER line inward.', code: `function maxArea(height) {
  let max = 0, l = 0, r = height.length - 1;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    max = Math.max(max, area);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}` },
    { id: 'arr-018', question: 'Find all unique triplets in an array that sum to zero (3Sum).', difficulty: 'medium', type: 'practical', answer: 'Sort the array first. Iterate `i` from 0 to n-2. For each `i`, use the Two Pointer approach (`l = i+1`, `r = n-1`) to find pairs that sum to `-nums[i]`. Skip duplicate values to ensure unique triplets.', code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++; // skip duplicates
        while (l < r && nums[r] === nums[r - 1]) r--; // skip duplicates
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return res;
}` },
    { id: 'arr-019', question: 'Find the minimum window substring that contains all characters of string t.', difficulty: 'hard', type: 'practical', answer: 'Use a Sliding Window with two frequency maps (or one map and a `have/need` counter). Expand `right` until the window contains all required characters. Then shrink `left` to minimize the window while still maintaining the condition.', code: `function minWindow(s, t) {
  if (t.length > s.length) return "";
  const map = new Map();
  for (let c of t) map.set(c, (map.get(c) || 0) + 1);
  let l = 0, minLen = Infinity, minStart = 0, count = t.length;
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r])) {
      if (map.get(s[r]) > 0) count--;
      map.set(s[r], map.get(s[r]) - 1);
    }
    while (count === 0) {
      if (r - l + 1 < minLen) { minLen = r - l + 1; minStart = l; }
      if (map.has(s[l])) {
        map.set(s[l], map.get(s[l]) + 1);
        if (map.get(s[l]) > 0) count++;
      }
      l++;
    }
  }
  return minLen === Infinity ? "" : s.substr(minStart, minLen);
}` },
    { id: 'arr-020', question: 'Rotate an array to the right by k steps.', difficulty: 'medium', type: 'practical', answer: 'Use the Reverse approach. 1. Reverse the entire array. 2. Reverse the first k elements. 3. Reverse the remaining elements. (Remember to do `k = k % arr.length`). Time O(N), Space O(1).', code: `function rotate(nums, k) {
  k = k % nums.length;
  const reverse = (l, r) => {
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
  };
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
}` },
    { id: 'arr-021', question: 'Find the longest repeating character replacement (can change at most k characters).', difficulty: 'medium', type: 'practical', answer: 'Sliding Window. Keep a frequency map of characters in the window. The window is valid if `window_length - max_freq_char_count <= k`. If invalid, shrink the left pointer.', code: `function characterReplacement(s, k) {
  let count = {}, maxFreq = 0, maxLen = 0, l = 0;
  for (let r = 0; r < s.length; r++) {
    count[s[r]] = (count[s[r]] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[s[r]]);
    if ((r - l + 1) - maxFreq > k) {
      count[s[l]]--;
      l++;
    }
    maxLen = Math.max(maxLen, r - l + 1);
  }
  return maxLen;
}` },
    { id: 'arr-022', question: 'Merge Intervals: Given an array of intervals, merge all overlapping ones.', difficulty: 'medium', type: 'practical', answer: '1. Sort the intervals by their start times. 2. Push the first interval to a `result` array. 3. Iterate. If the current interval overlaps with the last one in `result` (i.e., `curr.start <= last.end`), update `last.end` to `max(last.end, curr.end)`. Else, push `curr` to `result`.', code: `function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let last = res[res.length - 1];
    let curr = intervals[i];
    if (curr[0] <= last[1]) last[1] = Math.max(last[1], curr[1]);
    else res.push(curr);
  }
  return res;
}` },
    { id: 'arr-023', question: 'Best Time to Buy and Sell Stock (one transaction).', difficulty: 'easy', type: 'practical', answer: 'Iterate through prices tracking the `minPrice` seen so far. At each step, calculate the potential profit (`price - minPrice`) and update the `maxProfit` if it\'s higher.', code: `function maxProfit(prices) {
  let minPrice = Infinity, maxProf = 0;
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProf = Math.max(maxProf, price - minPrice);
  }
  return maxProf;
}` },
    { id: 'arr-024', question: 'Find the Subarray Sum Equals K.', difficulty: 'medium', type: 'practical', answer: 'Use Prefix Sums + Hash Map. Track the running sum. If `(runningSum - K)` exists in the map, it means there is a subarray ending here that sums to K. Add the map value to the total count.', code: `function subarraySum(nums, k) {
  let count = 0, sum = 0;
  const map = new Map();
  map.set(0, 1); // base case: sum of 0 occurs once
  for (let num of nums) {
    sum += num;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}` },
    { id: 'arr-025', question: 'What is the Boyer-Moore Majority Vote Algorithm?', difficulty: 'medium', type: 'theory', answer: 'An O(N) time, O(1) space algorithm to find the majority element (appears > N/2 times). It maintains a `candidate` and a `count`. If count is 0, pick a new candidate. If current element equals candidate, increment count, else decrement. The surviving candidate is the majority.' },
    { id: 'arr-026', question: 'Implement the Boyer-Moore Majority Vote Algorithm.', difficulty: 'easy', type: 'practical', answer: 'Maintain a count and candidate. Iterate. If count is 0, assign candidate. Adjust count based on match.', code: `function majorityElement(nums) {
  let count = 0, candidate = null;
  for (let num of nums) {
    if (count === 0) candidate = num;
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}` },
    { id: 'arr-027', question: 'Find the Missing Number in an array containing 0 to N.', difficulty: 'easy', type: 'practical', answer: 'Can be solved using Math or Bit Manipulation. Math: Calculate the expected sum formula `n*(n+1)/2` and subtract the actual sum of the array. XOR: XOR all array elements and all numbers from 0 to N. The missing number will remain.', code: `function missingNumber(nums) {
  let expectedSum = nums.length * (nums.length + 1) / 2;
  let actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}` },
    { id: 'arr-028', question: 'Valid Parentheses: Check if a string of brackets is validly closed.', difficulty: 'easy', type: 'practical', answer: 'Use a Stack (implemented via an Array). Push open brackets onto the stack. If a close bracket is encountered, pop from the stack and check if it matches the corresponding open bracket.', code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}` },
    { id: 'arr-029', question: 'String to Integer (atoi).', difficulty: 'medium', type: 'practical', answer: 'Ignore leading whitespaces. Handle optional sign (+/-). Iterate through digits, building the number (`res = res * 10 + digit`). Stop at the first non-digit. Clamp the result to 32-bit signed integer limits (`-2^31` to `2^31 - 1`).' },
    { id: 'arr-030', question: 'Longest Common Prefix among an array of strings.', difficulty: 'easy', type: 'practical', answer: 'Take the first string as the initial prefix. Compare it with the next string, shortening the prefix from the end until it matches. Repeat for all strings.', code: `function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return "";
    }
  }
  return prefix;
}` },
    { id: 'arr-031', question: 'Find all duplicates in an array where 1 ≤ a[i] ≤ n in O(N) time and O(1) space.', difficulty: 'medium', type: 'practical', answer: 'Since values are between 1 and n, we can use the array elements as indices. Iterate. For each `nums[i]`, flip the sign of the element at index `Math.abs(nums[i]) - 1` to negative. If it\'s already negative, it\'s a duplicate.', code: `function findDuplicates(nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    let index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) res.push(index + 1);
    else nums[index] = -nums[index];
  }
  return res;
}` },
    { id: 'arr-032', question: 'Trapping Rain Water.', difficulty: 'hard', type: 'practical', answer: 'Two pointers (left and right). Keep track of `leftMax` and `rightMax`. Move the pointer that has the smaller max. The water trapped at the current pointer is `max - height[pointer]`.', code: `function trap(height) {
  let l = 0, r = height.length - 1;
  let lMax = 0, rMax = 0, res = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= lMax) lMax = height[l];
      else res += lMax - height[l];
      l++;
    } else {
      if (height[r] >= rMax) rMax = height[r];
      else res += rMax - height[r];
      r--;
    }
  }
  return res;
}` },
    { id: 'arr-033', question: 'Implement strStr() / String indexOf.', difficulty: 'easy', type: 'practical', answer: 'Slide a window of size `needle.length` over `haystack`. If the substring matches `needle`, return the index. (For optimal O(N) time, use KMP algorithm, but simple sliding window is usually acceptable).', code: `function strStr(haystack, needle) {
  if (needle === '') return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;
    while (j < needle.length && haystack[i + j] === needle[j]) j++;
    if (j === needle.length) return i;
  }
  return -1;
}` },
    { id: 'arr-034', question: 'Longest Consecutive Sequence in an unsorted array.', difficulty: 'medium', type: 'practical', answer: 'Insert all elements into a Hash Set. Iterate over the set. If `num - 1` is NOT in the set, it is the start of a sequence. Count upwards (`num + 1`, `num + 2`) while they exist in the set. Time O(N).', code: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let max = 0;
  for (let num of set) {
    if (!set.has(num - 1)) { // start of a sequence
      let currNum = num;
      let currStreak = 1;
      while (set.has(currNum + 1)) {
        currNum++; currStreak++;
      }
      max = Math.max(max, currStreak);
    }
  }
  return max;
}` },
    { id: 'arr-035', question: 'Spiral Matrix traversal.', difficulty: 'medium', type: 'practical', answer: 'Maintain 4 boundary variables: top, bottom, left, right. Traverse top row (left->right), increment top. Right col (top->bottom), decrement right. Bottom row (right->left), decrement bottom. Left col (bottom->top), increment left. Repeat until boundaries cross.', code: `function spiralOrder(matrix) {
  let res = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) res.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
    right--;
    if (top <= bottom) {
      for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
      left++;
    }
  }
  return res;
}` },
    { id: 'arr-036', question: 'Set Matrix Zeroes: If an element is 0, set its row and col to 0 in-place.', difficulty: 'medium', type: 'practical', answer: 'Use the first row and first column of the matrix itself to keep track of which rows and columns need to be zeroed. Use two extra variables (or one) to track if the first row/col themselves need to be zeroed.', code: `function setZeroes(matrix) {
  let firstColZero = false;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) firstColZero = true;
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    }
  }
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    }
  }
  if (matrix[0][0] === 0) { for (let j = 0; j < matrix[0].length; j++) matrix[0][j] = 0; }
  if (firstColZero) { for (let i = 0; i < matrix.length; i++) matrix[i][0] = 0; }
}` },
    { id: 'arr-037', question: 'Find the single number in an array where every other number appears twice.', difficulty: 'easy', type: 'practical', answer: 'Use Bit Manipulation (XOR). XORing a number with itself results in 0 (`a ^ a = 0`). XORing a number with 0 results in the number (`a ^ 0 = a`). XOR all numbers together; the duplicates will cancel out, leaving only the single number.', code: `function singleNumber(nums) {
  let res = 0;
  for (let num of nums) res ^= num;
  return res;
}` },
    { id: 'arr-038', question: 'Determine if a 9x9 Sudoku board is valid.', difficulty: 'medium', type: 'practical', answer: 'Use Hash Sets for each row, column, and 3x3 sub-box. Iterate over the board. If a cell is not empty, check if it already exists in the corresponding row set, col set, or box set. Calculate box index as `Math.floor(r/3)*3 + Math.floor(c/3)`.', code: `function isValidSudoku(board) {
  let rows = Array.from({length: 9}, () => new Set());
  let cols = Array.from({length: 9}, () => new Set());
  let boxes = Array.from({length: 9}, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let val = board[r][c];
      if (val === '.') continue;
      let boxIdx = Math.floor(r/3) * 3 + Math.floor(c/3);
      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) return false;
      rows[r].add(val); cols[c].add(val); boxes[boxIdx].add(val);
    }
  }
  return true;
}` },
    { id: 'arr-039', question: 'Next Permutation (lexicographically next greater permutation of numbers).', difficulty: 'medium', type: 'practical', answer: '1. Scan from right to find first decreasing element `arr[i] < arr[i+1]`. 2. Scan from right to find first element `arr[j] > arr[i]`. 3. Swap `arr[i]` and `arr[j]`. 4. Reverse the sub-array from `i+1` to the end. If step 1 fails, just reverse the whole array.', code: `function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let l = i + 1, r = nums.length - 1;
  while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
}` },
    { id: 'arr-040', question: 'Find all Anagrams in a String.', difficulty: 'medium', type: 'practical', answer: 'Sliding Window + Frequency Map. Create an array of size 26 for `p`\'s character counts. Slide a window of size `p.length` across `s`. Update the window\'s character counts dynamically (add incoming char, remove outgoing char). If the arrays match, record the start index.', code: `function findAnagrams(s, p) {
  if (s.length < p.length) return [];
  const res = [], pCount = new Array(26).fill(0), sCount = new Array(26).fill(0);
  for (let i = 0; i < p.length; i++) {
    pCount[p.charCodeAt(i) - 97]++;
    sCount[s.charCodeAt(i) - 97]++;
  }
  if (pCount.join('') === sCount.join('')) res.push(0);
  for (let i = p.length; i < s.length; i++) {
    sCount[s.charCodeAt(i) - 97]++;
    sCount[s.charCodeAt(i - p.length) - 97]--;
    if (pCount.join('') === sCount.join('')) res.push(i - p.length + 1);
  }
  return res;
}` },
    { id: 'arr-041', question: 'Encode and Decode Strings (List of strings into a single string and back).', difficulty: 'medium', type: 'practical', answer: 'Cannot just use a delimiter like `,` because it might exist in the string. Encode format: `[Length of string] + "#" + [String]`. E.g., `["abc", "de"]` becomes `3#abc2#de`. Decode by reading the number until `#`, then extracting that many characters.', code: `class Codec {
  encode(strs) {
    return strs.map(s => s.length + '#' + s).join('');
  }
  decode(s) {
    let res = [], i = 0;
    while (i < s.length) {
      let j = s.indexOf('#', i);
      let len = parseInt(s.substring(i, j));
      res.push(s.substring(j + 1, j + 1 + len));
      i = j + 1 + len;
    }
    return res;
  }
}` },
    { id: 'arr-042', question: 'Valid Palindrome II (Can delete at most one character).', difficulty: 'easy', type: 'practical', answer: 'Two pointers from ends. If mismatch found at `left` and `right`, the string is a valid palindrome II if EITHER the substring `(left+1, right)` OR `(left, right-1)` is a standard palindrome.', code: `function validPalindrome(s) {
  const isPal = (l, r) => {
    while (l < r) { if (s[l++] !== s[r--]) return false; }
    return true;
  };
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return isPal(l + 1, r) || isPal(l, r - 1);
    l++; r--;
  }
  return true;
}` },
    { id: 'arr-043', question: 'Find Pivot Index (Equilibrium Index).', difficulty: 'easy', type: 'practical', answer: 'Calculate the `totalSum` of the array. Iterate while maintaining a `leftSum`. The `rightSum` is `totalSum - leftSum - nums[i]`. If `leftSum == rightSum`, return `i`. Otherwise, `leftSum += nums[i]`.', code: `function pivotIndex(nums) {
  let total = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (leftSum === total - leftSum - nums[i]) return i;
    leftSum += nums[i];
  }
  return -1;
}` },
    { id: 'arr-044', question: 'Find the First Missing Positive integer in an unsorted array.', difficulty: 'hard', type: 'practical', answer: 'O(N) time, O(1) space. The answer must be between 1 and N+1. Cycle sort: place each number `x` (where `1 <= x <= N`) at index `x-1`. Iterate again; the first index `i` where `nums[i] !== i + 1` is the missing number `i+1`.', code: `function firstMissingPositive(nums) {
  let i = 0, n = nums.length;
  while (i < n) {
    let j = nums[i] - 1;
    if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[j]) {
      [nums[i], nums[j]] = [nums[j], nums[i]]; // swap
    } else i++;
  }
  for (i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}` },
    { id: 'arr-045', question: 'Isomorphic Strings.', difficulty: 'easy', type: 'practical', answer: 'Two strings are isomorphic if characters in `s` can be replaced to get `t`. Keep two Hash Maps (or arrays). Map char from `s` to `t` and `t` to `s`. If an existing mapping contradicts the current chars, return false.', code: `function isIsomorphic(s, t) {
  let mapS = {}, mapT = {};
  for (let i = 0; i < s.length; i++) {
    let c1 = s[i], c2 = t[i];
    if (mapS[c1] && mapS[c1] !== c2) return false;
    if (mapT[c2] && mapT[c2] !== c1) return false;
    mapS[c1] = c2; mapT[c2] = c1;
  }
  return true;
}` },
    { id: 'arr-046', question: 'Rotate Image (2D Matrix 90 degrees clockwise in-place).', difficulty: 'medium', type: 'practical', answer: 'Two steps: 1. Transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`). 2. Reverse each row of the matrix.', code: `function rotate(matrix) {
  let n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}` },
    { id: 'arr-047', question: 'Subarray Product Less Than K.', difficulty: 'medium', type: 'practical', answer: 'Sliding Window. Track `product`. If `product >= k`, shrink the window from the left by dividing `product` by `nums[left]` and incrementing `left`. The number of valid subarrays ending at `right` is `right - left + 1`.', code: `function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0;
  let prod = 1, res = 0, l = 0;
  for (let r = 0; r < nums.length; r++) {
    prod *= nums[r];
    while (prod >= k) { prod /= nums[l]; l++; }
    res += r - l + 1;
  }
  return res;
}` },
    { id: 'arr-048', question: 'Insert Interval into a sorted, non-overlapping array of intervals.', difficulty: 'medium', type: 'practical', answer: 'Iterate. 1. While current interval ends before newInterval starts, push current. 2. While current overlaps with newInterval, merge them by updating newInterval\'s start/end. Push merged newInterval. 3. Push remaining intervals.', code: `function insert(intervals, newInterval) {
  let res = [], i = 0, n = intervals.length;
  while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);
  while (i < n) res.push(intervals[i++]);
  return res;
}` },
    { id: 'arr-049', question: 'Minimum Size Subarray Sum (>= target).', difficulty: 'medium', type: 'practical', answer: 'Sliding window. Expand `right`, adding to `sum`. While `sum >= target`, update `minLen` and shrink the window from the `left` (subtract `nums[left]`, `left++`).', code: `function minSubArrayLen(target, nums) {
  let l = 0, sum = 0, minLen = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      minLen = Math.min(minLen, r - l + 1);
      sum -= nums[l++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}` },
    { id: 'arr-050', question: 'Longest Palindromic Subsequence.', difficulty: 'medium', type: 'theory', answer: 'A subsequence can delete characters (unlike a substring). Solved using 2D Dynamic Programming. `dp[i][j]` represents the max length in substring from index `i` to `j`. If `s[i] == s[j]`, `dp[i][j] = 2 + dp[i+1][j-1]`. Else, `max(dp[i+1][j], dp[i][j-1])`.' }
  ]
};
