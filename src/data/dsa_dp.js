export const dpData = {
  id: 'dsa-dp',
  title: 'Dynamic Programming',
  icon: '🧮',
  summary: 'Solving complex problems by breaking them down into simpler subproblems and caching results.',
  concepts: ['Memoization (Top-Down)', 'Tabulation (Bottom-Up)', 'Knapsack Problem', 'LCS', 'State Transition'],
  questions: [
    { id: 'dp-001', question: 'What is Dynamic Programming (DP)?', difficulty: 'medium', type: 'theory', answer: 'An algorithmic technique for solving optimization problems by breaking them down into simpler overlapping subproblems, solving each subproblem exactly once, and storing their solutions (memoization or tabulation) to avoid redundant computations.' },
    { id: 'dp-002', question: 'What are the two key properties a problem must have to use DP?', difficulty: 'medium', type: 'theory', answer: '1. Overlapping Subproblems: The problem can be broken down into subproblems which are reused multiple times. 2. Optimal Substructure: The optimal solution to the overall problem can be constructed from the optimal solutions of its subproblems.' },
    { id: 'dp-003', question: 'Top-Down vs Bottom-Up DP?', difficulty: 'medium', type: 'theory', answer: 'Top-Down (Memoization): Uses recursion. Starts at the main problem and recursively calls subproblems. Caches results in a Hash Map/Array. Easy to write, but has recursion overhead. Bottom-Up (Tabulation): Uses iteration. Starts with base cases and builds up to the main problem using an array/matrix. No recursion overhead, usually better space/time constants.' },
    { id: 'dp-004', question: 'Fibonacci Sequence (Bottom-Up O(1) Space).', difficulty: 'easy', type: 'practical', answer: 'Instead of an array `dp[i] = dp[i-1] + dp[i-2]`, just keep track of the last two calculated values.', code: `function fib(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let next = a + b;
    a = b;
    b = next;
  }
  return b;
}` },
    { id: 'dp-005', question: 'Climbing Stairs (n steps, 1 or 2 steps at a time).', difficulty: 'easy', type: 'practical', answer: 'This is exactly the Fibonacci sequence. To reach step `n`, you must come from step `n-1` or `n-2`. So, `ways(n) = ways(n-1) + ways(n-2)`.', code: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    let curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}` },
    { id: 'dp-006', question: 'Coin Change: Minimum coins to make amount.', difficulty: 'medium', type: 'practical', answer: 'Bottom-up DP. `dp[i]` = min coins to make amount `i`. Initialize array to `Infinity`. `dp[0] = 0`. For each amount from 1 to `target`, iterate through coins: `if (coin <= amount) dp[amount] = min(dp[amount], 1 + dp[amount - coin])`.', code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}` },
    { id: 'dp-007', question: 'Longest Increasing Subsequence (LIS).', difficulty: 'medium', type: 'practical', answer: '`dp[i]` represents LIS ending at index `i`. Initialize all to 1. For each `i` from 1 to `n-1`, check all previous indices `j`. If `nums[i] > nums[j]`, `dp[i] = max(dp[i], dp[j] + 1)`. Time O(N^2).', code: `function lengthOfLIS(nums) {
  if (nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}` },
    { id: 'dp-008', question: 'Longest Common Subsequence (LCS).', difficulty: 'medium', type: 'practical', answer: '2D DP. `dp[i][j]` = length of LCS of `text1[0..i-1]` and `text2[0..j-1]`. If `text1[i-1] == text2[j-1]`, then `dp[i][j] = 1 + dp[i-1][j-1]`. Else, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`. Time O(M*N).', code: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}` },
    { id: 'dp-009', question: '0/1 Knapsack Problem.', difficulty: 'hard', type: 'theory', answer: 'Given `n` items with weights and values, find max value that fits in knapsack of capacity `W`. You can either take an item (1) or leave it (0). 2D DP array `dp[i][w]`. If `weight[i] <= w`, `dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-weight[i]])`.' },
    { id: 'dp-010', question: 'Partition Equal Subset Sum.', difficulty: 'medium', type: 'practical', answer: 'Find if array can be partitioned into two subsets with equal sum. This is 0/1 Knapsack where `target = Total Sum / 2`. DP array stores booleans `dp[i]` (can we make sum `i`?).', code: `function canPartition(nums) {
  let sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  let target = sum / 2;
  let dp = new Set([0]);
  for (let num of nums) {
    let nextDP = new Set(dp);
    for (let t of dp) {
      if (t + num === target) return true;
      nextDP.add(t + num);
    }
    dp = nextDP;
  }
  return dp.has(target);
}` },
    { id: 'dp-011', question: 'House Robber (Max money without robbing adjacent houses).', difficulty: 'medium', type: 'practical', answer: 'At each house `i`, you either rob it (`money[i] + dp[i-2]`) or skip it (`dp[i-1]`). `dp[i] = max(rob, skip)`. Optimization: use two variables instead of array (like Fibonacci).', code: `function rob(nums) {
  let rob1 = 0, rob2 = 0; // [rob1, rob2, n, n+1, ...]
  for (let n of nums) {
    let temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}` },
    { id: 'dp-012', question: 'Word Break (Can string be segmented into dict words?).', difficulty: 'medium', type: 'practical', answer: '`dp[i]` = true if `s.slice(0, i)` can be segmented. Iterate `i` from 1 to `s.length`. For each `i`, iterate `j` from 0 to `i-1`. If `dp[j]` is true AND `s.slice(j, i)` is in dict, then `dp[i] = true` and break inner loop.', code: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}` },
    { id: 'dp-013', question: 'Edit Distance (Min operations to convert word1 to word2).', difficulty: 'hard', type: 'practical', answer: 'Operations: insert, delete, replace. `dp[i][j]` is min ops for `word1[0..i]` and `word2[0..j]`. If chars match, `dp[i][j] = dp[i-1][j-1]`. Else, `1 + min(replace, delete, insert)`.', code: `function minDistance(word1, word2) {
  let m = word1.length, n = word2.length;
  let dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];
      else dp[i][j] = 1 + Math.min(
        dp[i-1][j-1], // replace
        dp[i-1][j],   // delete
        dp[i][j-1]    // insert
      );
    }
  }
  return dp[m][n];
}` },
    { id: 'dp-014', question: 'Maximum Product Subarray.', difficulty: 'medium', type: 'practical', answer: 'Track both `maxProduct` and `minProduct` ending at `i` (because a negative number times `minProduct` could suddenly become the new `maxProduct`).', code: `function maxProduct(nums) {
  let res = nums[0], max = nums[0], min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    let num = nums[i];
    let tempMax = Math.max(num, max * num, min * num);
    min = Math.min(num, max * num, min * num);
    max = tempMax;
    res = Math.max(res, max);
  }
  return res;
}` },
    { id: 'dp-015', question: 'Unique Paths (Robot from top-left to bottom-right of MxN grid).', difficulty: 'medium', type: 'practical', answer: 'Robot can only move right or down. Number of paths to cell `(r, c)` is sum of paths to cell `(r-1, c)` and `(r, c-1)`. Initialize top row and left column to 1.', code: `function uniquePaths(m, n) {
  let row = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    let newRow = new Array(n).fill(1);
    for (let j = 1; j < n; j++) {
      newRow[j] = newRow[j-1] + row[j];
    }
    row = newRow;
  }
  return row[n-1];
}` },
    { id: 'dp-016', question: 'Jump Game (Can reach end of array).', difficulty: 'medium', type: 'practical', answer: 'Greedy approach is O(N) time and O(1) space. Shift the "goal" post backwards from the last index to the first. If from index `i`, you can reach or pass the `goal` (`i + nums[i] >= goal`), then set `goal = i`. Return `goal === 0`.', code: `function canJump(nums) {
  let goal = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= goal) goal = i;
  }
  return goal === 0;
}` },
    { id: 'dp-017', question: 'Decode Ways (Number of ways to decode string of digits).', difficulty: 'medium', type: 'practical', answer: 'Similar to Fibonacci. A digit `i` can be decoded by itself (if != "0") and decoded with `i-1` (if between "10" and "26"). `dp[i] = (valid single) + (valid double)`.', code: `function numDecodings(s) {
  if (s[0] === '0') return 0;
  let dp1 = 1, dp2 = 1;
  for (let i = 1; i < s.length; i++) {
    let current = 0;
    if (s[i] !== '0') current += dp1;
    let twoDigit = parseInt(s.substring(i - 1, i + 1));
    if (twoDigit >= 10 && twoDigit <= 26) current += dp2;
    dp2 = dp1; dp1 = current;
  }
  return dp1;
}` },
    { id: 'dp-018', question: 'Minimum Path Sum (Grid with weights).', difficulty: 'medium', type: 'practical', answer: 'Similar to Unique Paths. Modify the first row and first column to be prefix sums. For inner cells, `dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])`.' },
    { id: 'dp-019', question: 'House Robber II (Houses are arranged in a circle).', difficulty: 'medium', type: 'practical', answer: 'Because it\'s a circle, you cannot rob BOTH house[0] and house[N-1]. Run the standard House Robber algorithm twice: once skipping the first house `nums.slice(1)`, and once skipping the last house `nums.slice(0, n-1)`. Return the max of the two results.' },
    { id: 'dp-020', question: 'Palindromic Substrings (Count total number).', difficulty: 'medium', type: 'practical', answer: 'Use "Expand Around Center" technique. For each character, expand outward checking for odd-length palindromes, then do the same for even-length palindromes (center is between characters). Increment count for each valid palindrome.' },
    { id: 'dp-021', question: 'Target Sum (Add +/- to array elements to equal target).', difficulty: 'medium', type: 'practical', answer: 'Can be solved with DP or Memoization. With Memoization: `dfs(index, currentSum)`. Cache state as string `"index,currentSum"`. Or reduce to subset sum math: find subset P with sum `(target + sum(nums)) / 2`.' },
    { id: 'dp-022', question: 'Longest Palindromic Substring.', difficulty: 'medium', type: 'practical', answer: 'While solvable with a 2D DP array, "Expand Around Center" is preferred for O(1) space. DP approach: `dp[i][j]` is true if `s[i..j]` is palindrome. Base cases: `dp[i][i] = true`. `dp[i][i+1] = s[i] == s[i+1]`. General: `dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1]`.' },
    { id: 'dp-023', question: 'Combination Sum IV (Number of combinations that add up to target).', difficulty: 'medium', type: 'practical', answer: '`dp[i]` = number of combinations to reach target `i`. `dp[0] = 1`. For each target from 1 to `N`, iterate over `nums`. If `num <= target`, `dp[target] += dp[target - num]`.' },
    { id: 'dp-024', question: 'Best Time to Buy and Sell Stock with Cooldown.', difficulty: 'medium', type: 'practical', answer: 'State Machine DP. 3 states: `Hold`, `Sold`, `Rest`. `Hold[i] = max(Hold[i-1], Rest[i-1] - price[i])`. `Sold[i] = Hold[i-1] + price[i]`. `Rest[i] = max(Rest[i-1], Sold[i-1])`.' },
    { id: 'dp-025', question: 'Regular Expression Matching (with `.` and `*`).', difficulty: 'hard', type: 'practical', answer: '2D DP or Top-Down Memoization. `.` matches any char. `*` matches 0 or more of the PRECEDING char. If next char is `*`, two choices: skip the `<char>*` sequence entirely (0 occurrences), or match `<char>` with `s` and keep the sequence available for the rest of `s`.' },
    { id: 'dp-026', question: 'Wildcard Matching (`?` matches single, `*` matches any sequence).', difficulty: 'hard', type: 'practical', answer: '2D DP. `dp[i][j]` is true if `s[0..i]` matches `p[0..j]`. If `p[j] == *`, `dp[i][j] = dp[i-1][j] || dp[i][j-1]` (matches sequence or empty). Else if `p[j] == ? || p[j] == s[i]`, `dp[i][j] = dp[i-1][j-1]`.' },
    { id: 'dp-027', question: 'Burst Balloons (Maximize coins).', difficulty: 'hard', type: 'theory', answer: 'Think backwards. Instead of finding which balloon to burst first, find which balloon to burst LAST. Let `dp[L][R]` be the max coins bursting all balloons between L and R. Choose `i` as the last balloon to burst in this range. `coins = nums[L-1] * nums[i] * nums[R+1] + dp[L][i-1] + dp[i+1][R]`.' },
    { id: 'dp-028', question: 'Distinct Subsequences (Number of ways `t` is a subsequence of `s`).', difficulty: 'hard', type: 'practical', answer: '2D DP. `dp[i][j]` = num ways `t[0..j]` is in `s[0..i]`. Base: `dp[i][0] = 1` (empty string `t` is in any string 1 way). If `s[i] == t[j]`, `dp[i][j] = dp[i-1][j-1] (use char) + dp[i-1][j] (don\'t use)`. Else, `dp[i-1][j]`.' },
    { id: 'dp-029', question: 'Interleaving String (Can s3 be formed by interleaving s1 and s2).', difficulty: 'medium', type: 'practical', answer: '2D DP. `dp[i][j]` = true if `s3[0..i+j]` can be formed by `s1[0..i]` and `s2[0..j]`. `dp[i][j] = (s1[i-1] == s3[i+j-1] && dp[i-1][j]) || (s2[j-1] == s3[i+j-1] && dp[i][j-1]`.' },
    { id: 'dp-030', question: 'Maximum Subarray (Kadane\'s Algorithm).', difficulty: 'medium', type: 'practical', answer: 'The simplest 1D DP. `dp[i]` = max subarray sum ending at `i`. `dp[i] = max(nums[i], nums[i] + dp[i-1])`. Optimization: space O(1) by only keeping the previous max.' },
    { id: 'dp-031', question: 'Maximal Square (Largest square of 1s in a binary matrix).', difficulty: 'medium', type: 'practical', answer: '2D DP. `dp[r][c]` = length of the largest square whose bottom-right corner is at `(r, c)`. If `matrix[r][c] == 1`, `dp[r][c] = min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]) + 1`.' },
    { id: 'dp-032', question: 'Triangle (Minimum path sum from top to bottom).', difficulty: 'medium', type: 'practical', answer: 'Bottom-Up DP is best. Start from the second-to-last row and work upwards. `triangle[row][col] += min(triangle[row+1][col], triangle[row+1][col+1])`. The answer is at `triangle[0][0]`.' },
    { id: 'dp-033', question: 'Russian Doll Envelopes (Max nested envelopes).', difficulty: 'hard', type: 'theory', answer: '1. Sort envelopes by width ascending. If widths are equal, sort by height DESCENDING. 2. Extract all the heights. 3. Find the Longest Increasing Subsequence (LIS) of the heights array.' },
    { id: 'dp-034', question: 'Unbounded Knapsack.', difficulty: 'medium', type: 'theory', answer: 'Similar to 0/1 Knapsack, but you can use an item an unlimited number of times. The inner loop checks `dp[w] = max(dp[w], val[i] + dp[w - weight[i]])`. The key difference is we iterate `w` left-to-right so we CAN reuse the item we just added.' },
    { id: 'dp-035', question: 'Coin Change II (Number of combinations that make up amount).', difficulty: 'medium', type: 'practical', answer: 'Unbounded Knapsack variant. `dp[i]` = number of ways to make amount `i`. Initialize `dp[0] = 1`. For EACH coin, iterate amount from `coin` to `total`. `dp[amount] += dp[amount - coin]`.' },
    { id: 'dp-036', question: 'Perfect Squares (Min squares that sum to n).', difficulty: 'medium', type: 'practical', answer: '`dp[i]` = min squares to sum to `i`. Initialize with `Infinity`, `dp[0] = 0`. For `i` from 1 to `n`, iterate `j` from 1 while `j*j <= i`. `dp[i] = min(dp[i], 1 + dp[i - j*j])`.' },
    { id: 'dp-037', question: 'Counting Bits.', difficulty: 'easy', type: 'practical', answer: 'Return an array of number of 1s in binary representation for 0 to n. DP relation: `dp[i] = dp[i >> 1] + (i & 1)`. Shift right divides by 2 (handles the rest of the bits), `& 1` checks if the last bit is 1.' },
    { id: 'dp-038', question: 'Longest Valid Parentheses.', difficulty: 'hard', type: 'practical', answer: "1D DP. `dp[i]` = length of longest valid substring ending at `i`. If `s[i] == ')'`: if `s[i-1] == '('`, `dp[i] = dp[i-2] + 2`. If `s[i-1] == ')'` and `s[i - dp[i-1] - 1] == '('`, `dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]`." },
    { id: 'dp-039', question: 'Jump Game II (Min jumps to reach end).', difficulty: 'medium', type: 'practical', answer: 'While solvable with DP (`O(N^2)`), Greedy is `O(N)`. Keep track of `l` and `r` bounds of the current jump. Find the `farthest` you can reach within this window. Then update `l = r + 1`, `r = farthest`, and increment jump count.' },
    { id: 'dp-040', question: 'Minimum Cost For Tickets.', difficulty: 'medium', type: 'practical', answer: '`dp[i]` = min cost up to day `i`. If day `i` is not a travel day, `dp[i] = dp[i-1]`. If it is a travel day, `dp[i] = min(dp[i-1]+costs[0], dp[max(0, i-7)]+costs[1], dp[max(0, i-30)]+costs[2])`.' },
    { id: 'dp-041', question: 'Predict the Winner (Minimax with DP).', difficulty: 'medium', type: 'practical', answer: '2D DP. `dp[i][j]` = max score difference player 1 can get from array `i..j`. Player 1 picks either `nums[i]` or `nums[j]`. They want to maximize their score minus player 2\'s score. `dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1])`.' },
    { id: 'dp-042', question: 'Matrix Chain Multiplication.', difficulty: 'hard', type: 'theory', answer: 'Find the most efficient way to multiply matrices. `dp[i][j]` = min cost to multiply matrices from `i` to `j`. Iterate length of chain `L`. Pick a split point `k`. `cost = dp[i][k] + dp[k+1][j] + (p[i-1]*p[k]*p[j])`.' },
    { id: 'dp-043', question: 'Catalan Numbers.', difficulty: 'medium', type: 'theory', answer: 'A sequence of numbers appearing in combinatorial problems (e.g., number of structurally unique BSTs for n keys, valid parenthesis expressions). Formula: `C(n) = (2n)! / ((n+1)! * n!)`. DP relation: `dp[i] += dp[j] * dp[i-j-1]`.' },
    { id: 'dp-044', question: 'Unique Binary Search Trees.', difficulty: 'medium', type: 'practical', answer: 'Calculates the Catalan number. `dp[i]` = number of unique BSTs with `i` nodes. For `n` nodes, pick each node `j` (1 to n) as root. Left subtree has `j-1` nodes, right has `n-j`. `dp[n] += dp[j-1] * dp[n-j]`.' },
    { id: 'dp-045', question: 'Integer Break (Max product of parts).', difficulty: 'medium', type: 'practical', answer: '`dp[i]` = max product of breaking integer `i`. Iterate `j` from 1 to `i/2`. `dp[i] = max(dp[i], max(j, dp[j]) * max(i-j, dp[i-j]))`. (Mathematical optimization: break into as many 3s as possible).' },
    { id: 'dp-046', question: 'Maximal Rectangle (Largest rectangle of 1s in binary matrix).', difficulty: 'hard', type: 'theory', answer: 'Convert into a series of "Largest Rectangle in Histogram" problems. Maintain an array of heights. For each row, update heights (if 1, `h[i]++`, else `h[i]=0`). Then apply the O(N) monotonic stack histogram algorithm on the heights array.' },
    { id: 'dp-047', question: 'Dungeon Game (Min initial health).', difficulty: 'hard', type: 'practical', answer: 'Bottom-Up DP starting from the princess at bottom-right. `dp[r][c]` = min health needed at this cell. `minHealth = min(dp[r+1][c], dp[r][c+1]) - dungeon[r][c]`. If `minHealth <= 0`, set to 1. Return `dp[0][0]`.' },
    { id: 'dp-048', question: 'Is Subsequence.', difficulty: 'easy', type: 'practical', answer: 'Can be solved with DP, but simple Two Pointers is O(N) time and O(1) space. Pointer `i` for string `s`, pointer `j` for `t`. If `s[i] == t[j]`, `i++`. Always `j++`. If `i == s.length`, return true.' },
    { id: 'dp-049', question: 'Number of Longest Increasing Subsequence.', difficulty: 'medium', type: 'theory', answer: 'Maintain TWO DP arrays. `length[i]` = length of LIS ending at `i`. `count[i]` = number of LIS ending at `i`. When updating LIS, if new length > current, `count[i] = count[j]`. If new length == current, `count[i] += count[j]`.' },
    { id: 'dp-050', question: 'Best Time to Buy and Sell Stock IV (At most K transactions).', difficulty: 'hard', type: 'practical', answer: '2D DP. `dp[t][i]` = max profit at day `i` with at most `t` transactions. `dp[t][i] = max(dp[t][i-1], price[i] + max_over_j(dp[t-1][j] - price[j]))`. Optimization: keep a running max to avoid the `O(N)` inner loop.' }
  ]
};
