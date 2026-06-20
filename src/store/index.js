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

  // Gamification State
  xp: 0,
  currentStreak: 0,
  lastActiveDate: null,
  activityHeatmap: [], // array of "YYYY-MM-DD" strings

  logActivity: (xpGained = 0) => set((state) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newXp = state.xp + xpGained;
    
    let newStreak = state.currentStreak;
    let newHeatmap = [...state.activityHeatmap];

    if (!state.lastActiveDate) {
      newStreak = 1;
      if (!newHeatmap.includes(todayStr)) newHeatmap.push(todayStr);
    } else {
      const lastDate = new Date(state.lastActiveDate);
      const today = new Date();
      // Set hours to 0 to properly compare dates without time interference
      lastDate.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays === 1) {
        newStreak += 1;
        if (!newHeatmap.includes(todayStr)) newHeatmap.push(todayStr);
      } else if (diffDays > 1) {
        newStreak = 1;
        if (!newHeatmap.includes(todayStr)) newHeatmap.push(todayStr);
      }
      // If diffDays === 0, they already logged activity today. Heatmap should already have it.
    }

    return {
      xp: newXp,
      currentStreak: newStreak,
      lastActiveDate: new Date().toISOString(), // store precise time
      activityHeatmap: newHeatmap
    };
  }),

  // Phase 2: Learning Engine State
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
    // Log activity on question completion (reward +10 XP)
    useAppStore.getState().logActivity(10);
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

  // Phase 3: Quiz Engine State
  quizScores: {}, // Format: { quizId: { score: number, total: number, date: string } }
  
  saveQuizScore: (quizId, scoreData) => {
    set((state) => ({
      quizScores: {
        ...state.quizScores,
        [quizId]: {
          ...scoreData,
          date: new Date().toISOString()
        }
      }
    }));
    // Log activity on quiz completion (reward +50 XP)
    useAppStore.getState().logActivity(50);
  },

  // Phase 4: Mock Interview State
  mockInterviews: [], // Format: [{ id, type, date, duration, score }]
  
  saveMockInterview: (interviewData) => {
    set((state) => ({
      mockInterviews: [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          ...interviewData
        },
        ...state.mockInterviews
      ]
    }));
    // Log activity on mock interview completion (reward +150 XP)
    useAppStore.getState().logActivity(150);
  }
  }),
  {
    name: 'prepmaster-storage', // unique name for localStorage key
  }
));
