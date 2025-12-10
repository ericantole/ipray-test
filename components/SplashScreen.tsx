import React, { useState, useEffect } from 'react';
import { DayBackground, NightBackground } from './Backgrounds';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Determine if it's night time (8pm - 6am)
  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour < 6;

  useEffect(() => {
    // Show splash for 2 seconds, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 300); // Wait for fade animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-full h-full overflow-hidden">
        {isNight ? <NightBackground /> : <DayBackground />}
        
        {/* App Logo/Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className={`text-4xl font-serif font-bold mb-2 ${
              isNight ? 'text-white' : 'text-text-primary'
            }`}>
              iPray
            </h1>
            <p className={`text-sm opacity-70 ${
              isNight ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Daily Peace & Prayer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

