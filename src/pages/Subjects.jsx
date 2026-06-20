import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { Code, Database, Server, Users, Search, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RevisionScheduler } from '../components/practice/RevisionScheduler';

const subjects = [
  { id: 'dsa', title: 'Data Structures & Algorithms', icon: Code, desc: 'Arrays, Trees, Graphs, DP, and more.', progress: 65, modules: 12, color: 'text-brand-indigo', bg: 'bg-brand-indigo/10' },
  { id: 'sql', title: 'SQL & Database', icon: Database, desc: 'Complex queries, Joins, Indexing.', progress: 80, modules: 8, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
  { id: 'dbms', title: 'DBMS Concepts', icon: Database, desc: 'ACID, Normalization, Transactions.', progress: 40, modules: 6, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
  { id: 'system-design', title: 'System Design', icon: Server, desc: 'Scalable architectures, Load balancing.', progress: 30, modules: 10, color: 'text-brand-violet', bg: 'bg-brand-violet/10' },
  { id: 'os', title: 'Operating Systems', icon: Server, desc: 'Processes, Threads, Memory.', progress: 20, modules: 7, color: 'text-brand-pink', bg: 'bg-brand-pink/10' },
  { id: 'oop', title: 'Object Oriented Prog.', icon: Code, desc: 'Classes, Inheritance, Polymorphism.', progress: 100, modules: 5, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'hr', title: 'HR & Leadership', icon: Users, desc: 'Behavioral questions, STAR method.', progress: 90, modules: 4, color: 'text-brand-lavender', bg: 'bg-brand-lavender/10' },
];

export const Subjects = () => {
  return (
    <div className="flex flex-col gap-12 w-full py-10 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight mb-3 text-slate-900 dark:text-slate-50">Subject Modules</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">Master every concept required for technical interviews. Track your progress across modules.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input placeholder="Search subjects..." className="pl-12 h-14 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-slate-200 dark:border-slate-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((sub, i) => (
          <motion.div key={sub.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card animated glass className="p-6 h-full flex flex-col group border-white/40 dark:border-slate-800/50 hover:border-brand-indigo/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 group-hover:shadow-md ${sub.bg} ${sub.color}`}>
                  <sub.icon size={26} />
                </div>
                {sub.progress === 100 ? (
                  <Badge variant="primary" className="bg-emerald-500 shadow-lg shadow-emerald-500/20">Completed</Badge>
                ) : (
                  <Badge variant="secondary" className="font-semibold">{sub.progress}% Complete</Badge>
                )}
              </div>
              
              <h3 className="text-xl font-heading font-bold mb-3">{sub.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 flex-1 leading-relaxed">{sub.desc}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-5 mt-auto">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <BookOpen size={16} />
                  <span>{sub.modules} Modules</span>
                </div>
                <Link to={`/subjects/${sub.id}`}>
                  <Button variant="ghost" size="sm" className="gap-2 px-3 text-brand-indigo dark:text-brand-lavender rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    Enter <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <RevisionScheduler />
      </div>
    </div>
  );
};
