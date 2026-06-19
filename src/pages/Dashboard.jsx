import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, Flame, Award, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h1>
          <p className="text-slate-600 dark:text-slate-400">Here's an overview of your interview prep progress.</p>
        </div>
        <Button>Resume Practice</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Questions Solved', value: '145', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
          { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20' },
          { label: 'Mock Avg. Score', value: '7.8/10', icon: Award, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
          { label: 'Topics Completed', value: '45%', icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/20' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        {/* Recent Activity / Progress */}
        <Card className="p-6 col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Subject Progress</h2>
          <div className="space-y-6">
            {[
              { name: 'Data Structures & Algorithms', progress: 65, color: 'bg-blue-500' },
              { name: 'Database Management', progress: 80, color: 'bg-emerald-500' },
              { name: 'System Design', progress: 30, color: 'bg-indigo-500' },
              { name: 'HR & Leadership', progress: 90, color: 'bg-rose-500' },
            ].map((sub, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{sub.name}</span>
                  <span className="text-slate-500">{sub.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${sub.progress}%` }} 
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${sub.color} rounded-full`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Up Next */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Recommended for You</h2>
          <div className="space-y-4">
            {[
              { title: 'Dynamic Programming basics', type: 'Topic', icon: BookOpen },
              { title: 'Amazon OA Mock', type: 'Mock', icon: Clock },
              { title: 'SQL Joins Practice', type: 'Quiz', icon: Target },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-slate-400" />
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Start</Button>
              </div>
            ))}
          </div>
          <Link to="/subjects">
            <Button variant="outline" className="w-full mt-6">Browse All Subjects</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
