import React from 'react';
import { Lock } from 'lucide-react';
import { LIBRARY_CONTENT } from '../constants';
import { useApp } from '../contexts/AppContext';

export const LibraryScreen: React.FC = () => {
  const { theme, entitlement, triggerPaywall } = useApp();
  const isNight = theme === 'night';

  return (
    <div className={`min-h-screen pb-24 px-6 pt-8 ${isNight ? 'bg-bg-night text-white' : 'bg-bg-light text-text-primary'}`}>
      <h1 className="text-3xl font-serif font-bold mb-6">Library</h1>
      
      <div className="space-y-8">
        {LIBRARY_CONTENT.map((section) => (
          <div key={section.title}>
            <h2 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isNight ? 'text-text-nightMuted' : 'text-text-muted'}`}>
              {section.title}
            </h2>
            
            <div className="space-y-3">
              {section.items.map((item) => {
                const isLocked = item.isPremium && !entitlement.isPremium;
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => isLocked ? triggerPaywall() : console.log('Open item')}
                    className={`
                      relative p-5 rounded-xl border transition-all duration-200 active:scale-[0.98] cursor-pointer
                      ${isNight 
                        ? 'bg-bg-cardNight border-gray-800 hover:border-gray-600' 
                        : 'bg-white border-gray-100 hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                        <p className={`text-sm line-clamp-2 ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.text}
                        </p>
                      </div>
                      
                      {isLocked && (
                        <div className={`p-2 rounded-full ${isNight ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <Lock size={16} className={isNight ? 'text-accent-pink' : 'text-accent-gold'} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};