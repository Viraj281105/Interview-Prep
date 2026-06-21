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

  switch (type) {
    case 'behavioral':
      return getRandomItems(getModuleData('hr-behavioral').questions, 3).map(q => q.title || q.question);
      
    case 'dsa': {
      const q1 = getRandomItems(getModuleData('dsa-arrays').questions, 1)[0];
      const q2 = getRandomItems(getModuleData('dsa-trees').questions, 1)[0];
      return [
        q1?.title || q1?.question || "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        q2?.title || q2?.question || "Invert a binary tree."
      ];
    }
      
    case 'system-design':
      return getRandomItems(getModuleData('core-sys-design').questions, 2).map(q => q.title || q.question);
      
    default:
      return [
        "Tell me about yourself.",
        "Why do you want to work here?"
      ];
  }
}
