
import React from 'react';
import { AppView } from '../types';

interface HeroProps {
  onGetStarted: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative w-full overflow-hidden bg-white rounded-3xl mb-8">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/farm1/1600/900" 
          alt="Agriculture" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-6 py-16 md:px-12 md:py-24 max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Cultivating the Future with <span className="text-green-600">AI Intelligence.</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          Empower your farming with real-time crop analysis, expert agronomy advice, and data-driven insights. Designed for modern sustainable agriculture.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onGetStarted(AppView.DIAGNOSIS)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-transform hover:scale-105"
          >
            Start Health Scan
          </button>
          <button 
             onClick={() => onGetStarted(AppView.ADVISOR)}
            className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105"
          >
            Ask AI Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
