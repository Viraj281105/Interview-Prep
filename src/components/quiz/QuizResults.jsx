import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle2, XCircle, Award, RotateCcw, Home, Clock } from 'lucide-react';

export function QuizResults({ quiz, score, total, userAnswers, timeSpent }) {
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);
  
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 py-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Hero Result */}
      <Card className="p-8 md:p-12 text-center flex flex-col items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-brand-indigo/20 shadow-lg shadow-brand-indigo/5">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', damping: 15 }}
          className="mb-6 relative"
        >
          <svg className="w-40 h-40 transform -rotate-90">
            <circle className="text-slate-200 dark:text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
            <motion.circle 
              className={percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-rose-500'} 
              strokeWidth="8" 
              strokeDasharray={70 * 2 * Math.PI} 
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="70" cx="80" cy="80" 
              initial={{ strokeDashoffset: 70 * 2 * Math.PI }}
              animate={{ strokeDashoffset: 70 * 2 * Math.PI - (percentage / 100) * 70 * 2 * Math.PI }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-heading font-bold text-slate-900 dark:text-white">{percentage}%</span>
          </div>
        </motion.div>

        <h2 className="text-3xl font-heading font-bold mb-3 text-slate-900 dark:text-white">
          {percentage >= 80 ? 'Outstanding!' : percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mb-8">
          You scored <strong className="text-slate-900 dark:text-white">{score}</strong> out of <strong className="text-slate-900 dark:text-white">{total}</strong> in the {quiz.title} assessment.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Clock size={16} className="text-brand-indigo" /> Time taken: {formatTime(timeSpent)}
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Award size={16} className="text-amber-500" /> +{score * 10} XP
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => window.location.reload()} className="gap-2">
            <RotateCcw size={16} /> Retake Quiz
          </Button>
          <Button onClick={() => navigate('/quiz')} className="gap-2 shadow-md shadow-brand-indigo/20">
            <Home size={16} /> Back to Dashboard
          </Button>
        </div>
      </Card>

      {/* Detailed Review */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white px-2">Detailed Review</h3>
        <div className="flex flex-col gap-4">
          {quiz.questions.map((q, idx) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correctOptionIndex;
            const isSkipped = userAnswer === undefined || userAnswer === null;

            return (
              <Card key={q.id} className={`p-6 border-l-4 ${isCorrect ? 'border-l-emerald-500' : isSkipped ? 'border-l-slate-400' : 'border-l-rose-500'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-1">
                    {isCorrect ? <CheckCircle2 className="text-emerald-500" size={24} /> : isSkipped ? <div className="w-6 h-6 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-bold">-</div> : <XCircle className="text-rose-500" size={24} />}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Question {idx + 1}</span>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{q.text}</h4>
                    {q.code && (
                      <div className="mt-3 p-3 bg-slate-900 rounded-lg text-sm font-mono text-blue-300 overflow-x-auto">
                        {q.code}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {q.options.map((opt, optIdx) => {
                    let optStyle = 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-500';
                    let icon = null;

                    if (optIdx === q.correctOptionIndex) {
                      optStyle = 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400';
                      icon = <CheckCircle2 size={16} className="ml-auto" />;
                    } else if (optIdx === userAnswer && !isCorrect) {
                      optStyle = 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400';
                      icon = <XCircle size={16} className="ml-auto" />;
                    }

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border flex items-center gap-3 text-sm font-medium ${optStyle}`}>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                          optIdx === q.correctOptionIndex ? 'bg-emerald-200 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300' :
                          optIdx === userAnswer && !isCorrect ? 'bg-rose-200 dark:bg-rose-800/50 text-rose-800 dark:text-rose-300' :
                          'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        {opt}
                        {icon}
                      </div>
                    );
                  })}
                </div>

                <div className="pl-10">
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong className="text-blue-700 dark:text-blue-400 block mb-1">Explanation:</strong>
                    {q.explanation}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
