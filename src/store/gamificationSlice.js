// Gamification slice — XP, streaks, heatmap, achievements
export const createGamificationSlice = (set) => ({
  xp: 0,
  currentStreak: 0,
  lastActiveDate: null,
  activityHeatmap: [], // array of "YYYY-MM-DD" strings
  level: 1,
  achievements: [],

  logActivity: (xpGained = 0) => set((state) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newXp = state.xp + xpGained;
    
    // Calculate level (every 500 XP = 1 level)
    const newLevel = Math.max(1, Math.floor(newXp / 500) + 1);
    
    let newStreak = state.currentStreak;
    let newHeatmap = [...state.activityHeatmap];

    if (!state.lastActiveDate) {
      newStreak = 1;
      if (!newHeatmap.includes(todayStr)) newHeatmap.push(todayStr);
    } else {
      const lastDate = new Date(state.lastActiveDate);
      const today = new Date();
      lastDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1;
        if (!newHeatmap.includes(todayStr)) newHeatmap.push(todayStr);
      } else if (diffDays > 1) {
        newStreak = 1;
        if (!newHeatmap.includes(todayStr)) newHeatmap.push(todayStr);
      }
      // If diffDays === 0, they already logged activity today
    }

    // Check for new achievements
    const newAchievements = [...state.achievements];
    const achievementChecks = [
      { key: 'first-question', condition: newXp >= 10, label: 'First Steps', desc: 'Completed your first question' },
      { key: 'streak-3', condition: newStreak >= 3, label: 'On Fire', desc: '3-day streak' },
      { key: 'streak-7', condition: newStreak >= 7, label: 'Unstoppable', desc: '7-day streak' },
      { key: 'streak-30', condition: newStreak >= 30, label: 'Dedicated', desc: '30-day streak' },
      { key: 'xp-100', condition: newXp >= 100, label: 'Rising Star', desc: 'Earned 100 XP' },
      { key: 'xp-500', condition: newXp >= 500, label: 'Scholar', desc: 'Earned 500 XP' },
      { key: 'xp-1000', condition: newXp >= 1000, label: 'Expert', desc: 'Earned 1000 XP' },
      { key: 'xp-5000', condition: newXp >= 5000, label: 'Master', desc: 'Earned 5000 XP' },
    ];

    achievementChecks.forEach(({ key, condition, label, desc }) => {
      if (condition && !newAchievements.find(a => a.key === key)) {
        newAchievements.push({ key, label, desc, unlockedAt: new Date().toISOString() });
      }
    });

    return {
      xp: newXp,
      level: newLevel,
      currentStreak: newStreak,
      lastActiveDate: new Date().toISOString(),
      activityHeatmap: newHeatmap,
      achievements: newAchievements,
    };
  }),
});
