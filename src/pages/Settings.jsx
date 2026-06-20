import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Monitor, Bell, Lock, LogOut } from 'lucide-react';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account preferences and app settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <Button variant="glass" className="justify-start gap-3 rounded-xl bg-white/60 shadow-sm shadow-brand-indigo/5 border-brand-indigo/10 text-brand-indigo">
            <Monitor size={18} /> Preferences
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell size={18} /> Notifications
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <Lock size={18} /> Privacy & Security
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          <Card glass className="p-8 border-white/40">
            <h2 className="text-xl font-heading font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Appearance</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[15px]">Theme</p>
                <p className="text-sm text-slate-500">Toggle between light and dark mode</p>
              </div>
              
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800">
                <button 
                  onClick={() => theme !== 'light' && toggleTheme()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${theme === 'light' ? 'bg-white text-brand-indigo shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Sun size={16} /> Light
                </button>
                <button 
                  onClick={() => theme !== 'dark' && toggleTheme()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${theme === 'dark' ? 'bg-slate-800 text-brand-lavender shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Moon size={16} /> Dark
                </button>
              </div>
            </div>
          </Card>

          <Card glass className="p-8 border-white/40">
            <h2 className="text-xl font-heading font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Account</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[15px]">Email Address</p>
                  <p className="text-sm text-slate-500">alex@example.com</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[15px]">Password</p>
                  <p className="text-sm text-slate-500">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10">
            <h2 className="text-xl font-heading font-bold mb-2 text-red-600 dark:text-red-400">Danger Zone</h2>
            <p className="text-sm text-slate-500 mb-6">Irreversible and destructive actions.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                <LogOut size={16} /> Sign Out
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
