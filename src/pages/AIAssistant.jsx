import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Map, MessageSquare, Sparkles } from 'lucide-react';
import { ResumeAnalyzer } from '../components/ai/ResumeAnalyzer';
import { RoadmapGenerator } from '../components/ai/RoadmapGenerator';
import { AIInterviewerChat } from '../components/ai/AIInterviewerChat';

export const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState('resume');

  const tabs = [
    { id: 'resume', title: 'Resume Analyzer', icon: FileText, component: ResumeAnalyzer },
    { id: 'roadmap', title: 'Roadmap Generator', icon: Map, component: RoadmapGenerator },
    { id: 'chat', title: 'AI Mock Chat', icon: MessageSquare, component: AIInterviewerChat },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || ResumeAnalyzer;

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8 md:h-[calc(100vh-8rem)]">
      <div>
        <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3 flex items-center gap-3">
          <Sparkles className="text-brand-indigo" size={32} /> 
          AI Co-Pilot
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Leverage artificial intelligence to supercharge your interview preparation. Analyze your resume, generate custom study plans, or practice in a conversational mock chat.
        </p>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl w-full sm:w-fit overflow-x-auto custom-scrollbar no-scrollbar shrink-0 shadow-inner">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-brand-indigo dark:text-brand-lavender' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-800/40'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div layoutId="aibubble" className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50" />
            )}
            <span className="relative z-10 flex items-center gap-2"><tab.icon size={18} /> <span className="hidden sm:inline">{tab.title}</span></span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden min-h-[500px]">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          <ActiveComponent />
        </motion.div>
      </div>
    </div>
  );
};
