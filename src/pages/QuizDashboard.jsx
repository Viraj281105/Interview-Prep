import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Play, Clock, CheckCircle2, Award } from 'lucide-react';
import { mockQuizzes } from '../data/mock_mcq';
import { useAppStore } from '../store';

export default function QuizDashboard() {
  const navigate = useNavigate();
  const { quizScores } = useAppStore();

  return (
    <div className="w-full py-8 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-3">
            <Award className="text-brand-indigo" size={36} />
            Quiz Engine
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Test your knowledge under pressure. Take timed multiple-choice assessments designed to simulate technical screenings and OA environments.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockQuizzes.map((quiz, i) => {
          const previousScore = quizScores[quiz.id];
          const hasTaken = !!previousScore;
          const scorePercent = hasTaken ? Math.round((previousScore.score / previousScore.total) * 100) : null;
          
          return (
            <motion.div key={quiz.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card glass animated className="p-6 h-full flex flex-col group border-white/60 dark:border-slate-700/40 hover:border-brand-indigo/40 hover:shadow-xl hover:shadow-brand-indigo/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-indigo/10 to-brand-purple/10 text-brand-indigo dark:text-brand-lavender flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    {quiz.icon}
                  </div>
                  {hasTaken && (
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Last Score</span>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        scorePercent >= 80 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        scorePercent >= 50 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                      }`}>
                        {scorePercent >= 80 && <CheckCircle2 size={12} />}
                        {scorePercent}%
                      </div>
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-heading font-bold mb-1.5 text-slate-900 dark:text-white group-hover:text-brand-indigo transition-colors">
                  {quiz.title}
                </h3>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">
                  {quiz.subject}
                </span>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                  {quiz.description}
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-auto">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-indigo" /> {quiz.timeLimit / 60}m</span>
                    <span className="flex items-center gap-1.5"><Award size={14} className="text-brand-purple" /> {quiz.questions.length} Qs</span>
                  </div>
                  <Button 
                    onClick={() => navigate(`/quiz/${quiz.id}`)} 
                    size="sm" 
                    className="gap-2 shadow-md shadow-brand-indigo/20 group-hover:-translate-y-0.5 transition-transform"
                  >
                    <Play size={14} fill="currentColor" /> {hasTaken ? 'Retake' : 'Start'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
