import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2, Lock, Star } from 'lucide-react';
import { allDataModules } from '../data/index';
import { subjectsList } from '../data/subjectsList';
import { useAppStore } from '../store';

export const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completedQuestions } = useAppStore();
  
  // Find the subject metadata
  const subjectMetadata = useMemo(() => {
    return subjectsList.find(s => s.id === id) || null;
  }, [id]);

  // Find modules for this subject using moduleIds
  const modules = useMemo(() => {
    if (!subjectMetadata) return [];
    return subjectMetadata.moduleIds
      .map(modId => allDataModules.find(m => m.id === modId))
      .filter(Boolean);
  }, [subjectMetadata]);

  // Calculate overall subject progress
  const { totalQuestions, completedCount } = useMemo(() => {
    let total = 0;
    let completed = 0;
    
    modules.forEach(mod => {
      const qCount = mod.questions?.length || 0;
      total += qCount;
      if (mod.questions) {
        completed += mod.questions.filter(q => completedQuestions.includes(q.id)).length;
      }
    });
    
    return { totalQuestions: total, completedCount: completed };
  }, [modules, completedQuestions]);

  const progressPercentage = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  if (!subjectMetadata) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Subject Not Found</h2>
          <Button onClick={() => navigate('/subjects')}>Back to Subjects</Button>
        </div>
      </div>
    );
  }

  // Calculate unlocks: A module is unlocked if it is the first module, or the previous module has at least 50% progress.
  const getModuleUnlockState = (index) => {
    if (index === 0) return true;
    const prevMod = modules[index - 1];
    const prevTotal = prevMod.questions?.length || 0;
    if (prevTotal === 0) return true; // Safety fallback
    const prevCompleted = prevMod.questions.filter(q => completedQuestions.includes(q.id)).length;
    const prevProgress = (prevCompleted / prevTotal) * 100;
    return prevProgress >= 50; // Require 50% completion to unlock next
  };

  return (
    <div className="flex flex-col gap-10 w-full py-10 px-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between sticky top-24 z-30 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-start gap-5">
          <Button variant="ghost" size="icon" onClick={() => navigate('/subjects')} className="mt-1 rounded-full bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {subjectMetadata.title}
              </h1>
              {progressPercentage === 100 && (
                <span className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={14} /> Mastered
                </span>
              )}
            </div>
            <p className="text-md text-slate-600 dark:text-slate-400">Master all modules to conquer this subject.</p>
          </div>
        </div>
        
        {/* Progress Widget */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Progress</span>
            <span className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
              {completedCount} <span className="text-slate-400 text-lg">/ {totalQuestions}</span>
            </span>
          </div>
          
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 transform -rotate-90">
              <circle className="text-slate-200 dark:text-slate-800" strokeWidth="5" stroke="currentColor" fill="transparent" r="24" cx="28" cy="28" />
              <circle 
                className={`transition-all duration-1000 ease-out ${subjectMetadata.color.replace('text-', 'text-')}`} 
                strokeWidth="5" 
                strokeDasharray={24 * 2 * Math.PI} 
                strokeDashoffset={24 * 2 * Math.PI - (progressPercentage / 100) * 24 * 2 * Math.PI} 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="24" cx="28" cy="28" 
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-slate-700 dark:text-slate-300">
              {progressPercentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Module Path UI */}
      <div className="relative py-12 flex flex-col items-center">
        {/* The Path SVG Background */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-64 z-0 pointer-events-none opacity-20 dark:opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d={`M 50,0 ${modules.map((_, i) => `Q ${i % 2 === 0 ? '100' : '0'},${((i + 0.5) / modules.length) * 100} 50,${((i + 1) / modules.length) * 100}`).join(' ')}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 2"
              strokeLinecap="round"
              className="text-slate-400"
            />
          </svg>
        </div>

        {modules.map((mod, i) => {
          const modTotal = mod.questions?.length || 0;
          const modCompleted = mod.questions ? mod.questions.filter(q => completedQuestions.includes(q.id)).length : 0;
          const modProgress = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
          
          const isUnlocked = getModuleUnlockState(i);
          const isCompleted = modProgress === 100;

          // Alternating positions: Center, Right, Center, Left
          // Calculate horizontal offset
          let xOffset = 0;
          if (i % 2 !== 0) {
            xOffset = (i % 4 === 1) ? 120 : -120; // alternates right and left
          }

          return (
            <motion.div 
              key={mod.id || i} 
              initial={{ opacity: 0, y: 50, x: xOffset }} 
              animate={{ opacity: 1, y: 0, x: xOffset }} 
              transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10 my-8 flex flex-col items-center group"
            >
              {/* Tooltip on Hover */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20 scale-95 group-hover:scale-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold font-heading">{mod.title}</span>
                  <span className="text-xs font-bold text-brand-pink">{modProgress}%</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{mod.summary}</p>
                <div className="w-full h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
                  <div className={`h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-brand-indigo'}`} style={{ width: `${modProgress}%` }} />
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 dark:bg-slate-800 rotate-45" />
              </div>

              {/* The Node Button */}
              {isUnlocked ? (
                <Link to={`/topic/${mod.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-xl cursor-pointer transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/30' 
                        : `bg-slate-100 dark:bg-slate-900 border-brand-indigo dark:border-brand-lavender text-brand-indigo dark:text-brand-lavender shadow-brand-indigo/20 hover:bg-brand-indigo/5`
                    }`}
                  >
                    {/* Inner Progress Ring (if active) */}
                    {!isCompleted && (
                       <svg className="absolute inset-0 w-full h-full -rotate-90">
                         <circle 
                           className="text-brand-indigo/20 transition-all duration-1000 ease-out" 
                           strokeWidth="8" 
                           strokeDasharray={48 * Math.PI} 
                           strokeDashoffset={48 * Math.PI - (modProgress / 100) * 48 * Math.PI} 
                           stroke="currentColor" 
                           fill="transparent" 
                           r="44" cx="48" cy="48" 
                         />
                       </svg>
                    )}
                    
                    {isCompleted ? (
                      <Star size={36} className="fill-current drop-shadow-md" />
                    ) : (
                      <span className="text-3xl drop-shadow-sm">{mod.icon || '📚'}</span>
                    )}
                  </motion.div>
                </Link>
              ) : (
                <div className="relative w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 shadow-inner cursor-not-allowed grayscale">
                  <Lock size={32} />
                </div>
              )}

              {/* Node Label Below */}
              <div className="mt-4 text-center w-32">
                <p className={`font-heading font-bold text-sm ${isUnlocked ? 'text-slate-900 dark:text-slate-50' : 'text-slate-400 dark:text-slate-600'}`}>
                  {mod.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
