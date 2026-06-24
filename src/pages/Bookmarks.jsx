import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, FolderOpen, Search, Filter } from 'lucide-react';
import { useAppStore } from '../store';
import { Card } from '../components/ui/Card';
import { QuestionCard } from '../components/ui/QuestionCard';

export const Bookmarks = () => {
  const { bookmarkedQuestions, allDataModules } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Find actual question objects for the bookmarked IDs
  const savedItems = useMemo(() => {
    if (!bookmarkedQuestions || bookmarkedQuestions.length === 0) return [];
    
    const items = [];
    allDataModules.forEach(module => {
      if (module.questions) {
        module.questions.forEach(q => {
          if (bookmarkedQuestions.includes(q.id)) {
            items.push({
              ...q,
              moduleTitle: module.title,
              moduleIcon: module.icon || '📚'
            });
          }
        });
      }
    });
    return items;
  }, [bookmarkedQuestions, allDataModules]);

  // Filter items
  const filteredItems = useMemo(() => {
    return savedItems.filter(item => {
      const matchesSearch = item.question?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.moduleTitle?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [savedItems, searchQuery, filterType]);

  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-4 sm:px-6">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-brand-indigo/10 rounded-2xl text-brand-indigo">
            <Bookmark size={28} className="fill-current" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 dark:text-slate-50">Bookmarks</h1>
            <p className="text-slate-500">Review your saved questions and flashcards for later study.</p>
          </div>
        </div>

        {savedItems.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search bookmarks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-indigo/50"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'mcq', 'flashcard'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all border ${
                    filterType === type 
                      ? 'border-brand-indigo bg-brand-indigo/10 text-brand-indigo' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {savedItems.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
            <FolderOpen size={32} />
          </div>
          <h2 className="text-xl font-bold mb-2">No bookmarks yet</h2>
          <p className="text-slate-500 max-w-sm mb-6">
            When you're studying topics, click the bookmark icon on any question to save it here for quick review later.
          </p>
        </Card>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No bookmarks match your search filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <QuestionCard question={item} showTopic={true} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
