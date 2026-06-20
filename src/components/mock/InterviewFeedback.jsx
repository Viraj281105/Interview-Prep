import React, { useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle2, TrendingUp, AlertCircle, ArrowRight, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store';

export const InterviewFeedback = ({ type, duration, onExit }) => {
  const { saveMockInterview } = useAppStore();

  useEffect(() => {
    // Generate some mock feedback for now
    const score = Math.floor(Math.random() * 30) + 70; // 70-100 score
    saveMockInterview({
      type,
      duration,
      score,
      feedback: "Good structured answers. Improve eye contact and reduce filler words."
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return '0m 0s';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-y-auto">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", damping: 25 }} className="w-full max-w-3xl my-auto">
        <Card className="p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#0F0F11]">
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-inner"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h1 className="text-4xl font-heading font-bold mb-4 text-slate-900 dark:text-slate-50">Interview Completed!</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Great job completing your <span className="font-bold text-brand-indigo">{type.replace('-', ' ').toUpperCase()}</span> mock interview.
            </p>
            
            <div className="flex justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Clock size={16} className="text-brand-indigo" /> {formatTime(duration)}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100/50 dark:bg-emerald-900/20 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                <Award size={16} /> Saved to History
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400">
                <TrendingUp size={20} /> Strengths
              </h3>
              <ul className="space-y-3 text-sm text-emerald-800/80 dark:text-emerald-300/80">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Maintained good eye contact with the camera.</li>
                {type === 'dsa' && <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Explained time complexity clearly before coding.</li>}
                {type === 'behavioral' && <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Structured answers well using the STAR method.</li>}
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Communicated thoughts without long silences.</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-amber-700 dark:text-amber-400">
                <AlertCircle size={20} /> Areas to Improve
              </h3>
              <ul className="space-y-3 text-sm text-amber-800/80 dark:text-amber-300/80">
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Try to reduce filler words ("um", "like").</li>
                {type === 'dsa' && <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Edge cases were missed in the second problem.</li>}
                <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Take brief pauses to gather your thoughts instead of rushing.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="w-full sm:w-auto px-8" onClick={onExit}>
              Return to Dashboard
            </Button>
            <Button className="w-full sm:w-auto px-8 gap-2 shadow-lg shadow-brand-indigo/20" onClick={onExit}>
              Review Full Report <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
