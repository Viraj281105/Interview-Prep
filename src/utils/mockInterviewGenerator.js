import { behavioralData } from '../data/hr_behavioral';
import { arraysStringsData } from '../data/dsa_arrays';
import { treesGraphsData } from '../data/dsa_trees';
import { systemDesignConceptsData } from '../data/core_system_design';

// Helper to shuffle and pick N items
function getRandomItems(array, n) {
  if (!array || array.length === 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, array.length));
}

export function generateMockQuestions(type) {
  switch (type) {
    case 'behavioral':
      // Pick 3 random behavioral questions
      return getRandomItems(behavioralData.questions || behavioralData, 3).map(q => q.question || q);
      
    case 'dsa': {
      // Pick 1 Array question, 1 Tree question
      const q1 = getRandomItems(arraysStringsData.questions || arraysStringsData, 1)[0];
      const q2 = getRandomItems(treesGraphsData.questions || treesGraphsData, 1)[0];
      return [
        q1?.question || "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        q2?.question || "Invert a binary tree."
      ];
    }
      
    case 'system-design':
      // Pick 2 random system design questions
      return getRandomItems(systemDesignConceptsData.questions || systemDesignConceptsData, 2).map(q => q.question || q);
      
    default:
      return [
        "Tell me about yourself.",
        "Why do you want to work here?"
      ];
  }
}
