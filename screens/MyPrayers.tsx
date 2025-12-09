import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StorageService } from '../services/storage';
import { Prayer } from '../types';

export const MyPrayersScreen: React.FC = () => {
  const { theme, entitlement, triggerPaywall } = useApp();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const isNight = theme === 'night';

  useEffect(() => {
    loadPrayers();
  }, []);

  const loadPrayers = async () => {
    const data = await StorageService.getPrayers();
    setPrayers(data);
  };

  const handleAddPrayer = async () => {
    // Limit check
    if (prayers.length >= 5 && !entitlement.isPremium) {
      triggerPaywall();
      return;
    }

    const newPrayer: Prayer = {
      id: Date.now().toString(),
      title: 'My Prayer',
      text: 'Lord, help me find peace today...',
      createdAt: new Date().toISOString()
    };
    
    await StorageService.savePrayer(newPrayer);
    loadPrayers();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await StorageService.deletePrayer(id);
    loadPrayers();
  };

  return (
    <div className={`min-h-screen pb-24 px-6 pt-8 ${isNight ? 'bg-bg-night text-white' : 'bg-bg-light text-text-primary'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold">My Prayers</h1>
        <button 
          onClick={handleAddPrayer}
          className={`p-3 rounded-full shadow-lg transition-transform active:scale-90 ${isNight ? 'bg-accent-pink text-bg-night' : 'bg-accent-gold text-white'}`}
        >
          <Plus size={24} />
        </button>
      </div>

      {prayers.length === 0 ? (
        <div className={`text-center py-20 opacity-60 ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-lg">No prayers saved yet.</p>
          <p className="text-sm mt-2">Tap the + button to journal your first prayer.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {prayers.map(prayer => (
            <div key={prayer.id} className={`p-5 rounded-xl border ${isNight ? 'bg-bg-cardNight border-gray-800' : 'bg-white border-gray-100'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs opacity-50 uppercase tracking-wide">
                  {new Date(prayer.createdAt).toLocaleDateString()}
                </span>
                <button onClick={(e) => handleDelete(prayer.id, e)} className="opacity-40 hover:opacity-100 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="font-serif text-lg leading-relaxed">{prayer.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};