import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Code, Database, Server, Users, ArrowRight, Brain, Target, Calendar, Sparkles, Video, Flame, CheckCircle2, Mic } from 'lucide-react';

export const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col gap-20 py-10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-16 pb-12 relative overflow-hidden">
        {/* Advanced Animated Mesh Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_100%)]"></div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-indigo/20 dark:bg-brand-indigo/30 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-brand-cyan/20 dark:bg-brand-cyan/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-60" 
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], y: [0, -50, 0], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[40vw] max-w-[1000px] max-h-[600px] bg-brand-purple/15 dark:bg-brand-purple/20 rounded-full blur-[130px] mix-blend-multiply dark:mix-blend-screen opacity-60" 
          />
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5LjUgMGguNXY2MEgwdjYwaDYwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTUwLCAxNTAsIDE1MCwgMC4wNykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/60 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)] mb-8 group cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">PrepMaster 3.0 AI Engine is Live</span>
          <ArrowRight size={14} className="text-brand-indigo group-hover:translate-x-1 transition-transform ml-1" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter text-slate-900 dark:text-white max-w-5xl leading-[1.1] z-10"
        >
          Master Tech Interviews with <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-pink relative inline-block">
            AI Precision.
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-0 h-4 bg-brand-indigo/10 dark:bg-brand-indigo/20 -z-10 origin-left rounded-full"
            />
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed z-10"
        >
          A premium OS for software engineering placements. Ace DSA, System Design, and Behavioral rounds with our intelligent, real-time AI mock interviewer.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-10"
        >
          <Link to="/roadmap">
            <Button size="lg" variant="gradient" className="w-full sm:w-auto gap-2 group text-base h-14 px-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(99,102,241,0.8)] hover:shadow-[0_10px_50px_-10px_rgba(99,102,241,1)] transition-all">
              Generate AI Roadmap <Sparkles size={18} className="group-hover:animate-pulse" />
            </Button>
          </Link>
          <Link to="/mock">
            <Button variant="glass" size="lg" className="w-full sm:w-auto gap-2 text-base h-14 px-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all hover:-translate-y-0.5">
              <Video size={18} className="text-brand-indigo" /> Take Mock Interview
            </Button>
          </Link>
        </motion.div>

        {/* Floating cards visual for hero */}
        <div className="mt-20 w-full max-w-6xl relative h-[400px] hidden lg:block perspective-1000 z-10">
          
          {/* Main IDE Card */}
          <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
            className="absolute left-[50%] -translate-x-1/2 top-0 w-[600px] h-[380px] glass border border-white/40 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-brand-indigo/10 z-20 flex flex-col overflow-hidden bg-white/80 dark:bg-[#0A0A0A]/90 backdrop-blur-xl"
          >
            <div className="h-10 bg-slate-100/80 dark:bg-[#161618] flex items-center px-4 border-b border-slate-200 dark:border-[#222222] shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="mx-auto flex gap-4 text-xs font-mono font-medium text-slate-500">
                <span className="text-brand-indigo">solution.js</span>
                <span>TwoSum.java</span>
              </div>
            </div>
            <div className="p-6 font-mono text-sm text-slate-800 dark:text-[#c9d1d9] leading-loose flex-1 flex flex-col relative">
              <div><span className="text-brand-pink dark:text-[#ff7b72]">function</span> <span className="text-brand-indigo dark:text-[#d2a8ff]">optimizeRoute</span>(nodes) {'{'}</div>
              <div className="pl-6"><span className="text-slate-500">// AI analyzing time complexity...</span></div>
              <div className="pl-6"><span className="text-brand-pink dark:text-[#ff7b72]">const</span> graph = <span className="text-brand-cyan dark:text-[#79c0ff]">buildAdjacencyList</span>(nodes);</div>
              <div className="pl-6"><span className="text-brand-pink dark:text-[#ff7b72]">return</span> graph.<span className="text-brand-cyan dark:text-[#79c0ff]">shortestPath</span>();</div>
              <div>{'}'}</div>

              {/* Fake Evaluation Popover inside IDE */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 right-6 p-4 rounded-xl bg-white dark:bg-slate-800 border border-brand-indigo/20 shadow-xl max-w-[280px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-emerald">
                    <CheckCircle2 size={14} /> O(N) Time
                  </div>
                  <span className="text-xs font-bold bg-brand-indigo/10 text-brand-indigo px-2 py-0.5 rounded-full">Score: 9/10</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                  "Great job! You avoided the nested loop approach. Consider edge cases where nodes array is empty."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Left Floating Stat Card */}
          <motion.div 
            initial={{ opacity: 0, x: -100, y: 50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
            whileHover={{ rotate: 0, zIndex: 30, scale: 1.05 }}
            className="absolute left-[8%] top-[15%] w-64 glass-card rounded-2xl p-5 shadow-2xl z-10 border border-white/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Flame size={24} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg leading-tight">14 Day</h4>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Streak</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600 dark:text-slate-400">Weekly Goal</span>
                <span className="text-brand-indigo">80%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ delay: 1, duration: 1 }}
                  className="h-full bg-gradient-primary" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Floating AI Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: 100, y: -20, rotate: 5 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
            whileHover={{ rotate: 0, zIndex: 30, scale: 1.05 }}
            className="absolute right-[8%] top-[10%] w-72 glass-card rounded-2xl p-5 shadow-2xl z-30 border border-white/60 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-cyan flex items-center justify-center text-white font-bold">AI</div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm">System Design Mock</h4>
                  <span className="text-xs text-brand-cyan font-medium">In Progress</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                <Mic size={14} className="text-brand-cyan" />
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 text-sm text-slate-600 dark:text-slate-300 italic border border-slate-100 dark:border-slate-800 relative">
              "How would you ensure idempotency in the payment gateway API?"
              <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-slate-50 dark:bg-slate-900/50 border-t border-l border-slate-100 dark:border-slate-800 rotate-[-45deg] -translate-y-1/2"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Comprehensive Modules</h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to crack top tech companies, broken down into manageable premium experiences.</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            { title: 'Data Structures', icon: Code, desc: 'Master algorithms and problem solving', color: 'text-brand-indigo', bg: 'bg-brand-indigo/10' },
            { title: 'Databases (SQL)', icon: Database, desc: 'Queries, normalization, and transactions', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
            { title: 'System Design', icon: Server, desc: 'Scalability, microservices, and architecture', color: 'text-brand-violet', bg: 'bg-brand-violet/10' },
            { title: 'HR & Leadership', icon: Users, desc: 'Behavioral questions and STAR method', color: 'text-brand-pink', bg: 'bg-brand-pink/10' }
          ].map((subject, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card animated glass className="p-6 h-full flex flex-col items-start gap-4 border-white/60 dark:border-slate-700/40 hover:border-brand-indigo/40 dark:hover:border-brand-lavender/40 hover:shadow-xl hover:shadow-brand-indigo/5 transition-all group">
                <div className={`p-3.5 rounded-2xl ${subject.bg} ${subject.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <subject.icon size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-50 group-hover:text-brand-indigo dark:group-hover:text-brand-lavender transition-colors">{subject.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{subject.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Overview */}
      <section className="relative py-24 overflow-hidden">
        {/* Slanted background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 -skew-y-2 origin-top-left -z-10 border-y border-white/50 dark:border-slate-800" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Unfair Advantage</h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Designed with beautiful interfaces and powerful engines to make your prep efficient and effective.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card animated glass className="p-8 text-center flex flex-col items-center border-white/60 dark:border-slate-700/40 hover:-translate-y-1 transition-transform duration-300">
               <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-indigo/30">
                 <Brain size={28} />
               </div>
               <h3 className="text-xl font-heading font-bold mb-3">AI Evaluation</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Get real-time feedback on your technical and behavioral answers using advanced AI models.</p>
             </Card>
             <Card animated glass className="p-8 text-center flex flex-col items-center border-white/60 dark:border-slate-700/40 hover:-translate-y-1 transition-transform duration-300">
               <div className="w-14 h-14 rounded-2xl bg-gradient-soft flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-pink/30">
                 <Target size={28} />
               </div>
               <h3 className="text-xl font-heading font-bold mb-3">Targeted Practice</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Filter questions by company, difficulty, and frequency. Focus purely on what matters most.</p>
             </Card>
             <Card animated glass className="p-8 text-center flex flex-col items-center border-white/60 dark:border-slate-700/40 hover:-translate-y-1 transition-transform duration-300">
               <div className="w-14 h-14 rounded-2xl bg-gradient-accent flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-cyan/30">
                 <Calendar size={28} />
               </div>
               <h3 className="text-xl font-heading font-bold mb-3">Revision Schedules</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Automatically generate spaced-repetition revision plans based on weak areas.</p>
             </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
