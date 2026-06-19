import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} PrepMaster. All rights reserved.</p>
        <p className="mt-2">Master Technical Interviews with Structured Preparation.</p>
      </div>
    </footer>
  );
};
