import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/20 bg-white/30 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/30 py-8 mt-auto z-10">
      <div className="container mx-auto px-6 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p className="font-medium">© {new Date().getFullYear()} PrepMaster. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-80">Master Technical Interviews with Structured Preparation.</p>
      </div>
    </footer>
  );
};
