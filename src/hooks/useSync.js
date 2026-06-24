import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store';
import * as db from '../services/database';

export const useSync = () => {
  const { currentUser, isBackendAvailable } = useAuth();
  const lastState = useRef(null);

  useEffect(() => {
    if (!currentUser || !isBackendAvailable) return;

    // Initial load from DB
    const loadFromDb = async () => {
      try {
        const [profile, bookmarks, progress, quizAttempts, mockInterviews, notes] = await Promise.all([
          db.getUserProfile(currentUser.id),
          db.getBookmarks(currentUser.id),
          db.getProgress(currentUser.id),
          db.getQuizAttempts(currentUser.id),
          db.getMockInterviews(currentUser.id),
          db.getNotes(currentUser.id)
        ]);

        if (profile) {
          useAppStore.setState(state => ({
            xp: Math.max(state.xp, profile.xp || 0),
            level: Math.max(state.level, profile.level || 1),
            currentStreak: Math.max(state.currentStreak, profile.current_streak || 0)
          }));
        }
        
        useAppStore.setState(state => {
          // Merge bookmarks
          const mergedBookmarks = new Set([...state.bookmarkedQuestions, ...(bookmarks || [])]);
          // Merge progress (completed questions)
          const mergedProgress = new Set([...state.completedQuestions, ...(progress || [])]);
          
          return { 
            bookmarkedQuestions: Array.from(mergedBookmarks),
            completedQuestions: Array.from(mergedProgress),
            // For arrays, if backend has data, we can prefer backend or merge.
            // Since it's history, we'll just set it to the backend's (which is the source of truth).
            quizHistory: quizAttempts?.length > 0 ? quizAttempts : state.quizHistory,
            mockInterviews: mockInterviews?.length > 0 ? mockInterviews : state.mockInterviews,
            // Merge notes
            userNotes: { ...state.userNotes, ...(notes || {}) }
          };
        });
        
      } catch (err) {
        console.error('Failed to load initial data from DB:', err);
      }
    };
    
    loadFromDb();

    // Subscribe to Zustand changes and push to DB
    const unsubscribe = useAppStore.subscribe(async (state) => {
      const prev = lastState.current;
      lastState.current = state;
      if (!prev) return; // Skip first tick

      try {
        // Detect newly completed questions
        if (state.completedQuestions.length > prev.completedQuestions.length) {
          const newQs = state.completedQuestions.filter(q => !prev.completedQuestions.includes(q));
          for (const qId of newQs) {
            await db.saveProgress(currentUser.id, qId, 'general');
          }
        }

        // Detect new quiz attempts
        if (state.quizHistory.length > prev.quizHistory.length) {
          const newQuiz = state.quizHistory[0]; // Assuming it's unshifted (newest first)
          await db.saveQuizAttempt(currentUser.id, newQuiz);
        }

        // Detect new mock interviews
        if (state.mockInterviews.length > prev.mockInterviews.length) {
          const newMock = state.mockInterviews[0];
          await db.saveMockInterviewResult(currentUser.id, newMock);
        }
        
        // Update profile stats if XP/Streak changed
        if (state.xp !== prev.xp || state.currentStreak !== prev.currentStreak) {
          await db.updateUserProfile(currentUser.id, { 
            xp: state.xp, 
            level: state.level, 
            current_streak: state.currentStreak 
          });
        }
      } catch (err) {
        console.error('Failed to sync to DB:', err);
      }
    });

    return () => unsubscribe();
  }, [currentUser, isBackendAvailable]);
};
