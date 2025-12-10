import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { GUIDED_PRAYER_DAYS } from '../data/guidedSteps';

export const PrayerFlowScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { theme } = useApp();
  const isNight = theme === 'night' || (theme === 'auto' && (() => {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 6;
  })());

  const session = useMemo(() => {
    const today = new Date();
    const index = (today.getDate() - 1) % GUIDED_PRAYER_DAYS.length;
    const day = GUIDED_PRAYER_DAYS[index];
    return isNight ? day.night : day.morning;
  }, [isNight]);

  const totalSteps = session.steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Finish
      navigate('/today');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    } else {
      navigate('/today');
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className={`min-h-screen flex flex-col ${isNight ? 'bg-bg-night text-white' : 'bg-bg-light text-text-primary'}`}>
      
      {/* Top Bar */}
      <div className="px-6 py-6 flex items-center justify-between">
        <button onClick={() => navigate('/today')} className="p-2 -ml-2 opacity-60 hover:opacity-100">
          <X size={24} />
        </button>
        <div className="text-sm font-medium opacity-60">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="w-8" />
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className={`h-full transition-all duration-500 ease-out ${isNight ? 'bg-accent-pink' : 'bg-accent-gold'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Voice toggle under progress bar */}
      <div className="px-6 pt-3 pb-2 flex justify-end" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 text-center animate-fade-in key={currentStep}">
        
        {/* Step Content */}
        <div className="space-y-3 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold opacity-60">
            {session.theme}
          </p>
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-serif font-medium leading-tight animate-slide-up">
            {session.steps[currentStep]}
          </h2>
          {isNight && session.scriptureLine && (
            <p className="text-sm opacity-70 italic">
              {session.scriptureLine}
            </p>
          )}
        </div>

        {/* Optional decorative element */}
        <div className={`w-16 h-1 rounded-full opacity-20 mt-4 ${isNight ? 'bg-accent-pink' : 'bg-accent-gold'}`} />
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 pb-12 flex items-center justify-between max-w-lg mx-auto w-full">
        <button 
          onClick={handleBack}
          className={`p-4 rounded-full transition-colors ${isNight ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
          aria-label="Previous step"
        >
          <ArrowLeft size={28} className="opacity-60" />
        </button>

        <button 
          onClick={handleNext}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-transform active:scale-95
            ${isLastStep 
              ? (isNight ? 'bg-accent-pink text-bg-night' : 'bg-accent-gold text-white')
              : (isNight ? 'bg-white text-bg-night' : 'bg-text-primary text-white')
            }
          `}
        >
          {isLastStep ? (
            <>Finish <Check size={20} /></>
          ) : (
            <>Next <ArrowRight size={20} /></>
          )}
        </button>
      </div>
    </div>
  );
};