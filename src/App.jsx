import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Subjects } from './pages/Subjects';
import { SubjectDetail } from './pages/SubjectDetail';
import { CompaniesList } from './pages/CompaniesList';
import { CompanyProfile } from './pages/CompanyProfile';

// Dummy component for unbuilt routes
const ComingSoon = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
      <span className="text-3xl">🚀</span>
    </div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-slate-500 dark:text-slate-400">This feature is scheduled for the next phase of development!</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename="/Interview-Prep">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="subjects/:id" element={<SubjectDetail />} />
              <Route path="companies" element={<CompaniesList />} />
              <Route path="companies/:id" element={<CompanyProfile />} />
              <Route path="mock" element={<ComingSoon title="Mock Interview Engine" />} />
              <Route path="profile" element={<ComingSoon title="User Profile" />} />
              <Route path="login" element={<ComingSoon title="Sign In" />} />
              <Route path="*" element={<ComingSoon title="Page Not Found" />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
