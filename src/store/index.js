import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Global state for user profile and app settings
export const useAppStore = create(
  persist(
    (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  activeSubject: null,
  setActiveSubject: (subject) => set({ activeSubject: subject }),

  // Phase 2: Learning Engine State
  completedQuestions: [],
  bookmarkedQuestions: [],
  userNotes: {}, // Format: { topicId: 'Note text' }

  toggleQuestionComplete: (id) => set((state) => ({
    completedQuestions: state.completedQuestions.includes(id)
      ? state.completedQuestions.filter(qId => qId !== id)
      : [...state.completedQuestions, id]
  })),

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
  }))
  }),
  {
    name: 'prepmaster-storage', // unique name for localStorage key
  }
));
