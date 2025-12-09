
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Type, Moon, LogOut } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StorageService } from '../services/storage';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme, textSize, setTextSize } = useApp();
  const isNight = theme === 'night';

  const handleResetOnboarding = () => {
    StorageService.resetOnboarding();
    navigate('/onboarding', { replace: true });
  };

  return (
    <div className={`min-h-screen pb-24 ${isNight ? 'bg-bg-night text-white' : 'bg-bg-light text-text-primary'}`}>
      <div className="px-6 py-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="px-6 space-y-8">
        
        {/* Text Size */}
        <section>
          <h2 className="text-sm font-bold uppercase opacity-50 mb-4 flex items-center gap-2">
            <Type size={16} /> Text Size
          </h2>
          <div className={`flex rounded-xl p-1 ${isNight ? 'bg-gray-800' : 'bg-gray-200'}`}>
             {(['small', 'medium', 'large'] as const).map((size) => (
               <button
                 key={size}
                 onClick={() => setTextSize(size)}
                 className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${textSize === size ? (isNight ? 'bg-gray-600 shadow' : 'bg-white shadow') : 'opacity-50'}`}
               >
                 {size === 'small' ? 'A' : size === 'medium' ? 'Aa' : 'Aaa'}
               </button>
             ))}
          </div>
        </section>

        {/* Theme */}
        <section>
          <h2 className="text-sm font-bold uppercase opacity-50 mb-4 flex items-center gap-2">
            <Moon size={16} /> Appearance
          </h2>
          <div className={`flex rounded-xl p-1 ${isNight ? 'bg-gray-800' : 'bg-gray-200'}`}>
             {(['day', 'night', 'auto'] as const).map((t) => (
               <button
                 key={t}
                 onClick={() => setTheme(t)}
                 className={`flex-1 py-3 rounded-lg text-[10px] sm:text-xs font-medium transition-all capitalize ${theme === t ? (isNight ? 'bg-gray-600 shadow' : 'bg-white shadow') : 'opacity-50'}`}
               >
                 {t}
               </button>
             ))}
          </div>
        </section>

        {/* Developer / Debug */}
        <section>
          <button 
            onClick={handleResetOnboarding}
            className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-colors
              ${isNight 
                ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' 
                : 'border-red-100 text-red-600 hover:bg-red-50'
              }`}
          >
            <LogOut size={16} />
            Reset Onboarding (Log Out)
          </button>
        </section>

        <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
           <div className="text-center opacity-50 text-xs">
             <p>iPray-Daily Peace & Prayer v1.0.0</p>
           </div>
        </section>

      </div>
    </div>
  );
};
