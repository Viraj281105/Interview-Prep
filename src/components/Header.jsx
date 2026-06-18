import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';

export function Header({ setIsMobileOpen }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Keyboard shortcut: Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced search — navigates to dashboard with search param
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      } else if (location.search.includes('search=')) {
        navigate('/');
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Clear search when navigating to a topic
  useEffect(() => {
    if (location.pathname.startsWith('/topic/')) {
      setSearchQuery('');
    }
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/[0.06] px-4 md:px-6 py-3 flex items-center gap-3">
      <button
        className="md:hidden text-slate-400 hover:text-white transition-colors"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className={`flex-1 max-w-xl mx-auto relative transition-all duration-200 ${isSearchFocused ? 'max-w-2xl' : ''}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-4 w-4 transition-colors ${isSearchFocused ? 'text-blue-400' : 'text-slate-500'}`} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search questions, topics, concepts..."
          className={`
            block w-full pl-9 pr-20 py-2 text-sm rounded-xl
            bg-white/[0.04] text-slate-200 placeholder-slate-600
            border transition-all duration-200
            ${isSearchFocused
              ? 'border-blue-500/40 bg-white/[0.06] ring-1 ring-blue-500/20'
              : 'border-white/[0.06] hover:border-white/[0.1]'
            }
            focus:outline-none
          `}
          id="global-search-input"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-slate-600 bg-white/[0.04] border border-white/[0.06] rounded font-mono">
            Ctrl+K
          </kbd>
        </div>
      </div>

      {/* Avatar */}
      <div className="hidden sm:flex items-center">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-purple-500/20">
          V
        </div>
      </div>
    </header>
  );
}
