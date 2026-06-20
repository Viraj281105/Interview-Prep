import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 relative">
      {/* Background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="text-[120px] md:text-[180px] font-heading font-bold text-gradient-primary leading-none mb-4"
        >
          404
        </motion.div>
        
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-slate-50 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button variant="gradient" size="lg" className="gap-2 rounded-xl">
              <Home size={18} /> Go Home
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2 rounded-xl" onClick={() => window.history.back()}>
            <ArrowLeft size={18} /> Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
