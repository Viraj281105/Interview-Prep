import React from 'react';
import { RotateCcw } from 'lucide-react';

const difficultyConfig = {
  easy: { label: 'Easy', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', active: 'bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/20' },
  medium: { label: 'Medium', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', active: 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20' },
  hard: { label: 'Hard', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20', active: 'bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/20' },
  expert: { label: 'Expert', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', active: 'bg-purple-500 text-white border-purple-500 shadow-sm shadow-purple-500/20' },
};

export function FilterBar({ filters, setFilters, difficulties = [], types = [] }) {
  const { difficulty, type, status } = filters;

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters = difficulty !== 'all' || type !== 'all' || status !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
      {/* Difficulty pills */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mr-1">Difficulty</span>
        <button
          onClick={() => updateFilter('difficulty', 'all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
            difficulty === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
              : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All
        </button>
        {difficulties.map(d => {
          const cfg = difficultyConfig[d] || difficultyConfig.easy;
          const isActive = difficulty === d;
          return (
            <button
              key={d}
              onClick={() => updateFilter('difficulty', isActive ? 'all' : d)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                isActive ? cfg.active : `${cfg.color} hover:opacity-80`
              }`}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

      {/* Type dropdown */}
      {types.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mr-1">Type</span>
          <select
            value={type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent cursor-pointer appearance-none pr-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 8px center'
            }}
          >
            <option value="all">All Types</option>
            {types.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
      )}

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

      {/* Status pills */}
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mr-1">Status</span>
        {[
          { id: 'all', label: 'All' },
          { id: 'completed', label: 'Completed' },
          { id: 'pending', label: 'Pending' },
          { id: 'bookmarked', label: 'Bookmarked' }
        ].map(s => (
          <button
            key={s.id}
            onClick={() => updateFilter('status', s.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
              status === s.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <button
            onClick={() => setFilters({ difficulty: 'all', type: 'all', status: 'all' })}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-indigo dark:hover:text-brand-lavender transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw size={14} />
            Reset Filters
          </button>
        </>
      )}
    </div>
  );
}
