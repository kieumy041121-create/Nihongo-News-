/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LiveNewsTicker } from './components/common/LiveNewsTicker';
import { Dashboard } from './components/home/Dashboard';
import { ArticlesLibrary } from './components/articles/ArticlesLibrary';
import { PressHub } from './components/press/PressHub';
import { ArticleReader } from './components/reader/ArticleReader';
import { ListeningLab } from './components/listening/ListeningLab';
import { FlashcardDeck } from './components/flashcards/FlashcardDeck';
import { JlptSimulator } from './components/simulator/JlptSimulator';
import { UserProfileView } from './components/profile/UserProfileView';
import { AiSenseiDrawer } from './components/sensei/AiSenseiDrawer';
import { RadioPlayerBar } from './components/radio/RadioPlayerBar';

const MainContent: React.FC = () => {
  const { activeTab, selectedArticle, articles } = useApp();

  return (
    <main className="min-h-[calc(100vh-16rem)]">
      {activeTab === 'home' && <Dashboard />}
      {activeTab === 'articles' && <ArticlesLibrary />}
      {activeTab === 'press' && <PressHub />}
      {activeTab === 'reader' && (
        <ArticleReader article={selectedArticle || articles[0]} />
      )}
      {activeTab === 'listening' && <ListeningLab />}
      {activeTab === 'flashcards' && <FlashcardDeck />}
      {activeTab === 'simulator' && <JlptSimulator />}
      {activeTab === 'profile' && <UserProfileView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FBFBFA] dark:bg-[#121316] text-[#1E2024] dark:text-[#E2E4E9] transition-colors duration-200">
        <LiveNewsTicker />
        <Header />
        <MainContent />
        <Footer />
        <ToastContainer />
        <AiSenseiDrawer />
        <RadioPlayerBar />
      </div>
    </AppProvider>
  );
}
