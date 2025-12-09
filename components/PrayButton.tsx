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
  
  // Refined Gradients for better blending
  const innerGradient = isNight 
    ? 'radial-gradient(circle at 40% 30%, #FFF0F5 0%, #E0A0B0 100%)' 
    : 'radial-gradient(circle at 40% 30%, #FFFFFA 0%, #D4AF37 100%)';
    
  // The Halo needs to be very diffuse to "merge"
  const haloColor = isNight 
    ? 'radial-gradient(circle, rgba(241,182,198,0.4) 0%, rgba(241,182,198,0) 65%)' 
    : 'radial-gradient(circle, rgba(199,139,74,0.3) 0%, rgba(199,139,74,0) 65%)';

  return (
    // Increased wrapper size to allow the glow to fade naturally into the background
    <div className="relative flex items-center justify-center w-[340px] h-[340px] mx-auto select-none">
      
      {/* Outer Merged Halo - Large diffuse glow that blends into bg */}
      <div 
        className="absolute inset-0 rounded-full animate-breathe pointer-events-none blur-3xl opacity-80"
        style={{ background: haloColor }}
      />
      
      {/* Secondary Pulse Ring (Very subtle, wider) */}
      <div 
         className={`absolute inset-12 rounded-full border-4 opacity-10 animate-breathe ${isNight ? 'border-pink-300' : 'border-amber-200'}`}
         style={{ animationDelay: '1s' }}
      />

      {/* Main Button */}
      <button
        className={`relative z-10 w-48 h-48 rounded-full shadow-2xl transition-all duration-300 ease-out overflow-hidden outline-none cursor-pointer
          ${isNight ? 'shadow-[0_20px_60px_-10px_rgba(241,182,198,0.3)]' : 'shadow-[0_20px_60px_-10px_rgba(199,139,74,0.3)]'}
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

        {/* Interaction Ripples */}
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