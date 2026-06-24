// Quiz slice — quiz scores, attempts history
export const createQuizSlice = (set, get) => ({
  quizScores: {}, // Format: { quizId: { score, total, date, duration } }
  quizHistory: [], // Ordered list of recent quiz attempts
  currentActiveQuiz: null, // Holds dynamically generated quiz

  setCurrentActiveQuiz: (quiz) => set({ currentActiveQuiz: quiz }),

  saveQuizScore: (quizId, scoreData) => {
    set((state) => ({
      quizScores: {
        ...state.quizScores,
        [quizId]: {
          ...scoreData,
          date: new Date().toISOString()
        }
      },
      quizHistory: [
        {
          quizId,
          ...scoreData,
          date: new Date().toISOString()
        },
        ...state.quizHistory
      ].slice(0, 50) // Keep last 50 attempts
    }));
    // Reward +50 XP on quiz completion
    get().logActivity(50);
  },
});
