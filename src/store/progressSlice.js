// Progress slice — tracks completed questions, bookmarks, notes
export const createProgressSlice = (set, get) => ({
  // Completed questions
  completedQuestions: [],
  bookmarkedQuestions: [],
  userNotes: {}, // Format: { topicId: 'Note text' }

  toggleQuestionComplete: (id) => {
    set((state) => {
      const isCompleted = state.completedQuestions.includes(id);
      return {
        completedQuestions: isCompleted
          ? state.completedQuestions.filter(qId => qId !== id)
          : [...state.completedQuestions, id]
      };
    });
    // Reward +10 XP on question completion
    get().logActivity(10);
  },

  toggleBookmark: (id) => set((state) => ({
    bookmarkedQuestions: state.bookmarkedQuestions.includes(id)
      ? state.bookmarkedQuestions.filter(qId => qId !== id)
      : [...state.bookmarkedQuestions, id]
  })),

  saveNote: (topicId, text) => set((state) => ({
    userNotes: {
      ...state.userNotes,
      [topicId]: text
    }
  })),
});
