import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { User, Mail, Award, Clock, MapPin, Briefcase, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50">Profile</h1>
        <Link to="/settings">
          <Button variant="outline" className="gap-2">
            <SettingsIcon size={16} /> Settings
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card animated glass className="p-8 flex flex-col items-center text-center border-white/40">
            <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-indigo/20">
              <span className="text-5xl font-heading font-bold">A</span>
            </div>
            <h2 className="text-2xl font-heading font-bold mb-1">Alex Developer</h2>
            <p className="text-slate-500 mb-4 flex items-center gap-1 justify-center"><Briefcase size={16}/> SDE Intern</p>
            <Badge variant="gradient" className="px-4 py-1 mb-6">Top 5% Learner 🔥</Badge>
            
            <div className="w-full flex flex-col gap-3 text-left">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                <Mail size={16} className="text-brand-indigo" />
                alex@example.com
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
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
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
                { title: '7 Day Streak', desc: 'Practiced consistently for a week', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-500/20' },
                { title: 'SQL Master', desc: 'Completed all advanced SQL queries', icon: Award, color: 'text-brand-cyan', bg: 'bg-brand-cyan/20' },
                { title: 'System Design First Mock', desc: 'Scored above 8.0 in architecture', icon: Server, color: 'text-brand-indigo', bg: 'bg-brand-indigo/20' }
              ].map((achievement, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
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
        </div>
      </div>
    </div>
  );
};
