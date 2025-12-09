import React from 'react';
import { X, Check, Star, Lock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const PaywallModal: React.FC = () => {
  const { showPaywall, setShowPaywall, unlockPremium, theme } = useApp();

  if (!showPaywall) return null;

  const isNight = theme === 'night';
  const accentColor = isNight ? 'text-accent-pink' : 'text-accent-gold';
  const btnBg = isNight ? 'bg-accent-pink hover:bg-opacity-90' : 'bg-accent-gold hover:bg-yellow-600';
  const btnText = isNight ? 'text-bg-night' : 'text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setShowPaywall(false)}
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slide-up sm:animate-fade-in transition-all ${isNight ? 'bg-bg-cardNight text-white' : 'bg-white text-text-primary'}`}>
        
        {/* Close Button */}
        <button 
          onClick={() => setShowPaywall(false)}
          className="absolute top-4 right-4 p-2 rounded-full opacity-60 hover:opacity-100 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero Image/Area */}
        <div className={`h-32 w-full flex items-center justify-center relative overflow-hidden ${isNight ? 'bg-gradient-to-b from-indigo-900 to-bg-cardNight' : 'bg-gradient-to-b from-orange-100 to-white'}`}>
           <div className={`absolute w-full h-full opacity-20 ${isNight ? 'bg-[url("https://picsum.photos/600/300?grayscale&blur=2")]' : 'bg-[url("https://picsum.photos/600/300?blur=2")]'} bg-cover bg-center`}></div>
           <div className="z-10 text-center">
             <div className={`mx-auto mb-2 w-12 h-12 rounded-full flex items-center justify-center ${isNight ? 'bg-white/10' : 'bg-orange-100'}`}>
                <Star className={`w-6 h-6 ${accentColor}`} fill="currentColor" />
             </div>
             <h2 className="text-xl font-serif font-bold">Premium Peace</h2>
           </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-2">
          <h3 className="text-2xl font-bold text-center mb-2">Find Peace Every Night</h3>
          <p className={`text-center mb-6 text-sm ${isNight ? 'text-gray-300' : 'text-gray-500'}`}>Start your 5-day free trial today.</p>

          <ul className="space-y-4 mb-8">
            {[
              "Unlimited Night Comforts",
              "Save Unlimited Prayers",
              "Full Library Access",
              "Offline Access"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className={`p-1 rounded-full ${isNight ? 'bg-gray-800' : 'bg-orange-50'}`}>
                  <Check className={`w-4 h-4 ${accentColor}`} strokeWidth={3} />
                </div>
                <span className="text-lg font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Pricing Option */}
          <div className={`border-2 rounded-xl p-4 mb-6 relative ${isNight ? 'border-accent-pink bg-pink-900/10' : 'border-accent-gold bg-orange-50/50'}`}>
            <div className={`absolute -top-3 right-4 px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded ${isNight ? 'bg-accent-pink text-bg-night' : 'bg-accent-gold text-white'}`}>
              Best Value
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">Yearly Plan</span>
              <div className="text-right">
                <span className="block font-bold text-xl">$77.77</span>
                <span className="text-xs opacity-70">$6.48 / month</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button 
            onClick={unlockPremium}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2 ${btnBg} ${btnText}`}
          >
            Start 5-Day Free Trial
          </button>

          <div className="mt-4 text-center">
            <button onClick={() => setShowPaywall(false)} className="text-sm opacity-60 hover:opacity-100 font-medium">
              Maybe later
            </button>
          </div>
          
          <div className="mt-6 text-[10px] text-center opacity-40 leading-tight">
            Secure purchase via Google Play • Cancel anytime in Play Subscriptions
          </div>
        </div>
      </div>
    </div>
  );
};