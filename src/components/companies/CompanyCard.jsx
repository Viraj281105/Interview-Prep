import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Building2, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompanyCard = ({ company }) => {
  return (
    <Card className="p-6 hover:shadow-lg hover:border-blue-500/50 transition-all flex flex-col group">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
          ) : (
            <Building2 size={32} className="text-slate-400" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold">{company.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
              company.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
              company.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
              'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            }`}>
              {company.difficulty}
            </span>
            <span className="text-xs text-slate-500">{company.type}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 line-clamp-3">
        {company.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Briefcase size={14} /> {company.experienceCount || 0} Experiences
        </div>
        <Link to={`/companies/${company.id}`}>
          <Button variant="ghost" size="sm" className="gap-1 text-blue-600 dark:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
            View Prep <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
