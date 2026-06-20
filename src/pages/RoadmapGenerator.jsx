import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sparkles, Compass, Calendar, Target, ChevronRight, CheckCircle2 } from 'lucide-react';
import { aiService } from '../services/aiService';

export default function RoadmapGenerator() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  // Form State
  const [companies, setCompanies] = useState('');
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [prepTime, setPrepTime] = useState(4); // weeks

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep(2);
    try {
      const targetCompanies = companies.split(',').map(c => c.trim()).filter(Boolean);
      const result = await aiService.generateRoadmap(targetCompanies, skillLevel, prepTime);
      setRoadmap(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full py-12 px-6 max-w-5xl mx-auto flex flex-col gap-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4 flex items-center justify-center gap-3">
          <Compass className="text-brand-indigo" size={36} />
          AI Roadmap Generator
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Tell us your goals, and our AI will generate a personalized day-by-day study plan to get you interview-ready.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl mx-auto"
          >
            <Card glass className="p-8 border-white/40 shadow-xl">
              <div className="flex flex-col gap-8">
                
                {/* Target Companies */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <Target size={16} className="text-brand-indigo" /> Target Companies
                  </label>
                  <Input 
                    placeholder="e.g., Google, Stripe, Atlassian" 
                    value={companies}
                    onChange={(e) => setCompanies(e.target.value)}
                    className="h-12 bg-slate-50/50 dark:bg-slate-900/50"
                  />
                  <p className="text-xs text-slate-500 mt-2">Comma separated. Leave blank for general MAANG prep.</p>
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-emerald" /> Current Skill Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                      <button
                        key={level}
                        onClick={() => setSkillLevel(level)}
                        className={`py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
                          skillLevel === level 
                            ? 'border-brand-indigo bg-brand-indigo/10 text-brand-indigo dark:text-brand-lavender' 
                            : 'border-slate-200 dark:border-slate-700 hover:border-brand-indigo/30 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Available */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Calendar size={16} className="text-brand-orange" /> Prep Time (Weeks)
                  </label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="12" 
                      value={prepTime} 
                      onChange={(e) => setPrepTime(Number(e.target.value))}
                      className="flex-1 accent-brand-indigo h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="w-16 text-center font-bold text-xl text-brand-indigo bg-brand-indigo/10 py-1 rounded-lg">
                      {prepTime}
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  onClick={handleGenerate} 
                  className="w-full h-14 text-lg mt-4 shadow-lg shadow-brand-indigo/20 group gap-2"
                >
                  <Sparkles size={20} className="group-hover:animate-pulse" /> Generate My Roadmap
                </Button>

              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && isGenerating && (
          <motion.div 
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-brand-indigo rounded-full border-t-transparent animate-spin"></div>
              <Compass className="absolute inset-0 m-auto text-brand-indigo" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Analyzing Data...</h2>
            <p className="text-slate-500">Cross-referencing your skill level with recent interview patterns.</p>
          </motion.div>
        )}

        {step === 2 && !isGenerating && roadmap && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-8"
          >
            <Card glass className="p-8 border-brand-indigo/20 bg-gradient-to-br from-brand-indigo/5 to-transparent">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">
                  {roadmap.title}
                </h2>
                <Button variant="outline" size="sm" onClick={() => setStep(1)} className="shrink-0">
                  Edit Parameters
                </Button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {roadmap.summary}
              </p>
            </Card>

            <div className="grid gap-6">
              {roadmap.weeks.map((week, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                >
                  <Card className="p-6 border-l-4 border-l-brand-indigo overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl font-bold font-heading">{week.week}</span>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="text-sm font-bold text-brand-indigo uppercase tracking-wider mb-1">
                        Week {week.week}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{week.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-2xl">
                        <strong className="text-slate-700 dark:text-slate-300">Focus:</strong> {week.focus}
                      </p>
                      
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                        <h4 className="font-semibold text-sm mb-3 uppercase text-slate-500 tracking-wide">Tasks</h4>
                        <ul className="space-y-3">
                          {week.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                              <CheckCircle2 size={18} className="text-brand-emerald shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button size="lg" className="px-12 shadow-xl shadow-brand-indigo/20">
                Start Week 1
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
