import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Flashcard } from '../components/practice/Flashcard';
import { QuizModal } from '../components/practice/QuizModal';
import { ArrowLeft, Layers, Play, CheckCircle2 } from 'lucide-react';
import { allDataModules } from '../data/index';

export const SubjectDetail = () => {
  const { id } = useParams();
  
  // Filter modules based on subject ID (e.g. 'dsa' matches 'dsa-arrays', 'dsa-dp')
  // We use a fallback logic in case the ID structure is slightly different
  const modules = useMemo(() => {
    const directMatches = allDataModules.filter(m => m.id.toLowerCase().startsWith(id.toLowerCase()));
    if (directMatches.length > 0) return directMatches;
    
    // Fallback just grab some random modules if nothing matches (for MVP testing)
    return allDataModules.slice(0, 6);
  }, [id]);

  // Practice State
  const [activeModule, setActiveModule] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeQuizModule, setActiveQuizModule] = useState(null);

  const startQuiz = (mod) => {
    setActiveQuizModule(mod);
    setShowQuiz(true);
  };

  const startPractice = (mod) => {
    setActiveModule(mod);
    setActiveQuestionIndex(0);
    setShowCompletion(false);
    setScore({ correct: 0, total: mod.questions?.length || 0 });
  };

  const handleNextFlashcard = (success) => {
    if (success) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }

    if (activeQuestionIndex < activeModule.questions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      setShowCompletion(true);
    }
  };

  if (activeModule && !showCompletion) {
    const currentQuestion = activeModule.questions[activeQuestionIndex];
    return (
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 py-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setActiveModule(null)}>
            <ArrowLeft size={18} className="mr-2" /> End Session
          </Button>
          <div className="text-sm font-medium text-slate-500 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
            Question {activeQuestionIndex + 1} of {activeModule.questions.length}
          </div>
        </div>
        
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4 shadow-inner">
          <motion.div 
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((activeQuestionIndex) / activeModule.questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Flashcard question={currentQuestion} onNext={handleNextFlashcard} />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="mb-8">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={48} />
          </div>
        </motion.div>
        <h2 className="text-4xl font-bold mb-4">Module Completed!</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          You scored <strong className="text-slate-900 dark:text-white">{score.correct}</strong> out of {score.total}.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => startPractice(activeModule)} variant="outline">Practice Again</Button>
          <Button onClick={() => { setActiveModule(null); setShowCompletion(false); }}>Back to Modules</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link to="/subjects">
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">{id.replace('-', ' ')} Modules</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Select a topic to begin your interactive flashcard session.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, i) => (
          <motion.div key={mod.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 h-full flex flex-col hover:border-blue-500/50 hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {mod.icon || '📚'}
                  </div>
                  <h3 className="text-xl font-bold">{mod.title}</h3>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{mod.summary}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {mod.concepts?.slice(0, 4).map((concept, idx) => (
                  <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium">
                    {concept}
                  </span>
                ))}
                {mod.concepts?.length > 4 && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs rounded-md">+{mod.concepts.length - 4} more</span>}
              </div>

              <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <Layers size={16} /> {mod.questions?.length || 0} Qs
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => startQuiz(mod)} size="sm" className="hidden sm:flex">
                    Quick Quiz
                  </Button>
                  <Button onClick={() => startPractice(mod)} size="sm" className="gap-2 shadow-blue-500/20">
                    <Play size={14} fill="currentColor" /> Flashcards
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {showQuiz && activeQuizModule && (
        <QuizModal questions={activeQuizModule.questions} onClose={() => setShowQuiz(false)} />
      )}
    </div>
  );
};
