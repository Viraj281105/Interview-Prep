import React from 'react';
import { useData } from '../context/DataContext';
import { Menu, Search } from 'lucide-react';

export function Header({ setIsMobileOpen }) {
  const { searchQuery, setSearchQuery } = useData();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/60 border-b border-white/10 px-6 py-4 flex items-center gap-4">
      <button 
        className="md:hidden text-slate-300 hover:text-white"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 max-w-2xl mx-auto relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions, concepts, answers..."
          className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all sm:text-sm"
        />
      </div>
      
      {/* Optional: User profile or extra tools here */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/30">
          V
        </div>
      </div>
    </header>
  );
}
