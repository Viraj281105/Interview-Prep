import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { QuestionCard } from '../components/QuestionCard';
import { FilterBar } from '../components/FilterBar';

export function CategoryPage() {
  const { activeModule, searchResults, searchQuery, completed } = useData();
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const questionsToDisplay = useMemo(() => {
    let list = searchResults || activeModule?.questions || [];

    if (difficultyFilter !== 'all') {
      list = list.filter(q => q.difficulty === difficultyFilter);
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'completed') {
        list = list.filter(q => completed.includes(q.id));
      } else if (statusFilter === 'pending') {
        list = list.filter(q => !completed.includes(q.id));
      }
    }

    return list;
  }, [activeModule, searchResults, difficultyFilter, statusFilter, completed]);

  if (searchQuery && searchResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Search Results for "{searchQuery}"</h2>
          <p className="text-slate-400">Found {questionsToDisplay.length} matching questions across all topics.</p>
        </div>
        
        <FilterBar 
          difficultyFilter={difficultyFilter} 
          setDifficultyFilter={setDifficultyFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {questionsToDisplay.map((q) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <QuestionCard questionObj={q} />
              </motion.div>
            ))}
          </AnimatePresence>
          {questionsToDisplay.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p>No matching questions found for this search/filter combination.</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  if (!activeModule) return null;

  return (
    <motion.div 
      key={activeModule.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{activeModule.icon}</span>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {activeModule.title}
          </h2>
        </div>
        <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
          {activeModule.summary}
        </p>
        
        {activeModule.concepts && (
          <div className="mt-6 flex flex-wrap gap-2">
            {activeModule.concepts.map((concept, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                {concept}
              </span>
            ))}
          </div>
        )}
      </div>

      <FilterBar 
        difficultyFilter={difficultyFilter} 
        setDifficultyFilter={setDifficultyFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="space-y-4 pb-12">
        <AnimatePresence mode="popLayout">
          {questionsToDisplay.map((q) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard questionObj={{ ...q, moduleTitle: activeModule.title, moduleIcon: activeModule.icon }} />
            </motion.div>
          ))}
        </AnimatePresence>
        {questionsToDisplay.length === 0 && (
          <div className="py-12 text-center text-slate-500 border border-dashed border-white/10 rounded-2xl">
            <p>No matching questions found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
