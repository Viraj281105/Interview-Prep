import React from 'react';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout';
import { CategoryPage } from './pages/CategoryPage';

export default function App() {
  return (
    <DataProvider>
      <Layout>
        <CategoryPage />
      </Layout>
    </DataProvider>
  );
}
