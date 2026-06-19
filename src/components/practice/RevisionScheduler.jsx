import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

export const RevisionScheduler = () => {
  const [plan, setPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlan = (days) => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      let mockPlan = [];
      if (days === 1) mockPlan = [{ day: 1, title: 'Intense Crash Course', topics: ['DSA Core (Arrays, Trees)', 'System Design Basics', 'Top 10 HR Qs'] }];
      else if (days === 3) mockPlan = [
        { day: 1, title: 'Data Structures Deep Dive', topics: ['Arrays, Strings, Linked Lists', 'Trees & Graphs', 'Dynamic Programming'] },
        { day: 2, title: 'Systems & Databases', topics: ['SQL Queries', 'NoSQL', 'System Design Patterns'] },
        { day: 3, title: 'Core CS & Soft Skills', topics: ['OS & Networking', 'Behavioral Interviews', 'Mock Test'] }
      ];
      else mockPlan = Array.from({length: 7}, (_, i) => ({ day: i+1, title: `Targeted Review Day ${i+1}`, topics: ['Mixed Technical', '1 Mock Interview'] }));
      
      setPlan(mockPlan);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <Card className="p-6 md:p-8 mt-8 border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-900/10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 rounded-lg">
              <Calendar size={24} />
            </div>
            <h2 className="text-2xl font-bold">Revision Scheduler</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Interview coming up? Let our algorithm build a structured revision plan based on your weak areas and remaining time.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {[1, 3, 7].map(days => (
              <Button 
                key={days} 
                variant="outline" 
                onClick={() => generatePlan(days)}
                disabled={isGenerating}
                className="hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {days}-Day Plan
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full">
          {isGenerating ? (
            <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-indigo-500">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="font-medium animate-pulse">Generating your custom schedule...</p>
            </div>
          ) : plan ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" /> Your Custom Schedule
              </h3>
              {plan.map((day, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded font-bold text-sm text-slate-500">
                    Day {day.day}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{day.title}</h4>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      {day.topics.map((t, i) => <li key={i} className="flex items-center gap-1"><ChevronRight size={12}/> {t}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">Save Plan to Dashboard</Button>
            </motion.div>
          ) : (
            <div className="h-full min-h-[200px] bg-white/50 dark:bg-slate-950/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <BookOpen size={32} className="mb-3 opacity-50" />
              <p>Select a timeframe to generate your personalized revision schedule.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
