import React from 'react';
import { Card } from '../components/ui/Card';
import { Trophy, Medal, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';

const initialMockLeaderboard = [
  { id: '1', name: 'Alex Johnson', score: 14500, streak: 45, tier: 'Diamond' },
  { id: '2', name: 'Sarah Miller', score: 13200, streak: 30, tier: 'Platinum' },
  { id: '3', name: 'David Chen', score: 12800, streak: 28, tier: 'Platinum' },
  { id: '4', name: 'Emma Watson', score: 11500, streak: 15, tier: 'Gold' },
  { id: '5', name: 'James Smith', score: 9200, streak: 12, tier: 'Silver' },
  { id: '6', name: 'Maria Garcia', score: 8500, streak: 5, tier: 'Silver' },
];

export const Leaderboard = () => {
  const { xp, currentStreak, user } = useAppStore();

  const getTier = (score) => {
    if (score > 14000) return 'Diamond';
    if (score > 12000) return 'Platinum';
    if (score > 10000) return 'Gold';
    if (score > 8000) return 'Silver';
    return 'Bronze';
  };

  // Combine mock data with real user data
  const combinedLeaderboard = [
    ...initialMockLeaderboard,
    { 
      id: 'me', 
      name: user?.name || 'You', 
      score: xp, 
      streak: currentStreak, 
      tier: getTier(xp), 
      isCurrent: true 
    }
  ];

  // Sort and assign ranks
  const sortedLeaderboard = combinedLeaderboard
    .sort((a, b) => b.score - a.score)
    .map((candidate, index) => ({
      ...candidate,
      rank: index + 1
    }));

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block p-4 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full mb-4 shadow-sm shadow-yellow-500/20">
          <Trophy size={48} />
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight mb-4">Global Leaderboard</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Compete with thousands of other candidates. Earn points by completing flashcards, mock interviews, and maintaining daily streaks.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-5 md:col-span-5">Candidate</div>
          <div className="col-span-3 md:col-span-3 text-center">Streak</div>
          <div className="col-span-2 md:col-span-3 text-right">Score</div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {sortedLeaderboard.map((u, i) => (
            <motion.div 
              key={u.id} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-12 gap-4 p-4 md:p-6 items-center transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${u.isCurrent ? 'bg-blue-50/50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="col-span-2 md:col-span-1 flex justify-center">
                {u.rank === 1 ? <Medal size={28} className="text-yellow-500 drop-shadow-sm" /> :
                 u.rank === 2 ? <Medal size={28} className="text-slate-400 drop-shadow-sm" /> :
                 u.rank === 3 ? <Medal size={28} className="text-amber-600 drop-shadow-sm" /> :
                 <span className="font-bold text-lg text-slate-500">{u.rank}</span>}
              </div>
              
              <div className="col-span-5 md:col-span-5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm ${u.isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {u.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    {u.name} {u.isCurrent && <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">You</span>}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{u.tier}</div>
                </div>
              </div>

              <div className="col-span-3 md:col-span-3 flex justify-center items-center gap-1.5 font-bold text-orange-500">
                <Flame size={18} className={u.streak > 10 ? 'animate-pulse' : ''} /> {u.streak} <span className="hidden sm:inline text-slate-500 font-medium text-xs uppercase tracking-wide">Days</span>
              </div>

              <div className="col-span-2 md:col-span-3 text-right font-black text-lg text-blue-600 dark:text-blue-400">
                {u.score.toLocaleString()} XP
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
