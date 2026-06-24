import { useAppStore } from '../store';

// Helper to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuiz({ mode, difficulty, subject }) {
  const state = useAppStore.getState();
  const allModules = state.allDataModules || [];
  const subjectsList = state.subjectsList || [];

  let pool = [];

  // 1. Filter by subject/mode
  if (mode === 'subject' && subject !== 'all') {
    const sub = subjectsList.find(s => s.id === subject);
    if (sub && sub.moduleIds) {
      sub.moduleIds.forEach(mId => {
        const mod = allModules.find(m => m.id === mId);
        if (mod && mod.questions) {
          pool = pool.concat(mod.questions.map(q => ({ ...q, moduleTitle: mod.title })));
        }
      });
    }
  } else {
    // Mixed or Rapid Fire or All Subjects
    allModules.forEach(mod => {
      if (mod.questions) {
        pool = pool.concat(mod.questions.map(q => ({ ...q, moduleTitle: mod.title })));
      }
    });
  }

  // 2. Filter by difficulty
  if (difficulty !== 'all') {
    pool = pool.filter(q => q.difficulty === difficulty);
  }

  // Need at least 5 questions to make a meaningful quiz
  if (pool.length < 5) return null;

  // Determine question count
  const count = mode === 'rapid' ? 20 : 10;
  const timeLimit = mode === 'rapid' ? 5 * 60 : count * 60; // 5 mins for 20 rapid, 1 min per q for normal

  // 3. Shuffle and pick
  const selectedQuestions = shuffleArray(pool).slice(0, count);

  // 4. Generate options (1 correct, 3 random wrong from the same pool to make it challenging)
  const quizQuestions = selectedQuestions.map((q, index) => {
    // Find 3 other random answers
    const otherAnswers = shuffleArray(pool.filter(x => x.id !== q.id && x.answer)).slice(0, 3).map(x => x.answer);
    
    const options = shuffleArray([q.answer, ...otherAnswers]);
    const correctOptionIndex = options.indexOf(q.answer);

    return {
      id: `q-${index}-${q.id}`,
      text: q.question,
      code: q.code,
      options: options,
      correctOptionIndex: correctOptionIndex,
      explanation: \`From module: \${q.moduleTitle}\`
    };
  });

  return {
    id: \`dynamic-\${Date.now()}\`,
    title: mode === 'rapid' ? 'Rapid Fire Assessment' : mode === 'subject' ? 'Subject Mastery' : 'Mixed Assessment',
    subject: mode === 'subject' && subject !== 'all' ? subjectsList.find(s => s.id === subject)?.title : 'Various',
    icon: mode === 'rapid' ? '⚡' : '🧠',
    description: \`A dynamically generated \${difficulty !== 'all' ? difficulty : ''} quiz containing \${count} questions.\`,
    timeLimit: timeLimit,
    questions: quizQuestions
  };
}
