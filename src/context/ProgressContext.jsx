import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('vtmp-completed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('vtmp-completed', JSON.stringify(completed));
  }, [completed]);

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
  }, []);

  const isComplete = useCallback((questionId) => {
    return !!completed[questionId];
  }, [completed]);

  const getCompletedCount = useCallback((questionIds) => {
    return questionIds.filter(id => completed[id]).length;
  }, [completed]);

  const getTotalCompleted = useCallback(() => {
    return Object.keys(completed).length;
  }, [completed]);

  const value = {
    completed,
    toggleComplete,
    isComplete,
    getCompletedCount,
    getTotalCompleted,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
