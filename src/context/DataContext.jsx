import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { allDataModules } from '../data';
import { getCompletedQuestions, toggleCompletedQuestion } from '../utils/storage';
import { fuzzySearch } from '../utils/search';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState(allDataModules[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [completed, setCompleted] = useState([]);
  
  // Initialize completed state from local storage
  useEffect(() => {
    setCompleted(getCompletedQuestions());
  }, []);

  const handleToggleComplete = (id) => {
    const newCompleted = toggleCompletedQuestion(id);
    setCompleted(newCompleted);
  };

  const activeModule = useMemo(() => {
    return allDataModules.find(m => m.id === activeCategory) || allDataModules[0];
  }, [activeCategory]);

  // When searching, we might want to search globally or just within the category.
  // The plan said "search returns correct results across categories."
  // So if there's a search query, let's find matching questions across ALL modules.
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    // Flatten all questions and tag them with their parent module info
    const allQuestions = allDataModules.flatMap(mod => 
      mod.questions.map(q => ({
        ...q,
        moduleId: mod.id,
        moduleTitle: mod.title,
        moduleIcon: mod.icon
      }))
    );
    
    return fuzzySearch(searchQuery, allQuestions, ['question', 'answer', 'concepts']);
  }, [searchQuery]);

  const value = {
    allDataModules,
    activeCategory,
    setActiveCategory,
    activeModule,
    searchQuery,
    setSearchQuery,
    searchResults,
    completed,
    toggleComplete: handleToggleComplete
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
