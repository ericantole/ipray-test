
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Moon, Sun, Lock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { PrayButton } from '../components/PrayButton';
import { DayBackground, NightBackground } from '../components/Backgrounds';
import { MORNING_DEVOTIONALS, NIGHT_COMFORTS } from '../constants';

export const TodayScreen: React.FC = () => {
  const { theme, setTheme, triggerPaywall, entitlement } = useApp();
  const navigate = useNavigate();
  
  const isNight = theme === 'night';

  // Toggle Cycle: Day -> Night -> Day
  const cycleTheme = () => {
    if (theme === 'day') setTheme('night');
    else setTheme('day');
  };

  const todaysDevotional = MORNING_DEVOTIONALS[0];
  const nightComfort = NIGHT_COMFORTS[0];

  const handlePrayClick = () => {
    navigate('/pray');
  };

  const handleNightCardClick = () => {
    if (nightComfort.isPremium && !entitlement.isPremium) {
      triggerPaywall();
    } else {
      navigate('/library');
    }
  };

  // Dynamic Styles
  let bgClass = 'bg-bg-light';
  let titleColor = 'text-text-primary';
  let dateColor = 'text-accent-gold';
  let greeting = 'Good Morning';
  let toggleIcon = <Sun size={20} />;
  let toggleBtnClass = 'bg-white/40 text-orange-400 hover:bg-white/80';

  if (isNight) {
    bgClass = 'bg-bg-night';
    titleColor = 'text-white';
    dateColor = 'text-accent-pink';
    greeting = 'Good Night';
    toggleIcon = <Moon size={20} />;
    toggleBtnClass = 'bg-white/10 text-yellow-300 hover:bg-white/20';
  }

  return (
    <div className={`relative h-screen w-full flex flex-col no-scrollbar overflow-hidden transition-colors duration-1000 ${bgClass}`}>
      
      {/* Backgrounds */}
      {isNight ? <NightBackground /> : <DayBackground />}

      {/* Header */}
      <header className="relative z-10 flex-none flex justify-between items-center p-6 pt-safe-top min-h-[80px]">
        <div className="animate-fade-in">
          <p className={`text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-500 ${dateColor}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className={`text-3xl font-serif font-bold tracking-tight transition-colors duration-500 ${titleColor}`}>
            {greeting}
          </h1>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={cycleTheme}
             className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${toggleBtnClass}`}
             aria-label="Toggle theme"
           >
             {toggleIcon}
           </button>
           <button 
             onClick={() => navigate('/settings')} 
             className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${isNight ? 'bg-white/10 text-gray-200 hover:bg-white/20' : 'bg-white/40 text-gray-600 hover:bg-white/80'}`}
           >
             <Settings size={20} />
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-evenly pb-24 w-full px-6">
        
        {/* PRAY Button */}
        <div className="flex-none flex items-center justify-center py-4">
          <PrayButton onClick={handlePrayClick} theme={theme} />
        </div>

        {/* Dynamic Card Container */}
        <div className="w-full max-w-sm">
          
          {/* Day: Devotional */}
          {!isNight && (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/40 animate-slide-up">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 rounded-full bg-accent-gold"></div>
                <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                  Today's Devotional
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 font-serif">{todaysDevotional.title}</h3>
              <p className="text-gray-600 leading-relaxed font-serif text-sm line-clamp-3">
                {todaysDevotional.text}
              </p>
            </div>
          )}

          {/* Night: Comfort Card */}
          {isNight && (
            <div 
              onClick={handleNightCardClick}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 animate-slide-up cursor-pointer relative overflow-hidden group active:scale-[0.98] transition-transform"
            >
              <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                 {nightComfort.isPremium && !entitlement.isPremium && <Lock size={16} className="text-accent-pink" />}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                 <div className="h-1 w-8 bg-accent-pink rounded-full"></div>
                 <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Night Comfort</span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white font-serif">{nightComfort.title}</h3>
              <p className="text-gray-300 leading-relaxed font-serif text-sm line-clamp-3">
                {nightComfort.text}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
