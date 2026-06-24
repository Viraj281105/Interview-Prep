const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'mock_companies.js');
let content = fs.readFileSync(filePath, 'utf-8');

const newExperiences = {
  google: `experiences: [
      {
        role: "Software Engineer, L4",
        date: "Jan 2024",
        status: "Offer",
        upvotes: 34,
        rounds: [
          { name: "Phone Screen", details: "45 mins. Asked a variation of 'Meeting Rooms II' but with a twist. Focus was on explaining my approach and optimizing from O(N^2) to O(N log N)." },
          { name: "Onsite: Coding 1", details: "Graphs problem. Given a directed graph representing package dependencies, find if there's a circular dependency. Follow-up: Output a valid build order (Topological Sort)." },
          { name: "Onsite: Coding 2", details: "Dynamic Programming. A 2D grid pathfinding problem with obstacles and a specific limit on how many obstacles you can break." },
          { name: "Onsite: System Design", details: "Design a distributed rate limiter for Google Search API. Discussed Token Bucket vs Leaky Bucket, and how to scale it globally using Redis." },
          { name: "Onsite: Googlyness", details: "Standard behavioral questions. 'Tell me about a time you had a conflict with a teammate', 'How do you handle ambiguous requirements?'" }
        ]
      },
      {
        role: "Frontend Engineer",
        date: "Nov 2023",
        status: "Rejected",
        upvotes: 12,
        rounds: [
          { name: "Phone Screen", details: "Implement a deep clone function in JavaScript handling circular references and Date objects." },
          { name: "Onsite", details: "Struggled in the System Design round where I was asked to design Google Docs collaborative editing (Operational Transformation)." }
        ]
      }
    ],`,
  meta: `experiences: [
      {
        role: "E5 Software Engineer",
        date: "Feb 2024",
        status: "Offer",
        upvotes: 45,
        rounds: [
          { name: "Phone Screen", details: "Two Leetcode Mediums (Kth Largest Element in Array, Valid Palindrome II). Expectation is extremely fast coding and bug-free execution." },
          { name: "Onsite: Coding 1", details: "Merge Intervals and Binary Tree Right Side View." },
          { name: "Onsite: Coding 2", details: "Subarray Sum Equals K. I had to write the optimal O(N) hash map solution." },
          { name: "Onsite: System Design", details: "Design Instagram News Feed. Deep dive into pull vs push model, feed ranking, and fanout on write." },
          { name: "Onsite: Jedi", details: "Behavioral round focusing on conflict resolution, driving projects to completion, and mentoring." }
        ]
      }
    ],`,
  amazon: `experiences: [
      {
        role: "SDE II",
        date: "Dec 2023",
        status: "Offer",
        upvotes: 56,
        rounds: [
          { name: "OA", details: "Two questions on HackerRank. One graph traversal (Medium), one string manipulation (Easy). Workstyle assessment was also part of this." },
          { name: "Onsite 1", details: "System Design: Design an Amazon Locker system. Leadership Principles: Customer Obsession, Deliver Results." },
          { name: "Onsite 2", details: "Coding: Implement an LRU Cache. LP: Invent and Simplify." },
          { name: "Onsite 3 (Bar Raiser)", details: "Coding: Word Ladder. LP: Learn and Be Curious, Have Backbone." }
        ]
      }
    ],`
};

content = content.replace(/(id:\s*'google'[\s\S]*?hiringProcess:\s*\[[\s\S]*?\])/, "$1,\n    " + newExperiences.google);
content = content.replace(/(id:\s*'meta'[\s\S]*?hiringProcess:\s*\[[\s\S]*?\])/, "$1,\n    " + newExperiences.meta);
content = content.replace(/(id:\s*'amazon'[\s\S]*?hiringProcess:\s*\[[\s\S]*?\])/, "$1,\n    " + newExperiences.amazon);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Added experiences to mock_companies.js');
