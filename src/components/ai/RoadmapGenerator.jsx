import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MapPin, Target, Calendar, CheckCircle2 } from 'lucide-react';
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
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Form Section */}
      <Card className="flex-[0.4] p-6 lg:p-8 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 overflow-y-auto custom-scrollbar">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 shadow-sm">
          <Target size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">Personalized Study Plan</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Tell our AI your target role and timeframe, and it will generate a week-by-week action plan.
        </p>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Target Role/Company</label>
            <Input required value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="e.g. SDE 2 at Google" className="bg-white dark:bg-slate-950" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Timeframe (Weeks)</label>
            <Input required type="number" min="1" max="12" value={timeframe} onChange={e => setTimeframe(e.target.value)} placeholder="e.g. 4" className="bg-white dark:bg-slate-950" />
          </div>
          
          <Button type="submit" className="w-full mt-4 shadow-blue-500/20 shadow-lg" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Roadmap'}
          </Button>
        </form>
      </Card>

      {/* Result Section */}
      <Card className="flex-[0.6] p-0 overflow-hidden flex flex-col bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-bold flex items-center gap-2">
          <MapPin className="text-blue-500" /> Your Roadmap
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          {!roadmap && !isGenerating && (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm text-center">
               <Calendar size={48} className="mb-4 opacity-20" />
               <p>Fill out the form to generate your AI roadmap.</p>
             </div>
          )}

          {isGenerating && (
             <div className="h-full flex flex-col items-center justify-center text-blue-600 dark:text-blue-400">
               <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
               <p className="font-bold animate-pulse text-sm">Compiling syllabus...</p>
             </div>
          )}

          {roadmap && (
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-blue-300 dark:before:from-blue-900/50 dark:before:via-blue-800 before:to-transparent">
              {roadmap.map((week, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative flex items-start gap-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg shrink-0 z-10 font-bold border-4 border-white dark:border-slate-950">
                    W{week.week}
                  </div>
                  <div className="flex-1 pt-1.5 pb-6">
                    <h4 className="font-bold text-lg mb-3">{week.title}</h4>
                    <ul className="space-y-2">
                      {week.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
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
