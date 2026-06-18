import { motion } from 'framer-motion';

export default function StatsCard({ icon, label, value, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="rounded-2xl p-4 relative overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] transition-colors group cursor-default"
    >
      {/* Background glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-15 group-hover:opacity-25 transition-opacity duration-500"
        style={{ background: gradient }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${gradient}18` }}
          >
            {icon}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-xl font-bold text-white"
        >
          {value}
        </motion.div>
        <span className="text-[11px] text-slate-600 font-medium">{label}</span>
      </div>
    </motion.div>
  );
}
