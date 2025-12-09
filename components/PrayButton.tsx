
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PrayButtonProps {
  onClick: () => void;
  theme: 'day' | 'night' | 'auto';
}

export const PrayButton: React.FC<PrayButtonProps> = ({ onClick, theme }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPressed(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    onClick();
  };

  const isNight = theme === 'night';
  
  // Gradients
  let innerGradient;
  if (isNight) {
    innerGradient = 'radial-gradient(circle at 40% 30%, #FFF0F5 0%, #E0A0B0 100%)';
  } else {
    innerGradient = 'radial-gradient(circle at 35% 30%, #FFFCF5 0%, #F9E2AF 40%, #D4AF37 100%)'; // Holy Gold
  }
    
  // Ripple Colors
  let rippleColor;
  if (isNight) {
    rippleColor = 'rgba(241,182,198, 0.35)';
  } else {
    rippleColor = 'rgba(255, 215, 0, 0.3)';
  }

  // Shadow color
  let shadowClass;
  if (isNight) {
    shadowClass = 'shadow-[0_15px_40px_-5px_rgba(241,182,198,0.3)]';
  } else {
    shadowClass = 'shadow-[0_20px_50px_-10px_rgba(212,175,55,0.5)]';
  }

  // Text Color
  let textColor;
  let iconColor;
  if (isNight) {
    textColor = 'text-pink-950';
    iconColor = 'text-pink-900';
  } else {
    textColor = 'text-amber-900';
    iconColor = 'text-amber-800';
  }

  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] mx-auto select-none">
      
      {/* Expanding Ripple Waves - Subtle Aura */}
      {/* Wave 1 */}
      <div 
        className="absolute w-48 h-48 rounded-full animate-ripple"
        style={{ 
          backgroundColor: rippleColor,
          animationDelay: '0s'
        }}
      />
      {/* Wave 2 */}
      <div 
        className="absolute w-48 h-48 rounded-full animate-ripple"
        style={{ 
          backgroundColor: rippleColor,
          animationDelay: '1.3s'
        }}
      />
      {/* Wave 3 */}
      <div 
        className="absolute w-48 h-48 rounded-full animate-ripple"
        style={{ 
          backgroundColor: rippleColor,
          animationDelay: '2.6s'
        }}
      />

      {/* Main Button */}
      <button
        className={`relative z-10 w-48 h-48 rounded-full transition-all duration-300 ease-out overflow-hidden outline-none cursor-pointer ${shadowClass}`}
        style={{
          background: innerGradient,
          transform: isPressed ? 'scale(0.96)' : 'scale(1)',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        aria-label="Start Prayer"
      >
        {/* Subtle inner sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-60" />
        
        {/* Shine Sweep Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_5s_infinite]" />

        {/* Interaction Ripples (Click feedback) */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/40 animate-ping"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
          />
        ))}

        {/* Content */}
        <div className="flex flex-col items-center justify-center h-full relative z-20">
          <Sparkles 
            className={`w-8 h-8 mb-2 transition-colors duration-500 opacity-60 ${iconColor}`} 
            strokeWidth={1.5} 
          />
          <span className={`text-2xl font-bold tracking-[0.2em] font-sans transition-colors duration-500 ${textColor}`}>
            PRAY
          </span>
        </div>
      </button>
    </div>
  );
};