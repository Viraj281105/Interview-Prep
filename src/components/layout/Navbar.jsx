import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Moon, Sun, User, Code2 } from 'lucide-react';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-bold text-xl tracking-tight">
          <Code2 size={24} />
          <span>PrepMaster</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link to="/subjects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Subjects</Link>
          <Link to="/companies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Companies</Link>
          <Link to="/mock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mock Interview</Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          {currentUser ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full bg-slate-100 dark:bg-slate-800">
                <User size={20} />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
