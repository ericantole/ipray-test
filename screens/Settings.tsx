
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, User, ShieldCheck, ExternalLink, FileText } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StorageService } from '../services/storage';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { theme, resetEntitlement, triggerPaywall, entitlement, triggerSplash } = useApp();
  const isNight = theme === 'night';

  const handleResetOnboarding = async () => {
    StorageService.resetOnboarding();
    await resetEntitlement();
    // Show splash screen, then navigate after it finishes
    triggerSplash(() => {
      navigate('/onboarding', { replace: true });
    });
  };

  return (
    <>
      <style>{`
        .settings-scroll::-webkit-scrollbar {
          display: none;
        }
        .settings-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className={`h-screen overflow-y-auto no-scrollbar settings-scroll ${isNight ? 'bg-bg-night text-white' : 'bg-bg-light text-text-primary'}`}>
      <div className="px-6 py-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="px-6 space-y-4 pb-24">

        {/* Account */}
        <section className={`rounded-2xl border ${isNight ? 'border-gray-800 bg-white/5' : 'border-gray-200 bg-white'} p-4 space-y-3`}>
          <div className="flex items-center gap-3">
            <User size={18} />
            <div>
              <p className="text-sm font-semibold">Account</p>
              <p className="text-xs opacity-70">Not signed in</p>
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className={`rounded-2xl border ${isNight ? 'border-gray-800 bg-white/5' : 'border-gray-200 bg-white'} p-4 space-y-3`}>
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} />
            <div>
              <p className="text-sm font-semibold">Subscription</p>
              <p className="text-xs opacity-70">
                Status: {entitlement.isPremium ? 'Active' : 'Not subscribed'}
              </p>
            </div>
          </div>
          {entitlement.isPremium ? (
            <>
              <p className="text-sm">
                Plan: {entitlement.plan ? entitlement.plan.charAt(0).toUpperCase() + entitlement.plan.slice(1) : 'Trial'}
              </p>
              <p className="text-xs opacity-70 italic">
                Your faithfulness is seen, and God is watching over you.
              </p>
              <div className="flex items-center gap-1 text-[8px] opacity-20">
                <ExternalLink size={8} />
                <span>Manage subscription (coming soon)</span>
              </div>
            </>
          ) : (
            <button
              onClick={triggerPaywall}
              className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isNight 
                  ? 'bg-accent-pink text-bg-night hover:bg-pink-400' 
                  : 'bg-accent-gold text-white hover:bg-yellow-600'
              }`}
            >
              Upgrade to Premium
            </button>
          )}
        </section>

        {/* Privacy Policy */}
        <section className={`rounded-2xl border ${isNight ? 'border-gray-800 bg-white/5' : 'border-gray-200 bg-white'} p-4 space-y-3`}>
          <div className="flex items-center gap-3">
            <FileText size={18} />
            <div>
              <p className="text-sm font-semibold">Privacy Policy</p>
              <p className="text-xs opacity-70">Read how we handle data and privacy.</p>
            </div>
          </div>
          <div className="text-xs opacity-80 space-y-2">
            <p>We collect minimal data to provide the app experience. We do not sell personal data.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Account (when signed in): name from Google sign-in to personalize your profile.</li>
              <li>Local data: your saved prayers and settings are stored on-device.</li>
              <li>Billing: subscriptions are processed by Google Play; we don’t store card details.</li>
              <li>Analytics: if enabled later, only aggregated, non-identifying events.</li>
            </ul>
            <p>Your rights: you can delete local data via the app and manage subscriptions in Google Play.</p>
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
            Log Out
          </button>
        </section>

        <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
           <div className="text-center opacity-50 text-xs">
             <p>iPray-Daily Peace & Prayer v1.0.0</p>
           </div>
        </section>

      </div>
    </div>
    </>
  );
};
