import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, MapPin, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold text-white">NeighborFit</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/neighborhoods"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/neighborhoods')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <MapPin className="inline h-4 w-4 mr-1" />
                Neighborhoods
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/profile')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="inline h-4 w-4 mr-1" />
                Preferences
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-300">Welcome back,</p>
              <p className="text-sm font-medium text-white">{user?.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-300 bg-white/10 rounded-full p-1" />
              <button
                onClick={logout}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}