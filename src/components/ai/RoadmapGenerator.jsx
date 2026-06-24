import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MapPin, Target, Calendar, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { aiService } from '../../services/aiService';
import { Link } from 'react-router-dom';

export const RoadmapGenerator = () => {
  const [targetRole, setTargetRole] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const companies = targetRole.split(',').map(c => c.trim()).filter(Boolean);
      const generatedPlan = await aiService.generateRoadmap(companies, 'Intermediate', parseInt(timeframe, 10));
      setRoadmap(generatedPlan);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <Card glass className="flex-[0.4] p-8 lg:p-10 border-brand-indigo/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-xl overflow-y-auto custom-scrollbar relative">
        <div className="w-16 h-16 bg-brand-indigo/10 text-brand-indigo rounded-2xl flex items-center justify-center mb-8 shadow-inner relative">
          <Sparkles size={20} className="absolute -top-1 -right-1 text-amber-400" />
          <Target size={32} />
        </div>
        <h3 className="text-3xl font-heading font-bold tracking-tight mb-3 text-slate-900 dark:text-slate-100">Personalized Study Plan</h3>
        <p className="text-base text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Tell our AI your target role and timeframe, and it will generate a customized, week-by-week action plan mapped directly to our modules.
        </p>

        <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-slate-300">Target Role/Company</label>
            <Input required value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="e.g. Google, Meta" className="bg-white/80 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700 h-12" />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-slate-300">Timeframe (Weeks)</label>
            <Input required type="number" min="1" max="12" value={timeframe} onChange={e => setTimeframe(e.target.value)} placeholder="e.g. 4" className="bg-white/80 dark:bg-slate-950/80 border-slate-300 dark:border-slate-700 h-12" />
          </div>
          
          <Button type="submit" size="lg" className="w-full mt-6 shadow-brand-indigo/20 shadow-lg font-bold bg-brand-indigo hover:bg-brand-purple" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Roadmap'}
          </Button>
        </form>
      </Card>

      {/* Result Section */}
      <Card glass className="flex-[0.6] p-0 overflow-hidden flex flex-col border-brand-indigo/10 dark:border-brand-indigo/20 shadow-xl">
        <div className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 font-heading font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3">
            <MapPin className="text-brand-indigo" size={24} /> 
            <span className="text-lg">Your Roadmap</span>
          </div>
          {roadmap && <span className="text-sm font-normal text-slate-500 max-w-[300px] truncate">{roadmap.title}</span>}
        </div>
        
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {!roadmap && !isGenerating && (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm text-center">
               <Calendar size={64} className="mb-6 opacity-20 text-brand-indigo" />
               <p className="text-base font-medium max-w-[250px] leading-relaxed">Fill out the form to generate your AI roadmap.</p>
             </div>
          )}

          {isGenerating && (
             <div className="h-full flex flex-col items-center justify-center text-brand-indigo">
               <div className="w-10 h-10 border-4 border-brand-indigo/20 border-t-brand-indigo rounded-full animate-spin mb-4"></div>
               <p className="font-bold animate-pulse text-sm uppercase tracking-wide">Compiling syllabus...</p>
             </div>
          )}

          {roadmap && (
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-indigo/10 before:via-brand-indigo/40 dark:before:via-brand-indigo/30 before:to-transparent">
              <p className="text-slate-600 dark:text-slate-400 mb-8 italic text-sm">{roadmap.summary}</p>
              
              {roadmap.weeks.map((week, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative flex items-start gap-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] shrink-0 z-10 font-bold border-4 border-white dark:border-[#0A0A0A] text-sm">
                    W{week.week}
                  </div>
                  <div className="flex-1 pt-2 pb-6">
                    <h4 className="font-heading font-bold text-xl mb-1 text-slate-900 dark:text-slate-100">{week.title}</h4>
                    <p className="text-sm text-slate-500 mb-4">{week.focus}</p>
                    <ul className="space-y-3">
                      {week.tasks.map((taskObj, idx) => (
                        <li key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[15px] text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span>{typeof taskObj === 'string' ? taskObj : taskObj.task}</span>
                          </div>
                          {taskObj.topicId && (
                            <Link to={`/topic/${taskObj.topicId}`} className="shrink-0 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo hover:text-brand-purple bg-brand-indigo/5 hover:bg-brand-indigo/10 px-3 py-1.5 rounded-lg transition-colors">
                              Study <ExternalLink size={14} />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
