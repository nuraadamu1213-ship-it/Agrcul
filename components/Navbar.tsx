
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.HOME, label: 'Overview', icon: '🌱' },
    { id: AppView.ADVISOR, label: 'AI Advisor', icon: '👨‍🌾' },
    { id: AppView.DIAGNOSIS, label: 'Health Scan', icon: '🔍' },
    { id: AppView.DASHBOARD, label: 'Analytics', icon: '📊' },
    { id: AppView.MARKET, label: 'Market', icon: '🚜' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-50 md:top-0 md:bottom-auto md:flex-col md:w-64 md:h-screen md:justify-start md:pt-10 md:gap-4 md:border-r md:border-t-0 shadow-lg">
      <div className="hidden md:flex flex-col items-center mb-10 w-full px-6">
        <h1 className="text-2xl font-bold text-green-700 tracking-tight">AgroSmart</h1>
        <div className="w-12 h-1 bg-green-500 rounded-full mt-1"></div>
      </div>
      
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 md:w-full md:px-6 md:py-3 md:rounded-xl transition-all ${
            currentView === item.id 
              ? 'text-green-600 font-semibold md:bg-green-50' 
              : 'text-gray-500 hover:text-green-500 md:hover:bg-gray-50'
          }`}
        >
          <span className="text-xl md:text-2xl">{item.icon}</span>
          <span className="text-[10px] md:text-base">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
