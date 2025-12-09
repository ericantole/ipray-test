import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Moon, Sun, Lock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { PrayButton } from '../components/PrayButton';
import { MORNING_DEVOTIONALS, NIGHT_COMFORTS } from '../constants';

const DayBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Soft Gradient Sky */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-amber-50/50 to-bg-light" />
    
    {/* Sun Glow */}
    <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-yellow-200/20 rounded-full blur-[100px]" />

    {/* Flying Birds (Subtle & Small) */}
    <div className="absolute top-[15%] left-0 animate-fly opacity-0 text-gray-400/40">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 6l-11 9l-11-9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="absolute top-[20%] left-0 animate-fly-delayed opacity-0 text-gray-400/30" style={{ animationDelay: '10s', animationDuration: '50s' }}>
       <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 6l-11 9l-11-9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>

    {/* Abstract Scenic Hills (Soft Shapes) */}
    {/* Back Hill */}
    <div className="absolute bottom-0 left-[-20%] right-[-20%] h-[35vh] bg-[#E8E8E5] rounded-[100%] opacity-60" />
    {/* Front Hill */}
    <div className="absolute bottom-[-10%] left-[-10%] right-[-50%] h-[30vh] bg-[#E0E0DC] rounded-[100%] opacity-80" />
  </div>
);

const NightBackground = () => {
  // Memoize stars to prevent re-render flickering
  const stars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`, // Avoid very bottom
      size: Math.random() > 0.9 ? '3px' : Math.random() > 0.6 ? '2px' : '1.5px',
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      opacity: Math.random() * 0.6 + 0.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Night Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1A23] to-[#050E14]" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
            opacity: star.opacity
          }}
        />
      ))}
      
      {/* Subtle Horizon Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-900/10 to-transparent" />
    </div>
  );
};

export const TodayScreen: React.FC = () => {
  const { theme, setTheme, triggerPaywall, entitlement } = useApp();
  const navigate = useNavigate();
  const isNight = theme === 'night';

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

  return (
    <div className={`relative h-screen w-full flex flex-col no-scrollbar overflow-y-auto transition-colors duration-1000 ${isNight ? 'bg-bg-night' : 'bg-bg-light'}`}>
      
      {/* Render Appropriate Background */}
      {isNight ? <NightBackground /> : <DayBackground />}

      {/* Header */}
      <header className="relative z-10 flex-none flex justify-between items-center p-6 pt-safe-top min-h-[80px]">
        <div className="animate-fade-in">
          <p className={`text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-500 ${isNight ? 'text-accent-pink' : 'text-accent-gold'}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className={`text-3xl font-serif font-bold tracking-tight transition-colors duration-500 ${isNight ? 'text-white' : 'text-text-primary'}`}>
            {isNight ? 'Good Evening' : 'Good Morning'}
          </h1>
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={() => setTheme(isNight ? 'day' : 'night')}
             className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${isNight ? 'bg-white/10 text-yellow-300 hover:bg-white/20' : 'bg-white/40 text-orange-400 hover:bg-white/80'}`}
             aria-label="Toggle theme"
           >
             {isNight ? <Moon size={20} /> : <Sun size={20} />}
           </button>
           <button 
             onClick={() => navigate('/settings')} 
             className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${isNight ? 'bg-white/10 text-gray-200 hover:bg-white/20' : 'bg-white/40 text-gray-600 hover:bg-white/80'}`}
           >
             <Settings size={20} />
           </button>
        </div>
      </header>

      {/* Main Content Centered */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-evenly pb-24 w-full px-6">
        
        {/* PRAY Button */}
        <div className="flex-none flex items-center justify-center py-4">
          <PrayButton onClick={handlePrayClick} theme={theme} />
        </div>

        {/* Dynamic Card Container - Reverted to cleaner style */}
        <div className="w-full max-w-sm">
          
          {/* Day: Morning Devotional */}
          {!isNight && (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/40 animate-slide-up">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 bg-accent-gold rounded-full"></div>
                <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Today's Devotional</span>
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