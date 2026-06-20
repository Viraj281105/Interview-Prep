import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-2 p-1.5 bg-slate-100/80 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-800/50 w-full md:w-max">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 z-10 flex items-center gap-2 ${
              isActive 
                ? 'text-brand-indigo dark:text-brand-lavender' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-20 flex items-center gap-2">
              {tab.icon && <tab.icon size={16} />}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
