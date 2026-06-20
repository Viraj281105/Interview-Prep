import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ExperienceAccordion } from '../components/companies/ExperienceAccordion';
import { SubmitExperienceForm } from '../components/companies/SubmitExperienceForm';
import { ArrowLeft, Building2, ExternalLink, Target, Users, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCompanies } from '../data/mock_companies';

export const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('experiences');

  const company = mockCompanies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle size={48} className="text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Company not found</h2>
        <Link to="/companies">
          <Button variant="outline">Return to Directory</Button>
        </Link>
      </div>
    );
  }

  const handleStartMock = () => {
    navigate('/mock', { state: { companyId: company.id } });
  };

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col gap-8 py-4 px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <Link to="/companies">
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <span className="font-semibold text-slate-500 dark:text-slate-400">Back to Directory</span>
      </div>

      {/* Header Profile */}
      <Card glass className="p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8 border-b-4 border-b-brand-indigo shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-indigo/10 dark:bg-brand-indigo/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="w-28 h-28 rounded-3xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex items-center justify-center shadow-lg z-10 shrink-0">
          <Building2 size={56} className="text-slate-400 dark:text-slate-500" />
        </div>
        <div className="flex-1 z-10">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight mb-4">{company.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-indigo/10 text-brand-indigo rounded-lg"><Target size={16} /> {company.type}</span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg"><Users size={16} /> Active Hiring</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed text-lg">
            {company.description}
          </p>
        </div>
        <div className="w-full lg:w-64 flex flex-col gap-4 z-10 mt-4 lg:mt-0 shrink-0">
          <Button onClick={handleStartMock} size="lg" className="w-full shadow-lg shadow-brand-indigo/20 font-bold bg-brand-indigo hover:bg-brand-purple">
            Start Mock Interview
          </Button>
          <Button variant="outline" size="lg" className="w-full gap-2 border-slate-300 dark:border-slate-700">
            Careers Site <ExternalLink size={16} />
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto custom-scrollbar no-scrollbar">
        {['experiences', 'hiring process', 'submit'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 font-bold text-sm capitalize transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-brand-indigo dark:text-brand-lavender' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            {tab === 'submit' ? 'Share Experience' : tab}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-indigo dark:bg-brand-lavender" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-4 pb-12">
        {activeTab === 'experiences' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-slate-50">Candidate Experiences</h2>
              <select className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-indigo dark:text-slate-200 [&>option]:text-slate-900">
                <option value="recent">Most Recent</option>
                <option value="top">Top Voted</option>
                <option value="offers">Offers Only</option>
              </select>
            </div>
            
            {company.experiences && company.experiences.length > 0 ? (
              <div className="space-y-4">
                {company.experiences.map((exp, i) => (
                  <ExperienceAccordion key={i} experience={exp} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                <Users className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No experiences shared yet</h3>
                <p className="text-slate-500">Be the first to share your interview experience at {company.name}.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'submit' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <SubmitExperienceForm companyId={id} />
          </motion.div>
        )}

        {activeTab === 'hiring process' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
             <Card glass className="p-6 md:p-12 border-brand-indigo/10 dark:border-brand-indigo/20">
               <h3 className="text-3xl font-heading font-bold mb-12 text-center text-slate-900 dark:text-slate-50">Typical Hiring Process</h3>
               <div className="space-y-10 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-indigo/0 before:via-brand-indigo/50 before:to-brand-indigo/0">
                  {company.hiringProcess && company.hiringProcess.map((step, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#0A0A0A] bg-brand-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-lg">
                        {i + 1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-brand-indigo/30 transition-all">
                        <div className="font-heading font-bold text-xl mb-3 text-slate-900 dark:text-slate-100">{step.title}</div>
                        <div className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">{step.desc}</div>
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
