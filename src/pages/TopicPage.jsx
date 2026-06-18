import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useFilteredQuestions } from '../hooks/useFilteredQuestions';
import { QuestionCard } from '../components/QuestionCard';
import { FilterBar } from '../components/FilterBar';
import ProgressBar from '../components/ProgressBar';

export default function TopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { allModules, completed, getCompletedCount } = useApp();

  const [filters, setFilters] = useState({ difficulty: 'all', type: 'all', status: 'all' });
  const [searchQuery] = useState('');

  const module = useMemo(() => {
    return allModules.find(m => m.id === topicId);
  }, [allModules, topicId]);

  const questions = module?.questions || [];
  const filteredQuestions = useFilteredQuestions(questions, filters, searchQuery, completed);

  if (!module) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">Topic not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const questionIds = questions.map(q => q.id);
  const completedCount = getCompletedCount(questionIds);
  const totalCount = questions.length;

  // Get unique difficulties and types for this topic
  const topicDifficulties = useMemo(() => {
    const set = new Set(questions.map(q => q.difficulty).filter(Boolean));
    const order = ['easy', 'medium', 'hard', 'expert'];
    return order.filter(d => set.has(d));
  }, [questions]);

  const topicTypes = useMemo(() => {
    const set = new Set(questions.map(q => q.type).filter(Boolean));
    return Array.from(set).sort();
  }, [questions]);

  return (
    <motion.div
      key={topicId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Dashboard
      </button>

      {/* Topic Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-2xl flex-shrink-0">
            {module.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-white">{module.title}</h1>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">{module.summary}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-md">
          <ProgressBar value={completedCount} max={totalCount} label="Progress" />
        </div>

        {/* Concepts */}
        {module.concepts && module.concepts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={13} className="text-purple-400" />
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Core Concepts</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {module.concepts.map((concept, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/15"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        difficulties={topicDifficulties}
        types={topicTypes}
      />

      {/* Results count */}
      <div className="text-xs text-slate-600">
        Showing {filteredQuestions.length} of {totalCount} questions
      </div>

      {/* Questions */}
      <div className="space-y-2.5 pb-8">
        <AnimatePresence mode="popLayout">
          {filteredQuestions.map((q, i) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
            >
              <QuestionCard question={q} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredQuestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center border border-dashed border-white/[0.06] rounded-2xl"
          >
            <p className="text-slate-600 text-sm">No questions match the current filters.</p>
            <button
              onClick={() => setFilters({ difficulty: 'all', type: 'all', status: 'all' })}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
