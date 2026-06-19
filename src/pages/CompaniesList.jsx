import React from 'react';
import { CompanyCard } from '../components/companies/CompanyCard';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const mockCompanies = [
  { id: 'google', name: 'Google', type: 'Product-based', difficulty: 'Hard', description: 'Known for algorithmic rigor. Expect dynamic programming, graphs, and system design in onsite rounds.', experienceCount: 142 },
  { id: 'amazon', name: 'Amazon', type: 'Product-based', difficulty: 'Medium', description: 'Heavy focus on Leadership Principles (LPs). Be prepared for behavioral questions integrated with technical rounds.', experienceCount: 215 },
  { id: 'microsoft', name: 'Microsoft', type: 'Product-based', difficulty: 'Medium', description: 'Focus on core computer science fundamentals, OS concepts, and system design. Very developer-centric.', experienceCount: 180 },
  { id: 'goldman-sachs', name: 'Goldman Sachs', type: 'Fintech', difficulty: 'Hard', description: 'Strong focus on math, puzzles, object-oriented programming, and low-latency systems.', experienceCount: 89 },
  { id: 'atlassian', name: 'Atlassian', type: 'Product-based', difficulty: 'Medium', description: 'Values code quality, testing, and practical application development. System design is crucial.', experienceCount: 112 },
  { id: 'uber', name: 'Uber', type: 'Product-based', difficulty: 'Hard', description: 'Expect complex system design focusing on scale and geospatial data, along with hard algorithmic problems.', experienceCount: 95 }
];

export const CompaniesList = () => {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Company Specific Prep</h1>
        <p className="text-slate-600 dark:text-slate-400">Target your preparation for top tech companies.</p>
      </div>

      <div className="flex items-center gap-4 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search companies..." className="pl-10 shadow-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompanies.map((company, i) => (
          <motion.div key={company.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <CompanyCard company={company} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
