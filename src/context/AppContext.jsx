import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { allDataModules } from '../data';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Completed questions: { [questionId]: timestamp }
  const [completed, setCompleted] = useLocalStorage('vtmp-completed', {});

  // Toggle completion
  const toggleComplete = useCallback((questionId) => {
    setCompleted(prev => {
      const next = { ...prev };
      if (next[questionId]) {
        delete next[questionId];
      } else {
        next[questionId] = Date.now();
      }
      return next;
    });
  }, [setCompleted]);

  const isComplete = useCallback((questionId) => {
    return !!completed[questionId];
  }, [completed]);

  const getCompletedCount = useCallback((questionIds) => {
    if (!questionIds) return 0;
    return questionIds.filter(id => !!completed[id]).length;
  }, [completed]);

  // Derived data
  const allModules = allDataModules;

  const totalQuestions = useMemo(() => {
    return allModules.reduce((sum, mod) => sum + (mod.questions?.length || 0), 0);
  }, [allModules]);

  const totalCompleted = useMemo(() => {
    return Object.keys(completed).length;
  }, [completed]);

  // Collect unique difficulties and types from data
  const allDifficulties = useMemo(() => {
    const set = new Set();
    allModules.forEach(mod => {
      mod.questions?.forEach(q => {
        if (q.difficulty) set.add(q.difficulty);
      });
    });
    // Sort in desired order
    const order = ['easy', 'medium', 'hard', 'expert'];
    return order.filter(d => set.has(d));
  }, [allModules]);

  const allTypes = useMemo(() => {
    const set = new Set();
    allModules.forEach(mod => {
      mod.questions?.forEach(q => {
        if (q.type) set.add(q.type);
      });
    });
    return Array.from(set).sort();
  }, [allModules]);

  const value = {
    allModules,
    totalQuestions,
    totalCompleted,
    completed,
    toggleComplete,
    isComplete,
    getCompletedCount,
    allDifficulties,
    allTypes,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
