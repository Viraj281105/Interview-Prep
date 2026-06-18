import React from 'react';

const config = {
  easy: { label: 'Easy', bg: 'bg-emerald-500/12', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  medium: { label: 'Medium', bg: 'bg-amber-500/12', text: 'text-amber-400', border: 'border-amber-500/20' },
  hard: { label: 'Hard', bg: 'bg-red-500/12', text: 'text-red-400', border: 'border-red-500/20' },
  expert: { label: 'Expert', bg: 'bg-purple-500/12', text: 'text-purple-400', border: 'border-purple-500/20' },
};

export default function DifficultyBadge({ difficulty }) {
  const c = config[difficulty] || config.easy;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${c.bg} ${c.text} ${c.border}`}
    >
      {c.label}
    </span>
  );
}
