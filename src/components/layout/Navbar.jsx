import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Moon, Sun, User, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Subjects', path: '/subjects' },
    { name: 'Companies', path: '/companies' },
    { name: 'Mock Interview', path: '/mock' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/70 shadow-sm shadow-brand-indigo/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-semibold text-2xl tracking-tight text-gradient-primary">
          <Code2 size={28} className="text-brand-indigo" />
          <span>PrepMaster</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
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

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Sun size={20} className="text-slate-300" /> : <Moon size={20} className="text-slate-600" />}
          </Button>
          
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
      </div>
    </nav>
  );
};
