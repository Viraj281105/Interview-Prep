import React, { useState } from 'react';
import { CompanyCard } from '../components/companies/CompanyCard';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCompanies } from '../data/mock_companies';

export const CompaniesList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = mockCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight mb-3 text-slate-900 dark:text-slate-50">
            Company Specific Prep
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Target your preparation for top tech companies. Review exact hiring workflows, common OA questions, and real candidate experiences.
          </p>
        </div>

        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-indigo" size={20} />
          <Input 
            placeholder="Search companies..." 
            className="pl-11 h-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200 dark:border-slate-800 focus:border-brand-indigo focus:ring-brand-indigo/20 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No companies found</h3>
          <p className="text-slate-500">Try adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company, i) => (
            <motion.div key={company.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <CompanyCard company={company} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
