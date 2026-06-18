import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import DifficultyBadge from './DifficultyBadge';
import CodeBlock from './CodeBlock';

export function QuestionCard({ question, showTopic = false }) {
  const { id, question: questionText, difficulty, answer, code, codeLanguage, type, moduleTitle, moduleIcon } = question;
  const [isExpanded, setIsExpanded] = useState(false);
  const { isComplete, toggleComplete } = useApp();

  const completed = isComplete(id);

  return (
    <div
      className={`
        rounded-xl overflow-hidden transition-all duration-200
        bg-white/[0.02] border
        ${isExpanded
          ? 'border-white/[0.12] bg-white/[0.04]'
          : 'border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.03]'
        }
        ${completed ? 'opacity-70' : ''}
      `}
    >
      {/* Header — clickable */}
      <div
        className="p-4 cursor-pointer flex gap-3 items-start select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Completion toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleComplete(id); }}
          className={`mt-0.5 flex-shrink-0 transition-colors duration-200 ${
            completed ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
          }`}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {completed ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <DifficultyBadge difficulty={difficulty} />
            {type && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/[0.04] text-slate-500 uppercase tracking-wider">
                {type}
              </span>
            )}
            {showTopic && moduleTitle && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/15 flex items-center gap-1">
                {moduleIcon} {moduleTitle}
              </span>
            )}
          </div>

          {/* Question text */}
          <h3 className={`text-sm font-medium leading-relaxed transition-colors ${
            completed ? 'text-slate-500 line-through decoration-slate-700' : 'text-slate-200'
          }`}>
            {questionText}
          </h3>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-600 flex-shrink-0 mt-0.5"
        >
          <ChevronDown size={16} />
        </motion.div>
      </div>

      {/* Expandable answer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-[52px] border-t border-white/[0.04] pt-3">
              {/* Answer */}
              <div className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                {answer}
              </div>

              {/* Code block */}
              {code && (
                <div className="mt-3">
                  <CodeBlock code={code} language={codeLanguage || 'javascript'} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
