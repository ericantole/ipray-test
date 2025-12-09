import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Moon, Sun, Lock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { PrayButton } from '../components/PrayButton';
import { MORNING_DEVOTIONALS, NIGHT_COMFORTS } from '../constants';

const DayBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Soft Sky Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-100/40 via-orange-50/40 to-bg-light" />
    
    {/* Sun Glow */}
    <div className="absolute top-[-5%] right-[5%] w-[300px] h-[300px] bg-yellow-100 rounded-full blur-[80px] opacity-60" />

    {/* Birds Container */}
    <div className="absolute inset-0 z-0 opacity-70">
       {/* Bird 1 */}
      <div className="absolute top-[18%] left-[-10%] animate-fly text-gray-400/50">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 6l-11 9l-11-9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Bird 2 (delayed) */}
      <div className="absolute top-[22%] left-[-10%] animate-fly-slow text-gray-400/40" style={{ animationDelay: '12s' }}>
         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 6l-11 9l-11-9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
       {/* Bird 3 (Small flock member) */}
       <div className="absolute top-[19%] left-[-12%] animate-fly text-gray-400/40" style={{ animationDelay: '1s' }}>
         <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 6l-11 9l-11-9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

    {/* Artistic Layered Mountains (SVG) */}
    <div className="absolute bottom-0 left-0 right-0 h-[45vh] w-full">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            {/* Background Mountain (Farthest, Lightest) */}
            <path fill="#E0E7FF" fillOpacity="0.4" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,202.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            
            {/* Mid Mountain */}
            <path fill="#E8E8E5" fillOpacity="0.6" d="M0,256L80,240C160,224,320,192,480,197.3C640,203,800,245,960,250.7C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            
            {/* Front Hill (Closest, slightly darker but still soft) */}
            <path fill="#DFDFDB" fillOpacity="0.5" d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,245.3C672,256,768,256,864,240C960,224,1056,192,1152,192C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
    </div>
  </div>
);

const NightBackground = () => {
  // Memoize stars to prevent re-render flickering
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80}%`, // Avoid very bottom
      size: Math.random() > 0.8 ? '3px' : Math.random() > 0.5 ? '2px' : '1px',
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      opacity: Math.random() * 0.7 + 0.3
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
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pink-900/20 to-transparent" />
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
    <div className={`relative h-screen w-full flex flex-col no-scrollbar overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-bg-night' : 'bg-bg-light'}`}>
      
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

        {/* Dynamic Card Container - Cleaner Style Restored */}
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