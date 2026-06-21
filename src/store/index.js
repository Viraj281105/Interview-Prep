import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createProgressSlice } from './progressSlice';
import { createGamificationSlice } from './gamificationSlice';
import { createQuizSlice } from './quizSlice';
import { createMockSlice } from './mockSlice';
import { createDataSlice } from './dataSlice';

// Combined store using Zustand slices
export const useAppStore = create(
  persist(
    (set, get, api) => ({
      // User profile state
      user: null,
      setUser: (user) => set({ user }),

      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      activeSubject: null,
      setActiveSubject: (subject) => set({ activeSubject: subject }),

      // Spread all slices
      ...createProgressSlice(set, get, api),
      ...createGamificationSlice(set, get, api),
      ...createQuizSlice(set, get, api),
      ...createMockSlice(set, get, api),
      ...createDataSlice(set, get, api),
    }),
    {
      name: 'prepmaster-storage',
    }
  )
);
