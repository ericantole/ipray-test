
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, TextSize, UserEntitlement } from '../types';
import { StorageService } from '../services/storage';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  entitlement: UserEntitlement;
  unlockPremium: () => void;
  resetEntitlement: () => void;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  triggerPaywall: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('day');
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [entitlement, setEntitlement] = useState<UserEntitlement>({ isPremium: false });
  const [showPaywall, setShowPaywall] = useState(false);

  // Initialize Data
  useEffect(() => {
    StorageService.getEntitlement().then(setEntitlement);
    // Load persisted settings would go here
  }, []);

  // Theme Side Effects
  useEffect(() => {
    const root = window.document.documentElement;
    const hour = new Date().getHours();
    
    let activeTheme = theme;
    if (theme === 'auto') {
      if (hour >= 20 || hour < 6) activeTheme = 'night';
      else activeTheme = 'day';
    }

    // Reset classes/attributes
    root.classList.remove('dark');
    root.setAttribute('data-theme', activeTheme);

    if (activeTheme === 'night') {
      root.classList.add('dark');
    }
    
  }, [theme]);

  // Text Size Class Injection
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty('--text-scale', textSize === 'small' ? '0.9' : textSize === 'large' ? '1.2' : '1');
  }, [textSize]);

  const unlockPremium = async () => {
    const newEntitlement = { isPremium: true, expiry: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() }; // 5 days demo
    await StorageService.setEntitlement(newEntitlement);
    setEntitlement(newEntitlement);
    setShowPaywall(false);
  };

  const resetEntitlement = async () => {
    await StorageService.resetEntitlement();
    setEntitlement({ isPremium: false });
    setShowPaywall(false);
  };

  const triggerPaywall = () => {
    if (!entitlement.isPremium) {
      setShowPaywall(true);
    }
  };

  return (
    <AppContext.Provider value={{
      theme, setTheme,
      textSize, setTextSize,
      entitlement, unlockPremium, resetEntitlement,
      showPaywall, setShowPaywall,
      triggerPaywall
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};