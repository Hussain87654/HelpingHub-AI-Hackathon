import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../utils';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const getLinkClass = ({ isActive }) => 
    cn(
      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
      isActive 
        ? 'bg-[#e7f5ef] text-[#0e9f85]' 
        : 'text-[#5e6b6f] hover:bg-gray-100 hover:text-[#192122]'
    );

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass-nav flex items-center justify-between px-6 py-3 rounded-full w-full max-w-6xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0e9f85] rounded-xl flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <span className="font-bold text-[#192122] text-lg">HelpHub AI</span>
        </div>

        {user ? (
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/feed" className={getLinkClass}>Dashboard</NavLink>
            <NavLink to="/create-request" className={getLinkClass}>Create Request</NavLink>
            <NavLink to="/messages" className={getLinkClass}>Messages</NavLink>
            <NavLink to="/profile" className={getLinkClass}>Profile</NavLink>
            <NavLink to="/notifications" className={getLinkClass}>Notifications</NavLink>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={getLinkClass}>Home</NavLink>
            <NavLink to="/feed" className={getLinkClass}>Explore</NavLink>
            <NavLink to="/leaderboard" className={getLinkClass}>Leaderboard</NavLink>
            <NavLink to="/ai-center" className={getLinkClass}>AI Center</NavLink>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!user ? (
             <div className="flex items-center gap-3">
               <span className="text-sm font-medium text-gray-500 whitespace-nowrap hidden sm:block">Live community signals</span>
               <Button size="sm" variant="primary" onClick={() => navigate('/login')}>Join the platform</Button>
             </div>
          ) : (
             <div className="flex items-center gap-3">
               <Button size="sm" variant="primary" onClick={() => navigate('/ai-center')}>Open AI Center</Button>
               <Button size="sm" variant="secondary" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</Button>
             </div>
          )}
        </div>
      </nav>
    </div>
  );
}
