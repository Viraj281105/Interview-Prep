import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DifficultyBadge from './DifficultyBadge';

import { programmingLanguagesData } from '../data/programmingLanguages';
import { backendEngineeringData } from '../data/backendEngineering';
import { frontendEngineeringData } from '../data/frontendEngineering';
import { databasesData } from '../data/databases';
import { aiMlData } from '../data/aiMl';
import { infraDevopsData } from '../data/infraDevops';
import { dsaData } from '../data/dsa';
import { coreCsData } from '../data/coreCs';
import { projectsData } from '../data/projects';
import { hrQuestionsData } from '../data/hrQuestions';

const allSections = [
  { data: programmingLanguagesData, path: '/programming-languages', title: 'Programming Languages' },
  { data: backendEngineeringData, path: '/backend-engineering', title: 'Backend Engineering' },
  { data: frontendEngineeringData, path: '/frontend-engineering', title: 'Frontend Engineering' },
  { data: databasesData, path: '/databases', title: 'Databases' },
  { data: aiMlData, path: '/ai-ml', title: 'AI / Machine Learning' },
  { data: infraDevopsData, path: '/infra-devops', title: 'Infrastructure & DevOps' },
  { data: dsaData, path: '/dsa', title: 'DSA & Problem Solving' },
  { data: coreCsData, path: '/core-cs', title: 'Core CS Subjects' },
  { data: projectsData, path: '/projects', title: 'Projects Deep Dive' },
  { data: hrQuestionsData, path: '/hr-questions', title: 'HR Questions' },
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Build flat search index
  const searchIndex = useMemo(() => {
    const idx = [];
    for (const section of allSections) {
      for (const topic of section.data) {
        for (const q of topic.questions) {
          idx.push({
            ...q,
            topicTitle: topic.title,
            topicIcon: topic.icon,
            sectionTitle: section.title,
            sectionPath: section.path,
          });
        }
      }
    }
    return idx;
  }, []);

  // Search
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return searchIndex
      .filter(item => {
        const text = `${item.question} ${item.answer} ${item.topicTitle} ${item.sectionTitle}`.toLowerCase();
        return terms.every(t => text.includes(t));
      })
      .slice(0, 20);
  }, [query, searchIndex]);

  // Keyboard shortcut: Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const handleSelect = (result) => {
    navigate(result.sectionPath);
    setIsOpen(false);
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 w-full max-w-md hover:bg-white/[0.04] transition-all group"
      >
        <Search size={16} className="text-gray-500 group-hover:text-gray-400" />
        <span className="text-sm text-gray-500 flex-1 text-left">Search questions...</span>
        <div className="flex items-center gap-1 text-gray-600">
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">Ctrl</kbd>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">K</kbd>
        </div>
      </button>

      {/* Search modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl glass-strong rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Search size={20} className="text-purple-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search across all questions, topics, and answers..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
                />
                <button onClick={() => setIsOpen(false)}>
                  <X size={18} className="text-gray-500 hover:text-gray-300" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="px-5 py-8 text-center text-gray-500 text-sm">
                    Start typing to search across {searchIndex.length}+ questions...
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-5 py-8 text-center text-gray-500 text-sm">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="py-2">
                    {results.map((r, i) => (
                      <button
                        key={r.id}
                        onClick={() => handleSelect(r)}
                        className="w-full text-left px-5 py-3 hover:bg-white/5 transition-colors flex items-start gap-3"
                      >
                        <span className="text-lg mt-0.5">{r.topicIcon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-200 font-medium truncate">{r.question}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{r.sectionTitle}</span>
                            <span className="text-gray-700">›</span>
                            <span className="text-xs text-gray-500">{r.topicTitle}</span>
                            <DifficultyBadge difficulty={r.difficulty} />
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-gray-600 mt-1 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/5 flex items-center gap-4 text-xs text-gray-600">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
