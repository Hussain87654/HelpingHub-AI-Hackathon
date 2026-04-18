import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

// Page Imports
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import DashboardFeed from './pages/DashboardFeed';
import AICenter from './pages/AICenter';
import RequestDetail from './pages/RequestDetail';
import CreateRequest from './pages/CreateRequest';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Messages from './pages/Messages';

function AppLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <>
      <Navbar actionable={!user} actionText={isAuthPage ? null : 'Join the platform'} actionLink="/login" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/feed" element={user ? <DashboardFeed /> : <Auth />} />
        <Route path="/ai-center" element={user ? <AICenter /> : <Auth />} />
        <Route path="/request/:id" element={user ? <RequestDetail /> : <Auth />} />
        <Route path="/create-request" element={user ? <CreateRequest /> : <Auth />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={user ? <Profile /> : <Auth />} />
        <Route path="/messages" element={user ? <Messages /> : <Auth />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
