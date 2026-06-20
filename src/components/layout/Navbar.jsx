import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Moon, Sun, User, Code2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, MOBILE_NAV_LINKS } from '../../constants/routes';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 shadow-sm shadow-brand-indigo/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-heading font-semibold text-2xl tracking-tight text-gradient-primary">
          <Code2 size={28} className="text-brand-indigo" />
          <span>PrepMaster</span>
        </Link>
        
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className="relative group">
              <span className={`transition-colors duration-200 ${location.pathname === link.path ? 'text-brand-indigo dark:text-brand-lavender' : 'text-slate-600 dark:text-slate-300 group-hover:text-brand-indigo dark:group-hover:text-brand-lavender'}`}>
                {link.name}
              </span>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-5 left-0 right-0 h-0.5 bg-gradient-primary rounded-t-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Sun size={20} className="text-slate-300" /> : <Moon size={20} className="text-slate-600" />}
          </Button>
          
          {/* Auth button (desktop) */}
          <div className="hidden md:block">
            {currentUser ? (
              <Link to="/profile">
                <Button variant="glass" size="icon" className="rounded-full">
                  <User size={20} className="text-brand-indigo dark:text-brand-lavender" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="gradient" size="sm" className="rounded-full px-6 shadow-md shadow-brand-indigo/20">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-slate-200/50 dark:border-slate-800/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {MOBILE_NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? 'bg-brand-indigo/10 text-brand-indigo dark:text-brand-lavender font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile auth button */}
              <div className="border-t border-slate-200 dark:border-slate-800 mt-2 pt-3">
                {currentUser ? (
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl gap-2">
                      <User size={18} /> Profile
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="gradient" className="w-full rounded-xl">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
