import React from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

export function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const { allDataModules, activeCategory, setActiveCategory, setSearchQuery } = useData();

  const handleSelect = (id) => {
    setActiveCategory(id);
    setSearchQuery(''); // clear search when navigating
    setIsMobileOpen(false);
  };

  const containerClasses = `
    fixed inset-y-0 left-0 z-50 w-64
    backdrop-blur-xl bg-slate-900/80 border-r border-white/10
    transform transition-transform duration-300 ease-in-out
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:h-screen
  `;

  return (
    <div className={containerClasses}>
      <div className="flex flex-col h-full">
        {/* Logo / Header area */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Viraj Tech Mastery
            </h1>
            <p className="text-xs text-slate-400 mt-1">Interview Prep Portal</p>
          </div>
          {/* Mobile close button */}
          <button 
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {allDataModules.map((mod) => {
            const isActive = activeCategory === mod.id;
            return (
              <motion.button
                key={mod.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(mod.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors
                  ${isActive 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <span className="text-xl">{mod.icon}</span>
                <span className="font-medium text-sm">{mod.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
