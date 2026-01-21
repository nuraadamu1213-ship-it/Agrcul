
import React, { useState } from 'react';
import { AppView } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AgronomistAI from './components/AgronomistAI';
import CropAnalysis from './components/CropAnalysis';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="space-y-12">
            <Hero onGetStarted={setView} />
            <section>
              <h3 className="text-3xl font-bold text-gray-900 mb-8 px-2">Quick Stats</h3>
              <Dashboard />
            </section>
          </div>
        );
      case AppView.ADVISOR:
        return (
          <div className="max-w-4xl mx-auto py-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">AI Advisor</h3>
            <AgronomistAI />
          </div>
        );
      case AppView.DIAGNOSIS:
        return (
          <div className="max-w-5xl mx-auto py-6">
             <h3 className="text-3xl font-bold text-gray-900 mb-8">Health Diagnosis</h3>
            <CropAnalysis />
          </div>
        );
      case AppView.MARKET:
        return (
          <div className="py-6">
            <Marketplace />
          </div>
        );
      case AppView.DASHBOARD:
        return (
          <div className="py-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Performance Analytics</h3>
            <Dashboard />
          </div>
        );
      default:
        return <Hero onGetStarted={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfa]">
      <Navbar currentView={currentView} setView={setView} />
      
      <main className="md:ml-64 p-4 md:p-8 pb-24 md:pb-8 transition-all">
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <div className="md:hidden flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <h1 className="text-2xl font-bold text-green-800">AgroSmart</h1>
          </div>
          
          <div className="hidden md:block">
            <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-white p-2 rounded-full border border-gray-100 shadow-sm relative">
              🔔
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-green-100 overflow-hidden">
                 <img src="https://picsum.photos/seed/user/100/100" alt="Profile" />
              </div>
              <span className="text-sm font-bold text-gray-700 hidden sm:block">Farm Manager</span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
      
      <footer className="hidden md:block md:ml-64 p-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 AgroSmart AI Platform. Empowering sustainable growth through technology.
        </p>
      </footer>
    </div>
  );
};

export default App;
