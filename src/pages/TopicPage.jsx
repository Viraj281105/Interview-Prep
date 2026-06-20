import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, List, Play, CheckCircle2, Save } from 'lucide-react';
import { allDataModules } from '../data/index';
import { useAppStore } from '../store';
import { useFilteredQuestions } from '../hooks/useFilteredQuestions';
import { QuestionCard } from '../components/ui/QuestionCard';
import { FilterBar } from '../components/ui/FilterBar';
import { Tabs } from '../components/ui/Tabs';
import { Flashcard } from '../components/practice/Flashcard';
import { Button } from '../components/ui/Button';

export default function TopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  
  const { completedQuestions, bookmarkedQuestions, userNotes, saveNote } = useAppStore();

  const [activeTab, setActiveTab] = useState('questions');
  const [filters, setFilters] = useState({ difficulty: 'all', type: 'all', status: 'all' });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Note state
  const [noteText, setNoteText] = useState('');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // Flashcard State
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const module = useMemo(() => {
    return allDataModules.find(m => m.id === topicId);
  }, [topicId]);

  useEffect(() => {
    if (module && userNotes[module.id]) {
      setNoteText(userNotes[module.id]);
    }
  }, [module, userNotes]);

  const questions = module?.questions || [];
  const filteredQuestions = useFilteredQuestions(questions, filters, searchQuery, completedQuestions, bookmarkedQuestions);

  if (!module) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Module not found.</h2>
        <Button onClick={() => navigate('/subjects')} variant="outline">
          <ArrowLeft size={16} className="mr-2" /> Back to Subjects
        </Button>
      </div>
    );
  }

  const moduleCompletedCount = questions.filter(q => completedQuestions.includes(q.id)).length;
  const totalCount = questions.length;
  const progressPercentage = totalCount > 0 ? Math.round((moduleCompletedCount / totalCount) * 100) : 0;

  const topicDifficulties = useMemo(() => {
    const set = new Set(questions.map(q => q.difficulty).filter(Boolean));
    const order = ['easy', 'medium', 'hard', 'expert'];
    return order.filter(d => set.has(d));
  }, [questions]);

  const topicTypes = useMemo(() => {
    const set = new Set(questions.map(q => q.type).filter(Boolean));
    return Array.from(set).sort();
  }, [questions]);

  const handleSaveNote = () => {
    saveNote(module.id, noteText);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  const handleNextFlashcard = (success) => {
    if (success) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    } else {
      setShowCompletion(true);
    }
  };

  const startFlashcards = () => {
    setActiveQuestionIndex(0);
    setShowCompletion(false);
    setScore({ correct: 0, total: questions.length });
  };

  return (
    <div className="flex flex-col w-full py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-indigo dark:hover:text-brand-lavender transition-colors group mb-6"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-indigo/10 to-brand-purple/10 text-brand-indigo dark:text-brand-lavender flex items-center justify-center text-3xl shadow-inner shrink-0">
              {module.icon || '📚'}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">
                {module.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                {module.summary}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end shrink-0">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Mastery</div>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full bg-brand-indigo dark:bg-brand-lavender"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-20 z-30 py-4 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 mb-8 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <Tabs 
          activeTab={activeTab} 
          onChange={setActiveTab}
          tabs={[
            { id: 'concepts', label: 'Concepts & Notes', icon: BookOpen },
            { id: 'questions', label: 'Question Bank', icon: List },
            { id: 'flashcards', label: 'Flashcards', icon: Play },
          ]} 
        />
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* TAB: CONCEPTS & NOTES */}
          {activeTab === 'concepts' && (
            <motion.div
              key="concepts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-8"
            >
              {module.concepts && module.concepts.length > 0 && (
                <div className="bg-white/60 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/50 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-sm">
                  <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-brand-indigo" /> Core Concepts
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {module.concepts.map((concept, i) => (
                      <span key={i} className="px-3 py-1.5 bg-brand-indigo/10 text-brand-indigo dark:text-brand-lavender text-sm font-semibold rounded-xl border border-brand-indigo/20">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white/60 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/50 p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-sm flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-heading font-bold">Personal Notes</h3>
                  <Button onClick={handleSaveNote} size="sm" className="gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900">
                    {isNoteSaved ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Save size={16} />}
                    {isNoteSaved ? 'Saved' : 'Save Notes'}
                  </Button>
                </div>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Jot down your learnings, formulas, or reminders for this module here..."
                  className="w-full flex-1 min-h-[300px] p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 resize-y text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
                />
              </div>
            </motion.div>
          )}

          {/* TAB: QUESTION BANK */}
          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-6 relative">
                <input
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 shadow-sm transition-shadow"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>

              <FilterBar
                filters={filters}
                setFilters={setFilters}
                difficulties={topicDifficulties}
                types={topicTypes}
              />

              <div className="text-sm font-semibold text-slate-500 my-6">
                Showing {filteredQuestions.length} of {totalCount} questions
              </div>

              <div className="flex flex-col gap-4 pb-12">
                <AnimatePresence mode="popLayout">
                  {filteredQuestions.map((q, i) => (
                    <motion.div
                      key={q.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <QuestionCard question={q} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredQuestions.length === 0 && (
                  <div className="py-20 text-center bg-white/40 dark:bg-slate-900/20 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 font-medium text-lg">No questions found matching your filters.</p>
                    <Button variant="ghost" className="mt-4 text-brand-indigo" onClick={() => {setFilters({ difficulty: 'all', type: 'all', status: 'all' }); setSearchQuery('');}}>
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB: FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="py-6"
            >
              {questions.length === 0 ? (
                <div className="text-center text-slate-500 py-12">No questions available for flashcards.</div>
              ) : showCompletion ? (
                <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center py-16 text-center bg-white/60 dark:bg-slate-900/40 rounded-3xl backdrop-blur-md border border-white/40 dark:border-slate-800 shadow-sm">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="mb-8">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 size={48} />
                    </div>
                  </motion.div>
                  <h2 className="text-3xl font-heading font-bold mb-4">Deck Completed!</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                    You scored <strong className="text-slate-900 dark:text-white">{score.correct}</strong> out of {score.total}.
                  </p>
                  <div className="flex gap-4">
                    <Button onClick={startFlashcards} variant="outline">Review Again</Button>
                    <Button onClick={() => setActiveTab('questions')}>Back to Questions</Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setActiveTab('questions')}>
                      <ArrowLeft size={16} className="mr-2" /> End Session
                    </Button>
                    <div className="text-sm font-bold text-slate-500 bg-slate-200 dark:bg-slate-800 px-4 py-1.5 rounded-full">
                      Card {activeQuestionIndex + 1} of {questions.length}
                    </div>
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2 shadow-inner">
                    <motion.div 
                      className="h-full bg-brand-indigo dark:bg-brand-lavender rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeQuestionIndex) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeQuestionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Flashcard question={questions[activeQuestionIndex]} onNext={handleNextFlashcard} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
