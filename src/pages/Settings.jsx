import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Settings as SettingsIcon, User, Target, Save, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/database';

export const Settings = () => {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (currentUser?.id) {
      loadProfile();
    }
  }, [currentUser]);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const p = await getUserProfile(currentUser.id);
      setProfile(p);
      setFormData(p || {});
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const updated = await updateUserProfile(currentUser.id, formData);
      setProfile(updated);
      setFormData(updated);
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (e) {
      console.error(e);
      setSaveMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading Settings...</div>;

  return (
    <div className="flex flex-col gap-8 w-full py-10 px-6 max-w-4xl mx-auto animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
          <SettingsIcon size={36} className="text-brand-indigo" /> Account Settings
        </h1>
        <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20" onClick={logout}>
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card glass className="p-8 border-white/40 h-full">
            <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <User className="text-brand-indigo" /> Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-500 font-medium mb-1 block">Display Name</label>
                <Input value={formData.display_name || ''} onChange={e => handleProfileChange('display_name', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-slate-500 font-medium mb-1 block">Phone Number</label>
                <Input value={formData.phone_number || ''} onChange={e => handleProfileChange('phone_number', e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-slate-500 font-medium mb-1 block">Date of Birth</label>
                <Input type="date" value={formData.dob || ''} onChange={e => handleProfileChange('dob', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-500 font-medium mb-1 block">City</label>
                  <Input value={formData.city || ''} onChange={e => handleProfileChange('city', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm text-slate-500 font-medium mb-1 block">Country</label>
                  <Input value={formData.country || ''} onChange={e => handleProfileChange('country', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-500 font-medium mb-1 block">Bio / About Me</label>
                <textarea 
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
                  value={formData.bio || ''} 
                  onChange={e => handleProfileChange('bio', e.target.value)} 
                  placeholder="A short bio about your career goals..."
                />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card glass className="p-8 border-white/40 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Target className="text-brand-pink" /> Career Goals
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500 font-medium mb-1 block">Target Role</label>
                  <Input value={formData.target_role || ''} onChange={e => handleProfileChange('target_role', e.target.value)} placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div>
                  <label className="text-sm text-slate-500 font-medium mb-1 block">Target Companies (comma separated)</label>
                  <Input value={(formData.target_companies || []).join(', ')} onChange={e => handleProfileChange('target_companies', e.target.value.split(',').map(s => s.trim()))} placeholder="e.g. Google, Stripe, Notion" />
                </div>
                <div>
                  <label className="text-sm text-slate-500 font-medium mb-1 block">Preferred Domains (comma separated)</label>
                  <Input value={(formData.preferred_domains || []).join(', ')} onChange={e => handleProfileChange('preferred_domains', e.target.value.split(',').map(s => s.trim()))} placeholder="e.g. FinTech, AI, E-commerce" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4">
               {saveMessage && (
                 <span className={`text-sm font-medium ${saveMessage.includes('successfully') ? 'text-emerald-500' : 'text-red-500'}`}>
                   {saveMessage}
                 </span>
               )}
               <Button onClick={handleSave} disabled={isSaving} size="lg" className="w-full bg-brand-indigo hover:bg-brand-purple text-white shadow-lg shadow-brand-indigo/20">
                 {isSaving ? 'Saving...' : <><Save size={20} className="mr-2" /> Save All Settings</>}
               </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
