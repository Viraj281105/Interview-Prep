import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'framer-motion';
import { Code, Database, Server, Users, Search, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RevisionScheduler } from '../components/practice/RevisionScheduler';

const subjects = [
  { id: 'dsa', title: 'Data Structures & Algorithms', icon: Code, desc: 'Arrays, Trees, Graphs, DP, and more.', progress: 65, modules: 12 },
  { id: 'sql', title: 'SQL & Database', icon: Database, desc: 'Complex queries, Joins, Indexing.', progress: 80, modules: 8 },
  { id: 'dbms', title: 'DBMS Concepts', icon: Database, desc: 'ACID, Normalization, Transactions.', progress: 40, modules: 6 },
  { id: 'system-design', title: 'System Design', icon: Server, desc: 'Scalable architectures, Load balancing.', progress: 30, modules: 10 },
  { id: 'os', title: 'Operating Systems', icon: Server, desc: 'Processes, Threads, Memory.', progress: 20, modules: 7 },
  { id: 'oop', title: 'Object Oriented Prog.', icon: Code, desc: 'Classes, Inheritance, Polymorphism.', progress: 100, modules: 5 },
  { id: 'hr', title: 'HR & Leadership', icon: Users, desc: 'Behavioral questions, STAR method.', progress: 90, modules: 4 },
];

export const Subjects = () => {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Subject Modules</h1>
        <p className="text-slate-600 dark:text-slate-400">Master every concept required for technical interviews.</p>
      </div>

      <div className="flex items-center gap-4 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search subjects..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub, i) => (
          <motion.div key={sub.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-6 h-full flex flex-col hover:border-blue-500/50 hover:shadow-lg transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                  <sub.icon size={24} />
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-500 mb-1">{sub.progress}% Complete</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{sub.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">{sub.desc}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <BookOpen size={14} />
                  <span>{sub.modules} Modules</span>
                </div>
                <Link to={`/subjects/${sub.id}`}>
                  <Button variant="ghost" size="sm" className="gap-1 px-2 text-blue-600 dark:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                    Enter <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <RevisionScheduler />
    </div>
  );
};
