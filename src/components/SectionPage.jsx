import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import TopicSection from './TopicSection';
import FilterBar from './FilterBar';
import ProgressBar from './ProgressBar';
import { useProgress } from '../context/ProgressContext';

export default function SectionPage({ title, subtitle, icon, topics, gradient = 'from-blue-500 to-purple-500' }) {
  const [difficulty, setDifficulty] = useState('all');
  const [completionFilter, setCompletionFilter] = useState('all');
  const [expandKey, setExpandKey] = useState(0);
  const [allOpen, setAllOpen] = useState(false);
  const { getCompletedCount, isComplete } = useProgress();

  // Filter questions within topics
  const filteredTopics = useMemo(() => {
    return topics.map(topic => {
      let questions = topic.questions;
      if (difficulty !== 'all') {
        questions = questions.filter(q => q.difficulty === difficulty);
      }
      if (completionFilter === 'completed') {
        questions = questions.filter(q => isComplete(q.id));
      } else if (completionFilter === 'pending') {
        questions = questions.filter(q => !isComplete(q.id));
      }
      return { ...topic, questions };
    }).filter(topic => topic.questions.length > 0);
  }, [topics, difficulty, completionFilter, isComplete]);

  const allQuestionIds = topics.flatMap(t => t.questions.map(q => q.id));
  const totalQuestions = allQuestionIds.length;
  const completedCount = getCompletedCount(allQuestionIds);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}
          style={{ boxShadow: '0 8px 30px rgba(139, 92, 246, 0.15)' }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          <div className="mt-3 max-w-sm">
            <ProgressBar
              value={completedCount}
              max={totalQuestions}
              color={gradient}
            />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <FilterBar
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        completionFilter={completionFilter}
        setCompletionFilter={setCompletionFilter}
        onExpandAll={() => { setAllOpen(true); setExpandKey(k => k + 1); }}
        onCollapseAll={() => { setAllOpen(false); setExpandKey(k => k + 1); }}
      />

      {/* Results count */}
      <div className="text-xs text-gray-500">
        Showing {filteredTopics.reduce((s, t) => s + t.questions.length, 0)} of {totalQuestions} questions
      </div>

      {/* Topics */}
      <div className="space-y-4" key={expandKey}>
        {filteredTopics.map((topic, i) => (
          <TopicSection key={topic.id} topic={topic} defaultOpen={allOpen} />
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-gray-500 text-sm">No questions match the current filters.</p>
        </motion.div>
      )}
    </div>
  );
}
