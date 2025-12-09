
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, MessageCircle } from 'lucide-react';
import { StorageService } from '../services/storage';
import { PrayButton } from '../components/PrayButton';
import { DayBackground, NightBackground } from '../components/Backgrounds';

// --- Typewriter Component ---
const TypewriterText = ({ text, speed = 40 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleFinish = () => {
    StorageService.completeOnboarding();
    navigate('/today', { replace: true });
  };

  const handleNext = () => {
    if (currentSlide < 3) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const slides = [
    { id: 'welcome', content: <WelcomeSlide /> },
    { id: 'morning', content: <MorningPreview /> },
    { id: 'night', content: <NightPreview /> },
    { id: 'prayer', content: <PrayerSpacePreview /> }
  ];

  const current = slides[currentSlide];
  const isNightTheme = current.id === 'night';
  const accentColor = isNightTheme ? 'bg-accent-pink text-bg-night hover:bg-pink-300' : 'bg-accent-gold text-white hover:bg-yellow-600';
  const dotActiveColor = isNightTheme ? 'bg-accent-pink w-6' : 'bg-accent-gold w-6';
  const dotInactiveColor = isNightTheme ? 'bg-gray-700' : 'bg-gray-300';
  const textColor = isNightTheme ? 'text-white' : 'text-text-primary';

  return (
    <div className="h-screen w-full flex flex-col relative transition-colors duration-700 bg-bg-light overflow-hidden">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {current.id === 'night' ? <NightBackground /> : <DayBackground />}
      </div>

      {/* Skip Button */}
      <div className="absolute top-safe-top left-0 w-full z-20 flex justify-end p-6">
        {currentSlide < 3 && (
          <button 
            onClick={handleFinish}
            className={`text-sm font-bold opacity-60 hover:opacity-100 transition-opacity ${textColor}`}
          >
            Skip
          </button>
        )}
      </div>

      {/* Main Layout Container - No pointer-events-none to ensure buttons work */}
      <div className="relative z-10 flex-1 flex flex-col h-full">

        {/* Dynamic Content Area */}
        <div className={`flex-1 flex flex-col w-full ${currentSlide === 0 || currentSlide === 3 ? 'justify-center' : 'justify-between pt-12'}`}>
            
            {/* Slide 0: Welcome - Perfectly Centered */}
            {currentSlide === 0 && (
                <div className="flex flex-col items-center justify-center w-full px-8 animate-slide-up">
                    <div className="w-full max-w-xs mb-8">
                        {current.content}
                    </div>
                    <div className="text-center w-full max-w-xs">
                        <h1 className="text-3xl font-serif font-bold mb-4 text-text-primary">Welcome.</h1>
                        <p className="text-lg leading-relaxed opacity-80 text-text-primary">
                            A small moment of peace — just for you.
                        </p>
                        <p className="mt-3 text-sm opacity-60 text-text-primary leading-relaxed">
                            Every season of life deserves to be wrapped in prayer. We're so glad you're here.
                        </p>
                    </div>
                </div>
            )}

            {/* Slide 1: Morning - Visual Top, Text Bottom */}
            {currentSlide === 1 && (
                <>
                    <div className="flex-1 flex items-center justify-center w-full min-h-[300px]">
                         {current.content}
                    </div>
                    <div className="flex-none w-full px-8 pb-4 animate-slide-up max-w-lg mx-auto">
                        <h1 className="text-3xl font-serif font-bold mb-4 text-text-primary">Start with calm.</h1>
                        <p className="text-lg leading-relaxed opacity-80 text-text-primary mb-6">
                             Before the rush begins, pause here.
                        </p>
                        
                        {/* Feature Bullets - Transparent Background for Ripples */}
                        <ul className="space-y-3 mb-4 pl-1">
                            {[
                                "New message every morning",
                                "Simple step-by-step prayer",
                                "Encouraging words for your day"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-text-primary/90">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0" />
                                    <span className="text-base font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* Slide 2: Night - Visual Top, Text Bottom */}
            {currentSlide === 2 && (
                 <>
                    <div className="flex-1 flex items-center justify-center w-full min-h-[300px]">
                        {current.content}
                    </div>
                    <div className="flex-none w-full px-8 pb-4 animate-slide-up max-w-lg mx-auto">
                        <h1 className="text-3xl font-serif font-bold mb-4 text-white">Rest at night.</h1>
                        <p className="text-lg leading-relaxed opacity-80 text-white mb-6">
                            When the house is quiet, let go of your worries.
                        </p>

                         {/* Feature Bullets (Night) - Transparent */}
                         <ul className="space-y-3 mb-4 pl-1">
                            {[
                                "Soothing night messages",
                                "Helps ease worry and overthinking",
                                "Peaceful reading before sleep"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/90">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-pink flex-shrink-0" />
                                    <span className="text-base font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* Slide 3: Prayer Space - Perfectly Centered */}
            {currentSlide === 3 && (
                <div className="flex flex-col items-center justify-center w-full px-8 animate-slide-up">
                    <div className="w-full max-w-xs h-64 flex items-center justify-center mb-8 relative">
                        {current.content}
                    </div>
                    <div className="text-center w-full max-w-xs">
                         <h1 className="text-3xl font-serif font-bold mb-3 text-text-primary">Your prayer space.</h1>
                          <p className="text-lg leading-relaxed opacity-80 text-text-primary">
                            Keep your prayers safe here.
                          </p>
                          <p className="mt-2 text-sm opacity-60 text-text-primary leading-relaxed">
                            Look back and see how God has walked beside you and answered your calls.
                          </p>
                    </div>
                </div>
            )}

        </div>

        {/* Navigation Footer */}
        <div className="flex-none pt-2 pb-10 px-8 w-full max-w-lg mx-auto z-20">
             <div className="flex items-center justify-between">
              {/* Dots */}
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? dotActiveColor : dotInactiveColor}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button 
                onClick={handleNext}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all active:scale-95 ${accentColor}`}
              >
                {currentSlide === 3 ? 'Enter App' : 'Next'}
                <ChevronRight size={20} />
              </button>
            </div>
        </div>

      </div>
    </div>
  );
};

// --- Slide Components ---

const WelcomeSlide = () => (
  <div className="relative flex flex-col items-center justify-center w-full h-full">
    {/* Message Bubble Box */}
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60 relative w-full transform rotate-1">
      {/* Sender Icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-accent-gold to-orange-300 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F7F7F4]">
         <MessageCircle className="w-7 h-7 text-white" fill="currentColor" />
      </div>

      <div className="pt-4 text-center">
        {/* NO QUOTES in the string passed to TypewriterText to avoid the 'Y' issue */}
        <p className="font-serif text-2xl text-gray-800 leading-relaxed min-h-[90px] flex items-center justify-center italic">
          "<TypewriterText text="You are loved. You are held. You are never alone." />"
        </p>
      </div>

      {/* Bubble Tail */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/90 rotate-45 border-r border-b border-white/60"></div>
    </div>
  </div>
);

const MorningPreview = () => (
  <div className="w-full flex flex-col items-center justify-center h-full">
    {/* Full Size Day Button */}
    <div className="pointer-events-none transform scale-90 sm:scale-100 origin-center">
        <PrayButton theme="day" onClick={() => {}} />
    </div>
  </div>
);

const NightPreview = () => (
  <div className="w-full flex flex-col items-center justify-center h-full">
    {/* Full Size Night Button */}
    <div className="pointer-events-none transform scale-90 sm:scale-100 origin-center">
        <PrayButton theme="night" onClick={() => {}} />
    </div>
  </div>
);

const PrayerSpacePreview = () => (
  <div className="w-full h-full flex items-center justify-center relative">
     
     {/* Background Pile of Cards (Layered/Folder Effect) */}
     {/* Layer 3 (Bottom) - Transparent */}
     <div className="absolute w-[80%] h-36 bg-white/20 border border-white/30 rounded-xl transform -translate-y-8 scale-90 shadow-sm z-0"></div>
     {/* Layer 2 (Middle) - Semi Transparent */}
     <div className="absolute w-[88%] h-36 bg-white/40 border border-white/40 rounded-xl transform -translate-y-5 scale-95 shadow-sm z-10"></div>
     
     {/* Main Active Card */}
     <div className="relative w-full bg-white border border-white/80 rounded-xl shadow-2xl p-6 z-20 flex flex-col justify-between min-h-[160px]">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs opacity-50 uppercase tracking-wide font-bold">My Prayer • Just now</span>
        </div>
        
        {/* Text with Delayed Blur */}
        <p className="font-serif text-lg leading-relaxed text-gray-800 animate-[blurIn_1s_ease-out_1.2s_forwards]">
            Lord, please let the test results be clear tomorrow. Give me strength while I wait.
        </p>

        {/* Answered Stamp Overlay */}
        <div 
            className="absolute inset-0 flex items-center justify-center rounded-xl z-30 pointer-events-none"
        >
            <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(199,139,74,0.3)] flex items-center gap-2 text-accent-gold font-bold border border-accent-gold/20 transform scale-0 animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_1.4s_forwards]">
                <div className="bg-accent-gold rounded-full p-1">
                  <Check size={16} strokeWidth={4} className="text-white" />
                </div>
                <span className="tracking-wide text-lg">Answered</span>
            </div>
        </div>
    </div>
    
    <style>{`
      @keyframes blurIn {
        0% { filter: blur(0); opacity: 1; }
        100% { filter: blur(3px); opacity: 0.6; }
      }
      @keyframes popIn {
        0% { transform: scale(0); opacity: 0; }
        80% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);
