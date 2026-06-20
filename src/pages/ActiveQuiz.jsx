import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Clock, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import { mockQuizzes } from '../data/mock_mcq';
import { useAppStore } from '../store';
import { QuizResults } from '../components/quiz/QuizResults';

export default function ActiveQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { saveQuizScore } = useAppStore();

  const quiz = mockQuizzes.find(q => q.id === quizId);

  // States
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit || 0);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (!quiz) return;
    
    if (hasStarted && !isFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [hasStarted, isFinished, timeLeft, quiz]);

  if (!quiz) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz not found.</h2>
        <Button onClick={() => navigate('/quiz')} variant="outline">Back to Dashboard</Button>
      </div>
    );
  }

  const handleSelectOption = (optIndex) => {
    setUserAnswers(prev => ({ ...prev, [quiz.questions[currentIndex].id]: optIndex }));
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    setIsFinished(true);
    clearInterval(timerRef.current);
    
    // Calculate Score
    let score = 0;
    quiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        score++;
      }
    });

    // Save to global state
    saveQuizScore(quiz.id, {
      score,
      total: quiz.questions.length,
      timeSpent: quiz.timeLimit - timeLeft
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeLeft > 0 && timeLeft <= 60;
  const currentQuestion = quiz.questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;

  if (isFinished) {
    let score = 0;
    quiz.questions.forEach(q => { if (userAnswers[q.id] === q.correctOptionIndex) score++; });
    return (
      <QuizResults 
        quiz={quiz} 
        score={score} 
        total={quiz.questions.length} 
        userAnswers={userAnswers} 
        timeSpent={quiz.timeLimit - timeLeft} 
      />
    );
  }

  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto w-full py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="p-8 md:p-12 text-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-indigo/10 text-brand-indigo flex items-center justify-center text-4xl mb-6 shadow-inner">
            {quiz.icon}
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">{quiz.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{quiz.description}</p>
          
          <div className="flex items-center justify-center gap-8 mb-10 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Questions</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{quiz.questions.length}</span>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Time Limit</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{quiz.timeLimit / 60} min</span>
            </div>
          </div>

          <Button size="lg" onClick={() => setHasStarted(true)} className="w-full sm:w-auto px-12 py-6 text-lg gap-3 shadow-lg shadow-brand-indigo/20 hover:-translate-y-1 transition-transform">
            <Play size={20} fill="currentColor" /> Start Assessment
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full py-6 flex flex-col h-[calc(100vh-100px)]">
      {/* Top Bar (Sticky) */}
      <div className="sticky top-0 z-20 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md pb-4 mb-6 border-b border-slate-200/50 dark:border-slate-800/50 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{quiz.title}</h2>
            <div className="text-sm text-slate-500 font-medium">Question {currentIndex + 1} of {quiz.questions.length}</div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg shadow-sm ${
            isTimeCritical 
              ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 animate-pulse'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}>
            <Clock size={18} className={isTimeCritical ? 'text-rose-500' : 'text-slate-400'} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 h-2 w-full">
          {quiz.questions.map((q, i) => (
            <div 
              key={q.id} 
              className={`flex-1 rounded-full transition-colors duration-300 ${
                i === currentIndex ? 'bg-brand-indigo dark:bg-brand-lavender shadow-sm shadow-brand-indigo/30' :
                userAnswers[q.id] !== undefined ? 'bg-emerald-400/60 dark:bg-emerald-500/50' :
                'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Card Area */}
      <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar px-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl leading-relaxed font-semibold text-slate-900 dark:text-slate-50">
              {currentQuestion.text}
            </h3>
            
            {currentQuestion.code && (
              <div className="p-4 bg-slate-900 rounded-xl text-sm font-mono text-blue-300 overflow-x-auto shadow-inner border border-slate-800">
                {currentQuestion.code}
              </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                      isSelected
                        ? 'border-brand-indigo bg-brand-indigo/5 shadow-md shadow-brand-indigo/10 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-brand-indigo/40 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                      isSelected ? 'bg-brand-indigo text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-brand-indigo/10 group-hover:text-brand-indigo'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-medium text-[15px] leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 p-4 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ArrowLeft size={16} /> Previous
          </Button>

          {currentIndex < quiz.questions.length - 1 ? (
            <Button onClick={handleNext} className="gap-2 px-8 shadow-md">
              Next <ArrowRight size={16} />
            </Button>
          ) : (
            <Button 
              onClick={handleFinishQuiz} 
              className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 text-white"
            >
              <CheckCircle2 size={18} /> Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
