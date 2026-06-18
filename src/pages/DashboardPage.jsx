import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock, Target, TrendingUp, BarChart3 } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { QuestionCard } from '../components/QuestionCard';
import { useApp } from '../context/AppContext';

export default function DashboardPage() {
  const { allModules, totalQuestions, totalCompleted, completed, getCompletedCount } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const pendingCount = totalQuestions - totalCompleted;
  const progressPercent = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;
  const estimatedHours = Math.round((pendingCount * 2) / 60); // 2 min per question

  // Global search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const results = [];
    allModules.forEach(mod => {
      mod.questions?.forEach(q => {
        const text = [q.question || '', q.answer || '', ...(q.concepts || [])].join(' ').toLowerCase();
        if (terms.every(term => text.includes(term))) {
          results.push({ ...q, moduleTitle: mod.title, moduleIcon: mod.icon, moduleId: mod.id });
        }
      });
    });
    return results;
  }, [searchQuery, allModules]);

  // If searching, show search results
  if (searchResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Search Results
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Found <span className="text-slate-300 font-medium">{searchResults.length}</span> questions matching "{searchQuery}"
          </p>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {searchResults.map((q) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <QuestionCard question={q} showTopic />
              </motion.div>
            ))}
          </AnimatePresence>
          {searchResults.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-600 text-sm">No questions match your search.</p>
              <p className="text-slate-700 text-xs mt-1">Try different keywords or check spelling.</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Welcome */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          Interview Prep
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 mt-1.5 text-sm"
        >
          Track your preparation progress across all topics
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatsCard
          icon={<BookOpen size={18} />}
          label="Topics"
          value={allModules.length}
          gradient="linear-gradient(135deg, #3b82f6, #06b6d4)"
          delay={0}
        />
        <StatsCard
          icon={<Target size={18} />}
          label="Questions"
          value={totalQuestions}
          gradient="linear-gradient(135deg, #8b5cf6, #a855f7)"
          delay={0.05}
        />
        <StatsCard
          icon={<CheckCircle2 size={18} />}
          label="Completed"
          value={totalCompleted}
          gradient="linear-gradient(135deg, #22c55e, #10b981)"
          delay={0.1}
        />
        <StatsCard
          icon={<Clock size={18} />}
          label="Pending"
          value={pendingCount}
          gradient="linear-gradient(135deg, #f59e0b, #f97316)"
          delay={0.15}
        />
        <StatsCard
          icon={<TrendingUp size={18} />}
          label="Progress"
          value={`${progressPercent}%`}
          gradient="linear-gradient(135deg, #ec4899, #f43f5e)"
          delay={0.2}
        />
        <StatsCard
          icon={<BarChart3 size={18} />}
          label="Est. Hours"
          value={`${estimatedHours}h`}
          gradient="linear-gradient(135deg, #6366f1, #8b5cf6)"
          delay={0.25}
        />
      </div>

      {/* Topic Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">All Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allModules.map((mod, i) => {
            const questionIds = mod.questions?.map(q => q.id) || [];
            const completedCount = getCompletedCount(questionIds);
            const totalCount = questionIds.length;
            const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <motion.button
                key={mod.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                onClick={() => navigate(`/topic/${mod.id}`)}
                className="text-left p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-200 group"
                id={`topic-card-${mod.id}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors truncate">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                      {mod.summary}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] text-slate-600">{completedCount} / {totalCount} questions</span>
                    <span className={`text-[11px] font-semibold ${
                      progress >= 75 ? 'text-emerald-400' :
                      progress >= 40 ? 'text-amber-400' :
                      progress > 0 ? 'text-blue-400' : 'text-slate-600'
                    }`}>
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                      className={`h-full rounded-full ${
                        progress >= 75 ? 'bg-emerald-500' :
                        progress >= 40 ? 'bg-amber-500' :
                        progress > 0 ? 'bg-blue-500' : 'bg-transparent'
                      }`}
                    />
                  </div>
                </div>

                {/* Concepts preview */}
                {mod.concepts && mod.concepts.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {mod.concepts.slice(0, 4).map((c, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-600">
                        {c}
                      </span>
                    ))}
                    {mod.concepts.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-slate-700">
                        +{mod.concepts.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
