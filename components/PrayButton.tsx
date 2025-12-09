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
  
  // Gradients for the main button
  const innerGradient = isNight 
    ? 'radial-gradient(circle at 40% 30%, #FFF0F5 0%, #E0A0B0 100%)' 
    : 'radial-gradient(circle at 40% 30%, #FFFFFA 0%, #D4AF37 100%)';
    
  // Color for the expanding ripples
  const rippleColor = isNight
    ? 'rgba(241,182,198, 0.4)' // Pinkish for night
    : 'rgba(199,139,74, 0.25)'; // Goldish for day

  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] mx-auto select-none">
      
      {/* Expanding Ripple Waves */}
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
        className={`relative z-10 w-48 h-48 rounded-full shadow-2xl transition-all duration-300 ease-out overflow-hidden outline-none cursor-pointer
          ${isNight ? 'shadow-[0_15px_40px_-5px_rgba(241,182,198,0.4)]' : 'shadow-[0_15px_40px_-5px_rgba(199,139,74,0.4)]'}
        `}
        style={{
          background: innerGradient,
          transform: isPressed ? 'scale(0.96)' : 'scale(1)',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        aria-label="Start Prayer"
      >
        {/* Subtle inner sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-60" />
        
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
            className={`w-8 h-8 mb-2 transition-colors duration-500 ${isNight ? 'text-pink-900 opacity-60' : 'text-amber-900 opacity-50'}`} 
            strokeWidth={1.5} 
          />
          <span className={`text-2xl font-bold tracking-[0.2em] font-sans transition-colors duration-500 ${isNight ? 'text-pink-950' : 'text-amber-950'}`}>
            PRAY
          </span>
        </div>
      </button>
    </div>
  );
};