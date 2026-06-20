import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Code, Database, Server, Users, ArrowRight, Brain, Target, Calendar, Sparkles } from 'lucide-react';

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
    <div className="flex flex-col gap-32 py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-6 flex flex-col items-center text-center mt-12 relative">
        {/* Animated Background blobs for Hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-indigo/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '8s' }} />

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-brand-indigo/20 text-brand-indigo dark:text-brand-lavender text-sm font-semibold mb-10 shadow-sm"
        >
          <Sparkles size={16} className="text-brand-purple" />
          <span>PrepMaster 3.0 is now live</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 max-w-5xl leading-[1.1]"
        >
          Master Technical Interviews with <span className="text-gradient-primary">Structured Precision.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed"
        >
          A premium platform for software engineering placements. Practice DSA, SQL, DBMS, System Design, and HR rounds with intelligent AI-powered mock interviews.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
        >
          <Link to="/dashboard">
            <Button size="lg" variant="gradient" className="w-full sm:w-auto gap-2 group text-base h-14 px-8 rounded-2xl">
              Start Preparing <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/mock">
            <Button variant="glass" size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-2xl">
              Take Mock Interview
            </Button>
          </Link>
        </motion.div>

        {/* Floating cards visual for hero */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 w-full max-w-5xl relative h-[400px] hidden md:block"
        >
          <div className="absolute left-[10%] top-[20%] w-64 h-48 glass-card rounded-2xl p-6 shadow-2xl rotate-[-6deg] hover:rotate-0 hover:z-20 transition-all duration-500 hover:-translate-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <Database size={20} />
              </div>
              <h4 className="font-heading font-semibold text-lg">SQL Practice</h4>
            </div>
            <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full mb-3" />
            <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full mb-3" />
            <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>

          <div className="absolute right-[10%] top-[10%] w-72 h-56 glass-card rounded-2xl p-6 shadow-2xl rotate-[4deg] z-10 hover:rotate-0 hover:z-20 transition-all duration-500 hover:-translate-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                <Brain size={20} />
              </div>
              <h4 className="font-heading font-semibold text-lg">AI Evaluator</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">"Your explanation of Big-O was excellent, but you missed the space complexity constraint..."</p>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-brand-indigo/10 rounded-full" />
              <div className="h-6 w-20 bg-brand-pink/10 rounded-full" />
            </div>
          </div>
          
          <div className="absolute left-[50%] -translate-x-1/2 top-[40%] w-80 h-64 glass-card border-brand-indigo/20 rounded-2xl p-6 shadow-3xl z-20 hover:-translate-y-4 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-heading font-semibold text-xl">Current Streak</h4>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-5xl font-heading font-bold text-gradient-primary mb-2">12 Days</div>
            <p className="text-slate-500 font-medium">Keep it up! You're in the top 5% of learners.</p>
            <div className="mt-6 flex gap-2 justify-between">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className={`h-10 w-8 rounded-lg ${i < 6 ? 'bg-brand-indigo' : 'bg-slate-100 dark:bg-slate-800'}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Subjects Grid */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Comprehensive Modules</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to crack top tech companies, broken down into manageable premium experiences.</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: 'Data Structures', icon: Code, desc: 'Master algorithms and problem solving', color: 'text-brand-indigo', bg: 'bg-brand-indigo/10' },
            { title: 'Databases (SQL)', icon: Database, desc: 'Queries, normalization, and transactions', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
            { title: 'System Design', icon: Server, desc: 'Scalability, microservices, and architecture', color: 'text-brand-violet', bg: 'bg-brand-violet/10' },
            { title: 'HR & Leadership', icon: Users, desc: 'Behavioral questions and STAR method', color: 'text-brand-pink', bg: 'bg-brand-pink/10' }
          ].map((subject, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card animated glass className="p-8 h-full flex flex-col items-start gap-5 border-white/40 dark:border-slate-800/50 hover:border-brand-indigo/30 dark:hover:border-brand-lavender/30">
                <div className={`p-4 rounded-2xl ${subject.bg} ${subject.color}`}>
                  <subject.icon size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-50">{subject.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{subject.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Overview */}
      <section className="relative py-32 overflow-hidden">
        {/* Slanted background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 -skew-y-3 origin-top-left -z-10 border-y border-white/50 dark:border-slate-800" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Unfair Advantage</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Designed with beautiful interfaces and powerful engines to make your prep efficient and effective.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card animated glass className="p-10 text-center flex flex-col items-center border-white/40">
               <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white mb-8 shadow-lg shadow-brand-indigo/30">
                 <Brain size={32} />
               </div>
               <h3 className="text-2xl font-heading font-bold mb-4">AI Evaluation</h3>
               <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Get real-time feedback on your technical and behavioral answers using advanced AI models.</p>
             </Card>
             <Card animated glass className="p-10 text-center flex flex-col items-center border-white/40">
               <div className="w-16 h-16 rounded-2xl bg-gradient-soft flex items-center justify-center text-white mb-8 shadow-lg shadow-brand-pink/30">
                 <Target size={32} />
               </div>
               <h3 className="text-2xl font-heading font-bold mb-4">Targeted Practice</h3>
               <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Filter questions by company, difficulty, and frequency. Focus purely on what matters most.</p>
             </Card>
             <Card animated glass className="p-10 text-center flex flex-col items-center border-white/40">
               <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center text-white mb-8 shadow-lg shadow-brand-cyan/30">
                 <Calendar size={32} />
               </div>
               <h3 className="text-2xl font-heading font-bold mb-4">Revision Schedules</h3>
               <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Automatically generate 1, 3, or 7 day spaced-repetition revision plans based on weak areas.</p>
             </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
