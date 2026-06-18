import { motion } from 'framer-motion';

export default function StatsCard({ icon, label, value, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass rounded-2xl p-6 relative overflow-hidden group cursor-default"
    >
      {/* Background glow */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
        style={{ background: gradient }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: `${gradient}22` }}
          >
            {icon}
          </div>
          <span className="text-sm text-gray-400 font-medium">{label}</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="text-3xl font-bold text-white"
        >
          {value}
        </motion.div>
      </div>
    </motion.div>
  );
}
