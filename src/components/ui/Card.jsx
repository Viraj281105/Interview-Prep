import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const Card = ({ className, children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border border-slate-200 bg-white/50 backdrop-blur-md shadow-sm dark:border-slate-800 dark:bg-slate-900/50",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
