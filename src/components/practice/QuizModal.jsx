import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Clock, X, Check, Trophy, AlertCircle } from 'lucide-react';

export const QuizModal = ({ questions, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Take only up to 10 questions for a quick quiz
  const quizQuestions = questions.slice(0, 10);

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer && !isFinished) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !showAnswer && !isFinished) {
      setShowAnswer(true); // Auto reveal if time runs out
    }
  }, [timeLeft, showAnswer, isFinished]);

  const handleEvaluate = (correct) => {
    if (correct) setScore(score + 1);
    
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setTimeLeft(60);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const pass = score >= quizQuestions.length / 2;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-md p-8 text-center flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${pass ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}`}>
              <Trophy size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              You scored {score} out of {quizQuestions.length}. {pass ? "Great job!" : "Keep practicing!"}
            </p>
            <Button className="w-full" onClick={onClose}>Close Quiz</Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <Card className="p-0 overflow-hidden flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-100 dark:bg-slate-800 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
            <div className="font-bold text-slate-700 dark:text-slate-200">
              Rapid Quiz ({currentIndex + 1}/{quizQuestions.length})
            </div>
            <div className={`flex items-center gap-2 font-mono font-bold px-3 py-1 rounded-full ${timeLeft < 10 ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'}`}>
              <Clock size={16} /> 00:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                {currentQ.difficulty}
              </span>
              <h3 className="text-xl md:text-2xl font-bold leading-snug">{currentQ.question}</h3>
            </div>

            <AnimatePresence>
              {showAnswer ? (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Expected Answer:</h4>
                  <p className="text-lg text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">{currentQ.answer}</p>
                </motion.div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                  <AlertCircle size={48} className="mb-4 opacity-20" />
                  <p>Think of your answer, then reveal it to self-evaluate.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between gap-4">
            {!showAnswer ? (
              <>
                <Button variant="ghost" onClick={onClose} className="text-slate-500">Cancel</Button>
                <Button onClick={() => setShowAnswer(true)} className="flex-1">Reveal Answer</Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-900/20" onClick={() => handleEvaluate(false)}>
                  <X size={18} className="mr-2" /> Incorrect
                </Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleEvaluate(true)}>
                  <Check size={18} className="mr-2" /> Correct
                </Button>
              </>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
