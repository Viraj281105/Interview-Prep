import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Flame, Award, BookOpen, Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

export const Dashboard = () => {
  const { 
    completedQuestions, 
    currentStreak, 
    mockInterviews, 
    quizScores,
    activityHeatmap
  } = useAppStore();
  
  const { currentUser } = useAuth();

  // Calculate Mock Avg. Score
  const avgMockScore = mockInterviews.length > 0
    ? (mockInterviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / mockInterviews.length).toFixed(1)
    : '0.0';

  // Calculate total quizzes taken
  const totalQuizzes = Object.keys(quizScores).length;

  // Generate the last 84 days for the heatmap
  const getLast84Days = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };
  
  const heatmapDays = getLast84Days();

  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight mb-2 text-slate-900 dark:text-slate-50">Welcome back, {currentUser?.user_metadata?.full_name?.split(' ')[0] || currentUser?.email?.split('@')[0] || 'Candidate'}!</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Here's an overview of your interview prep progress.</p>
        </div>
        <Link to="/mock">
          <Button variant="gradient" size="lg" className="gap-2">
            <Play size={18} /> Start Mock Interview
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Questions Solved', value: completedQuestions.length.toString(), icon: CheckCircle2, gradient: 'bg-gradient-to-br from-brand-cyan to-blue-500' },
          { label: 'Current Streak', value: `${currentStreak} Days`, icon: Flame, gradient: 'bg-gradient-to-br from-brand-pink to-orange-500' },
          { label: 'Mock Avg. Score', value: `${avgMockScore}/100`, icon: Award, gradient: 'bg-gradient-to-br from-brand-indigo to-brand-purple' },
          { label: 'Quizzes Completed', value: totalQuizzes.toString(), icon: Target, gradient: 'bg-gradient-to-br from-brand-lavender to-brand-pink' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card animated glass className="p-6 flex items-center gap-5 border-white/40">
              <div className={`p-4 rounded-2xl text-white shadow-lg shadow-slate-200/50 dark:shadow-none ${stat.gradient}`}>
                <stat.icon size={26} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-heading font-bold text-slate-900 dark:text-slate-50">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        {/* Activity Heatmap */}
        <div className="lg:col-span-2">
          <Card animated glass className="p-8 h-full border-white/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-heading font-bold text-2xl flex items-center gap-3">
                  <Flame className="text-brand-pink" size={28} /> Activity Streak
                </h3>
                <p className="text-slate-500 mt-1">Keep practicing to maintain your daily streak.</p>
              </div>
              {currentStreak > 0 && <Badge variant="gradient" className="text-base px-4 py-1">{currentStreak} Days 🔥</Badge>}
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3 opacity-90 justify-end">
              {heatmapDays.map((dateStr, i) => {
                const isActive = activityHeatmap.includes(dateStr);
                return (
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    key={i} 
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-md shadow-sm transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-br from-brand-lavender to-brand-pink' 
                        : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                    }`}
                    title={isActive ? `Active on ${dateStr}` : `No activity on ${dateStr}`}
                  />
                );
              })}
            </div>
            <p className="text-xs font-bold text-slate-400 mt-6 text-right uppercase tracking-wider">Last 12 Weeks</p>
          </Card>
        </div>

        {/* Up Next */}
        <Card animated glass className="p-8 border-white/40">
          <h2 className="text-2xl font-heading font-bold mb-6">Recommended for You</h2>
          <div className="space-y-4">
            {[
              { title: 'Dynamic Programming', type: 'Topic', icon: BookOpen, tag: 'DSA', link: '/subjects/dsa-dp' },
              { title: 'Amazon OA Mock', type: 'Mock', icon: Clock, tag: 'Mock', link: '/mock' },
              { title: 'SQL Joins Practice', type: 'Quiz', icon: Target, tag: 'SQL', link: '/quiz' },
            ].map((item, i) => (
              <Link to={item.link} key={i}>
                <div className="group flex items-center justify-between p-4 mb-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:text-brand-indigo transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[15px]">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] py-0">{item.tag}</Badge>
                        <span className="text-xs text-slate-500">{item.type}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="group-hover:bg-brand-indigo/10 group-hover:text-brand-indigo rounded-full">
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/subjects" className="block mt-2">
            <Button variant="outline" className="w-full rounded-xl">Browse All Subjects</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
