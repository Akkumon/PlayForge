import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ui/ThemeToggle';
import ChatSupport from './components/ChatSupport';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const StationsPage = lazy(() => import('./pages/StationsPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <ThemeToggle />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/stations" element={<StationsPage />} />
            </Routes>
          </Suspense>
          <ChatSupport />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;