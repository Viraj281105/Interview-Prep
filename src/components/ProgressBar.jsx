import { motion } from 'framer-motion';

export default function ProgressBar({ value, max, label, color = 'from-blue-500 to-purple-500', delay = 0 }) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 font-medium">{label}</span>
          <span className="text-sm font-semibold text-white">{percentage}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">{value} / {max}</span>
      </div>
    </div>
  );
}
