import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { useProgress } from '../context/ProgressContext';

export default function TopicSection({ topic, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { getCompletedCount } = useProgress();

  const questionIds = topic.questions.map(q => q.id);
  const completedCount = getCompletedCount(questionIds);
  const totalCount = topic.questions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Topic header */}
      <div
        className="flex items-center gap-4 p-5 cursor-pointer select-none hover:bg-white/[0.02] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl">{topic.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-white">{topic.title}</h3>
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
              {totalCount} questions
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1 line-clamp-1">{topic.summary}</p>
          <div className="mt-3 max-w-xs">
            <ProgressBar value={completedCount} max={totalCount} />
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={20} className="text-gray-500" />
        </motion.div>
      </div>

      {/* Concepts tags + Questions list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/5 pt-4">
              {/* Core concepts tags */}
              {topic.concepts && topic.concepts.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={14} className="text-purple-400" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Core Concepts</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topic.concepts.map((concept, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions */}
              <div className="space-y-2">
                {topic.questions.map((q, i) => (
                  <QuestionCard key={q.id} question={q} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
