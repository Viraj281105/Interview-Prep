import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Monitor, Bell, Lock, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../services/database';
import { supabase } from '../services/supabase';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Account');
  const [settings, setSettings] = useState({
    emailReminders: true,
    dailyChallenges: true,
    weeklyReports: false,
    profileVisibility: 'public',
    dataCollection: true
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      getUserProfile(currentUser.id).then(profile => {
        if (profile?.settings) {
          setSettings(prev => ({ ...prev, ...profile.settings }));
        }
      });
    }
  }, [currentUser]);

  const handleSettingChange = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    setIsSaving(true);
    try {
      await updateUserProfile(currentUser.id, { settings: newSettings });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const handlePasswordReset = async () => {
    if (!currentUser?.email) return;
    try {
      await supabase.auth.resetPasswordForEmail(currentUser.email);
      alert('Password reset email sent!');
    } catch (e) {
      alert('Failed to send reset email');
    }
  };

  const tabs = [
    { id: 'Account', icon: UserIcon },
    { id: 'Appearance', icon: Monitor },
    { id: 'Notifications', icon: Bell },
    { id: 'Privacy', icon: Lock },
    { id: 'Security', icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account preferences, notifications, and security.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          {tabs.map(tab => (
            <Button 
              key={tab.id}
              variant={activeTab === tab.id ? 'glass' : 'ghost'} 
              onClick={() => setActiveTab(tab.id)}
              className={`justify-start gap-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-white/60 dark:bg-slate-800 shadow-sm shadow-brand-indigo/5 border-brand-indigo/10 text-brand-indigo' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <tab.icon size={18} /> {tab.id}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {activeTab === 'Account' && (
            <Card glass className="p-8 border-white/40">
              <h2 className="text-xl font-heading font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Email Address</p>
                    <p className="text-sm text-slate-500">{currentUser?.email || 'user@example.com'}</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>Change</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Password</p>
                    <p className="text-sm text-slate-500">Reset your password via email link.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handlePasswordReset}>Send Reset Link</Button>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
                  <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">Delete Account</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'Appearance' && (
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
          )}

          {activeTab === 'Notifications' && (
            <Card glass className="p-8 border-white/40">
              <h2 className="text-xl font-heading font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 flex justify-between items-center">
                Notifications
                {isSaving && <span className="text-xs font-normal text-slate-400">Saving...</span>}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Email Reminders</p>
                    <p className="text-sm text-slate-500">Receive reminders about upcoming mock interviews.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.emailReminders} onChange={e => handleSettingChange('emailReminders', e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-indigo"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Daily Challenge</p>
                    <p className="text-sm text-slate-500">Get notified about the daily coding challenge.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.dailyChallenges} onChange={e => handleSettingChange('dailyChallenges', e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-indigo"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Weekly Reports</p>
                    <p className="text-sm text-slate-500">Receive a weekly summary of your prep progress.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.weeklyReports} onChange={e => handleSettingChange('weeklyReports', e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-indigo"></div>
                  </label>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'Privacy' && (
            <Card glass className="p-8 border-white/40">
              <h2 className="text-xl font-heading font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Privacy</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Profile Visibility</p>
                    <p className="text-sm text-slate-500">Choose who can view your profile on leaderboards.</p>
                  </div>
                  <select 
                    className="h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                    value={settings.profileVisibility}
                    onChange={e => handleSettingChange('profileVisibility', e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Data Collection</p>
                    <p className="text-sm text-slate-500">Allow us to use your anonymized data to improve AI recommendations.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.dataCollection} onChange={e => handleSettingChange('dataCollection', e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-brand-indigo"></div>
                  </label>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'Security' && (
            <Card glass className="p-8 border-white/40">
              <h2 className="text-xl font-heading font-bold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">Security</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[15px]">Sign out of all devices</p>
                    <p className="text-sm text-slate-500">Log out of every active session across all your devices.</p>
                  </div>
                  <Button variant="outline" onClick={handleSignOut} className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                    <LogOut size={16} /> Sign Out All
                  </Button>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};
