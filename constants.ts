import { ContentItem, LibrarySection } from './types';

// Placeholder content as per PRD requirements
export const MORNING_DEVOTIONALS: ContentItem[] = [
  {
    id: 'm_001',
    title: 'Today: Trust',
    text: 'This morning, breathe deeply. Remember that you do not walk this path alone. In the quiet moments before the day begins, surrender your need to control the outcome. Trust that grace is sufficient for this hour.',
    author: 'Isaiah 26:3',
    isPremium: false,
  },
  {
    id: 'm_002',
    title: 'Today: Gratitude',
    text: 'Start with a simple thank you. For the breath in your lungs, for the light in the room. Gratitude is the key that unlocks the fullness of life. Turn what you have into enough.',
    isPremium: false,
  },
];

export const NIGHT_COMFORTS: ContentItem[] = [
  {
    id: 'n_001',
    title: 'Release the Day',
    text: 'Imagine setting down a heavy backpack. The worries of today are not yours to carry into sleep. Lay them down. They will be handled. Rest now.',
    isPremium: false, // First one free
  },
  {
    id: 'n_002',
    title: 'Safe Harbor',
    text: 'You are safe. The night is a blanket of peace wrapped around you. Let your breathing slow. Inhale peace, exhale tension.',
    isPremium: true,
  },
];

export const LIBRARY_CONTENT: LibrarySection[] = [
  {
    title: 'Peace & Anxiety',
    items: [
      { id: 'l_p1', title: 'Finding Calm', text: 'Peace is not the absence of trouble, but the presence of faith...', isPremium: false },
      { id: 'l_p2', title: 'When You Worry', text: 'Cast all your anxiety on Him because He cares for you...', isPremium: true },
      { id: 'l_p3', title: 'Deep Breaths', text: 'Inhale for 4 seconds, hold for 7, exhale for 8...', isPremium: true },
    ]
  },
  {
    title: 'Health & Healing',
    items: [
      { id: 'l_h1', title: 'Strength for Today', text: 'My flesh and my heart may fail, but God is the strength of my heart...', isPremium: false },
      { id: 'l_h2', title: 'Healing Prayer', text: 'Lord, touch me with your healing hand...', isPremium: true },
    ]
  },
  {
    title: 'Sleep',
    items: [
      { id: 'l_s1', title: 'Quiet Mind', text: 'Be still and know...', isPremium: false },
      { id: 'l_s2', title: 'Drifting Off', text: 'As you close your eyes, visualize a calm lake...', isPremium: true },
    ]
  }
];

export const PRAYER_STEPS = [
  "Take a deep breath.",
  "Let go of your worries.",
  "Remember God's presence.",
  "Pray for a person in need.",
  "Read: 'Peace I leave with you.'",
  "Give thanks.",
  "Action: Drink a glass of water."
];

export const STORAGE_KEYS = {
  PRAYERS: 'dpp_prayers',
  ENTITLEMENT: 'dpp_entitlement',
  SETTINGS: 'dpp_settings',
  DAILY_STATE: 'dpp_daily_state',
  ONBOARDING: 'dpp_onboarding_complete',
};

export { GUIDED_PRAYER_DAYS } from './data/guidedSteps';