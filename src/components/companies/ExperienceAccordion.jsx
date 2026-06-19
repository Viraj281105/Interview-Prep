import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ChevronDown, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExperienceAccordion = ({ experience }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${experience.status === 'Offer' ? 'bg-emerald-500' : experience.status === 'Rejected' ? 'bg-rose-500' : 'bg-orange-500'}`}></div>
            <h4 className="font-bold">{experience.role}</h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="hidden sm:inline">•</span>
            {experience.date}
            <span className="hidden sm:inline">•</span>
            <span className={`${experience.status === 'Offer' ? 'text-emerald-600 dark:text-emerald-400' : experience.status === 'Rejected' ? 'text-rose-600 dark:text-rose-400' : ''}`}>
              {experience.status}
            </span>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} className="text-slate-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 dark:border-slate-800"
          >
            <div className="p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950/20">
              <div className="mb-6">
                <h5 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Interview Rounds</h5>
                <div className="space-y-4">
                  {experience.rounds.map((round, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center text-xs font-bold shadow-sm">
                          {i + 1}
                        </div>
                        {i < experience.rounds.length - 1 && <div className="w-px h-full bg-slate-200 dark:bg-slate-700 my-1"></div>}
                      </div>
                      <div className="pb-4">
                        <h6 className="font-semibold text-sm mb-1 text-slate-800 dark:text-slate-200">{round.name}</h6>
                        <p className="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap leading-relaxed">{round.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
                <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                  <ThumbsUp size={16} /> <span className="font-medium">{experience.upvotes || 0}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-rose-600 transition-colors">
                  <ThumbsDown size={16} />
                </button>
                <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors ml-auto">
                  <MessageSquare size={16} /> <span className="hidden sm:inline">Reply</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
