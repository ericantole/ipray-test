
import React, { useMemo } from 'react';

const Birds = () => {
  const birds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: 5 + Math.random() * 45, 
      delay: -Math.random() * 60, // Negative delay for instant population
      duration: 35 + Math.random() * 25,
      size: 15 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.4,
      flapDuration: 0.3 + Math.random() * 0.5
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {birds.map((bird) => (
        <div 
          key={bird.id} 
          className="absolute left-0 animate-fly" 
          style={{ 
            top: `${bird.top}%`,
            animationDelay: `${bird.delay}s`,
            animationDuration: `${bird.duration}s`,
            animationFillMode: 'both',
            color: `rgba(107, 114, 128, ${bird.opacity})`
          }}
        >
           <svg 
             width={bird.size} 
             height={bird.size} 
             viewBox="0 0 50 50" 
             fill="currentColor" 
             className="animate-flap"
             style={{ animationDuration: `${bird.flapDuration}s` }}
           >
              <path d="M25,20 C10,5 0,25 0,25 C0,25 10,15 25,25 C40,15 50,25 50,25 C50,25 40,5 25,20 Z" />
           </svg>
        </div>
      ))}
    </div>
  );
};

const SVGClouds = ({ opacity = 'opacity-60' }) => (
  <div className={`absolute inset-0 pointer-events-none ${opacity}`}>
    <div className="absolute top-[8%] left-[10%] w-48 h-24 animate-drift" style={{ animationDuration: '65s' }}>
      <svg viewBox="0 0 200 100" className="w-full h-full fill-white/60 blur-md">
        <path d="M25,60 Q30,20 60,35 Q80,10 110,35 Q140,15 170,40 Q190,60 170,80 H25 Q10,70 25,60 Z" />
      </svg>
    </div>
    <div className="absolute top-[18%] right-[15%] w-64 h-32 animate-drift" style={{ animationDuration: '85s', animationDelay: '-15s' }}>
       <svg viewBox="0 0 200 100" className="w-full h-full fill-white/50 blur-lg">
        <path d="M20,65 Q40,30 70,45 Q90,20 120,40 Q150,25 180,50 Q195,70 170,85 H30 Q10,80 20,65 Z" />
      </svg>
    </div>
    <div className="absolute top-[12%] left-[45%] w-32 h-16 animate-drift" style={{ animationDuration: '95s', animationDelay: '-40s' }}>
       <svg viewBox="0 0 200 100" className="w-full h-full fill-white/40 blur-md">
         <path d="M30,60 Q45,35 65,45 Q80,25 100,40 Q120,30 140,50 Q155,65 130,75 H40 Q25,70 30,60 Z" />
       </svg>
    </div>
  </div>
);

export const DayBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-[#E6F3FF] via-[#FFF9F0] to-[#F7F7F4]" />
    <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-[#FFF5E1] rounded-full blur-[100px] opacity-70" />
    <SVGClouds opacity="opacity-80" />
    <Birds />
    <div className="absolute bottom-0 left-0 right-0 h-[50vh] w-full">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#DAE8F0" fillOpacity="0.5" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,160C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#E0E6E1" fillOpacity="0.6" d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,197.3C840,203,960,245,1080,256C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            <path fill="#EBEBE6" fillOpacity="0.7" d="M0,256L48,261.3C96,267,192,277,288,272C384,267,480,245,576,240C672,235,768,245,864,250.7C960,256,1056,256,1152,245.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#F2F2F0" fillOpacity="0.9" d="M0,288L60,293.3C120,299,240,309,360,304C480,299,600,277,720,266.7C840,256,960,256,1080,266.7C1200,277,1320,299,1380,309.3L1440,320L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
    </div>
  </div>
);

export const NightBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80}%`, 
      size: Math.random() > 0.8 ? '3px' : Math.random() > 0.5 ? '2px' : '1px',
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1A23] to-[#050E14]" />
      
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
      
      <div className="absolute top-[10%] left-[80%] w-[100px] h-[2px] bg-gradient-to-l from-white to-transparent animate-shoot opacity-0" />
      <div className="absolute top-[30%] left-[60%] w-[70px] h-[1px] bg-gradient-to-l from-white to-transparent animate-shoot opacity-0" style={{ animationDelay: '5s', animationDuration: '10s' }} />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pink-900/20 to-transparent" />
    </div>
  );
};
