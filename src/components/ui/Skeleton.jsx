import React from 'react';

export function Skeleton({ className = '', variant = 'rectangular', ...props }) {
  const baseClass = "animate-pulse bg-slate-200 dark:bg-slate-800";
  
  const variants = {
    rectangular: "rounded-xl",
    circular: "rounded-full",
    text: "rounded-md h-4"
  };

  return (
    <div 
      className={`${baseClass} ${variants[variant]} ${className}`} 
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
      <Skeleton variant="circular" className="w-12 h-12 mb-4" />
      <Skeleton variant="text" className="w-3/4 h-6 mb-2" />
      <Skeleton variant="text" className="w-1/2 mb-6" />
      <Skeleton className="w-full h-10 mt-auto" />
    </div>
  );
}
