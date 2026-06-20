import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { User, Mail, Award, Clock, MapPin, Briefcase, Settings as SettingsIcon, BookText, BarChart3, Flame, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { user, userNotes, completedQuestions, mockInterviews, xp, currentStreak } = useAppStore();

  const tabs = [
    { id: 'Overview', icon: User },
    { id: 'Notebook', icon: BookText },
    { id: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50">Profile</h1>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-slate-700 text-brand-indigo shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon size={16} /> <span className="hidden sm:inline">{tab.id}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Always visible */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card animated glass className="p-8 flex flex-col items-center text-center border-white/40">
            <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-indigo/20">
              <span className="text-5xl font-heading font-bold">{user?.name ? user.name.charAt(0) : 'A'}</span>
            </div>
            <h2 className="text-2xl font-heading font-bold mb-1">{user?.name || 'Alex Developer'}</h2>
            <p className="text-slate-500 mb-4 flex items-center gap-1 justify-center"><Briefcase size={16}/> SDE Candidate</p>
            <Badge variant="gradient" className="px-4 py-1 mb-6">{currentStreak > 0 ? `${currentStreak} Day Streak 🔥` : 'Top 5% Learner'}</Badge>
            
            <div className="w-full flex flex-col gap-3 text-left mb-6">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                <Mail size={16} className="text-brand-indigo" />
                {user?.name ? `${user.name.split(' ')[0].toLowerCase()}@example.com` : 'alex@example.com'}
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                <MapPin size={16} className="text-brand-pink" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                <Clock size={16} className="text-brand-cyan" />
                Joined March 2026
              </div>
            </div>

            <Link to="/settings" className="w-full">
              <Button variant="outline" className="w-full gap-2 justify-center">
                <SettingsIcon size={16} /> Edit Profile
              </Button>
            </Link>
          </Card>
        </div>

        {/* Right Content Area - Tabbed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {activeTab === 'Overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <Card glass className="p-8 border-white/40">
                <h3 className="text-xl font-heading font-bold mb-6">Career Goals</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-500 mb-1">Target Role</p>
                    <p className="font-semibold">Software Engineer II</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-500 mb-1">Target Companies</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">Google</Badge>
                      <Badge variant="secondary">Stripe</Badge>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-500 mb-1">Primary Stack</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-500 mb-1">Interview Timeline</p>
                    <p className="font-semibold">2-3 Months</p>
                  </div>
                </div>
              </Card>

              <Card glass className="p-8 border-white/40">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-heading font-bold">Recent Achievements</h3>
                  <Button variant="ghost" size="sm" className="text-brand-indigo">View All</Button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: `${currentStreak || 7} Day Streak`, desc: 'Practiced consistently for a week', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20' },
                    { title: `${xp.toLocaleString()} XP Milestone`, desc: 'Reached a new high score', icon: Award, color: 'text-brand-cyan', bg: 'bg-brand-cyan/20' },
                    { title: 'System Design First Mock', desc: 'Completed architecture round', icon: Server, color: 'text-brand-indigo', bg: 'bg-brand-indigo/20' }
                  ].map((achievement, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.bg} ${achievement.color}`}>
                        <achievement.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[15px]">{achievement.title}</h4>
                        <p className="text-sm text-slate-500">{achievement.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'Notebook' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card glass className="p-8 border-white/40">
                <h3 className="text-2xl font-heading font-bold mb-2">My Notebook</h3>
                <p className="text-slate-500 mb-8">All your saved notes across topics.</p>
                
                {Object.keys(userNotes).length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <BookText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">Your notebook is empty</h4>
                    <p className="text-slate-500 mt-1 max-w-sm mx-auto">Start taking notes in the learning modules and they will appear here.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(userNotes).map(([topicId, note], i) => (
                      <div key={topicId} className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border border-yellow-200 dark:border-yellow-900/30 shadow-sm relative group">
                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/50 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-full">
                            <SettingsIcon size={14} />
                          </Button>
                        </div>
                        <Badge variant="secondary" className="mb-3 capitalize bg-white/80 dark:bg-slate-900/80">{topicId.replace('-', ' ')}</Badge>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">"{note}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {activeTab === 'Analytics' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <Card glass className="p-8 border-white/40">
                <h3 className="text-2xl font-heading font-bold mb-8">Performance Analytics</h3>
                
                <div className="mb-10">
                  <h4 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">Skill Distribution</h4>
                  <div className="space-y-4">
                    {[
                      { skill: 'Data Structures & Algorithms', percentage: 75, color: 'bg-brand-indigo' },
                      { skill: 'System Design', percentage: 40, color: 'bg-brand-cyan' },
                      { skill: 'Behavioral / HR', percentage: 90, color: 'bg-brand-pink' },
                      { skill: 'React / Frontend', percentage: 65, color: 'bg-brand-lavender' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1 font-medium">
                          <span>{item.skill}</span>
                          <span className="text-slate-500">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full rounded-full ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 text-center">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-2">Total Practice</p>
                    <p className="text-4xl font-black text-slate-900 dark:text-white">
                      {(mockInterviews.length * 0.75).toFixed(1)} <span className="text-xl text-slate-500">hrs</span>
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 text-center">
                    <p className="text-sm text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider mb-2">Completion</p>
                    <p className="text-4xl font-black text-slate-900 dark:text-white">
                      {Math.min(100, Math.round((completedQuestions.length / 150) * 100))}%
                    </p>
                  </div>
                </div>

              </Card>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};
