
export type Theme = 'day' | 'night' | 'auto';
export type TextSize = 'small' | 'medium' | 'large';

export interface Prayer {
  id: string;
  title: string;
  text: string;
  createdAt: string; // ISO String
  answeredAt?: string | null;
  gratitudeMessage?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  text: string;
  author?: string; // Optional scripture reference or author
  theme?: string;
  isPremium: boolean;
}

export interface LibrarySection {
  title: string;
  items: ContentItem[];
}

export type SubscriptionPlan = 'free' | 'trial' | 'monthly' | 'yearly';

export interface UserEntitlement {
  isPremium: boolean;
  expiry?: string;
  plan?: SubscriptionPlan;
}

export interface DailyState {
  lastPrayerTime: string | null; // ISO String
  nightComfortRead: boolean;
  dailyStreak: number;
}

export interface GuidedSession {
  theme: string;
  scriptureLine?: string;
  steps: string[];
}

export interface GuidedDay {
  day: number;
  morning: GuidedSession;
  night: GuidedSession;
}