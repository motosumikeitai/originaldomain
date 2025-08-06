import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ConversionMode from './pages/ConversionMode';
import TrayMode from './pages/TrayMode';
import ChallengeMode from './pages/ChallengeMode';
import { GameMode } from './types';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'お金の換算', mode: 'conversion' as GameMode },
    { path: '/tray', label: 'トレーモード', mode: 'tray' as GameMode },
    { path: '/challenge', label: 'チャレンジ', mode: 'challenge' as GameMode }
  ];

  return (
    <nav className="bg-white shadow-2xl rounded-b-3xl mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-purple-600">
            🪙 お金の学習アプリ
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<ConversionMode />} />
            <Route path="/tray" element={<TrayMode />} />
            <Route path="/challenge" element={<ChallengeMode />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 