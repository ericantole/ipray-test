import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { PRAYER_STEPS } from '../constants';
import { useApp } from '../contexts/AppContext';

export const PrayerFlowScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { theme } = useApp();
  const isNight = theme === 'night';
  const totalSteps = PRAYER_STEPS.length;

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
      <div className="px-6 py-8 flex items-center justify-between">
        <button onClick={() => navigate('/today')} className="p-2 -ml-2 opacity-60 hover:opacity-100">
          <X size={24} />
        </button>
        <div className="text-sm font-medium opacity-60">Step {currentStep + 1} of {totalSteps}</div>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-800">
        <div 
          className={`h-full transition-all duration-500 ease-out ${isNight ? 'bg-accent-pink' : 'bg-accent-gold'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in key={currentStep}">
        
        {/* Step Content */}
        <h2 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-8 animate-slide-up">
          {PRAYER_STEPS[currentStep]}
        </h2>

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