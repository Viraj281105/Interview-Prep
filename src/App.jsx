import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { AuthGuard } from './components/auth/AuthGuard';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Subjects } from './pages/Subjects';
import { SubjectDetail } from './pages/SubjectDetail';
import TopicPage from './pages/TopicPage';
import QuizDashboard from './pages/QuizDashboard';
import ActiveQuiz from './pages/ActiveQuiz';
import { CompaniesList } from './pages/CompaniesList';
import { CompanyProfile } from './pages/CompanyProfile';
import { MockInterviewDashboard } from './pages/MockInterviewDashboard';
import { AIAssistant } from './pages/AIAssistant';
import { Leaderboard } from './pages/Leaderboard';
import { PremiumUpgrade } from './pages/PremiumUpgrade';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Achievements } from './pages/Achievements';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename="/Interview-Prep">
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
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="premium" element={<PremiumUpgrade />} />
              <Route path="profile" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="settings" element={<AuthGuard><Settings /></AuthGuard>} />
              <Route path="achievements" element={<AuthGuard><Achievements /></AuthGuard>} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
