import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { AuthGuard } from './components/auth/AuthGuard';
import { Loader2 } from 'lucide-react';
import { useAppStore } from './store';

// Eagerly loaded
import { Home } from './pages/Home';
import { Login } from './pages/Login';

// Lazy loaded for performance (Code Splitting)
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Subjects = lazy(() => import('./pages/Subjects').then(module => ({ default: module.Subjects })));
const SubjectDetail = lazy(() => import('./pages/SubjectDetail').then(module => ({ default: module.SubjectDetail })));
const TopicPage = lazy(() => import('./pages/TopicPage'));
const QuizDashboard = lazy(() => import('./pages/QuizDashboard'));
const ActiveQuiz = lazy(() => import('./pages/ActiveQuiz'));
const CompaniesList = lazy(() => import('./pages/CompaniesList').then(module => ({ default: module.CompaniesList })));
const CompanyProfile = lazy(() => import('./pages/CompanyProfile').then(module => ({ default: module.CompanyProfile })));
const MockInterviewDashboard = lazy(() => import('./pages/MockInterviewDashboard').then(module => ({ default: module.MockInterviewDashboard })));
const AIAssistant = lazy(() => import('./pages/AIAssistant').then(module => ({ default: module.AIAssistant })));
const RoadmapGenerator = lazy(() => import('./pages/RoadmapGenerator'));
const Leaderboard = lazy(() => import('./pages/Leaderboard').then(module => ({ default: module.Leaderboard })));
const PremiumUpgrade = lazy(() => import('./pages/PremiumUpgrade').then(module => ({ default: module.PremiumUpgrade })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const Settings = lazy(() => import('./pages/Settings').then(module => ({ default: module.Settings })));
const Achievements = lazy(() => import('./pages/Achievements').then(module => ({ default: module.Achievements })));
const Bookmarks = lazy(() => import('./pages/Bookmarks').then(module => ({ default: module.Bookmarks })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

// Fallback loader
const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center text-brand-indigo">
    <Loader2 className="animate-spin mb-4" size={32} />
    <span className="text-slate-500 font-medium animate-pulse">Loading experience...</span>
  </div>
);

function App() {
  const fetchCoreData = useAppStore(state => state.fetchCoreData);
  const isDataLoaded = useAppStore(state => state.isDataLoaded);

  useEffect(() => {
    fetchCoreData();
  }, [fetchCoreData]);

  if (!isDataLoaded) {
    return <PageLoader />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename="/Interview-Prep">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                
                {/* Protected routes — require authentication */}
                <Route path="dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="subjects" element={<Subjects />} />
                <Route path="subjects/:id" element={<SubjectDetail />} />
                <Route path="topic/:topicId" element={<TopicPage />} />
                <Route path="quiz" element={<QuizDashboard />} />
                <Route path="quiz/:quizId" element={<ActiveQuiz />} />
                <Route path="companies" element={<CompaniesList />} />
                <Route path="companies/:id" element={<CompanyProfile />} />
                <Route path="mock" element={<MockInterviewDashboard />} />
                <Route path="ai" element={<AuthGuard><AIAssistant /></AuthGuard>} />
                <Route path="roadmap" element={<RoadmapGenerator />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="premium" element={<PremiumUpgrade />} />
                <Route path="profile" element={<AuthGuard><Profile /></AuthGuard>} />
                <Route path="settings" element={<AuthGuard><Settings /></AuthGuard>} />
                <Route path="achievements" element={<AuthGuard><Achievements /></AuthGuard>} />
                <Route path="bookmarks" element={<AuthGuard><Bookmarks /></AuthGuard>} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
