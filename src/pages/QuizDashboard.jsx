import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Play, Clock, CheckCircle2, Award, Zap, Layers, BarChart } from 'lucide-react';
import { useAppStore } from '../store';
import { generateQuiz } from '../utils/quizGenerator';

export default function QuizDashboard() {
  const navigate = useNavigate();
  const { quizScores, subjectsList, setCurrentActiveQuiz } = useAppStore();

  const [mode, setMode] = useState('mixed'); // mixed, subject, rapid
  const [difficulty, setDifficulty] = useState('all'); // all, easy, medium, hard, expert
  const [subject, setSubject] = useState('all');

  const handleStartDynamicQuiz = () => {
    const newQuiz = generateQuiz({ mode, difficulty, subject });
    if (newQuiz && newQuiz.questions.length > 0) {
      setCurrentActiveQuiz(newQuiz);
      navigate('/quiz/active');
    } else {
      alert("Not enough questions for this combination. Try another mode.");
    }
  };

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
            Configure custom quizzes to test your knowledge under pressure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quiz Configuration Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card glass className="p-8 border-t-4 border-t-brand-indigo">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="text-brand-indigo" /> Configure Quiz
            </h2>
            
            <div className="space-y-6">
              {/* Mode Selection */}
              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 block">Quiz Mode</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['mixed', 'subject', 'rapid'].map(m => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`p-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                        mode === m 
                          ? 'border-brand-indigo bg-brand-indigo/10 text-brand-indigo shadow-md' 
                          : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:border-brand-indigo/50'
                      }`}
                    >
                      {m === 'mixed' ? 'Mixed Topics' : m === 'subject' ? 'Specific Subject' : 'Rapid Fire'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Selection (Only if mode is subject) */}
              <AnimatePresence>
                {mode === 'subject' && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 block">Select Subject</label>
                    <select 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-indigo"
                    >
                      <option value="all">All Subjects</option>
                      {subjectsList.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.title}</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Difficulty Selection */}
              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 block">Difficulty Level</label>
                <div className="flex flex-wrap gap-3">
                  {['all', 'easy', 'medium', 'hard', 'expert'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`px-5 py-2.5 rounded-full border-2 font-semibold text-sm transition-all capitalize ${
                        difficulty === diff 
                          ? 'border-brand-purple bg-brand-purple/10 text-brand-purple shadow-md' 
                          : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:border-brand-purple/50'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button size="lg" onClick={handleStartDynamicQuiz} className="w-full md:w-auto px-10 gap-2 shadow-lg shadow-brand-indigo/20">
                  <Play size={18} fill="currentColor" /> Generate & Start Quiz
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar / Stats */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="p-6 bg-gradient-to-br from-brand-indigo/10 to-brand-purple/10 border-brand-indigo/20 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-brand-indigo dark:text-brand-lavender">
              <BarChart size={24} /> Performance
            </h3>
            <div className="space-y-4 flex-1">
              <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-xl border border-white/50 dark:border-slate-800/50">
                <div className="text-xs font-bold text-slate-500 uppercase">Quizzes Taken</div>
                <div className="text-3xl font-heading font-bold text-slate-900 dark:text-white mt-1">
                  {Object.keys(quizScores).length}
                </div>
              </div>
              <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-xl border border-white/50 dark:border-slate-800/50">
                <div className="text-xs font-bold text-slate-500 uppercase">Average Score</div>
                <div className="text-3xl font-heading font-bold text-slate-900 dark:text-white mt-1">
                  {Object.values(quizScores).length > 0 
                    ? Math.round(Object.values(quizScores).reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0) / Object.values(quizScores).length)
                    : 0}%
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
