
import { Prayer, UserEntitlement, DailyState } from '../types';
import { STORAGE_KEYS } from '../constants';

// Helper to simulate async behavior of localForage
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const StorageService = {
  getPrayers: async (): Promise<Prayer[]> => {
    await delay(100);
    const data = localStorage.getItem(STORAGE_KEYS.PRAYERS);
    return data ? JSON.parse(data) : [];
  },

  savePrayer: async (prayer: Prayer): Promise<void> => {
    await delay(100);
    const prayers = await StorageService.getPrayers();
    const newPrayers = [prayer, ...prayers];
    localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(newPrayers));
  },

  updatePrayer: async (updatedPrayer: Prayer): Promise<void> => {
    const prayers = await StorageService.getPrayers();
    const index = prayers.findIndex(p => p.id === updatedPrayer.id);
    if (index !== -1) {
      prayers[index] = updatedPrayer;
      localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(prayers));
    }
  },

  deletePrayer: async (id: string): Promise<void> => {
    const prayers = await StorageService.getPrayers();
    const filtered = prayers.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(filtered));
  },

  getEntitlement: async (): Promise<UserEntitlement> => {
    const data = localStorage.getItem(STORAGE_KEYS.ENTITLEMENT);
    return data ? JSON.parse(data) : { isPremium: false };
  },

  setEntitlement: async (entitlement: UserEntitlement): Promise<void> => {
    localStorage.setItem(STORAGE_KEYS.ENTITLEMENT, JSON.stringify(entitlement));
  },

  getDailyState: async (): Promise<DailyState> => {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_STATE);
    return data ? JSON.parse(data) : { lastPrayerTime: null, nightComfortRead: false, dailyStreak: 0 };
  },

  updateDailyState: async (state: Partial<DailyState>): Promise<void> => {
    const current = await StorageService.getDailyState();
    localStorage.setItem(STORAGE_KEYS.DAILY_STATE, JSON.stringify({ ...current, ...state }));
  },

  isOnboardingComplete: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING) === 'true';
  },

  completeOnboarding: (): void => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, 'true');
  },

  resetOnboarding: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING);
  },

  resetEntitlement: async (): Promise<void> => {
    localStorage.setItem(STORAGE_KEYS.ENTITLEMENT, JSON.stringify({ isPremium: false }));
  }
};
