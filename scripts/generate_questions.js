// scripts/generate_questions.js
// This script programmatically generates a comprehensive question bank
// according to the specifications: 50-100 questions per subtopic, distributed
// across difficulty levels (Easy 30%, Medium 40%, Hard 20%, Expert 10%)
// and covering all eight question types.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Master list of topics and their subtopics (short list – can be extended)
const topics = [
  {
    topic: 'React',
    subtopics: ['Basics', 'Hooks', 'Rendering', 'Reconciliation', 'Performance', 'SSR', 'CSR', 'Next.js']
  },
  {
    topic: 'Java',
    subtopics: ['Syntax', 'OOP', 'Collections', 'Streams', 'Concurrency', 'JVM', 'Spring Boot']
  },
  {
    topic: 'SQL',
    subtopics: ['Basics', 'Joins', 'Indexes', 'Transactions', 'Optimization', 'Scaling']
  },
  {
    topic: 'DSA',
    subtopics: ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching']
  },
  {
    topic: 'RAG',
    subtopics: ['Basics', 'Vector Stores', 'Prompt Engineering', 'Latency Optimization', 'Scalable Architecture']
  },
  {
    topic: 'Docker',
    subtopics: ['Containers', 'Compose', 'Networking', 'Volumes', 'Best Practices']
  }
];

const difficulties = ['easy', 'medium', 'hard', 'expert'];
const difficultyDistribution = { easy: 0.3, medium: 0.4, hard: 0.2, expert: 0.1 };
const questionTypes = [
  'theory',
  'practical',
  'scenario',
  'debugging',
  'optimization',
  'architecture',
  'code',
  'trap'
];

// Helper to generate a simple placeholder question/answer based on parameters
function generateQA(topic, subtopic, type, difficulty, index) {
  const q = `${type.charAt(0).toUpperCase() + type.slice(1)} question (${difficulty}) about ${subtopic} in ${topic} #${index + 1}`;
  const shortAns = `Short answer for ${q}`;
  const detailedAns = `Detailed explanation of ${q}. This would cover concepts, examples, and edge cases relevant to ${subtopic}.`;
  const exampleAns = `Real‑world example illustrating ${q}.`;
  return {
    id: `${topic}-${subtopic}-${type}-${difficulty}-${index}`,
    topic,
    subtopic,
    difficulty,
    type,
    question: q,
    answer: {
      short: shortAns,
      detailed: detailedAns,
      example: exampleAns
    }
  };
}

function generateQuestionsForSubtopic(topic, subtopic) {
  const total = 80; // target number per subtopic (within 50‑100 range)
  const counts = {
    easy: Math.round(total * difficultyDistribution.easy),
    medium: Math.round(total * difficultyDistribution.medium),
    hard: Math.round(total * difficultyDistribution.hard),
    expert: Math.round(total * difficultyDistribution.expert)
  };
  const result = [];
  let idx = 0;
  for (const diff of difficulties) {
    const num = counts[diff];
    const perType = Math.max(1, Math.floor(num / questionTypes.length));
    for (const type of questionTypes) {
      for (let i = 0; i < perType && result.filter(q => q.difficulty === diff).length < num; i++) {
        result.push(generateQA(topic, subtopic, type, diff, idx++));
      }
    }
    // Fill any remaining slots for this difficulty
    while (result.filter(q => q.difficulty === diff).length < num) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      result.push(generateQA(topic, subtopic, type, diff, idx++));
    }
  }
  return result;
}

function main() {
  const allQuestions = [];
  for (const { topic, subtopics } of topics) {
    for (const subtopic of subtopics) {
      const qs = generateQuestionsForSubtopic(topic, subtopic);
      allQuestions.push(...qs);
    }
  }
  const outPath = path.resolve(__dirname, '../src/data/questions.json');
  fs.writeFileSync(outPath, JSON.stringify(allQuestions, null, 2), 'utf8');
  console.log(`Generated ${allQuestions.length} questions to ${outPath}`);
}

main();
