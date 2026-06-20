import { create } from 'zustand';

// Global state for user profile and app settings
export const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  activeSubject: null,
  setActiveSubject: (subject) => set({ activeSubject: subject }),
}));
