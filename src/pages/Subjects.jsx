import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { Code, Database, Server, Users, Search, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RevisionScheduler } from '../components/practice/RevisionScheduler';

import { useAppStore } from '../store';
import * as Icons from 'lucide-react';

export const Subjects = () => {
  const { completedQuestions, subjectsList, allDataModules } = useAppStore();

  const getSubjectProgress = (subject) => {
    let total = 0;
    let completed = 0;
    
    subject.moduleIds.forEach(modId => {
      const module = allDataModules.find(m => m.id === modId);
      if (module && module.questions) {
        total += module.questions.length;
        completed += module.questions.filter(q => completedQuestions.includes(q.id)).length;
      }
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="flex flex-col gap-8 w-full py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight mb-3 text-slate-900 dark:text-slate-50">Subject Modules</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">Master every concept required for technical interviews. Track your progress across modules.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-indigo/60" size={18} />
          <Input placeholder="Search subjects..." className="pl-11 h-12 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm focus:border-brand-indigo focus:ring-brand-indigo/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjectsList.map((sub, i) => {
          const progress = getSubjectProgress(sub);
          return (
          <motion.div key={sub.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card animated glass className="p-6 h-full flex flex-col group border-white/60 dark:border-slate-700/50 hover:border-brand-indigo/40 dark:hover:border-brand-lavender/40 transition-all cursor-pointer hover:shadow-xl hover:shadow-brand-indigo/5">
              <div className="flex justify-between items-start mb-5">
                <div className={`p-3.5 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md ${sub.bg} ${sub.color}`}>
                  {Icons[sub.icon] ? React.createElement(Icons[sub.icon], { size: 26 }) : <Icons.Box size={26} />}
                </div>
                {progress === 100 ? (
                  <Badge variant="primary" className="bg-emerald-500 shadow-lg shadow-emerald-500/20">Completed</Badge>
                ) : (
                  <Badge variant="secondary" className="font-semibold">{progress}% Complete</Badge>
                )}
              </div>
              
              <h3 className="text-lg font-heading font-bold mb-2 text-slate-900 dark:text-slate-50 group-hover:text-brand-indigo dark:group-hover:text-brand-lavender transition-colors">{sub.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 leading-relaxed">{sub.desc}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-auto">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <BookOpen size={14} className="text-brand-indigo/60" />
                  <span>{sub.moduleIds.length} Modules</span>
                </div>
                <Link to={`/subjects/${sub.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2 px-3 h-8 text-brand-indigo dark:text-brand-lavender rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                    Enter <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )})}
      </div>

      <div className="mt-8">
        <RevisionScheduler />
      </div>
    </div>
  );
};
