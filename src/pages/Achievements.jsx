import React from 'react';
import { Card } from '../components/ui/Card';
import { useAppStore } from '../store';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star, Award, Lock, Zap } from 'lucide-react';

export const Achievements = () => {
  const { achievements, xp, currentStreak, level } = useAppStore();

  const allAchievements = [
    { key: 'first-question', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30', label: 'First Steps', desc: 'Completed your first question', progress: Math.min(100, (xp / 10) * 100) },
    { key: 'streak-3', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', label: 'On Fire', desc: '3-day streak', progress: Math.min(100, (currentStreak / 3) * 100) },
    { key: 'streak-7', icon: Flame, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', label: 'Unstoppable', desc: '7-day streak', progress: Math.min(100, (currentStreak / 7) * 100) },
    { key: 'streak-30', icon: Flame, color: 'text-brand-pink', bg: 'bg-pink-100 dark:bg-pink-900/30', label: 'Dedicated', desc: '30-day streak', progress: Math.min(100, (currentStreak / 30) * 100) },
    { key: 'xp-100', icon: Star, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', label: 'Rising Star', desc: 'Earned 100 XP', progress: Math.min(100, (xp / 100) * 100) },
    { key: 'xp-500', icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30', label: 'Scholar', desc: 'Earned 500 XP', progress: Math.min(100, (xp / 500) * 100) },
    { key: 'xp-1000', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', label: 'Expert', desc: 'Earned 1000 XP', progress: Math.min(100, (xp / 1000) * 100) },
    { key: 'xp-5000', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', label: 'Master', desc: 'Earned 5000 XP', progress: Math.min(100, (xp / 5000) * 100) },
  ];

  const unlockedKeys = achievements.map(a => a.key);

  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">Achievements</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Track your milestones and show off your hard work.</p>
        </div>
        <Card glass className="px-6 py-4 flex gap-6 items-center border-brand-indigo/20">
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">Total Unlocked</p>
            <p className="text-2xl font-bold font-heading text-brand-indigo">{unlockedKeys.length} <span className="text-slate-400 text-lg">/ {allAchievements.length}</span></p>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">Current Level</p>
            <p className="text-2xl font-bold font-heading text-brand-pink">{level}</p>
          </div>
        </Card>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {allAchievements.map((ach, i) => {
          const isUnlocked = unlockedKeys.includes(ach.key);
          return (
            <motion.div
              key={ach.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <Card glass className={`h-full p-6 flex flex-col items-center text-center transition-all duration-300 border ${
                isUnlocked 
                  ? 'border-white/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-brand-indigo/10' 
                  : 'opacity-70 grayscale-[0.8] border-transparent hover:grayscale-0'
              }`}>
                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${isUnlocked ? ach.bg : 'bg-slate-100 dark:bg-slate-800'} relative`}>
                  {isUnlocked ? (
                    <ach.icon size={36} className={`${ach.color} drop-shadow-md`} />
                  ) : (
                    <Lock size={32} className="text-slate-400" />
                  )}
                  {/* Subtle glow if unlocked */}
                  {isUnlocked && <div className={`absolute inset-0 blur-xl opacity-40 rounded-2xl ${ach.bg}`} />}
                </div>

                <h3 className={`font-heading font-bold text-lg mb-1 ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                  {ach.label}
                </h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">{ach.desc}</p>

                {/* Progress bar */}
                <div className="w-full mt-auto">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium">{isUnlocked ? 'Unlocked' : 'Progress'}</span>
                    <span className={`font-bold ${isUnlocked ? 'text-brand-indigo' : 'text-slate-400'}`}>
                      {Math.floor(ach.progress)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${ach.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${isUnlocked ? 'bg-gradient-to-r from-brand-indigo to-brand-pink' : 'bg-slate-300 dark:bg-slate-600'}`}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
