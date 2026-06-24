import { useAppStore } from '../store';

// Helper to shuffle and pick N items
function getRandomItems(array, n) {
  if (!array || array.length === 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, array.length));
}



export function generateMockQuestions(type) {
  const state = useAppStore.getState();
  const allModules = state.allDataModules || [];

  const getModuleData = (id) => allModules.find(m => m.id === id) || { questions: [] };

  const getQuestions = (id, count, fallback) => {
    const q = getModuleData(id).questions;
    if (q && q.length > 0) return getRandomItems(q, count).map(x => x.title || x.question);
    return fallback;
  };

  switch (type) {
    case 'behavioral':
      return getQuestions('hr-behavioral', 3, [
        "Tell me about a time you had to deal with a difficult team member.",
        "Describe a situation where you had to meet a tight deadline.",
        "Tell me about a time you failed and what you learned from it."
      ]);
      
    case 'dsa': {
      const q1 = getQuestions('dsa-arrays', 1, ["Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."])[0];
      const q2 = getQuestions('dsa-trees', 1, ["Invert a binary tree."])[0];
      return [q1, q2];
    }
      
    case 'system-design':
      return getQuestions('core-sys-design', 2, [
        "Design a URL shortener like bit.ly.",
        "Design a distributed cache system."
      ]);

    case 'db-sql':
      return getQuestions('db-sql', 3, [
        "Explain the difference between INNER JOIN and LEFT JOIN.",
        "What is an index, and how does it speed up queries?",
        "Write a query to find the second highest salary from an Employee table."
      ]);

    case 'core-os':
      return getQuestions('core-os', 3, [
        "What is the difference between a process and a thread?",
        "Explain Virtual Memory and Paging.",
        "What is a deadlock and what are its necessary conditions?"
      ]);

    case 'frontend': {
      const q1 = getQuestions('frontend-react', 1, ["Explain the Virtual DOM and how React handles Reconciliation."])[0];
      const q2 = getQuestions('frontend-js', 1, ["What is the event loop in JavaScript?"])[0];
      return [q1, q2];
    }
      
    default:
      // Try to find module by type directly
      const defaultQuestions = getModuleData(type).questions;
      if (defaultQuestions && defaultQuestions.length > 0) {
        return getRandomItems(defaultQuestions, 3).map(q => q.title || q.question);
      }

      return [
        "Tell me about yourself.",
        "Why do you want to work here?",
        "What is your greatest strength?"
      ];
  }
}
