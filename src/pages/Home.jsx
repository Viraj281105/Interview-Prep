import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Code, Database, Server, Users, ArrowRight, Brain, Target, Calendar } from 'lucide-react';

export const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col gap-24 py-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 flex flex-col items-center text-center mt-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          V2.0 Now Live
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-tight"
        >
          Master Technical Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Structured Preparation</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl"
        >
          A comprehensive platform for software engineering placements. Practice DSA, SQL, DBMS, System Design and HR rounds with intelligent mock interviews.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/dashboard">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Start Preparing <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/mock">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Take Mock Interview
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Subjects Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Modules</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need to crack top tech companies.</p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { title: 'Data Structures', icon: Code, desc: 'Master algorithms and problem solving' },
            { title: 'Databases (SQL)', icon: Database, desc: 'Queries, normalization, and transactions' },
            { title: 'System Design', icon: Server, desc: 'Scalability, microservices, and architecture' },
            { title: 'HR & Leadership', icon: Users, desc: 'Behavioral questions and STAR method' }
          ].map((subject, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="p-6 hover:border-blue-500/50 transition-colors h-full flex flex-col items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <subject.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{subject.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{subject.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Overview */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-slate-600 dark:text-slate-400">Designed to make your prep efficient and effective.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <Card className="p-8 border-none bg-white/60 dark:bg-slate-950/60 text-center flex flex-col items-center hover:scale-[1.02] transition-transform">
               <Brain size={40} className="text-indigo-500 mb-6" />
               <h3 className="text-xl font-bold mb-3">AI Evaluation</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm">Get real-time feedback on your technical and behavioral answers using advanced AI models.</p>
             </Card>
             <Card className="p-8 border-none bg-white/60 dark:bg-slate-950/60 text-center flex flex-col items-center hover:scale-[1.02] transition-transform">
               <Target size={40} className="text-rose-500 mb-6" />
               <h3 className="text-xl font-bold mb-3">Targeted Practice</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm">Filter questions by company, difficulty, and frequency. Focus on what matters most.</p>
             </Card>
             <Card className="p-8 border-none bg-white/60 dark:bg-slate-950/60 text-center flex flex-col items-center hover:scale-[1.02] transition-transform">
               <Calendar size={40} className="text-emerald-500 mb-6" />
               <h3 className="text-xl font-bold mb-3">Revision Schedules</h3>
               <p className="text-slate-600 dark:text-slate-400 text-sm">Automatically generate 1, 3, or 7 day revision plans based on your weak areas.</p>
             </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
