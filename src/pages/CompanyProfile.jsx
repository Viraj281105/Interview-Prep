import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ExperienceAccordion } from '../components/companies/ExperienceAccordion';
import { SubmitExperienceForm } from '../components/companies/SubmitExperienceForm';
import { ArrowLeft, Building2, ExternalLink, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const mockExperiences = [
  {
    role: 'Software Development Engineer I (SDE 1)',
    date: 'March 2026',
    status: 'Offer',
    upvotes: 45,
    rounds: [
      { name: 'Online Assessment (OA)', details: '2 coding questions in 90 minutes on HackerRank. One was Array manipulation (Medium), the other was a Graph traversal (Hard).' },
      { name: 'Technical Interview 1', details: 'Focused on Data Structures. Asked to implement an LRU Cache and explain time complexity.' },
      { name: 'Technical Interview 2', details: 'System Design and CS Fundamentals. Design a URL shortener.' },
      { name: 'HR / Behavioral', details: 'Standard situational questions based on the STAR method. Focused heavily on ownership.' }
    ]
  },
  {
    role: 'Frontend Developer Intern',
    date: 'February 2026',
    status: 'Rejected',
    upvotes: 12,
    rounds: [
      { name: 'Technical Phone Screen', details: 'React fundamentals, hooks, and a live coding exercise to build a Todo list with specific constraints.' },
      { name: 'Onsite Loop 1', details: 'JavaScript core concepts (closures, event loop, promises). Struggled with a complex closure question.' }
    ]
  }
];

export const CompanyProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('experiences');

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link to="/companies">
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <span className="font-medium text-slate-500">Back to Directory</span>
      </div>

      {/* Header Profile */}
      <Card className="p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-b-4 border-b-blue-500 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex items-center justify-center shadow-sm z-10">
          <Building2 size={48} className="text-slate-400" />
        </div>
        <div className="flex-1 z-10">
          <h1 className="text-4xl font-extrabold tracking-tight capitalize mb-3">{id.replace('-', ' ')}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1.5"><Target size={16} className="text-blue-500" /> Software Engineering</span>
            <span className="flex items-center gap-1.5"><Users size={16} className="text-emerald-500" /> Active Hiring</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Detailed breakdown of the hiring process, interview questions, and real candidate experiences. 
            Prepare effectively by understanding what to expect in each round.
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col gap-3 z-10 mt-4 md:mt-0">
          <Link to="/mock">
            <Button className="w-full shadow-lg shadow-blue-500/30">Start Mock Interview</Button>
          </Link>
          <Button variant="outline" className="w-full gap-2">
            Careers Site <ExternalLink size={16} />
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto custom-scrollbar">
        {['experiences', 'hiring process', 'submit'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm capitalize transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            {tab === 'submit' ? 'Share Experience' : tab}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-2 pb-12">
        {activeTab === 'experiences' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Candidate Experiences</h2>
              <select className="bg-transparent border border-slate-300 dark:border-slate-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-300 [&>option]:text-slate-900">
                <option value="recent">Most Recent</option>
                <option value="top">Top Voted</option>
                <option value="offers">Offers Only</option>
              </select>
            </div>
            <div className="space-y-2">
              {mockExperiences.map((exp, i) => (
                <ExperienceAccordion key={i} experience={exp} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'submit' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <SubmitExperienceForm companyId={id} />
          </motion.div>
        )}

        {activeTab === 'hiring process' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
             <Card className="p-6 md:p-10 border-blue-100 dark:border-blue-900/30">
               <h3 className="text-2xl font-bold mb-8 text-center">Typical Hiring Process</h3>
               <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-300 dark:before:via-blue-800 before:to-transparent">
                  {[
                    { title: "Application Screening", desc: "Resume parsing and ATS screening." },
                    { title: "Online Assessment (OA)", desc: "1-2 coding problems on HackerRank/CodeSignal. 90 mins." },
                    { title: "Technical Phone Screen", desc: "45 mins live coding on a shared doc. Usually a medium difficulty DSA problem." },
                    { title: "Onsite Loop (4-5 Rounds)", desc: "Mix of Data Structures, System Design, and Behavioral/HR rounds. Each round is approx 45-60 mins." }
                  ].map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                        {i + 1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-bold text-lg mb-2">{step.title}</div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</div>
                      </div>
                    </div>
                  ))}
               </div>
             </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
