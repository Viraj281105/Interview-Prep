import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle2, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InterviewFeedback = ({ type, onExit }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl my-auto">
        <Card className="p-8 md:p-12 border-t-8 border-t-emerald-500 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Interview Completed!</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Great job completing your {type.toUpperCase()} mock interview. Consistency is key!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400">
                <TrendingUp size={20} /> Strengths
              </h3>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Maintained good eye contact with the camera.</li>
                {type === 'dsa' && <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Explained time complexity clearly before coding.</li>}
                {type === 'behavioral' && <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Structured answers well using the STAR method.</li>}
                <li className="flex items-start gap-2"><span className="text-emerald-500">•</span> Communicated thoughts without long silences.</li>
              </ul>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-orange-600 dark:text-orange-400">
                <AlertCircle size={20} /> Areas to Improve
              </h3>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2"><span className="text-orange-500">•</span> Try to reduce filler words ("um", "like").</li>
                {type === 'dsa' && <li className="flex items-start gap-2"><span className="text-orange-500">•</span> Edge cases were missed in the second problem.</li>}
                <li className="flex items-start gap-2"><span className="text-orange-500">•</span> Ensure your background is slightly less distracting next time.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="w-full sm:w-auto border-slate-300 dark:border-slate-700" onClick={onExit}>
              Return to Dashboard
            </Button>
            <Button className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700" onClick={onExit}>
              Review Transcript <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
