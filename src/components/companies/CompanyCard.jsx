import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Building2, Briefcase, ChevronRight, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompanyCard = ({ company }) => {
  return (
    <Card animated glass className="p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col group border-white/40 dark:border-slate-800/50">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0`}>
          <span className="text-2xl font-bold text-white tracking-tighter">
            {company.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">{company.name}</h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
              company.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
              company.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
              'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            }`}>
              {company.difficulty}
            </span>
            <span className="text-xs font-semibold text-slate-500">{company.type}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 flex-1 line-clamp-3 leading-relaxed">
        {company.description}
      </p>

      {company.tags && (
        <div className="flex flex-wrap gap-2 mb-6">
          {company.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-lg font-medium border border-slate-200 dark:border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Briefcase size={14} className="text-slate-400" /> {company.experienceCount || 0} Experiences
        </div>
        <Link to={`/companies/${company.id}`}>
          <Button variant="ghost" size="sm" className="gap-2 px-3 text-brand-indigo dark:text-brand-lavender rounded-lg opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 bg-brand-indigo/5 dark:bg-brand-lavender/5">
            Start Mock <ChevronRight size={14} />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
