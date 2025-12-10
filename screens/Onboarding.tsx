
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, MessageCircle, Heart, Pencil, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { StorageService } from '../services/storage';
import { PrayButton } from '../components/PrayButton';
import { DayBackground, NightBackground } from '../components/Backgrounds';
import { useApp } from '../contexts/AppContext';

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
  const { setShowPaywall } = useApp();

  const handleFinish = () => {
    StorageService.completeOnboarding();
    setShowPaywall(true);
    navigate('/today', { replace: true });
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
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
        {currentSlide < slides.length - 1 && (
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
                    <div className="w-full max-w-xs flex flex-col items-center justify-center mb-6 relative transition-all duration-500">
                        {current.content}
                    </div>
                    <div className="text-center w-full max-w-xs transition-all duration-500">
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
                {currentSlide === slides.length - 1 ? 'Enter App' : 'Next'}
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
    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60 relative w-full">
      {/* Sender Icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-accent-gold to-orange-300 rounded-full flex items-center justify-center shadow-lg border-4 border-[#F7F7F4]">
         <MessageCircle className="w-7 h-7 text-white" fill="currentColor" />
      </div>

      <div className="pt-4 text-center">
        <p className="font-serif text-2xl text-gray-800 leading-relaxed min-h-[90px] flex items-center justify-center italic">
          “You are loved. You are held. You are never alone.”
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

const PrayerSpacePreview = () => {
  const [showGratitudeStrip, setShowGratitudeStrip] = useState(false);
  const [isGratitudeExpanded, setIsGratitudeExpanded] = useState(false);
  const [gratitudeMessage, setGratitudeMessage] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const hasStartedTyping = useRef(false);
  const displayedTextRef = useRef('');

  // Show "Express Gratitude" strip after answered stamp appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGratitudeStrip(true);
    }, 1900); // After answered stamp animation completes
    
    return () => clearTimeout(timer);
  }, []);

  // Update ref when displayedText changes
  useEffect(() => {
    displayedTextRef.current = displayedText;
  }, [displayedText]);

  // Define functions first - use ref to avoid dependency issues
  const handleSaveGratitude = useCallback(() => {
    setIsSaved(true);
    setGratitudeMessage(displayedTextRef.current);
    // After save, collapse back to strip
    setTimeout(() => {
      setIsGratitudeExpanded(false);
    }, 500);
  }, []);

  const handleExpandGratitude = () => {
    setIsGratitudeExpanded(true);
    if (isSaved && gratitudeMessage) {
      // Show saved message immediately
      setDisplayedText(gratitudeMessage);
      setIsTyping(false);
    }
    // If not saved, don't reset displayedText - let typewriter effect handle it
  };

  const handleCollapseGratitude = () => {
    setIsGratitudeExpanded(false);
  };

  // Auto-expand and start typing after strip appears (only once)
  useEffect(() => {
    if (showGratitudeStrip && !isGratitudeExpanded && !isSaved) {
      const timer = setTimeout(() => {
        handleExpandGratitude();
      }, 1000); // Wait 1 second after strip appears
      return () => clearTimeout(timer);
    }
  }, [showGratitudeStrip, isSaved, isGratitudeExpanded]);

  // Typewriter effect for gratitude message (only when expanding for first time)
  useEffect(() => {
    if (isGratitudeExpanded && !isSaved && gratitudeMessage === '' && !hasStartedTyping.current) {
      hasStartedTyping.current = true;
      // Shorter message (2-3 lines)
      const fullMessage = "Thank you, Lord, for hearing my prayer about those test results. I was so worried waiting, but You gave me such peace in my heart. I trust You completely, no matter what comes next.";
      
      setIsTyping(true);
      setDisplayedText('');
      displayedTextRef.current = '';
      let i = 0;
      
      const timer = setInterval(() => {
        if (i < fullMessage.length) {
          const newText = fullMessage.substring(0, i + 1);
          setDisplayedText(newText);
          displayedTextRef.current = newText;
          i++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 60); // Slower typing speed
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [isGratitudeExpanded, isSaved, gratitudeMessage]);

  // Auto-click save button after typing completes
  useEffect(() => {
    if (!isTyping && displayedText.length > 0 && !isSaved && isGratitudeExpanded) {
      // Wait 1 second after typing completes, then auto-click save button
      const timer = setTimeout(() => {
        handleSaveGratitude();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, displayedText, isSaved, isGratitudeExpanded, handleSaveGratitude]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative transition-all duration-500 pt-14">
     
     {/* Background Pile of Cards (Layered/Folder Effect) - Stacked just behind the main card */}
     {/* Layer 3 (Bottom/Back) */}
     <div className="absolute w-[78%] h-28 bg-white/15 border border-white/25 rounded-xl shadow-sm z-0 top-12 left-1/2 -translate-x-1/2 transform rotate-[-2deg]"></div>
     {/* Layer 2 (Middle) */}
     <div className="absolute w-[84%] h-28 bg-white/25 border border-white/30 rounded-xl shadow-sm z-10 top-14 left-1/2 -translate-x-1/2 transform rotate-[1deg]"></div>
     {/* Layer 1 (Front) */}
     <div className="absolute w-[90%] h-28 bg-white/35 border border-white/35 rounded-xl shadow-md z-20 top-16 left-1/2 -translate-x-1/2"></div>
     
     {/* Main Active Card with Gratitude Box attached */}
     <div className="relative w-full z-30 flex flex-col transition-all duration-500">
        {/* Prayer Card */}
       <div className="bg-white border border-accent-gold/30 rounded-t-2xl rounded-b-none border-b-0 shadow-[0_20px_60px_-20px_rgba(199,139,74,0.35)] p-6 flex flex-col justify-between min-h-[170px] relative">
          <div className="flex justify-between items-start mb-2">
              <span className="text-xs opacity-50 uppercase tracking-wide font-bold">My Prayer • Just now</span>
          </div>
          
          {/* Text with Delayed Blur */}
          <p className="font-serif text-lg leading-relaxed text-gray-800 animate-[blurIn_1s_ease-out_1.2s_forwards]">
              Lord, please let the test results be clear tomorrow. Give me strength while I wait.
          </p>

          {/* Answered Stamp Overlay - Fixed position within prayer card */}
          <div 
              className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center rounded-t-2xl z-30 pointer-events-none"
          >
              <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(199,139,74,0.3)] flex items-center gap-2 text-accent-gold font-bold border border-accent-gold/20 transform scale-0 animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_1.4s_forwards]">
                  <div className="bg-accent-gold rounded-full p-1">
                    <Check size={16} strokeWidth={4} className="text-white" />
                  </div>
                  <span className="tracking-wide text-lg">Answered</span>
              </div>
          </div>
        </div>

        {/* Gratitude Strip - Small rectangle attached below */}
        {showGratitudeStrip && !isGratitudeExpanded && (
          <div 
            onClick={handleExpandGratitude}
            className="bg-gradient-to-br from-accent-goldLight to-white border-2 border-t border-accent-gold/30 rounded-b-2xl shadow-lg z-30 cursor-pointer hover:bg-accent-goldLight/80 transition-colors animate-[slideUp_0.4s_ease-out_forwards]"
          >
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-accent-gold" fill="currentColor" />
                <span className="text-xs font-bold tracking-wider text-accent-gold uppercase">
                  {isSaved ? 'Gratitude Message' : 'Express Gratitude'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isSaved && (
                  <span className="text-xs text-gray-500 italic line-clamp-1 max-w-[200px]">
                    {gratitudeMessage.substring(0, 40)}...
                  </span>
                )}
                <ChevronDown size={18} className="text-accent-gold" />
              </div>
            </div>
          </div>
        )}

        {/* Expanded Gratitude Message Box */}
        {isGratitudeExpanded && (
          <div className="bg-gradient-to-br from-accent-goldLight to-white border-2 border-t border-accent-gold/30 rounded-b-2xl shadow-xl z-30 animate-[slideUp_0.5s_ease-out_forwards] relative">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-accent-gold rounded-full"></div>
                  <span className="text-xs font-bold tracking-wider text-accent-gold uppercase">Gratitude Message</span>
                </div>
                <button
                  onClick={handleCollapseGratitude}
                  className="text-accent-gold hover:text-yellow-600 transition-colors p-1 active:scale-95"
                  aria-label="Collapse gratitude message"
                >
                  <ChevronUp size={18} />
                </button>
              </div>
              
              {/* Text Display Area - Smaller for 2-3 lines */}
              <div className="min-h-[80px] mb-3">
                <p className="font-serif text-sm leading-relaxed text-gray-800 italic">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>

              {/* Save Button - Bottom right when not saved */}
              {!isSaved && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveGratitude}
                    className="bg-accent-gold text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 active:scale-95 animate-[slideUp_0.3s_ease-out_forwards]"
                  >
                    <Check size={18} strokeWidth={3} />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            {/* Edit Icon - Fixed to exact bottom right corner of gratitude box */}
            {isSaved && (
              <button
                onClick={() => {
                  setIsSaved(false);
                  setIsGratitudeExpanded(true);
                  setDisplayedText(gratitudeMessage);
                  hasStartedTyping.current = false;
                }}
                className="absolute bottom-0 right-0 bg-accent-goldLight hover:bg-accent-gold/20 text-accent-gold p-2.5 rounded-tl-full rounded-br-2xl shadow-md transition-colors active:scale-95 animate-[slideUp_0.3s_ease-out_forwards] z-40 border border-accent-gold/20"
                aria-label="Edit gratitude message"
              >
                <Pencil size={18} strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}
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
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
  );
};
