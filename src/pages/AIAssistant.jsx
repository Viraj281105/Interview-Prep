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
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-6 md:h-[calc(100vh-8rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Sparkles className="text-blue-500" /> AI Co-Pilot
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Leverage artificial intelligence to supercharge your interview preparation.</p>
      </div>

      <div className="flex gap-2 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl w-full sm:w-fit overflow-x-auto custom-scrollbar shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div layoutId="aibubble" className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm" />
            )}
            <span className="relative z-10 flex items-center gap-2"><tab.icon size={16} /> <span className="hidden sm:inline">{tab.title}</span></span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden min-h-[500px]">
        <ActiveComponent />
      </div>
    </div>
  );
};
