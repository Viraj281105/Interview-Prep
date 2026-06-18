import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../context/DataContext';

const difficultyColors = {
  easy: 'bg-green-500/10 text-green-400 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  hard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function QuestionCard({ questionObj }) {
  const { id, question, difficulty, answer, code, codeLanguage, moduleTitle, moduleIcon } = questionObj;
  const [isExpanded, setIsExpanded] = useState(false);
  const { completed, toggleComplete } = useData();
  
  const isCompleted = completed.includes(id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative backdrop-blur-md bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300
        ${isExpanded ? 'border-white/20 shadow-lg' : 'border-white/10 hover:border-white/20 hover:bg-white/10'}
        ${isCompleted ? 'opacity-80' : ''}
      `}
    >
      <div 
        className="p-5 cursor-pointer flex gap-4 items-start"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); toggleComplete(id); }}
          className={`mt-1 flex-shrink-0 transition-colors ${isCompleted ? 'text-green-400' : 'text-slate-500 hover:text-white'}`}
        >
          {isCompleted ? <CheckCircle size={22} /> : <Circle size={22} />}
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            {moduleTitle && (
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1">
                {moduleIcon} {moduleTitle}
              </span>
            )}
            <span className={`text-xs font-bold px-2 py-1 rounded-md border uppercase tracking-wider ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
          </div>
          <h3 className={`text-lg font-medium leading-snug transition-colors ${isCompleted ? 'text-slate-400' : 'text-slate-100'}`}>
            {question}
          </h3>
        </div>

        <div className="text-slate-400 flex-shrink-0 mt-1">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 pl-14 border-t border-white/5">
              <div className="prose prose-invert prose-slate max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{answer}</p>
                
                {code && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e]">
                    <div className="bg-black/40 px-4 py-2 text-xs text-slate-400 font-mono flex items-center justify-between">
                      <span>{codeLanguage || 'code'}</span>
                    </div>
                    <SyntaxHighlighter 
                      language={codeLanguage || 'javascript'} 
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem' }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
