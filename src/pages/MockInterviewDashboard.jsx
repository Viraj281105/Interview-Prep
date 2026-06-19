import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Video, Code2, Users, Settings, Play } from 'lucide-react';
import { InterviewSimulator } from '../components/mock/InterviewSimulator';
import { motion } from 'framer-motion';

export const MockInterviewDashboard = () => {
  const [activeSession, setActiveSession] = useState(null);

  const interviewTypes = [
    { id: 'behavioral', title: 'Behavioral & HR', icon: Users, desc: 'Practice STAR method, leadership principles, and culture fit questions.', duration: '30 mins' },
    { id: 'dsa', title: 'Data Structures & Algorithms', icon: Code2, desc: 'Live coding environment. 2 medium or 1 hard problem.', duration: '45 mins' },
    { id: 'system-design', title: 'System Design', icon: Settings, desc: 'High-level architecture and scaling questions.', duration: '60 mins' },
  ];

  if (activeSession) {
    return <InterviewSimulator type={activeSession} onEnd={() => setActiveSession(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Mock Interview Engine</h1>
        <p className="text-slate-600 dark:text-slate-400">Simulate real interview conditions with a built-in timer, webcam interface, and structured questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interviewTypes.map((type, i) => (
          <motion.div key={type.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 h-full flex flex-col hover:border-blue-500/50 hover:shadow-lg transition-all group border-t-4 border-t-blue-500">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <type.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{type.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">{type.desc}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Video size={14} /> {type.duration}
                </span>
                <Button onClick={() => setActiveSession(type.id)} size="sm" className="gap-2 shadow-blue-500/20">
                  <Play size={14} fill="currentColor" /> Start Session
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <Card className="p-8 bg-slate-50 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-700">
        <h3 className="font-bold mb-2 flex items-center gap-2"><Video size={20} className="text-emerald-500" /> Local Webcam Simulation</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-4xl">
          When you start a session, your webcam will turn on to simulate a real interview environment. 
          Your video is <strong>never</strong> recorded or sent to any server; it is displayed purely locally to help you monitor your body language and eye contact.
          For technical rounds, a built-in code editor will be available side-by-side with the question prompt.
        </p>
      </Card>
    </div>
  );
};
