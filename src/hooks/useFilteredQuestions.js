import { useMemo } from 'react';

/**
 * Memoized filtering hook for questions.
 * @param {Array} questions - array of question objects
 * @param {Object} filters - { difficulty, type, status }
 * @param {string} searchQuery - search text
 * @param {Array} completed - array of completed question IDs
 * @param {Array} bookmarked - array of bookmarked question IDs
 * @returns {Array} filtered questions
 */
export function useFilteredQuestions(questions, filters, searchQuery, completed = [], bookmarked = []) {
  return useMemo(() => {
    if (!questions || questions.length === 0) return [];

    let list = questions;

    // Difficulty filter
    if (filters.difficulty && filters.difficulty !== 'all') {
      list = list.filter(q => q.difficulty === filters.difficulty);
    }

    // Type filter
    if (filters.type && filters.type !== 'all') {
      list = list.filter(q => q.type === filters.type);
    }

    // Status filter
    if (filters.status === 'completed') {
      list = list.filter(q => completed.includes(q.id));
    } else if (filters.status === 'pending') {
      list = list.filter(q => !completed.includes(q.id));
    } else if (filters.status === 'bookmarked') {
      list = list.filter(q => bookmarked.includes(q.id));
    }

    // Search
    if (searchQuery && searchQuery.trim()) {
      const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter(item => {
        const text = [
          item.question || '',
          item.answer || '',
          ...(item.concepts || []),
        ].join(' ').toLowerCase();
        return terms.every(term => text.includes(term));
      });
    }

    return list;
  }, [questions, filters, searchQuery, completed, bookmarked]);
}
