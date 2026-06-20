import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MapPin, Target, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const RoadmapGenerator = () => {
  const [targetRole, setTargetRole] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setRoadmap([
        { week: 1, title: 'Foundations & Arrays', tasks: ['Review Big O Notation', 'Solve 15 Array/String LeetCode Easy', 'Read CTCI Ch. 1'] },
        { week: 2, title: 'Data Structures Deep Dive', tasks: ['Linked Lists & Trees', 'Solve 10 Medium Tree problems', 'Mock Interview 1'] },
        { week: 3, title: 'System Design Basics', tasks: ['Watch Grokking the System Design', 'Design a URL Shortener', 'Read about Load Balancers'] },
        { week: 4, title: 'Behavioral & Final Polish', tasks: ['Write out 5 STAR stories', 'Mock Interview 2', 'Review Top 50 HR questions'] },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <Card glass className="flex-[0.4] p-8 lg:p-10 border-brand-indigo/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-xl overflow-y-auto custom-scrollbar relative">
        <div className="w-16 h-16 bg-brand-indigo/10 text-brand-indigo rounded-2xl flex items-center justify-center mb-8 shadow-inner relative">
          <Sparkles size={20} className="absolute -top-1 -right-1 text-amber-400" />
          <Target size={32} />
        </div>
        <h3 className="text-3xl font-heading font-bold tracking-tight mb-3 text-slate-900 dark:text-slate-100">Personalized Study Plan</h3>
        <p className="text-base text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Tell our AI your target role and timeframe, and it will generate a customized, week-by-week action plan for you.
        </p>

        <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-slate-300">Target Role/Company</label>
            <Input required value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="e.g. SDE 2 at Google" className="bg-white/80 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700 h-12" />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-slate-300">Timeframe (Weeks)</label>
            <Input required type="number" min="1" max="12" value={timeframe} onChange={e => setTimeframe(e.target.value)} placeholder="e.g. 4" className="bg-white/80 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700 h-12" />
          </div>
          
          <Button type="submit" size="lg" className="w-full mt-6 shadow-brand-indigo/20 shadow-lg font-bold bg-brand-indigo hover:bg-brand-purple" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Roadmap'}
          </Button>
        </form>
      </Card>

      {/* Result Section */}
      <Card glass className="flex-[0.6] p-0 overflow-hidden flex flex-col border-brand-indigo/10 dark:border-brand-indigo/20 shadow-xl">
        <div className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 font-heading font-bold flex items-center gap-3 text-lg text-slate-900 dark:text-slate-100">
          <MapPin className="text-brand-indigo" size={24} /> Your Roadmap
        </div>
        
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {!roadmap && !isGenerating && (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm text-center">
               <Calendar size={64} className="mb-6 opacity-20 text-brand-indigo" />
               <p className="text-base font-medium max-w-[250px] leading-relaxed">Fill out the form to generate your AI roadmap.</p>
             </div>
          )}

          {isGenerating && (
             <div className="h-full flex flex-col items-center justify-center text-brand-indigo">
               <div className="w-10 h-10 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin mb-4"></div>
               <p className="font-bold animate-pulse text-sm uppercase tracking-wide">Compiling syllabus...</p>
             </div>
          )}

          {roadmap && (
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-indigo/10 before:via-brand-indigo/40 dark:before:via-brand-indigo/30 before:to-transparent">
              {roadmap.map((week, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative flex items-start gap-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] shrink-0 z-10 font-bold border-4 border-white dark:border-[#0A0A0A] text-sm">
                    W{week.week}
                  </div>
                  <div className="flex-1 pt-2 pb-6">
                    <h4 className="font-heading font-bold text-xl mb-4 text-slate-900 dark:text-slate-100">{week.title}</h4>
                    <ul className="space-y-3">
                      {week.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[15px] text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
