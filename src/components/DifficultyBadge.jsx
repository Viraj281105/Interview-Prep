import { motion } from 'framer-motion';

export default function DifficultyBadge({ difficulty }) {
  const config = {
    easy: { label: 'Easy', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    medium: { label: 'Medium', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
    hard: { label: 'Hard', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
  };

  const c = config[difficulty] || config.easy;

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}
    >
      {c.label}
    </motion.span>
  );
}
