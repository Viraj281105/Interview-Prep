import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { Moon, Sun, User, Code2, Menu, X, LogOut, Settings as SettingsIcon, Flame, Award, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, MOBILE_NAV_LINKS } from '../../constants/routes';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, signOut } = useAuth();
  const { currentStreak, xp, level } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hidden md:flex hover:bg-slate-100 dark:hover:bg-slate-800">
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
          </Button>

          {/* Streak indicator */}
          {currentStreak > 0 && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 cursor-pointer"
            >
              <Flame size={16} className="text-brand-pink fill-brand-pink animate-pulse" />
              <span className="text-sm font-bold text-orange-700 dark:text-orange-400">{currentStreak}</span>
            </motion.div>
          )}

          {/* Level indicator */}
          <div className="hidden md:flex flex-col items-end justify-center mr-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Level {level}</span>
             <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-0.5">
               <div className="h-full bg-gradient-primary" style={{ width: `${(xp % 500) / 5}%` }} />
             </div>
          </div>
          
          {/* Auth button (desktop) */}
          <div className="hidden md:block relative">
            {currentUser ? (
              <div className="relative">
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <User size={20} className="text-brand-indigo dark:text-brand-lavender" />
                </Button>
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden py-1 z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setProfileMenuOpen(false)}>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <User size={16} /> Profile
                        </button>
                      </Link>
                      <Link to="/achievements" onClick={() => setProfileMenuOpen(false)}>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <Award size={16} /> Achievements
                        </button>
                      </Link>
                      <Link to="/bookmarks" onClick={() => setProfileMenuOpen(false)}>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <Bookmark size={16} /> Bookmarks
                        </button>
                      </Link>
                      <Link to="/settings" onClick={() => setProfileMenuOpen(false)}>
                        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                          <SettingsIcon size={16} /> Settings
                        </button>
                      </Link>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                      <button 
                        onClick={async () => {
                          setProfileMenuOpen(false);
                          await signOut();
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
              <div className="border-t border-slate-200 dark:border-slate-800 mt-2 pt-3 flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl gap-2 justify-start px-4"
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                >
                  {theme === 'dark' ? <><Sun size={18} className="text-amber-400" /> Light Mode</> : <><Moon size={18} className="text-slate-600" /> Dark Mode</>}
                </Button>
                
                {currentUser ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl gap-2 justify-start px-4">
                        <User size={18} /> Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full rounded-xl gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors justify-start px-4"
                      onClick={async () => {
                        setMobileMenuOpen(false);
                        await signOut();
                        navigate('/login');
                      }}
                    >
                      <LogOut size={18} /> Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="gradient" className="w-full rounded-xl mt-2">Sign In</Button>
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
