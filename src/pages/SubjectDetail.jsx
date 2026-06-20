import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Layers, CheckCircle2, Play } from 'lucide-react';
import { allDataModules } from '../data/index';
import { useAppStore } from '../store';

export const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { completedQuestions } = useAppStore();
  
  // Find modules for this subject.
  // Subjects like 'dsa' map to 'dsa-arrays', 'dsa-dp', etc.
  const modules = useMemo(() => {
    const directMatches = allDataModules.filter(m => m.id.toLowerCase().startsWith(id.toLowerCase()));
    if (directMatches.length > 0) return directMatches;
    
    // Fallback if ID doesn't directly match
    return allDataModules.slice(0, 6);
  }, [id]);

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

  return (
    <div className="flex flex-col gap-10 w-full py-10 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="flex items-start gap-5">
          <Button variant="ghost" size="icon" onClick={() => navigate('/subjects')} className="mt-1 rounded-full bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-800 shrink-0">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-heading font-bold tracking-tight capitalize text-slate-900 dark:text-slate-50">
                {id.replace('-', ' ')}
              </h1>
              {progressPercentage === 100 && (
                <span className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={14} /> Mastered
                </span>
              )}
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400">Master all modules to conquer this subject.</p>
          </div>
        </div>
        
        {/* Progress Widget */}
        <Card glass className="p-5 flex items-center gap-6 min-w-[300px] border-white/40">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Subject Progress</span>
            <span className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
              {completedCount} <span className="text-slate-400 text-lg">/ {totalQuestions}</span>
            </span>
          </div>
          
          <div className="relative w-16 h-16 ml-auto">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle className="text-slate-200 dark:text-slate-800" strokeWidth="6" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32" />
              <circle 
                className="text-brand-indigo transition-all duration-1000 ease-out" 
                strokeWidth="6" 
                strokeDasharray={28 * 2 * Math.PI} 
                strokeDashoffset={28 * 2 * Math.PI - (progressPercentage / 100) * 28 * 2 * Math.PI} 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="28" cx="32" cy="32" 
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-slate-700 dark:text-slate-300">
              {progressPercentage}%
            </div>
          </div>
        </Card>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => {
          const modTotal = mod.questions?.length || 0;
          const modCompleted = mod.questions ? mod.questions.filter(q => completedQuestions.includes(q.id)).length : 0;
          const modProgress = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

          return (
            <motion.div key={mod.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/topic/${mod.id}`}>
                <Card animated glass className="p-6 h-full flex flex-col group border-white/40 hover:border-brand-indigo/40 dark:hover:border-brand-lavender/40 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-indigo/10 to-brand-purple/10 text-brand-indigo dark:text-brand-lavender flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner">
                      {mod.icon || '📚'}
                    </div>
                    {modProgress === 100 ? (
                      <div className="text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-full shadow-sm">
                        <CheckCircle2 size={18} />
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                        {modProgress}%
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-2 text-slate-900 dark:text-slate-50 group-hover:text-brand-indigo dark:group-hover:text-brand-lavender transition-colors">{mod.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2 flex-1">{mod.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mod.concepts?.slice(0, 3).map((concept, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg font-medium">
                        {concept}
                      </span>
                    ))}
                    {mod.concepts?.length > 3 && <span className="px-2 py-1 text-slate-400 text-xs rounded-md">+{mod.concepts.length - 3}</span>}
                  </div>

                  <div className="mt-auto border-t border-slate-100 dark:border-slate-800/60 pt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                      <Layers size={16} className="text-slate-400" /> {modTotal} Questions
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2 px-3 text-brand-indigo dark:text-brand-lavender rounded-lg opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      <Play size={14} fill="currentColor" /> Resume
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
