import React, { useEffect, useState, useRef } from 'react';
import { useAppStore } from '../../store';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GlobalGamification = () => {
  const [xpToasts, setXpToasts] = useState([]);
  const [levelUpModal, setLevelUpModal] = useState(null);
  const [achievementToast, setAchievementToast] = useState(null);
  
  const lastState = useRef(null);

  useEffect(() => {
    const unsubscribe = useAppStore.subscribe((state) => {
      const prev = lastState.current;
      lastState.current = state;
      
      if (!prev) return;

      // 1. XP Gain
      if (state.xp > prev.xp) {
        const diff = state.xp - prev.xp;
        const id = Date.now();
        setXpToasts(prevToasts => [...prevToasts, { id, amount: diff }]);
        
        // Remove toast after 2.5s
        setTimeout(() => {
          setXpToasts(current => current.filter(t => t.id !== id));
        }, 2500);
      }

      // 2. Level Up
      if (state.level > prev.level) {
        setLevelUpModal({ oldLevel: prev.level, newLevel: state.level });
        fireConfetti();
      }

      // 3. New Achievement
      if (state.achievements.length > prev.achievements.length) {
        // Assume the latest is pushed at the end
        const newAch = state.achievements[state.achievements.length - 1];
        setAchievementToast(newAch);
        setTimeout(() => setAchievementToast(null), 4000);
      }
    });

    return () => unsubscribe();
  }, []);

  const fireConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <>
      {/* XP Floating Toasts */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {xpToasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="bg-brand-indigo/10 border border-brand-indigo/20 backdrop-blur-md px-4 py-2 rounded-full text-brand-indigo dark:text-brand-lavender font-heading font-bold shadow-lg flex items-center gap-2"
            >
              <Star size={18} className="fill-brand-indigo" />
              +{toast.amount} XP
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Achievement Toast */}
      <AnimatePresence>
        {achievementToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 mt-4 z-[100] bg-white dark:bg-slate-900 border border-brand-pink/30 shadow-2xl shadow-brand-pink/20 rounded-2xl p-4 flex items-center gap-4 w-[90%] max-w-md pointer-events-none"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center text-white shrink-0 shadow-inner">
              <Award size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-pink uppercase tracking-wider mb-0.5">Achievement Unlocked!</p>
              <p className="font-heading font-bold text-slate-900 dark:text-white leading-tight">{achievementToast.label}</p>
              <p className="text-sm text-slate-500">{achievementToast.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Modal */}
      <AnimatePresence>
        {levelUpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
            >
              {/* Radial glow background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-indigo/10 blur-3xl rounded-full" />
              
              <button 
                onClick={() => setLevelUpModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-1.5 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full animate-pulse blur-md opacity-50" />
                  <div className="relative w-full h-full bg-gradient-primary rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white dark:border-slate-900">
                    <Trophy size={40} className="drop-shadow-md" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">Level Up!</h2>
                <p className="text-slate-500 mb-6 text-lg">
                  You reached <span className="font-bold text-brand-indigo">Level {levelUpModal.newLevel}</span>. Keep up the great work!
                </p>
                
                <button 
                  onClick={() => setLevelUpModal(null)}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
                >
                  Continue Learning
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
