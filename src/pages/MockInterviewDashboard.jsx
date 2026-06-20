import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Video, Code2, Users, Settings, Play, History, CheckCircle2 } from 'lucide-react';
import { InterviewSimulator } from '../components/mock/InterviewSimulator';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';

export const MockInterviewDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSession, setActiveSession] = useState(null);
  const [activeCompany, setActiveCompany] = useState(null);
  const { mockInterviews } = useAppStore();

  useEffect(() => {
    if (location.state?.companyId) {
      setActiveCompany(location.state.companyId);
      // Default to DSA for company-specific mocks unless specified
      setActiveSession('dsa');
      
      // Clear state so a refresh doesn't auto-start again
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const interviewTypes = [
    { id: 'behavioral', title: 'Behavioral & HR', icon: Users, desc: 'Practice STAR method, leadership principles, and culture fit questions.', duration: '30 mins' },
    { id: 'dsa', title: 'Data Structures & Algorithms', icon: Code2, desc: 'Live coding environment. Array, Strings, Trees, and Graph problems.', duration: '45 mins' },
    { id: 'system-design', title: 'System Design', icon: Settings, desc: 'High-level architecture and scaling questions.', duration: '60 mins' },
  ];

  const handleEndSession = () => {
    setActiveSession(null);
    setActiveCompany(null);
  };

  if (activeSession) {
    return <InterviewSimulator type={activeSession} companyId={activeCompany} onEnd={handleEndSession} />;
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 py-8 px-4 sm:px-6">
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight mb-3 flex items-center gap-3">
          <Video className="text-brand-indigo" size={36} /> 
          Mock Interview Engine
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Simulate real interview conditions with a built-in timer, local webcam interface, and structured questions. Practice technical coding or behavioral rounds under pressure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interviewTypes.map((type, i) => (
          <motion.div key={type.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card glass animated className="p-6 h-full flex flex-col group border-white/40 hover:border-brand-indigo/40 transition-all border-t-4 border-t-brand-indigo">
              <div className="w-14 h-14 bg-brand-indigo/10 text-brand-indigo dark:bg-brand-indigo/20 dark:text-brand-lavender rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <type.icon size={28} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-brand-indigo transition-colors">{type.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 leading-relaxed">{type.desc}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-auto">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Video size={14} className="text-brand-indigo" /> {type.duration}
                </span>
                <Button onClick={() => setActiveSession(type.id)} size="sm" className="gap-2 shadow-md shadow-brand-indigo/20 group-hover:-translate-y-0.5 transition-transform">
                  <Play size={14} fill="currentColor" /> Start Session
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
              <History className="text-brand-purple" />
              Interview History
            </h2>
          </div>
          
          {mockInterviews.length === 0 ? (
            <Card className="p-10 text-center border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20">
              <History size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">No interviews yet</h3>
              <p className="text-slate-500 text-sm">Start a mock interview session above to track your progress.</p>
            </Card>
          ) : (
            <div className="flex flex-col gap-4">
              {mockInterviews.map((interview) => (
                <Card key={interview.id} className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:border-brand-indigo/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide text-sm">{interview.type.replace('-', ' ')}</h4>
                      <p className="text-xs text-slate-500 font-medium">{formatTime(interview.date)} • Score: {interview.score}/100</p>
                    </div>
                  </div>
                  <div className="text-sm bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 sm:max-w-[300px] truncate">
                    {interview.feedback}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-brand-indigo/5 dark:bg-brand-indigo/10 border-brand-indigo/20 h-full">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-brand-indigo dark:text-brand-lavender">
              <Video size={20} /> Local Environment
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              When you start a session, your webcam will turn on to simulate a real interview environment. 
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Your video is <strong>never</strong> recorded or sent to any server; it is displayed purely locally to help you monitor your body language and eye contact.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              For technical rounds, a built-in dark-mode code editor will be available side-by-side with the question prompt.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
