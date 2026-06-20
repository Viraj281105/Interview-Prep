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
  })),

  // Phase 3: Quiz Engine State
  quizScores: {}, // Format: { quizId: { score: number, total: number, date: string } }
  
  saveQuizScore: (quizId, scoreData) => set((state) => ({
    quizScores: {
      ...state.quizScores,
      [quizId]: {
        ...scoreData,
        date: new Date().toISOString()
      }
    }
  })),

  // Phase 4: Mock Interview State
  mockInterviews: [], // Format: [{ id, type, date, duration, score }]
  
  saveMockInterview: (interviewData) => set((state) => ({
    mockInterviews: [
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        ...interviewData
      },
      ...state.mockInterviews
    ]
  }))
  }),
  {
    name: 'prepmaster-storage', // unique name for localStorage key
  }
));
