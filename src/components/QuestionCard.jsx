import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ChevronDown, Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';
import { useAppStore } from '../store';
import DifficultyBadge from './DifficultyBadge';
import CodeBlock from './CodeBlock';

export function QuestionCard({ question, showTopic = false }) {
  const { id, question: questionText, difficulty, answer, code, codeLanguage, type, moduleTitle, moduleIcon } = question;
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { 
    completedQuestions, 
    toggleQuestionComplete, 
    bookmarkedQuestions, 
    toggleBookmark 
  } = useAppStore();

  const completed = completedQuestions.includes(id);
  const bookmarked = bookmarkedQuestions.includes(id);

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`
        rounded-2xl overflow-hidden transition-all duration-300
        bg-white/60 dark:bg-slate-900/40 border backdrop-blur-md
        ${isExpanded
          ? 'border-brand-indigo/30 shadow-md shadow-brand-indigo/5'
          : 'border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
        }
        ${completed ? 'opacity-70 grayscale-[20%]' : ''}
      `}
    >
      {/* Header — clickable */}
      <div
        className="p-5 cursor-pointer flex gap-4 items-start select-none group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Completion toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleQuestionComplete(id); }}
          className={`mt-1 flex-shrink-0 transition-all duration-200 hover:scale-110 ${
            completed ? 'text-emerald-500 drop-shadow-sm' : 'text-slate-300 dark:text-slate-600 hover:text-emerald-500/50'
          }`}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <DifficultyBadge difficulty={difficulty} />
            {type && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wider">
                {type}
              </span>
            )}
            {showTopic && moduleTitle && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-brand-indigo/10 text-brand-indigo dark:text-brand-lavender uppercase tracking-wider flex items-center gap-1">
                {moduleIcon} {moduleTitle}
              </span>
            )}
          </div>

          {/* Question text */}
          <h3 className={`text-base font-semibold leading-relaxed transition-colors ${
            completed ? 'text-slate-500 line-through decoration-slate-400/50' : 'text-slate-900 dark:text-slate-50'
          }`}>
            {questionText}
          </h3>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={(e) => { e.stopPropagation(); toggleBookmark(id); }}
            className={`p-1.5 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
              bookmarked ? 'text-brand-indigo dark:text-brand-lavender' : 'text-slate-400 hover:text-brand-indigo dark:hover:text-brand-lavender'
            }`}
          >
            {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 p-1.5"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>

      {/* Expandable answer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-[60px] border-t border-slate-100 dark:border-slate-800/50 pt-4">
              {/* Answer */}
              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {answer}
              </div>

              {/* Code block */}
              {code && (
                <div className="mt-4 relative group/code">
                  <button 
                    onClick={handleCopyCode}
                    className="absolute top-3 right-3 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white opacity-0 group-hover/code:opacity-100 transition-all z-10 backdrop-blur-sm"
                    title="Copy code"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                    <CodeBlock code={code} language={codeLanguage || 'javascript'} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
