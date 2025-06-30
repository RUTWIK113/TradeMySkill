import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { ExploreSkills } from './pages/ExploreSkills';
import { ScheduleSession } from './pages/ScheduleSession';
import { Chat } from './pages/Chat';
import { FriendRequests } from './pages/FriendRequests';
import { Profile } from './pages/Profile';
import { MyLearning } from './pages/MyLearning';
import { Progress } from './pages/Progress';
import { Achievements } from './pages/Achievements';
import { Settings } from './pages/Settings';
import { ProfileSetup } from './pages/ProfileSetup';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import TestConnection from './components/TestConnection'; // Add this import

const AppContent: React.FC = () => {
  const { currentPage, isAuthenticated, loading, user } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" variant="brain" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Trade My Skill...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    // Profile setup flow
    if (isAuthenticated && user && !user.profileCompleted) {
      return <ProfileSetup />;
    }

    switch (currentPage) {
      case 'profile-setup':
        return isAuthenticated ? <ProfileSetup /> : <Landing />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard /> : <Landing />;
      case 'explore':
        return isAuthenticated ? <ExploreSkills /> : <Landing />;
      case 'schedule':
        return isAuthenticated ? <ScheduleSession /> : <Landing />;
      case 'chat':
        return isAuthenticated ? <Chat /> : <Landing />;
      case 'friends':
        return isAuthenticated ? <FriendRequests /> : <Landing />;
      case 'profile':
        return isAuthenticated ? <Profile /> : <Landing />;
      case 'learning':
        return isAuthenticated ? <MyLearning /> : <Landing />;
      case 'progress':
        return isAuthenticated ? <Progress /> : <Landing />;
      case 'achievements':
        return isAuthenticated ? <Achievements /> : <Landing />;
      case 'settings':
        return isAuthenticated ? <Settings /> : <Landing />;
      case 'test-db': // Add this new case for testing database connection
        return <TestConnection />;
      default:
        return (
          <>
            <Landing />
            {/* Add TestConnection component to the landing page for testing */}
            <div className="container mx-auto py-8">
              <TestConnection />
            </div>
          </>
        );
    }
  };

  // Don't show header/footer during profile setup
  if (currentPage === 'profile-setup' || (isAuthenticated && user && !user.profileCompleted)) {
    return (
      <>
        <main className="flex-1">
          {renderPage()}
        </main>
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      {currentPage === 'landing' && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;