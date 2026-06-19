import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { RefreshCcw, Check, X, Code2 } from 'lucide-react';

export const Flashcard = ({ question, onNext }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => setIsFlipped(!isFlipped);

  const handleResult = (success) => {
    setIsFlipped(false);
    setTimeout(() => {
      onNext(success);
    }, 300);
  };

  return (
    <div className="w-full max-w-3xl mx-auto perspective-1000 h-[500px]">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        onClick={flipCard}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <Card className="absolute inset-0 backface-hidden p-8 md:p-12 flex flex-col justify-center items-center text-center bg-white dark:bg-slate-900 border-2 hover:border-blue-500/50 shadow-xl">
          <div className="absolute top-6 right-6 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              question.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
              question.difficulty === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
              'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
            }`}>
              {question.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              {question.type}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-6 px-4">{question.question}</h2>
          <div className="mt-auto pt-8 flex items-center gap-2 text-slate-400">
            <RefreshCcw size={16} className="animate-spin-slow" />
            <span className="text-sm font-medium">Click to reveal answer</span>
          </div>
        </Card>

        {/* Back */}
        <Card 
          className="absolute inset-0 backface-hidden p-8 md:p-12 flex flex-col bg-slate-50 dark:bg-slate-950 border-2 border-blue-200 dark:border-blue-900 shadow-xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-left">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">Answer</h3>
            <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-6 whitespace-pre-wrap">
              {question.answer}
            </p>
            
            {question.code && (
              <div className="w-full bg-slate-900 rounded-lg p-4 mb-6 overflow-x-auto border border-slate-700" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2 text-slate-400 mb-2 border-b border-slate-700 pb-2">
                  <Code2 size={16} /> <span className="text-xs uppercase font-semibold tracking-wider">Code Snippet</span>
                </div>
                <pre className="text-sm text-blue-300 font-mono"><code>{question.code}</code></pre>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <p className="text-sm text-slate-500 mb-4 font-medium">How did you do?</p>
            <div className="flex gap-4 w-full" onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" className="flex-1 border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-rose-900/50 dark:hover:bg-rose-900/20 dark:hover:text-rose-400" onClick={() => handleResult(false)}>
                <X size={18} className="mr-2" /> Needs Practice
              </Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30" onClick={() => handleResult(true)}>
                <Check size={18} className="mr-2" /> Got It
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
