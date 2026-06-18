import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import TopicPage from './pages/TopicPage';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}
