var e={id:`hr-behavioral`,title:`Behavioral & STAR Method`,icon:`⭐`,summary:`Navigating past experiences, failures, and conflicts using the STAR method.`,concepts:[`STAR Method`,`Conflict Resolution`,`Handling Failure`,`Adaptability`,`Time Management`],questions:[{id:`hrb-001`,question:`What is the STAR method?`,difficulty:`easy`,type:`theory`,answer:`A structured manner of responding to a behavioral interview question. Situation (set the scene), Task (describe your responsibility), Action (explain exactly what YOU did), Result (share the positive outcome, ideally with metrics).`},{id:`hrb-002`,question:`Tell me about a time you had a conflict with a coworker.`,difficulty:`medium`,type:`theory`,answer:`STAR approach. Focus on communication, empathy, and professional resolution. Example: "S: We disagreed on the DB schema. A: I scheduled a 1-on-1 to understand their perspective. We realized we were optimizing for different things. R: We compromised on a hybrid approach, improving team trust."`},{id:`hrb-003`,question:`Describe a time you failed.`,difficulty:`hard`,type:`theory`,answer:`Own the failure; do not blame others. The most important part is the Result/Learning. "S: I pushed a buggy release that caused 10 mins of downtime. A: I immediately rolled back, then wrote a post-mortem. R: I implemented a new CI step to catch that specific error, ensuring it never happened again."`},{id:`hrb-004`,question:`Tell me about a time you had to work under a tight deadline.`,difficulty:`medium`,type:`theory`,answer:`Focus on prioritization, communication, and expectation management. "A: I broke the project into MVP features, communicated to stakeholders what would be delivered and what would be delayed, and focused solely on the critical path. R: Delivered the core product on time."`},{id:`hrb-005`,question:`Describe a time you went above and beyond your job description.`,difficulty:`medium`,type:`theory`,answer:`Highlight initiative and ownership. "S: I noticed our onboarding documentation was outdated. A: Over a few weeks, I spent 30 minutes a day rewriting it and creating a video tutorial. R: Reduced new hire onboarding time from 2 weeks to 1 week."`},{id:`hrb-006`,question:`Tell me about a time you had to learn a new technology quickly.`,difficulty:`easy`,type:`theory`,answer:`Show adaptability. "S: We needed to migrate to GraphQL in 2 weeks. A: I spent my weekend reading the docs, built a small prototype, and presented a migration strategy to the team. R: We migrated the core APIs within the sprint without breaking backward compatibility."`},{id:`hrb-007`,question:`Describe a time you received negative feedback.`,difficulty:`medium`,type:`theory`,answer:`Show humility and a growth mindset. "S: My manager told me my PRs were too large and hard to review. A: I thanked them for the feedback and started breaking my work into smaller, atomic commits. R: PR review times dropped significantly."`},{id:`hrb-008`,question:`Tell me about a time you disagreed with your manager.`,difficulty:`hard`,type:`theory`,answer:`Focus on respect and evidence. "S: Manager wanted to use a NoSQL DB for financial data. A: I presented a document showing why ACID compliance (SQL) was necessary for this specific use case. R: The manager agreed based on the evidence, preventing future data integrity issues."`},{id:`hrb-009`,question:`Describe a time you had to persuade someone to see things your way.`,difficulty:`medium`,type:`theory`,answer:`Highlight logic, data, and empathy. "A: Instead of just arguing my point, I built a quick prototype demonstrating that my proposed architecture was 3x faster. I presented the metrics to the team. R: The team adopted the new approach."`},{id:`hrb-010`,question:`Tell me about a time you had to deal with an ambiguous task.`,difficulty:`medium`,type:`theory`,answer:`Show problem-solving and communication. "S: Given a vague requirement to 'improve performance'. A: I asked clarifying questions, set up metrics (Datadog) to find the actual bottlenecks, and defined clear success criteria. R: Improved API response time by 40%."`},{id:`hrb-011`,question:`Describe a time you made a decision without all the information.`,difficulty:`hard`,type:`theory`,answer:`Show risk assessment and bias for action. "S: Server crashed during a critical launch; logs were inconclusive. A: I made the call to immediately revert to the previous version rather than spending hours debugging live. R: Minimized downtime, then debugged the issue safely in staging."`},{id:`hrb-012`,question:`Tell me about a time you took a calculated risk.`,difficulty:`medium`,type:`theory`,answer:`Focus on the "calculated" part. "A: I proposed migrating a non-critical microservice to serverless to test its viability, acknowledging the learning curve risk. R: It succeeded, reduced costs by 20%, and paved the way for broader adoption."`},{id:`hrb-013`,question:`Describe a time you had to compromise on quality to meet a deadline.`,difficulty:`hard`,type:`theory`,answer:`Show pragmatism and tech-debt management. "A: I intentionally hardcoded a configuration that would eventually need a UI, documenting it as tech debt. R: We hit the marketing deadline. I scheduled a ticket for the next sprint to build the UI and pay off the debt."`},{id:`hrb-014`,question:`Tell me about a time you worked with a difficult team member.`,difficulty:`medium`,type:`theory`,answer:`Focus on professionalism. "S: A colleague was constantly dismissing my ideas. A: I asked them for a private coffee chat to clear the air, assuming positive intent. We discovered a miscommunication regarding roles. R: Our working relationship improved significantly."`},{id:`hrb-015`,question:`Describe a time you had to explain a complex technical concept to a non-technical person.`,difficulty:`easy`,type:`theory`,answer:`Highlight your communication skills and use of analogies. "A: I explained an API to a marketing manager by comparing it to a waiter in a restaurant taking orders to the kitchen and bringing food back. R: They understood the concept and could better scope their requests."`},{id:`hrb-016`,question:`Tell me about a time you realized you were wrong about something.`,difficulty:`medium`,type:`theory`,answer:`Show low ego. "S: I strongly advocated for a specific caching strategy. A junior dev pointed out a flaw that would cause stale data. A: I immediately acknowledged they were right, thanked them, and pivoted to their solution. R: Prevented a major bug."`},{id:`hrb-017`,question:`Describe a time you improved a process.`,difficulty:`medium`,type:`theory`,answer:`Show continuous improvement. "S: Manual deployments took 2 hours and caused anxiety. A: I took the initiative to learn GitHub Actions and automated the deployment script. R: Deployments now take 5 minutes and are error-free."`},{id:`hrb-018`,question:`Tell me about a time you had to juggle multiple high-priority tasks.`,difficulty:`medium`,type:`theory`,answer:`Focus on organization. "A: I created a matrix of Urgency vs. Importance (Eisenhower Matrix). I communicated with my manager to align on priorities, delegated one task, and focused deeply on the most critical one. R: Successfully navigated the crunch without burning out."`},{id:`hrb-019`,question:`Describe a time you stepped up as a leader.`,difficulty:`medium`,type:`theory`,answer:`Leadership isn't just a title. "S: Our tech lead went on sudden medical leave during a crunch. A: I stepped in to facilitate the daily stand-ups, unblocked junior developers, and liaised with product managers. R: The sprint was delivered successfully."`},{id:`hrb-020`,question:`Tell me about a time you anticipated a problem before it happened.`,difficulty:`hard`,type:`theory`,answer:`Show foresight. "S: I noticed our database size was growing exponentially and would hit its storage limit right during Black Friday. A: I preemptively set up an archiving job for old records and provisioned more storage. R: Zero downtime during the peak event."`},{id:`hrb-021`,question:`Describe a time you had to motivate a demoralized team.`,difficulty:`hard`,type:`theory`,answer:`Focus on empathy and small wins. "S: The team was exhausted after a canceled project. A: I organized a retrospective focusing solely on the positive technical skills we learned, and proposed we use those skills on a small, quick-win feature. R: Morale improved visibly."`},{id:`hrb-022`,question:`Tell me about a time you handled a difficult customer/client requirement.`,difficulty:`medium`,type:`theory`,answer:`"S: Client wanted a feature that violated data privacy laws. A: Instead of just saying no, I explained the legal risks and proposed an alternative feature that achieved their business goal safely. R: They appreciated the guidance and accepted the alternative."`},{id:`hrb-023`,question:`Describe a time you missed a deadline.`,difficulty:`hard`,type:`theory`,answer:`Accountability is key. "S: I underestimated the complexity of a 3rd-party integration. A: As soon as I realized I would miss the deadline, I informed stakeholders, explained the roadblock, and provided a realistic new timeline. R: Rebuilt trust through transparency."`},{id:`hrb-024`,question:`Tell me about a time you had to gather information from multiple sources to solve a problem.`,difficulty:`easy`,type:`theory`,answer:`"S: We had a mysterious memory leak. A: I gathered data from Datadog APM, analyzed AWS CloudWatch logs, and profiled the local Node.js process using Chrome DevTools. R: By cross-referencing, I found the circular reference causing the leak."`},{id:`hrb-025`,question:`Describe a time you proactively sought out feedback.`,difficulty:`medium`,type:`theory`,answer:`"A: After leading my first major architectural meeting, I specifically asked a senior engineer for a quick 1-on-1 to critique my presentation style and technical arguments. R: I learned to be more concise, which helped in future meetings."`},{id:`hrb-026`,question:`Tell me about a time you had to adapt to a major change in project scope.`,difficulty:`medium`,type:`theory`,answer:`"S: Halfway through, the client pivoted the app's core demographic. A: I didn't complain; I immediately halted current work, held a team meeting to assess which components were salvageable, and re-estimated the new scope. R: Transitioned smoothly with minimal wasted effort."`},{id:`hrb-027`,question:`Describe a time you made a mistake but caught it before it went to production.`,difficulty:`easy`,type:`theory`,answer:`"S: I wrote a SQL query that would have locked the entire users table. A: I caught it during my own self-review before opening the PR. I rewrote it using a non-blocking index approach. R: It reinforced my habit of rigorous self-review."`},{id:`hrb-028`,question:`Tell me about a time you advocated for the end-user.`,difficulty:`medium`,type:`theory`,answer:`"S: PM wanted to add a pop-up ad upon login to boost metrics. A: I argued it would ruin the UX and increase churn. I proposed A/B testing it first. R: The test showed a huge drop in retention, so the idea was scrapped. UX was preserved."`},{id:`hrb-029`,question:`Describe a time you helped a colleague who was struggling.`,difficulty:`medium`,type:`theory`,answer:`"S: A new hire was stuck on setting up their local Docker environment for two days. A: I blocked out an hour, pair-programmed with them to fix it, and then helped them write a script to automate the setup for future hires. R: They became productive immediately."`},{id:`hrb-030`,question:`Tell me about a time you had to rely on others to get your work done.`,difficulty:`medium`,type:`theory`,answer:`"S: I couldn't finish the frontend until the backend API was ready. A: I mocked the API using JSON Server so I could continue building the UI, and set up daily check-ins with the backend dev to ensure our contracts aligned. R: Seamless integration when the API was finally ready."`},{id:`hrb-031`,question:`Describe a time you had to work with an unfamiliar codebase.`,difficulty:`medium`,type:`theory`,answer:`"S: Inherited a legacy PHP app with no tests. A: Instead of rewriting it, I wrote characterization tests (Snapshot testing) for the existing behavior, mapped out the core flow, and only refactored the specific modules I needed to touch. R: Safely added features without breaking legacy logic."`},{id:`hrb-032`,question:`Tell me about a time you had to make a presentation to an executive team.`,difficulty:`hard`,type:`theory`,answer:`Focus on knowing your audience. "A: I stripped out all the deep technical jargon. I focused the presentation on business value, costs, and timelines, using high-level architecture diagrams. R: Secured the budget for the new infrastructure."`},{id:`hrb-033`,question:`Describe a time you discovered a security vulnerability.`,difficulty:`hard`,type:`theory`,answer:`"S: While reviewing code, I found an endpoint vulnerable to IDOR. A: I didn't just fix it; I audited the rest of the app for similar flaws, fixed them all, and added a linting rule to catch it in the future. R: Secured the app before any data was compromised."`},{id:`hrb-034`,question:`Tell me about a time you had to decline a request from a stakeholder.`,difficulty:`medium`,type:`theory`,answer:`Focus on "No, but...". "S: Marketing wanted a massive new feature 2 days before launch. A: I explained the risk to system stability so close to launch. I said 'No, but we can fast-track it for the first patch next week'. R: They understood the risk and agreed to the delay."`},{id:`hrb-035`,question:`Describe a time your idea was rejected.`,difficulty:`medium`,type:`theory`,answer:`"S: I proposed migrating to GraphQL, but the lead architect rejected it due to the learning curve for the team. A: I accepted the decision gracefully, recognized the business logic behind it, and focused my energy on optimizing our existing REST APIs. R: Maintained a great relationship with the lead."`},{id:`hrb-036`,question:`Tell me about a time you had to deliver bad news to a client or manager.`,difficulty:`hard`,type:`theory`,answer:`"S: A key database migration failed, delaying launch. A: I called the client immediately, explained exactly what went wrong without using confusing jargon, outlined my immediate plan to fix it, and provided a new ETA. R: The client appreciated the prompt honesty."`},{id:`hrb-037`,question:`Describe a time you found a creative solution to a problem.`,difficulty:`medium`,type:`theory`,answer:`"S: An external API we relied on was rate-limiting us severely. A: Instead of paying for a massive enterprise tier, I implemented a Redis-based queuing system that batched our requests and executed them right at the rate limit threshold. R: Saved the company $10k/month."`},{id:`hrb-038`,question:`Tell me about a time you had to enforce a standard or policy.`,difficulty:`medium`,type:`theory`,answer:`"S: Developers were bypassing CI/CD and pushing directly to main. A: I didn't just yell at them; I realized the CI pipeline was too slow (taking 30 mins). I optimized the pipeline down to 5 mins, THEN protected the main branch via GitHub settings. R: Compliance reached 100% naturally."`},{id:`hrb-039`,question:`Describe a time you were overwhelmed with your workload.`,difficulty:`medium`,type:`theory`,answer:`"A: I compiled a list of everything on my plate, estimated the hours, and took it to my manager. I asked them to help me ruthlessly prioritize. R: We dropped two low-value tasks, allowing me to deliver the high-value tasks perfectly on time."`},{id:`hrb-040`,question:`Tell me about a time you used data to make a decision.`,difficulty:`medium`,type:`theory`,answer:`"S: Team was debating whether to support older versions of Safari. A: I pulled the Google Analytics data, which showed only 0.2% of our users used that browser. R: We confidently dropped support, saving weeks of QA testing time."`},{id:`hrb-041`,question:`Describe a time you contributed to open source or the broader tech community.`,difficulty:`easy`,type:`theory`,answer:`Mention PRs to libraries you use, writing technical blog posts, speaking at meetups, or answering questions on StackOverflow.`},{id:`hrb-042`,question:`Tell me about a time you had to troubleshoot a problem with minimal documentation.`,difficulty:`hard`,type:`theory`,answer:`"A: The library had no docs. I cloned the source code, read the unit tests to understand the intended behavior, and used a debugger to step through the execution flow. R: Fixed the issue and submitted a PR to the maintainers to update their Readme."`},{id:`hrb-043`,question:`Describe a time you fostered an inclusive environment.`,difficulty:`medium`,type:`theory`,answer:`"S: I noticed our remote team members rarely spoke up during hybrid meetings. A: I implemented a 'remote-first' meeting policy where everyone dialed in from their laptops, even if in the office, leveling the playing field. R: Participation from remote workers skyrocketed."`},{id:`hrb-044`,question:`Tell me about a time you had to quickly pivot your technical approach.`,difficulty:`medium`,type:`theory`,answer:`"S: A week before launch, a new privacy regulation was announced that invalidated our data storage architecture. A: I pivoted the team to use a hashing technique that anonymized the data at rest. R: We met the compliance deadline."`},{id:`hrb-045`,question:`Describe a time you mentored someone who was underperforming.`,difficulty:`hard`,type:`theory`,answer:`"S: A junior dev was missing deadlines. A: I had a private, empathetic conversation and discovered they were overwhelmed by Git. I spent an hour teaching them Git workflows and set up a daily 15-min check-in. R: Their velocity improved drastically within a month."`},{id:`hrb-046`,question:`Tell me about a time you took ownership of a project that wasn't yours.`,difficulty:`medium`,type:`theory`,answer:`"S: A critical internal tool broke while its creator was on vacation. A: I dove into the codebase, debugged the issue, pushed a hotfix, and documented the process so others could do it in the future. R: Unblocked the sales team for the week."`},{id:`hrb-047`,question:`Describe a time you identified a bottleneck in your team's workflow.`,difficulty:`medium`,type:`theory`,answer:`"S: QA was taking too long because they had to manually set up test environments. A: I wrote a Docker Compose file that spun up the app and a seeded database with one command. R: QA testing time was cut in half."`},{id:`hrb-048`,question:`Tell me about a time you balanced technical excellence with business value.`,difficulty:`hard`,type:`theory`,answer:`"S: I wanted to rewrite the entire billing module using a new framework (technical excellence). However, the business needed a new payment gateway integrated immediately (business value). A: I integrated the gateway into the legacy code first to secure revenue, then scheduled the rewrite for the next quarter. R: Revenue increased immediately."`},{id:`hrb-049`,question:`Describe a time you disagreed with a product requirement.`,difficulty:`medium`,type:`theory`,answer:`"S: Product wanted an auto-playing video with sound on the landing page. A: I pushed back, citing UX best practices and mobile data concerns. I suggested a muted video that plays on hover. R: Product agreed, and bounce rates stayed low."`},{id:`hrb-050`,question:`Tell me about a time you automated a repetitive task.`,difficulty:`easy`,type:`theory`,answer:`"S: I noticed I spent 20 mins every morning pulling reports from 3 different systems. A: I wrote a Python script using their APIs to fetch, format, and Slack me the report at 8 AM automatically. R: Saved myself over 80 hours a year."`}]},t={id:`dsa-arrays`,title:`Arrays & Strings`,icon:`🧮`,summary:`Foundational data structures, two pointers, sliding window, and string manipulation.`,concepts:[`Two Pointers`,`Sliding Window`,`Prefix Sum`,`Hash Maps`,`In-place Manipulation`,`Palindromes`,`Substrings`],questions:[{id:`arr-001`,question:`What is an Array?`,difficulty:`easy`,type:`theory`,answer:`A linear data structure consisting of a collection of elements, each identified by an array index. Elements are stored in contiguous memory locations, allowing O(1) random access.`},{id:`arr-002`,question:`Explain the Two Pointers technique.`,difficulty:`medium`,type:`theory`,answer:`A technique where two pointers iterate through the data structure in tandem until one or both hit a certain condition. Often used in sorted arrays to find pairs (moving from both ends to the center) or for fast/slow pointer traversals.`},{id:`arr-003`,question:`Explain the Sliding Window technique.`,difficulty:`medium`,type:`theory`,answer:`A subset of two pointers used to solve problems looking for a contiguous subarray or substring. A "window" of elements is maintained, expanding (moving the right pointer) to include elements, and contracting (moving the left pointer) to remove them when a condition is violated.`},{id:`arr-004`,question:`How do you reverse a string in-place?`,difficulty:`easy`,type:`practical`,answer:`Use two pointers, one at the start and one at the end. Swap the characters at these pointers, then increment the start and decrement the end until they meet in the middle.`,code:`function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++; right--;
  }
}`},{id:`arr-005`,question:`What is the Time and Space complexity of reversing an array in-place?`,difficulty:`easy`,type:`theory`,answer:`Time Complexity: O(N) because we iterate through half the array to perform N/2 swaps. Space Complexity: O(1) because we only use a constant amount of extra space for the two pointers.`},{id:`arr-006`,question:`Find two numbers in a SORTED array that add up to a target.`,difficulty:`easy`,type:`practical`,answer:"Use two pointers. One at index 0, one at the end. If `sum == target`, return. If `sum < target`, increment left pointer to increase sum. If `sum > target`, decrement right pointer to decrease sum.",code:`function twoSumSorted(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    let sum = arr[l] + arr[r];
    if (sum === target) return [l, r];
    if (sum < target) l++;
    else r--;
  }
  return [];
}`},{id:`arr-007`,question:`Find two numbers in an UNSORTED array that add up to a target.`,difficulty:`easy`,type:`practical`,answer:"Use a Hash Map. Iterate through the array. For each element, calculate the `complement` (target - element). If the complement exists in the map, return the indices. Otherwise, add the element and its index to the map.",code:`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`},{id:`arr-008`,question:`Find the maximum sum of a contiguous subarray (Kadane's Algorithm).`,difficulty:`medium`,type:`practical`,answer:"Keep a running sum (`currentMax`). If `currentMax` drops below zero, reset it to the current element. Keep track of the `globalMax` seen so far. Time O(N), Space O(1).",code:`function maxSubArray(nums) {
  let max = nums[0], currentMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    max = Math.max(max, currentMax);
  }
  return max;
}`},{id:`arr-009`,question:`Find the length of the longest substring without repeating characters.`,difficulty:`medium`,type:`practical`,answer:"Use a Sliding Window with a Hash Set/Map. Expand the `right` pointer. If a duplicate is found, shrink the `left` pointer until the duplicate is removed from the window. Track the `max` length.",code:`function lengthOfLongestSubstring(s) {
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
}`},{id:`arr-010`,question:`How do you check if two strings are anagrams?`,difficulty:`easy`,type:`practical`,answer:`Use a frequency counter array (size 26 for lowercase letters) or Hash Map. Increment counts for string 1, decrement for string 2. If any count is non-zero, they are not anagrams.`,code:`function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`},{id:`arr-011`,question:`Given an array, move all 0s to the end while maintaining relative order.`,difficulty:`easy`,type:`practical`,answer:"Use a two-pointer approach. `nonZeroIndex` keeps track of where the next non-zero should go. Iterate with `i`. If `arr[i]` is not zero, swap it with `arr[nonZeroIndex]` and increment `nonZeroIndex`.",code:`function moveZeroes(nums) {
  let nonZeroIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[nonZeroIdx], nums[i]] = [nums[i], nums[nonZeroIdx]];
      nonZeroIdx++;
    }
  }
}`},{id:`arr-012`,question:`Explain Prefix Sum arrays.`,difficulty:`medium`,type:`theory`,answer:"An array where the element at index `i` stores the sum of all elements from index `0` to `i` of the original array. Useful for answering range sum queries in O(1) time after O(N) preprocessing: `Sum(i, j) = Prefix[j] - Prefix[i-1]`."},{id:`arr-013`,question:`Find the product of array except self (without division).`,difficulty:`medium`,type:`practical`,answer:`Use two passes. Pass 1: Calculate the prefix products and store them in the result array. Pass 2: Calculate the suffix products on the fly (iterating backwards) and multiply them with the values in the result array.`,code:`function productExceptSelf(nums) {
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
}`},{id:`arr-014`,question:`Group anagrams from an array of strings.`,difficulty:`medium`,type:`practical`,answer:`Use a Hash Map. For each string, generate a key by either sorting the string or using a character count array joined as a string. Push the original string into the map's array for that key.`,code:`function groupAnagrams(strs) {
  const map = new Map();
  for (let s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return Array.from(map.values());
}`},{id:`arr-015`,question:`Find the longest palindromic substring.`,difficulty:`medium`,type:`practical`,answer:`Expand Around Center. Iterate through the string. For each character, treat it as the center of a palindrome and expand outwards (both odd length and even length palindromes). Track the max length found.`,code:`function longestPalindrome(s) {
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
}`},{id:`arr-016`,question:`Check if a string is a valid palindrome (ignoring non-alphanumeric).`,difficulty:`easy`,type:`practical`,answer:`Use two pointers (start and end). If a character is not alphanumeric, skip it. If they are both alphanumeric, compare them case-insensitively. If they don't match, return false.`,code:`function isPalindrome(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;
    while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }
  return true;
}`},{id:`arr-017`,question:`Container with Most Water (find two lines that form a container holding the most water).`,difficulty:`medium`,type:`practical`,answer:"Two pointers, one at start, one at end. The area is limited by the shorter line: `min(height[l], height[r]) * (r - l)`. To maximize area, always move the pointer pointing to the SHORTER line inward.",code:`function maxArea(height) {
  let max = 0, l = 0, r = height.length - 1;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    max = Math.max(max, area);
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}`},{id:`arr-018`,question:`Find all unique triplets in an array that sum to zero (3Sum).`,difficulty:`medium`,type:`practical`,answer:"Sort the array first. Iterate `i` from 0 to n-2. For each `i`, use the Two Pointer approach (`l = i+1`, `r = n-1`) to find pairs that sum to `-nums[i]`. Skip duplicate values to ensure unique triplets.",code:`function threeSum(nums) {
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
}`},{id:`arr-019`,question:`Find the minimum window substring that contains all characters of string t.`,difficulty:`hard`,type:`practical`,answer:"Use a Sliding Window with two frequency maps (or one map and a `have/need` counter). Expand `right` until the window contains all required characters. Then shrink `left` to minimize the window while still maintaining the condition.",code:`function minWindow(s, t) {
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
}`},{id:`arr-020`,question:`Rotate an array to the right by k steps.`,difficulty:`medium`,type:`practical`,answer:"Use the Reverse approach. 1. Reverse the entire array. 2. Reverse the first k elements. 3. Reverse the remaining elements. (Remember to do `k = k % arr.length`). Time O(N), Space O(1).",code:`function rotate(nums, k) {
  k = k % nums.length;
  const reverse = (l, r) => {
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
  };
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
}`},{id:`arr-021`,question:`Find the longest repeating character replacement (can change at most k characters).`,difficulty:`medium`,type:`practical`,answer:"Sliding Window. Keep a frequency map of characters in the window. The window is valid if `window_length - max_freq_char_count <= k`. If invalid, shrink the left pointer.",code:`function characterReplacement(s, k) {
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
}`},{id:`arr-022`,question:`Merge Intervals: Given an array of intervals, merge all overlapping ones.`,difficulty:`medium`,type:`practical`,answer:"1. Sort the intervals by their start times. 2. Push the first interval to a `result` array. 3. Iterate. If the current interval overlaps with the last one in `result` (i.e., `curr.start <= last.end`), update `last.end` to `max(last.end, curr.end)`. Else, push `curr` to `result`.",code:`function merge(intervals) {
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
}`},{id:`arr-023`,question:`Best Time to Buy and Sell Stock (one transaction).`,difficulty:`easy`,type:`practical`,answer:"Iterate through prices tracking the `minPrice` seen so far. At each step, calculate the potential profit (`price - minPrice`) and update the `maxProfit` if it's higher.",code:`function maxProfit(prices) {
  let minPrice = Infinity, maxProf = 0;
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProf = Math.max(maxProf, price - minPrice);
  }
  return maxProf;
}`},{id:`arr-024`,question:`Find the Subarray Sum Equals K.`,difficulty:`medium`,type:`practical`,answer:"Use Prefix Sums + Hash Map. Track the running sum. If `(runningSum - K)` exists in the map, it means there is a subarray ending here that sums to K. Add the map value to the total count.",code:`function subarraySum(nums, k) {
  let count = 0, sum = 0;
  const map = new Map();
  map.set(0, 1); // base case: sum of 0 occurs once
  for (let num of nums) {
    sum += num;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}`},{id:`arr-025`,question:`What is the Boyer-Moore Majority Vote Algorithm?`,difficulty:`medium`,type:`theory`,answer:"An O(N) time, O(1) space algorithm to find the majority element (appears > N/2 times). It maintains a `candidate` and a `count`. If count is 0, pick a new candidate. If current element equals candidate, increment count, else decrement. The surviving candidate is the majority."},{id:`arr-026`,question:`Implement the Boyer-Moore Majority Vote Algorithm.`,difficulty:`easy`,type:`practical`,answer:`Maintain a count and candidate. Iterate. If count is 0, assign candidate. Adjust count based on match.`,code:`function majorityElement(nums) {
  let count = 0, candidate = null;
  for (let num of nums) {
    if (count === 0) candidate = num;
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}`},{id:`arr-027`,question:`Find the Missing Number in an array containing 0 to N.`,difficulty:`easy`,type:`practical`,answer:"Can be solved using Math or Bit Manipulation. Math: Calculate the expected sum formula `n*(n+1)/2` and subtract the actual sum of the array. XOR: XOR all array elements and all numbers from 0 to N. The missing number will remain.",code:`function missingNumber(nums) {
  let expectedSum = nums.length * (nums.length + 1) / 2;
  let actualSum = nums.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}`},{id:`arr-028`,question:`Valid Parentheses: Check if a string of brackets is validly closed.`,difficulty:`easy`,type:`practical`,answer:`Use a Stack (implemented via an Array). Push open brackets onto the stack. If a close bracket is encountered, pop from the stack and check if it matches the corresponding open bracket.`,code:`function isValid(s) {
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
}`},{id:`arr-029`,question:`String to Integer (atoi).`,difficulty:`medium`,type:`practical`,answer:"Ignore leading whitespaces. Handle optional sign (+/-). Iterate through digits, building the number (`res = res * 10 + digit`). Stop at the first non-digit. Clamp the result to 32-bit signed integer limits (`-2^31` to `2^31 - 1`)."},{id:`arr-030`,question:`Longest Common Prefix among an array of strings.`,difficulty:`easy`,type:`practical`,answer:`Take the first string as the initial prefix. Compare it with the next string, shortening the prefix from the end until it matches. Repeat for all strings.`,code:`function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return "";
    }
  }
  return prefix;
}`},{id:`arr-031`,question:`Find all duplicates in an array where 1 ≤ a[i] ≤ n in O(N) time and O(1) space.`,difficulty:`medium`,type:`practical`,answer:"Since values are between 1 and n, we can use the array elements as indices. Iterate. For each `nums[i]`, flip the sign of the element at index `Math.abs(nums[i]) - 1` to negative. If it's already negative, it's a duplicate.",code:`function findDuplicates(nums) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    let index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) res.push(index + 1);
    else nums[index] = -nums[index];
  }
  return res;
}`},{id:`arr-032`,question:`Trapping Rain Water.`,difficulty:`hard`,type:`practical`,answer:"Two pointers (left and right). Keep track of `leftMax` and `rightMax`. Move the pointer that has the smaller max. The water trapped at the current pointer is `max - height[pointer]`.",code:`function trap(height) {
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
}`},{id:`arr-033`,question:`Implement strStr() / String indexOf.`,difficulty:`easy`,type:`practical`,answer:"Slide a window of size `needle.length` over `haystack`. If the substring matches `needle`, return the index. (For optimal O(N) time, use KMP algorithm, but simple sliding window is usually acceptable).",code:`function strStr(haystack, needle) {
  if (needle === '') return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;
    while (j < needle.length && haystack[i + j] === needle[j]) j++;
    if (j === needle.length) return i;
  }
  return -1;
}`},{id:`arr-034`,question:`Longest Consecutive Sequence in an unsorted array.`,difficulty:`medium`,type:`practical`,answer:"Insert all elements into a Hash Set. Iterate over the set. If `num - 1` is NOT in the set, it is the start of a sequence. Count upwards (`num + 1`, `num + 2`) while they exist in the set. Time O(N).",code:`function longestConsecutive(nums) {
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
}`},{id:`arr-035`,question:`Spiral Matrix traversal.`,difficulty:`medium`,type:`practical`,answer:`Maintain 4 boundary variables: top, bottom, left, right. Traverse top row (left->right), increment top. Right col (top->bottom), decrement right. Bottom row (right->left), decrement bottom. Left col (bottom->top), increment left. Repeat until boundaries cross.`,code:`function spiralOrder(matrix) {
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
}`},{id:`arr-036`,question:`Set Matrix Zeroes: If an element is 0, set its row and col to 0 in-place.`,difficulty:`medium`,type:`practical`,answer:`Use the first row and first column of the matrix itself to keep track of which rows and columns need to be zeroed. Use two extra variables (or one) to track if the first row/col themselves need to be zeroed.`,code:`function setZeroes(matrix) {
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
}`},{id:`arr-037`,question:`Find the single number in an array where every other number appears twice.`,difficulty:`easy`,type:`practical`,answer:"Use Bit Manipulation (XOR). XORing a number with itself results in 0 (`a ^ a = 0`). XORing a number with 0 results in the number (`a ^ 0 = a`). XOR all numbers together; the duplicates will cancel out, leaving only the single number.",code:`function singleNumber(nums) {
  let res = 0;
  for (let num of nums) res ^= num;
  return res;
}`},{id:`arr-038`,question:`Determine if a 9x9 Sudoku board is valid.`,difficulty:`medium`,type:`practical`,answer:"Use Hash Sets for each row, column, and 3x3 sub-box. Iterate over the board. If a cell is not empty, check if it already exists in the corresponding row set, col set, or box set. Calculate box index as `Math.floor(r/3)*3 + Math.floor(c/3)`.",code:`function isValidSudoku(board) {
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
}`},{id:`arr-039`,question:`Next Permutation (lexicographically next greater permutation of numbers).`,difficulty:`medium`,type:`practical`,answer:"1. Scan from right to find first decreasing element `arr[i] < arr[i+1]`. 2. Scan from right to find first element `arr[j] > arr[i]`. 3. Swap `arr[i]` and `arr[j]`. 4. Reverse the sub-array from `i+1` to the end. If step 1 fails, just reverse the whole array.",code:`function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let l = i + 1, r = nums.length - 1;
  while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
}`},{id:`arr-040`,question:`Find all Anagrams in a String.`,difficulty:`medium`,type:`practical`,answer:"Sliding Window + Frequency Map. Create an array of size 26 for `p`'s character counts. Slide a window of size `p.length` across `s`. Update the window's character counts dynamically (add incoming char, remove outgoing char). If the arrays match, record the start index.",code:`function findAnagrams(s, p) {
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
}`},{id:`arr-041`,question:`Encode and Decode Strings (List of strings into a single string and back).`,difficulty:`medium`,type:`practical`,answer:'Cannot just use a delimiter like `,` because it might exist in the string. Encode format: `[Length of string] + "#" + [String]`. E.g., `["abc", "de"]` becomes `3#abc2#de`. Decode by reading the number until `#`, then extracting that many characters.',code:`class Codec {
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
}`},{id:`arr-042`,question:`Valid Palindrome II (Can delete at most one character).`,difficulty:`easy`,type:`practical`,answer:"Two pointers from ends. If mismatch found at `left` and `right`, the string is a valid palindrome II if EITHER the substring `(left+1, right)` OR `(left, right-1)` is a standard palindrome.",code:`function validPalindrome(s) {
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
}`},{id:`arr-043`,question:`Find Pivot Index (Equilibrium Index).`,difficulty:`easy`,type:`practical`,answer:"Calculate the `totalSum` of the array. Iterate while maintaining a `leftSum`. The `rightSum` is `totalSum - leftSum - nums[i]`. If `leftSum == rightSum`, return `i`. Otherwise, `leftSum += nums[i]`.",code:`function pivotIndex(nums) {
  let total = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (leftSum === total - leftSum - nums[i]) return i;
    leftSum += nums[i];
  }
  return -1;
}`},{id:`arr-044`,question:`Find the First Missing Positive integer in an unsorted array.`,difficulty:`hard`,type:`practical`,answer:"O(N) time, O(1) space. The answer must be between 1 and N+1. Cycle sort: place each number `x` (where `1 <= x <= N`) at index `x-1`. Iterate again; the first index `i` where `nums[i] !== i + 1` is the missing number `i+1`.",code:`function firstMissingPositive(nums) {
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
}`},{id:`arr-045`,question:`Isomorphic Strings.`,difficulty:`easy`,type:`practical`,answer:"Two strings are isomorphic if characters in `s` can be replaced to get `t`. Keep two Hash Maps (or arrays). Map char from `s` to `t` and `t` to `s`. If an existing mapping contradicts the current chars, return false.",code:`function isIsomorphic(s, t) {
  let mapS = {}, mapT = {};
  for (let i = 0; i < s.length; i++) {
    let c1 = s[i], c2 = t[i];
    if (mapS[c1] && mapS[c1] !== c2) return false;
    if (mapT[c2] && mapT[c2] !== c1) return false;
    mapS[c1] = c2; mapT[c2] = c1;
  }
  return true;
}`},{id:`arr-046`,question:`Rotate Image (2D Matrix 90 degrees clockwise in-place).`,difficulty:`medium`,type:`practical`,answer:"Two steps: 1. Transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`). 2. Reverse each row of the matrix.",code:`function rotate(matrix) {
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
}`},{id:`arr-047`,question:`Subarray Product Less Than K.`,difficulty:`medium`,type:`practical`,answer:"Sliding Window. Track `product`. If `product >= k`, shrink the window from the left by dividing `product` by `nums[left]` and incrementing `left`. The number of valid subarrays ending at `right` is `right - left + 1`.",code:`function numSubarrayProductLessThanK(nums, k) {
  if (k <= 1) return 0;
  let prod = 1, res = 0, l = 0;
  for (let r = 0; r < nums.length; r++) {
    prod *= nums[r];
    while (prod >= k) { prod /= nums[l]; l++; }
    res += r - l + 1;
  }
  return res;
}`},{id:`arr-048`,question:`Insert Interval into a sorted, non-overlapping array of intervals.`,difficulty:`medium`,type:`practical`,answer:`Iterate. 1. While current interval ends before newInterval starts, push current. 2. While current overlaps with newInterval, merge them by updating newInterval's start/end. Push merged newInterval. 3. Push remaining intervals.`,code:`function insert(intervals, newInterval) {
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
}`},{id:`arr-049`,question:`Minimum Size Subarray Sum (>= target).`,difficulty:`medium`,type:`practical`,answer:"Sliding window. Expand `right`, adding to `sum`. While `sum >= target`, update `minLen` and shrink the window from the `left` (subtract `nums[left]`, `left++`).",code:`function minSubArrayLen(target, nums) {
  let l = 0, sum = 0, minLen = Infinity;
  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];
    while (sum >= target) {
      minLen = Math.min(minLen, r - l + 1);
      sum -= nums[l++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}`},{id:`arr-050`,question:`Longest Palindromic Subsequence.`,difficulty:`medium`,type:`theory`,answer:"A subsequence can delete characters (unlike a substring). Solved using 2D Dynamic Programming. `dp[i][j]` represents the max length in substring from index `i` to `j`. If `s[i] == s[j]`, `dp[i][j] = 2 + dp[i+1][j-1]`. Else, `max(dp[i+1][j], dp[i][j-1])`."}]},n={id:`dsa-trees`,title:`Trees & Graphs`,icon:`🌲`,summary:`Hierarchical and relational data structures, DFS, BFS, and shortest path algorithms.`,concepts:[`Binary Trees`,`BST`,`DFS`,`BFS`,`Topological Sort`,`Dijkstra`,`Trie`,`Union Find`],questions:[{id:`tree-001`,question:`What is a Binary Tree?`,difficulty:`easy`,type:`theory`,answer:`A tree data structure in which each node has at most two children, referred to as the left child and the right child.`},{id:`tree-002`,question:`What is a Binary Search Tree (BST)?`,difficulty:`easy`,type:`theory`,answer:`A binary tree where the value of every node in a node's left subtree is strictly less than the node's value, and the value of every node in its right subtree is strictly greater than the node's value. In-order traversal of a BST yields a sorted array.`},{id:`tree-003`,question:`Explain Pre-order, In-order, and Post-order Traversals (DFS).`,difficulty:`medium`,type:`theory`,answer:`Depth-First Search traversals. Pre-order: Root, Left, Right (used to copy a tree). In-order: Left, Root, Right (used to get sorted elements of a BST). Post-order: Left, Right, Root (used to delete a tree, since you must delete children before the parent).`},{id:`tree-004`,question:`Explain Level-order Traversal (BFS).`,difficulty:`medium`,type:`theory`,answer:`Breadth-First Search traversal. Visits all the nodes at the present depth level before moving on to the nodes at the next depth level. Implemented iteratively using a Queue.`},{id:`tree-005`,question:`Invert a Binary Tree.`,difficulty:`easy`,type:`practical`,answer:`Swap the left and right children of every node in the tree using recursion (DFS).`,code:`function invertTree(root) {
  if (!root) return null;
  let temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}`},{id:`tree-006`,question:`Find the Maximum Depth of a Binary Tree.`,difficulty:`easy`,type:`practical`,answer:`The depth is 1 + the maximum depth of its left and right subtrees. Solve recursively.`,code:`function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`},{id:`tree-007`,question:`Check if two Binary Trees are Identical.`,difficulty:`easy`,type:`practical`,answer:`Traverse both trees simultaneously. If both nodes are null, return true. If one is null or values differ, return false. Recursively check left and right subtrees.`,code:`function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`},{id:`tree-008`,question:`Check if a Binary Tree is a Subtree of another tree.`,difficulty:`easy`,type:`practical`,answer:"Traverse the main tree (root). For every node, check if the tree starting at that node is identical to the `subRoot`.",code:`function isSubtree(root, subRoot) {
  if (!subRoot) return true;
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
// isSameTree defined in previous answer`},{id:`tree-009`,question:`Lowest Common Ancestor (LCA) of a BST.`,difficulty:`medium`,type:`practical`,answer:`Leverage the BST property. Start at the root. If both p and q are less than root, LCA is in left subtree. If both are greater, LCA is in right subtree. Otherwise, the current root is the LCA (they split).`,code:`function lowestCommonAncestorBST(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) root = root.left;
    else if (p.val > root.val && q.val > root.val) root = root.right;
    else return root;
  }
}`},{id:`tree-010`,question:`Lowest Common Ancestor (LCA) of a generic Binary Tree.`,difficulty:`medium`,type:`practical`,answer:`Use DFS. If root is null, p, or q, return root. Recursively search left and right. If both return non-null, the current root is the LCA. If only one returns non-null, pass that up.`,code:`function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ? left : right;
}`},{id:`tree-011`,question:`Binary Tree Level Order Traversal (return array of arrays per level).`,difficulty:`medium`,type:`practical`,answer:`Use BFS with a Queue. For each level, determine its size, dequeue that many elements, add them to a level array, and enqueue their children.`,code:`function levelOrder(root) {
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
}`},{id:`tree-012`,question:`Validate a Binary Search Tree.`,difficulty:`medium`,type:`practical`,answer:`Use DFS. Pass a valid range (min, max) down the tree. The root's value must be > min and < max. Left child must be < root.val, right child > root.val.`,code:`function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && 
         isValidBST(root.right, root.val, max);
}`},{id:`tree-013`,question:`Kth Smallest Element in a BST.`,difficulty:`medium`,type:`practical`,answer:`Use iterative In-order traversal (which visits elements in sorted order). Decrement k every time you pop a node from the stack. When k == 0, you found the element.`,code:`function kthSmallest(root, k) {
  const stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) { stack.push(curr); curr = curr.left; }
    curr = stack.pop();
    k--;
    if (k === 0) return curr.val;
    curr = curr.right;
  }
}`},{id:`tree-014`,question:`Construct Binary Tree from Preorder and Inorder Traversal.`,difficulty:`medium`,type:`practical`,answer:`The first element in Preorder is always the root. Find this root in the Inorder array to split the tree into Left and Right subtrees. Recursively build.`,code:`function buildTree(preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;
  let root = new TreeNode(preorder[0]);
  let mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}`},{id:`tree-015`,question:`Binary Tree Maximum Path Sum.`,difficulty:`hard`,type:`practical`,answer:`A path can start and end at any node. Use DFS. For each node, compute the max path sum of its left and right subtrees (ignore negative sums). Update a global maximum representing a path passing *through* the current node. Return the max path extending downwards from the current node.`,code:`function maxPathSum(root) {
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
}`},{id:`tree-016`,question:`Serialize and Deserialize a Binary Tree.`,difficulty:`hard`,type:`practical`,answer:"Use Preorder Traversal with a delimiter (e.g., `,`) and a special character for null nodes (e.g., `N`). To deserialize, split the string into an array and use an iterator/pointer to recursively rebuild the tree in preorder fashion.",code:`function serialize(root) {
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
}`},{id:`tree-017`,question:`What is a Trie (Prefix Tree)?`,difficulty:`medium`,type:`theory`,answer:`A tree-like data structure used to efficiently store and retrieve keys in a dataset of strings. Each node represents a character. Useful for autocomplete, spell checkers, and IP routing.`},{id:`tree-018`,question:`Implement a Trie.`,difficulty:`medium`,type:`practical`,answer:"Use a `TrieNode` class containing a hash map of children and an `isEnd` boolean. Implement `insert`, `search`, and `startsWith`.",code:`class TrieNode {
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
}`},{id:`tree-019`,question:`Word Search II (Find words from a dictionary in a 2D grid).`,difficulty:`hard`,type:`practical`,answer:`Use a Trie + DFS. Insert all words into a Trie. Iterate through the grid. If the cell matches a Trie root child, start a DFS. Pass the TrieNode down the DFS to prune invalid paths immediately. Time O(M*N * 4^L).`},{id:`tree-020`,question:`What is a Graph?`,difficulty:`easy`,type:`theory`,answer:`A non-linear data structure consisting of Nodes (Vertices) and Edges that connect them. Can be Directed (one-way) or Undirected (two-way), and Weighted or Unweighted.`},{id:`tree-021`,question:`Adjacency Matrix vs Adjacency List.`,difficulty:`medium`,type:`theory`,answer:"Matrix: A 2D array where `matrix[i][j] = 1` if edge exists. Space O(V^2), good for dense graphs. Fast O(1) edge lookup. List: Array/Hash Map of Linked Lists/Arrays. `list[i]` contains neighbors of vertex `i`. Space O(V+E), good for sparse graphs. Slower edge lookup, fast traversal."},{id:`tree-022`,question:`Number of Islands (Find connected components in a grid).`,difficulty:`medium`,type:`practical`,answer:"Iterate the 2D grid. When you find a `1` (land), increment island count and launch a DFS/BFS to mark all adjacent `1`s as visited (e.g., turn them to `0`) so they aren't counted again.",code:`function numIslands(grid) {
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
}`},{id:`tree-023`,question:`Clone a Graph.`,difficulty:`medium`,type:`practical`,answer:`Use DFS or BFS and a Hash Map to keep track of already cloned nodes to avoid infinite loops (cycles). Map original node to the cloned node.`,code:`function cloneGraph(node, map = new Map()) {
  if (!node) return null;
  if (map.has(node)) return map.get(node);
  let clone = new _Node(node.val);
  map.set(node, clone);
  for (let neighbor of node.neighbors) {
    clone.neighbors.push(cloneGraph(neighbor, map));
  }
  return clone;
}`},{id:`tree-024`,question:`Course Schedule (Detect Cycle in a Directed Graph).`,difficulty:`medium`,type:`practical`,answer:"Represent courses and prerequisites as a directed graph. Use DFS with a `visiting` state (in the current path) and a `visited` state (completely processed). If you encounter a `visiting` node, there is a cycle (cannot finish courses).",code:`function canFinish(numCourses, prerequisites) {
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
}`},{id:`tree-025`,question:`What is Topological Sorting?`,difficulty:`medium`,type:`theory`,answer:`A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge U -> V, vertex U comes before V in the ordering. Used for scheduling tasks with dependencies (e.g., build systems, course schedules).`},{id:`tree-026`,question:`Implement Kahn's Algorithm for Topological Sort.`,difficulty:`medium`,type:`practical`,answer:`Calculate the in-degree (number of incoming edges) for all nodes. Push nodes with in-degree 0 to a Queue. While Queue is not empty, pop a node, add it to result, and decrement the in-degree of its neighbors. If a neighbor's in-degree becomes 0, push it to the Queue.`,code:`function topologicalSort(numNodes, edges) {
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
}`},{id:`tree-027`,question:`Pacific Atlantic Water Flow.`,difficulty:`medium`,type:`practical`,answer:`Instead of doing DFS from every cell to see if it reaches both oceans, do DFS *from* the oceans inward (going uphill). Keep two boolean matrices (canReachPacific, canReachAtlantic). Cells that are true in both are the answer.`},{id:`tree-028`,question:`Rotting Oranges (Shortest path/time in a grid).`,difficulty:`medium`,type:`practical`,answer:"Use multi-source BFS. Put all initially rotten oranges in a Queue. Keep track of `fresh` count. Process level by level (minutes). For each rotten orange, rot its fresh neighbors, decrement `fresh` count, and push them to the Queue. Return minutes if `fresh === 0`, else -1."},{id:`tree-029`,question:`Word Ladder (Find shortest transformation sequence).`,difficulty:`hard`,type:`practical`,answer:`Use BFS to find the shortest path in an unweighted graph. The graph is implicit: nodes are words, edges exist if words differ by exactly 1 letter. Generate all possible 1-letter mutations of the current word and check if they exist in the dictionary (Hash Set).`},{id:`tree-030`,question:`Dijkstra's Algorithm.`,difficulty:`hard`,type:`theory`,answer:`Finds the shortest path from a single source node to all other nodes in a weighted graph with NON-NEGATIVE edges. It uses a Priority Queue (Min-Heap) to greedily select the unvisited node with the smallest known distance.`},{id:`tree-031`,question:`Bellman-Ford Algorithm.`,difficulty:`hard`,type:`theory`,answer:`Finds shortest path in a weighted graph. Unlike Dijkstra, it CAN handle negative edge weights. It works by relaxing all edges V-1 times. If it can be relaxed a V-th time, a negative weight cycle exists. Time complexity O(V*E).`},{id:`tree-032`,question:`Floyd-Warshall Algorithm.`,difficulty:`expert`,type:`theory`,answer:"Finds shortest paths between ALL pairs of vertices. Uses Dynamic Programming. `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])` for all k. Time complexity O(V^3)."},{id:`tree-033`,question:`What is a Minimum Spanning Tree (MST)?`,difficulty:`medium`,type:`theory`,answer:`A subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles, and with the minimum possible total edge weight.`},{id:`tree-034`,question:`Kruskal's Algorithm.`,difficulty:`hard`,type:`theory`,answer:`Finds an MST. Sort all edges from lowest to highest weight. Iterate through the edges. If adding an edge doesn't create a cycle (checked using Union-Find), add it to the MST. Stop when MST has V-1 edges.`},{id:`tree-035`,question:`Prim's Algorithm.`,difficulty:`hard`,type:`theory`,answer:`Finds an MST. Starts with a single vertex. Greedily grows the tree by picking the minimum weight edge that connects a vertex in the tree to a vertex outside the tree (using a Min-Heap/Priority Queue). Similar to Dijkstra.`},{id:`tree-036`,question:`What is the Union-Find (Disjoint Set) data structure?`,difficulty:`hard`,type:`theory`,answer:"Maintains a collection of disjoint sets. Supports two near-O(1) operations: `Find` (determine which set a specific element is in) and `Union` (join two sets into a single set). Essential for cycle detection in undirected graphs and Kruskal's."},{id:`tree-037`,question:`Implement Union-Find with Path Compression and Union by Rank.`,difficulty:`hard`,type:`practical`,answer:"`parent` array tracks roots. `rank` array tracks tree height to keep it flat. Path Compression makes all nodes on the path point directly to the root during `find`.",code:`class UnionFind {
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
}`},{id:`tree-038`,question:`Redundant Connection (Find the edge that creates a cycle).`,difficulty:`medium`,type:`practical`,answer:"Iterate through the edges of an undirected graph. For each edge `(u, v)`, perform a `Union`. If `Find(u) === Find(v)`, they are already in the same set, meaning this edge creates a cycle. Return it."},{id:`tree-039`,question:`Network Delay Time.`,difficulty:`hard`,type:`practical`,answer:`Classic Dijkstra's Algorithm problem. Find the shortest path from the source node to ALL other nodes. The total time taken for the signal to reach all nodes is the maximum of these shortest paths.`},{id:`tree-040`,question:`Alien Dictionary (Find order of characters in a new language).`,difficulty:`hard`,type:`practical`,answer:"1. Build a directed graph comparing adjacent words. Find the first differing character: `word1[i] -> word2[i]`. 2. Perform Topological Sort using Kahn's algorithm or DFS. If there's a cycle, the dictionary is invalid."},{id:`tree-041`,question:`Graph Valid Tree (Check if undirected graph is a valid tree).`,difficulty:`medium`,type:`practical`,answer:"A valid tree must have exactly `n-1` edges and be fully connected (no cycles). You can use DFS/BFS to ensure all nodes are reached and no back-edges exist, OR use Union-Find (if an edge connects two already unioned nodes, it's a cycle)."},{id:`tree-042`,question:`Number of Connected Components in an Undirected Graph.`,difficulty:`medium`,type:`practical`,answer:"Can be solved with DFS/BFS or Union-Find. Initialize `count = n`. For each edge `(u, v)`, if `Union(u, v)` succeeds (they were in different sets), decrement `count`. Return `count`."},{id:`tree-043`,question:`Word Ladder II (Return ALL shortest transformation sequences).`,difficulty:`expert`,type:`practical`,answer:`Use BFS to find the shortest path and build an adjacency list pointing backwards from children to parents. Then use DFS (backtracking) from the end word to the start word to reconstruct all the shortest paths.`},{id:`tree-044`,question:`Find Median from Data Stream.`,difficulty:`hard`,type:`theory`,answer:`Maintain two Heaps. A Max-Heap for the smaller half of numbers, and a Min-Heap for the larger half. Keep their sizes balanced (Max-Heap size >= Min-Heap size). If total count is odd, median is the top of Max-Heap. If even, average of the tops.`},{id:`tree-045`,question:"Design Add and Search Words Data Structure (supports `.` wildcard).",difficulty:`medium`,type:`practical`,answer:"Use a Trie. Normal insertion. For searching: use DFS on the Trie. If the character is a `.`, recursively check ALL children of the current node. If any path returns true, the word is found."},{id:`tree-046`,question:`Count Good Nodes in Binary Tree (Path from root has no greater values).`,difficulty:`medium`,type:`practical`,answer:"Use DFS. Pass the maximum value seen so far along the path down to the children. If the current node's value is >= `maxSoFar`, increment a counter and update `maxSoFar`.",code:`function goodNodes(root, maxSoFar = -Infinity) {
  if (!root) return 0;
  let count = root.val >= maxSoFar ? 1 : 0;
  maxSoFar = Math.max(maxSoFar, root.val);
  count += goodNodes(root.left, maxSoFar);
  count += goodNodes(root.right, maxSoFar);
  return count;
}`},{id:`tree-047`,question:`Diameter of Binary Tree.`,difficulty:`easy`,type:`practical`,answer:"The diameter is the longest path between any two nodes. Use DFS to calculate the depth of the tree. The diameter passing through any node is `leftDepth + rightDepth`. Maintain a global max variable updated during the DFS.",code:`function diameterOfBinaryTree(root) {
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
}`},{id:`tree-048`,question:`Symmetric Tree (Mirror Image).`,difficulty:`easy`,type:`practical`,answer:"Check if the left and right subtrees are mirrors of each other. Recursive helper function takes two nodes: `node1.val === node2.val` AND `helper(node1.left, node2.right)` AND `helper(node1.right, node2.left)`.",code:`function isSymmetric(root) {
  if (!root) return true;
  function isMirror(t1, t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2 || t1.val !== t2.val) return false;
    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
  }
  return isMirror(root.left, root.right);
}`},{id:`tree-049`,question:`Right Side View of Binary Tree.`,difficulty:`medium`,type:`practical`,answer:`Use BFS (Level Order Traversal). At each level, the last node processed in the queue is the one visible from the right side. Add its value to the result array.`,code:`function rightSideView(root) {
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
}`},{id:`tree-050`,question:`Flatten Binary Tree to Linked List (In-place).`,difficulty:`medium`,type:`practical`,answer:"Post-order DFS (Right, Left, Root). Keep track of a global `prev` node. For each node, `node.right = prev`, `node.left = null`, and `prev = node`."}]},r={id:`core-sys-design`,title:`System Design Concepts`,icon:`🏗️`,summary:`Scalability, Load Balancing, Caching, CAP Theorem, and Microservices.`,concepts:[`Scalability`,`Load Balancing`,`Caching`,`CAP Theorem`,`Database Sharding`,`Message Queues`,`Microservices`],questions:[{id:`sdc-001`,question:`Vertical vs Horizontal Scaling.`,difficulty:`easy`,type:`theory`,answer:`Vertical (Scale Up): Adding more power (CPU, RAM) to an existing machine. Has a hard limit and involves downtime. Horizontal (Scale Out): Adding more machines to your pool of resources. Conceptually infinite, provides redundancy, requires load balancing.`},{id:`sdc-002`,question:`What is a Load Balancer?`,difficulty:`easy`,type:`theory`,answer:`A component that evenly distributes incoming network traffic across a group of backend servers. This ensures no single server bears too much demand, improving responsiveness and availability.`},{id:`sdc-003`,question:`Explain common Load Balancing Algorithms.`,difficulty:`medium`,type:`theory`,answer:`1. Round Robin: Sequential distribution. 2. Least Connections: Sends request to the server with the fewest active connections. 3. IP Hash: Hashes the client IP to assign them to a specific server (sticky sessions). 4. Weighted: Servers with higher specs get more traffic.`},{id:`sdc-004`,question:`What is Caching?`,difficulty:`easy`,type:`theory`,answer:`Storing copies of frequently accessed, computationally expensive, or slow-to-retrieve data in a temporary storage location (usually in-memory like Redis or Memcached) so future requests can be served much faster.`},{id:`sdc-005`,question:`Explain Cache Eviction Policies.`,difficulty:`medium`,type:`theory`,answer:`When a cache is full, it must remove data. 1. LRU (Least Recently Used): Evicts the item accessed furthest in the past. 2. LFU (Least Frequently Used): Evicts the item accessed the least number of times. 3. FIFO (First In First Out).`},{id:`sdc-006`,question:`Cache Aside vs Write-Through vs Write-Behind.`,difficulty:`hard`,type:`theory`,answer:`Cache Aside: App checks cache, if miss, fetches from DB, updates cache. Write-Through: App writes data to cache, and cache immediately writes to DB (safe, slow writes). Write-Behind (Write-Back): App writes to cache, cache acknowledges immediately, asynchronously writes to DB later (fast, risk of data loss).`},{id:`sdc-007`,question:`What is the CAP Theorem?`,difficulty:`hard`,type:`theory`,answer:`In a distributed data store, you can only guarantee TWO out of three properties simultaneously: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition Tolerance (system continues to operate despite network failures dropping messages).`},{id:`sdc-008`,question:`Why is Partition Tolerance mandatory in distributed systems?`,difficulty:`medium`,type:`theory`,answer:`Networks WILL fail. Network partitions are unavoidable. Therefore, in reality, CAP theorem means when a partition occurs, you must choose between Consistency (cancel the request) or Availability (return potentially stale data).`},{id:`sdc-009`,question:`What is PACELC Theorem?`,difficulty:`expert`,type:`theory`,answer:`An extension to CAP. It states: in case of Partition (P), trade-off between Availability (A) and Consistency (C). ELSE (E) (when running normally without partition), trade-off between Latency (L) and Consistency (C).`},{id:`sdc-010`,question:`Relational (SQL) vs Non-Relational (NoSQL) Databases.`,difficulty:`medium`,type:`theory`,answer:`SQL: Structured schema, ACID compliance, good for complex queries and relationships, scales vertically. NoSQL: Flexible schema, BASE compliance (usually), good for massive unstructured data and rapid development, scales horizontally easily.`},{id:`sdc-011`,question:`What is Database Indexing?`,difficulty:`easy`,type:`theory`,answer:`A data structure (often a B-Tree) that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index.`},{id:`sdc-012`,question:`What is Database Sharding?`,difficulty:`hard`,type:`theory`,answer:`A type of horizontal partitioning. You split a massive database into smaller, faster, more easily managed parts called data shards. Each shard is held on a separate database server. Requires a Sharding Key.`},{id:`sdc-013`,question:`What is Consistent Hashing?`,difficulty:`hard`,type:`theory`,answer:'A distributed hashing scheme that operates independently of the number of servers or objects. It maps data to nodes on a "hash ring". When a server is added or removed, only `K/N` keys need to be remapped (unlike standard `hash(key) % N` which remaps nearly everything).'},{id:`sdc-014`,question:`What is a Message Queue?`,difficulty:`medium`,type:`theory`,answer:`A form of asynchronous service-to-service communication used in serverless and microservices architectures. Messages are stored on the queue until they are processed and deleted. Decouples producers and consumers. Examples: RabbitMQ, SQS.`},{id:`sdc-015`,question:`Message Queue vs Event Streaming (Pub/Sub).`,difficulty:`hard`,type:`theory`,answer:`Queue (RabbitMQ): 1-to-1 communication. Message is consumed once, then deleted. Used for task delegation. Stream (Kafka): 1-to-Many. Messages are appended to a log and persisted for a retention period. Multiple consumer groups can read the same message independently.`},{id:`sdc-016`,question:`What is Microservices Architecture?`,difficulty:`easy`,type:`theory`,answer:`An architectural style that structures an application as a collection of small, autonomous services modeled around a business domain. Services communicate via APIs, are independently deployable, and can use different technologies.`},{id:`sdc-017`,question:`Monolith vs Microservices.`,difficulty:`medium`,type:`theory`,answer:`Monolith: Simple to develop/test initially, hard to scale, single point of failure, tightly coupled. Microservices: Hard to orchestrate, requires complex CI/CD, easily scalable, fault-tolerant, allows technology diversity.`},{id:`sdc-018`,question:`What is an API Gateway in Microservices?`,difficulty:`medium`,type:`theory`,answer:`A single point of entry for all clients. It routes requests to the appropriate microservices, aggregates results, and handles cross-cutting concerns like authentication, rate limiting, logging, and SSL termination.`},{id:`sdc-019`,question:`What is Service Discovery?`,difficulty:`hard`,type:`theory`,answer:`In microservices, instances are dynamically created and destroyed. Service discovery automatically detects devices and services on a network. A registry (like Consul or Eureka) keeps track of which service is running on which IP/Port.`},{id:`sdc-020`,question:`What is the Circuit Breaker Pattern?`,difficulty:`hard`,type:`theory`,answer:`Prevents an application from repeatedly trying to execute an operation that's likely to fail. If Service A calls Service B and B is down, A will hang. The circuit breaker detects the failure, "trips" (opens the circuit), and immediately returns an error for subsequent calls until B recovers.`},{id:`sdc-021`,question:`What is Rate Limiting?`,difficulty:`medium`,type:`theory`,answer:`Controlling the rate of traffic sent or received on a network. Used to prevent DoS attacks, brute force login attempts, or to enforce API quotas. Algorithms include Token Bucket, Leaky Bucket, and Fixed Window.`},{id:`sdc-022`,question:`Explain the Token Bucket algorithm.`,difficulty:`hard`,type:`theory`,answer:"A bucket holds `N` tokens. Tokens are added at a constant rate. When a request arrives, it must consume a token. If the bucket is empty, the request is rejected. Allows for short bursts of traffic while enforcing a long-term average rate."},{id:`sdc-023`,question:`What is Database Replication?`,difficulty:`medium`,type:`theory`,answer:`Creating and maintaining copies of the same database. Commonly Leader-Follower (Master-Slave): All writes go to the Leader, which asynchronously replicates to Followers. Read operations are distributed among Followers to scale read traffic.`},{id:`sdc-024`,question:`What is Data Replication Lag?`,difficulty:`medium`,type:`theory`,answer:`In asynchronous replication, it is the delay between a write hitting the Leader and that write propagating to the Followers. Can lead to "Read Your Own Writes" inconsistency.`},{id:`sdc-025`,question:`What is the Two-Phase Commit (2PC) Protocol?`,difficulty:`expert`,type:`theory`,answer:`A distributed algorithm that coordinates all the processes that participate in a distributed transaction to either COMMIT or ABORT the transaction. Phase 1: Prepare (Voting). Phase 2: Commit (Resolution). Very slow, blocks resources.`},{id:`sdc-026`,question:`What is the Saga Pattern?`,difficulty:`expert`,type:`theory`,answer:`A modern alternative to 2PC for distributed transactions in microservices. A sequence of local transactions. Each local transaction updates the database and publishes an event. If a local transaction fails, the Saga executes compensating transactions to undo the previous steps.`},{id:`sdc-027`,question:`What is Event Sourcing?`,difficulty:`hard`,type:`theory`,answer:`Instead of storing the CURRENT state of the data, you store a sequence of state-changing EVENTS. To get the current state, you replay the events. Provides an infallible audit log. Often paired with CQRS.`},{id:`sdc-028`,question:`What is CQRS?`,difficulty:`hard`,type:`theory`,answer:`Command Query Responsibility Segregation. Separates the data mutation (Command) from the data retrieval (Query) into different models, and often different databases. Optimizes read and write workloads independently.`},{id:`sdc-029`,question:`What is a Content Delivery Network (CDN)?`,difficulty:`easy`,type:`theory`,answer:`A geographically distributed network of servers. They cache static assets (HTML, CSS, JS, Images, Video) closer to the end-users. Reduces latency and bandwidth costs on the origin server.`},{id:`sdc-030`,question:`Push vs Pull CDNs.`,difficulty:`medium`,type:`theory`,answer:`Push CDN: You proactively upload content to the CDN. Best for large files or infrequent changes. Pull CDN: The CDN automatically fetches the content from your origin server the first time a user requests it, then caches it. Best for web apps.`},{id:`sdc-031`,question:`What is Long Polling?`,difficulty:`medium`,type:`theory`,answer:`A technique where the client requests information from the server. If the server has no new data, it HOLDS the connection open until data becomes available (or timeout). Once sent, the client immediately initiates a new long-poll. Good alternative to WebSockets if unsupported.`},{id:`sdc-032`,question:`What are Server-Sent Events (SSE)?`,difficulty:`medium`,type:`theory`,answer:`A unidirectional communication protocol where the server pushes updates to the client over a single HTTP connection. Excellent for real-time dashboards or stock tickers where the client only needs to RECEIVE data.`},{id:`sdc-033`,question:`What is Database Normalization?`,difficulty:`medium`,type:`theory`,answer:`Organizing columns and tables in an RDBMS to reduce data redundancy and improve data integrity. Involves dividing large tables into smaller ones and defining relationships (Foreign Keys).`},{id:`sdc-034`,question:`What is Denormalization?`,difficulty:`medium`,type:`theory`,answer:`The process of intentionally adding redundant data to a database. It is an optimization technique to speed up read performance by avoiding complex, expensive SQL JOIN operations.`},{id:`sdc-035`,question:`What is a Bloom Filter?`,difficulty:`hard`,type:`theory`,answer:`A space-efficient probabilistic data structure. It is used to test whether an element is a member of a set. False positive matches are possible, but false negatives are not. (If it says "No", it is definitely not there. If it says "Yes", it MIGHT be there). Great for checking if an ID exists before hitting the DB.`},{id:`sdc-036`,question:`What is a Distributed Lock?`,difficulty:`hard`,type:`theory`,answer:`A lock that allows multiple processes across different machines to mutually exclude each other from a shared resource. Often implemented using Redis (Redlock algorithm) or Zookeeper.`},{id:`sdc-037`,question:`What is the Back-of-the-Envelope Estimation?`,difficulty:`easy`,type:`theory`,answer:`A crucial System Design interview skill. Using rough calculations to estimate the scale of a system (QPS, storage requirements, bandwidth requirements) to justify your design decisions. Requires knowing powers of 2 and rough latency numbers.`},{id:`sdc-038`,question:`What is Latency vs Throughput?`,difficulty:`easy`,type:`theory`,answer:`Latency: The TIME it takes for a single data packet to travel from source to destination (Response time). Throughput: The VOLUME of data that can be processed in a given amount of time (e.g., Requests Per Second or MB/s).`},{id:`sdc-039`,question:`What is a Proxy Server vs Reverse Proxy?`,difficulty:`medium`,type:`theory`,answer:`Forward Proxy: Sits in front of CLIENTS. Masks client IP, caches internet data, blocks websites. Reverse Proxy: Sits in front of SERVERS. Masks server IP, load balances, terminates SSL, caches static content.`},{id:`sdc-040`,question:`What is Strong vs Eventual Consistency?`,difficulty:`medium`,type:`theory`,answer:`Strong Consistency: After a write, any subsequent read will return the updated value (Synchronous). Eventual Consistency: If no new updates are made, eventually all accesses will return the last updated value (Asynchronous, common in DNS and NoSQL).`},{id:`sdc-041`,question:`How do you design a URL Shortener (like bit.ly)?`,difficulty:`hard`,type:`theory`,answer:`Key components: API Gateway, Load Balancer. App Servers. Relational DB (URL mapping) or NoSQL. Generation mechanism: Base62 encoding of an auto-incrementing ID or a Hash collision resolution. Caching heavily (Redis) for reads.`},{id:`sdc-042`,question:`How do you design a Chat Application (like WhatsApp)?`,difficulty:`hard`,type:`theory`,answer:`Requires full-duplex communication (WebSockets). Load Balancer in front of Chat Servers. Redis/PubSub to route messages between Chat Servers if users are connected to different instances. Cassandra or HBase for massive write-heavy message history.`},{id:`sdc-043`,question:`What is a Snowflake ID generator?`,difficulty:`expert`,type:`theory`,answer:`Twitter's algorithm to generate unique 64-bit IDs in distributed systems without a central bottleneck. Composed of: Timestamp (41 bits) + Datacenter ID (5 bits) + Machine ID (5 bits) + Sequence Number (12 bits).`},{id:`sdc-044`,question:`What is the "Thundering Herd" problem?`,difficulty:`hard`,type:`theory`,answer:`Occurs when a large number of processes/clients waiting for an event are awoken simultaneously when the event occurs, and all attempt to access a resource at the exact same time, overwhelming the system. (E.g., cache expires, thousands of requests hit the DB at once).`},{id:`sdc-045`,question:`What is Jitter?`,difficulty:`hard`,type:`theory`,answer:`Adding a small, random amount of time (variance) to a delay mechanism. Used in retry logic with exponential backoff to prevent a "thundering herd" of retries from hitting a recovering service at the exact same millisecond.`},{id:`sdc-046`,question:`What is High Availability (HA)?`,difficulty:`easy`,type:`theory`,answer:`A characteristic of a system that aims to ensure an agreed level of operational performance (uptime) for a higher than normal period. Often measured in "Nines" (e.g., 99.999% uptime allows for 5 minutes of downtime a year).`},{id:`sdc-047`,question:`What is a Single Point of Failure (SPOF)?`,difficulty:`easy`,type:`theory`,answer:`A part of a system that, if it fails, will stop the entire system from working. System Design aims to eliminate SPOFs through redundancy at every layer (multiple load balancers, multiple app servers, database replication).`},{id:`sdc-048`,question:`What is Disaster Recovery (DR)?`,difficulty:`medium`,type:`theory`,answer:`A set of policies, tools, and procedures to enable the recovery or continuation of vital technology infrastructure following a natural or human-induced disaster. Key metrics: RPO (Recovery Point Objective - how much data can you lose) and RTO (Recovery Time Objective - how fast must it be back up).`},{id:`sdc-049`,question:`Active-Active vs Active-Passive Architecture.`,difficulty:`medium`,type:`theory`,answer:`Active-Active: Traffic is load balanced across multiple operational data centers simultaneously. Complex to sync data. Active-Passive: Only one data center handles traffic. The passive one is a hot-standby and only takes over if the active one fails. Simpler, but wastes resources.`},{id:`sdc-050`,question:`What is an Anti-Pattern?`,difficulty:`easy`,type:`theory`,answer:`A common response to a recurring problem that is usually ineffective and risks being highly counterproductive. Example: God Object, Hardcoding, Premature Optimization.`}]};export{e as i,n,t as r,r as t};