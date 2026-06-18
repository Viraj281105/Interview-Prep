import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const { allModules, getCompletedCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const isDashboard = currentPath === '/' || currentPath === '';

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const containerClasses = `
    fixed inset-y-0 left-0 z-50 w-64
    backdrop-blur-xl bg-[#0c0c18]/90 border-r border-white/[0.06]
    transform transition-transform duration-300 ease-in-out
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:h-screen
    flex flex-col
  `;

  return (
    <div className={containerClasses}>
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between flex-shrink-0">
        <button onClick={() => handleNavigate('/')} className="text-left group">
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
            Interview Prep
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">Technical Mastery Portal</p>
        </button>
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
        {/* Dashboard */}
        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigate('/')}
          className={`
            w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200
            ${isDashboard
              ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
              : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
            }
          `}
        >
          <LayoutDashboard size={18} className={isDashboard ? 'text-blue-400' : ''} />
          <span className="font-medium text-sm">Dashboard</span>
        </motion.button>

        {/* Divider */}
        <div className="py-2 px-3.5">
          <div className="border-t border-white/[0.04]" />
          <span className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold mt-2 block">Topics</span>
        </div>

        {/* Topic list */}
        {allModules.map((mod) => {
          const isActive = currentPath === `/topic/${mod.id}`;
          const questionIds = mod.questions?.map(q => q.id) || [];
          const completedCount = getCompletedCount(questionIds);
          const totalCount = questionIds.length;
          const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

          return (
            <motion.button
              key={mod.id}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigate(`/topic/${mod.id}`)}
              className={`
                w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 group
                ${isActive
                  ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent'
                }
              `}
            >
              <span className="text-base flex-shrink-0">{mod.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm truncate">{mod.title}</span>
                  <span className={`text-[10px] font-medium flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>
                    {completedCount}/{totalCount}
                  </span>
                </div>
                {/* Mini progress bar */}
                <div className="w-full h-[2px] bg-white/[0.04] rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      progress >= 75 ? 'bg-emerald-500' :
                      progress >= 40 ? 'bg-amber-500' :
                      progress > 0 ? 'bg-blue-500' : 'bg-transparent'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-purple-500/20">
            V
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-300 truncate">Viraj</p>
            <p className="text-[10px] text-slate-600">Interview Prep</p>
          </div>
        </div>
      </div>
    </div>
  );
}
