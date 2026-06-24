import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle2, TrendingUp, AlertCircle, ArrowRight, Clock, Award, Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store';
import { useAuth } from '../../context/AuthContext';
import { logAction } from '../../services/historyService';

export const InterviewFeedback = ({ type, duration, transcript, onExit }) => {
  const { saveMockInterview } = useAppStore();
  const { currentUser } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    // Simulate AI processing delay (3-4 seconds)
    const timer = setTimeout(() => {
      let totalScore = 0;
      let allStrengths = [];
      let allWeaknesses = [];
      
      if (transcript && transcript.length > 0) {
        transcript.forEach(t => {
          if (t.evaluation) {
            totalScore += t.evaluation.score;
            if (t.evaluation.strengths) allStrengths.push(...t.evaluation.strengths);
            if (t.evaluation.weaknesses) allWeaknesses.push(...t.evaluation.weaknesses);
          }
        });
      }

      // Convert 1-10 per question to an overall 0-100 score
      const maxPossibleScore = (transcript?.length || 1) * 10;
      const calculatedScore = transcript?.length > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
      
      // Deduplicate strengths and weaknesses to keep it concise
      const uniqueStrengths = [...new Set(allStrengths)].slice(0, 4);
      const uniqueWeaknesses = [...new Set(allWeaknesses)].slice(0, 4);
      
      const newFeedback = {
        type,
        duration,
        score: calculatedScore,
        feedback: calculatedScore > 80 
          ? "Excellent performance overall. You demonstrated strong technical depth and clear communication." 
          : "Good effort, but there are several areas that need significant improvement before a real interview.",
        strengths: uniqueStrengths.length > 0 ? uniqueStrengths : ["Completed the interview session."],
        improvements: uniqueWeaknesses.length > 0 ? uniqueWeaknesses : ["Try to provide more detailed answers next time."],
        transcript: transcript || []
      };

      setFeedbackData(newFeedback);
      saveMockInterview(newFeedback);
      
      if (currentUser?.id) {
        logAction(currentUser.id, 'mock_taken', { type, score: calculatedScore, duration });
      }
      
      setIsAnalyzing(false);
    }, 3500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (seconds) => {
    if (!seconds) return '0m 0s';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50/90 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 overflow-y-auto">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center justify-center text-center max-w-md w-full"
          >
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-2 border-brand-indigo/50 border-r-2 border-r-brand-purple/50 border-b-2 border-b-transparent border-l-2 border-l-transparent"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-b-2 border-emerald-500/50 border-l-2 border-l-emerald-400/50 border-t-2 border-t-transparent border-r-2 border-r-transparent"
              />
              <BrainCircuit size={48} className="text-brand-indigo animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-heading font-bold mb-3 text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Sparkles className="text-brand-indigo" size={24} />
              AI Evaluator Processing
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Analyzing transcript, code quality, and delivery metrics...
            </p>
            
            <div className="mt-8 w-full max-w-xs bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-indigo to-brand-purple"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ type: "spring", damping: 25, delay: 0.1 }} 
            className="w-full max-w-3xl my-auto"
          >
            <Card glass className="p-8 md:p-12 border-brand-indigo/20 shadow-2xl relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

              <div className="flex flex-col items-center text-center mb-10 relative z-10">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="w-24 h-24 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h1 className="text-4xl font-heading font-extrabold mb-4 text-slate-900 dark:text-slate-50 tracking-tight">Evaluation Ready</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                  Great job completing your <span className="font-bold text-brand-indigo">{type.replace('-', ' ').toUpperCase()}</span> mock interview.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <Clock size={16} className="text-brand-indigo" /> {formatTime(duration)}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100/50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    <Award size={16} /> Score: {feedbackData?.score}/100
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 text-sm font-bold text-brand-indigo dark:text-brand-lavender">
                    <Sparkles size={16} /> Saved to History
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold flex items-center gap-2 mb-5 text-emerald-700 dark:text-emerald-400 text-lg">
                    <TrendingUp size={20} /> Strengths
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                    {feedbackData?.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-0.5"><CheckCircle2 size={16} /></span>
                        <span className="leading-relaxed">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold flex items-center gap-2 mb-5 text-amber-700 dark:text-amber-400 text-lg">
                    <AlertCircle size={20} /> Areas to Improve
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                    {feedbackData?.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-amber-500 mt-0.5"><ArrowRight size={16} /></span>
                        <span className="leading-relaxed">{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 border-slate-300 dark:border-slate-700" onClick={onExit}>
                  Return to Dashboard
                </Button>
                <Button size="lg" className="w-full sm:w-auto px-8 gap-2 font-bold shadow-lg shadow-brand-indigo/20 bg-brand-indigo hover:bg-brand-purple text-white" onClick={onExit}>
                  Review Full Report <ArrowRight size={18} />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
