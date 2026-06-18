import React from 'react';
import { RotateCcw } from 'lucide-react';

const difficultyConfig = {
  easy: { label: 'Easy', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', active: 'bg-emerald-500 text-white border-emerald-500' },
  medium: { label: 'Medium', color: 'bg-amber-500/15 text-amber-400 border-amber-500/25', active: 'bg-amber-500 text-white border-amber-500' },
  hard: { label: 'Hard', color: 'bg-red-500/15 text-red-400 border-red-500/25', active: 'bg-red-500 text-white border-red-500' },
  expert: { label: 'Expert', color: 'bg-purple-500/15 text-purple-400 border-purple-500/25', active: 'bg-purple-500 text-white border-purple-500' },
};

export function FilterBar({ filters, setFilters, difficulties = [], types = [] }) {
  const { difficulty, type, status } = filters;

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters = difficulty !== 'all' || type !== 'all' || status !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 border-y border-white/[0.04]">
      {/* Difficulty pills */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold mr-1">Difficulty</span>
        <button
          onClick={() => updateFilter('difficulty', 'all')}
          className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all duration-150 ${
            difficulty === 'all'
              ? 'bg-white/10 text-white border-white/20'
              : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/[0.04]'
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
              className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all duration-150 ${
                isActive ? cfg.active : `${cfg.color} hover:opacity-80`
              }`}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Separator */}
      <div className="h-5 w-px bg-white/[0.06] hidden sm:block" />

      {/* Type dropdown */}
      {types.length > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold mr-1">Type</span>
          <select
            value={type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 focus:outline-none focus:border-blue-500/40 cursor-pointer appearance-none pr-6 hover:bg-white/[0.06] transition-colors"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 6px center'
            }}
          >
            <option value="all">All types</option>
            {types.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
      )}

      {/* Separator */}
      <div className="h-5 w-px bg-white/[0.06] hidden sm:block" />

      {/* Status pills */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold mr-1">Status</span>
        {[
          { id: 'all', label: 'All' },
          { id: 'completed', label: 'Done' },
          { id: 'pending', label: 'Pending' },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => updateFilter('status', s.id)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all duration-150 ${
              status === s.id
                ? 'bg-white/10 text-white border-white/20'
                : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/[0.04]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <>
          <div className="h-5 w-px bg-white/[0.06]" />
          <button
            onClick={() => setFilters({ difficulty: 'all', type: 'all', status: 'all' })}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        </>
      )}
    </div>
  );
}
