import { motion } from 'framer-motion';

export default function ProgressBar({ value, max, label, delay = 0 }) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        {label && <span className="text-xs text-slate-500 font-medium">{label}</span>}
        <span className="text-xs font-semibold text-white">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            percentage >= 75 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
            percentage >= 40 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
            'bg-gradient-to-r from-blue-500 to-purple-500'
          }`}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-slate-600">{value} / {max} completed</span>
      </div>
    </div>
  );
}
