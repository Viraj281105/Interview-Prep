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
import { generateRecommendations, RECO_TYPES } from '../services/recommendationEngine';
import { aiService } from '../services/aiService';
import { getUserHistory } from '../services/historyService';
import { getUserProfile } from '../services/database';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Skeleton, CardSkeleton } from '../components/ui/Skeleton';

export const Dashboard = () => {
  const { 
    completedQuestions, 
    currentStreak, 
    mockInterviews, 
    quizScores,
    activityHeatmap
  } = useAppStore();
  
  const { currentUser } = useAuth();
  
  const [recommendations, setRecommendations] = React.useState([]);
  const [aiInsight, setAiInsight] = React.useState('');

  // Calculate Mock Avg. Score
  const avgMockScore = mockInterviews.length > 0
    ? (mockInterviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / mockInterviews.length).toFixed(1)
    : '0.0';

  React.useEffect(() => {
    if (currentUser?.id) {
      generateRecommendations(currentUser.id, completedQuestions).then(recos => {
        setRecommendations(recos);
      });
      
      const fetchInsights = async () => {
        try {
          const history = await getUserHistory(currentUser.id);
          const profile = await getUserProfile(currentUser.id);
          const insight = await aiService.generateInsights(history, profile, avgMockScore);
          setAiInsight(insight);
        } catch (e) {
          console.error(e);
        }
      };
      fetchInsights();
    }
  }, [currentUser, completedQuestions, avgMockScore]);

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

  // Prepare Chart Data
  // 1. Mock Interview Trend
  const mockChartData = mockInterviews.map((m, index) => ({
    name: `Mock ${index + 1}`,
    score: m.score,
    type: m.type,
    date: new Date(m.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }));

  // 2. Quiz Topic Mastery
  const getTopicMasteryData = () => {
    const topics = {};
    Object.keys(quizScores).forEach(quizId => {
      const topicId = quizId.split('-')[0]; // e.g. "db" from "db-sql" or "core" from "core-os"
      const score = quizScores[quizId];
      if (!topics[topicId]) topics[topicId] = { totalScore: 0, count: 0 };
      topics[topicId].totalScore += score;
      topics[topicId].count += 1;
    });

    const topicNames = {
      'dsa': 'Algorithms',
      'db': 'Databases',
      'core': 'Systems',
      'web': 'Frontend',
      'behavioral': 'Behavioral'
    };

    return Object.keys(topics).map(t => ({
      subject: topicNames[t] || t.toUpperCase(),
      mastery: Math.round(topics[t].totalScore / topics[t].count),
      fullMark: 100
    }));
  };

  const radarData = getTopicMasteryData();

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

      {/* AI Coach Insights */}
      {!aiInsight ? (
        <Card animated glass className="p-6 md:p-8 border-brand-indigo/30 bg-gradient-to-r from-brand-indigo/5 to-brand-purple/5 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6">
          <Skeleton variant="circular" className="w-16 h-16 shrink-0" />
          <div className="w-full">
            <Skeleton variant="text" className="w-48 h-6 mb-3" />
            <Skeleton variant="text" className="w-full mb-2" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card animated glass className="p-6 md:p-8 border-brand-indigo/30 bg-gradient-to-r from-brand-indigo/5 to-brand-purple/5 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 shrink-0 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center border border-brand-indigo/20 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3v5.5a14 14 0 0 0 5 9.5 14 14 0 0 0 5-9.5Z"/></svg>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2 text-brand-indigo dark:text-brand-lavender">AI Coach Insights</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">{aiInsight}</p>
            </div>
          </Card>
        </motion.div>
      )}

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
            {recommendations.length > 0 ? recommendations.map((item, i) => (
              <Link to={item.link} key={i}>
                <div className="group flex items-center justify-between p-4 mb-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:text-brand-indigo transition-colors flex items-center justify-center text-xl w-10 h-10">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[15px]">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] py-0">{item.type.replace('_', ' ')}</Badge>
                        <span className="text-xs text-slate-500">{item.description}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="group-hover:bg-brand-indigo/10 group-hover:text-brand-indigo rounded-full">
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </Link>
            )) : (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-4 p-4 mb-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                    <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
                    <div className="flex-1">
                      <Skeleton variant="text" className="w-1/2 h-4 mb-2" />
                      <Skeleton variant="text" className="w-3/4 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link to="/subjects" className="block mt-2">
            <Button variant="outline" className="w-full rounded-xl">Browse All Subjects</Button>
          </Link>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Mock Interview Progress */}
        <Card animated glass className="p-8 border-white/40">
          <h2 className="text-2xl font-heading font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="text-brand-indigo" /> Mock Performance
          </h2>
          <div className="h-64 w-full">
            {mockChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Clock size={32} className="mb-2 opacity-50" />
                <p>Complete your first mock interview to see trends.</p>
              </div>
            )}
          </div>
        </Card>

        {/* Topic Mastery Radar */}
        <Card animated glass className="p-8 border-white/40">
          <h2 className="text-2xl font-heading font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="text-brand-pink" /> Topic Mastery
          </h2>
          <div className="h-64 w-full">
            {radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="mastery" stroke="#ec4899" fill="#ec4899" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <BookOpen size={32} className="mb-2 opacity-50" />
                <p>Take some quizzes to map your knowledge.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
