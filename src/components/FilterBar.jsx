import React from 'react';

export function FilterBar({ difficultyFilter, setDifficultyFilter, statusFilter, setStatusFilter }) {
  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' }
  ];

  const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 mb-4 border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Difficulty:</span>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          {difficulties.map(d => (
            <button
              key={d.id}
              onClick={() => setDifficultyFilter(d.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                difficultyFilter === d.id 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Status:</span>
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          {statuses.map(s => (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                statusFilter === s.id 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
