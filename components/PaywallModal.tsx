import React, { useEffect, useMemo, useState } from 'react';
import { X, Check, Star, Sparkles, Crown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { NightBackground } from './Backgrounds';

export const PaywallModal: React.FC = () => {
  const { showPaywall, setShowPaywall, unlockPremium, theme } = useApp();
  const [canDismiss, setCanDismiss] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'yearly'>('trial');

  useEffect(() => {
    if (!showPaywall) {
      setCanDismiss(false);
      return;
    }
    const t = setTimeout(() => setCanDismiss(true), 5000);
    return () => clearTimeout(t);
  }, [showPaywall]);

  const isNight = true; // Force night style for paywall
  const accentColor = 'text-accent-pink';
  const primaryBtn = 'bg-accent-pink hover:bg-pink-400';
  const primaryText = 'text-bg-night';

  const rays = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    rotate: i * 36,
    delay: `${i * 120}ms`
  })), []);

  const planButtons: {
    id: 'trial' | 'monthly' | 'yearly';
    label: string;
    price: string;
    sub?: string;
    badge?: string;
  }[] = [
    { id: 'trial', label: '$0 Premium Trial', price: '$0 today', sub: 'Start free, unlock everything' },
    { id: 'monthly', label: 'Monthly', price: '$7.77', sub: '$7.77 billed monthly' },
    { id: 'yearly', label: 'Yearly', price: '$77.77', sub: '$6.48 / month effective', badge: 'Best Value' }
  ];

  if (!showPaywall) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={() => canDismiss && setShowPaywall(false)}
        />

        <div className="relative w-full max-w-[380px] max-h-[90vh] animate-slide-up">
          <div
            className="absolute inset-0 rounded-[32px] p-[2px] pointer-events-none"
            style={{ animation: 'paywallBorderSpin 14s linear infinite' }}
          >
            <div className="w-full h-full rounded-[30px] bg-[conic-gradient(from_0deg,_#F1B6C6,_#C78B4A,_#F1B6C6)] opacity-70 blur-[0.5px]" />
          </div>

          <div className="relative w-full max-h-[90vh] bg-black/88 rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <NightBackground />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/60" />
            </div>

            {canDismiss && (
              <button 
                onClick={() => setShowPaywall(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur z-20"
                aria-label="Close paywall"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="relative z-10 flex flex-col h-full text-white">
              <div className="px-4 pt-5 pb-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shadow-lg">
                      <Star className="w-5 h-5 text-yellow-200" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 font-semibold">Premium</p>
                      <h1 className="text-2xl font-serif font-bold leading-tight drop-shadow">Peace & Prayer</h1>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'Unlimited Entries', desc: 'Enter every comfort without limits — no daily caps' },
                    { title: 'Guided Flows', desc: 'Step-by-step prayers for calm mornings and restful nights' },
                    { title: 'Exclusive Library', desc: 'Access the full catalog and save unlimited prayers' }
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-2xl bg-white/10 border border-white/15 p-3 shadow-lg backdrop-blur">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-white/10">
                          <Sparkles className="w-5 h-5 text-yellow-200" />
                        </div>
                        <div>
                          <p className="text-base font-semibold leading-tight">{item.title}</p>
                          <p className="text-xs text-white/75 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-auto bg-gradient-to-b from-black/65 to-black backdrop-blur-xl rounded-t-3xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.12em] text-white/60 font-semibold">Choose your plan</div>
                  <div className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 border border-white/10">Limited-time</div>
                </div>

                <div className="space-y-2.5">
                  {planButtons.map((plan) => {
                    const active = selectedPlan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`w-full rounded-2xl border transition-all duration-200 text-left px-3.5 py-3 flex items-center justify-between gap-3 backdrop-blur
                          ${active ? 'border-accent-gold bg-white/15 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/20'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border ${active ? 'border-accent-gold bg-accent-gold' : 'border-white/40'}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{plan.label}</span>
                              {plan.badge && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent-gold text-bg-night font-bold uppercase tracking-wide">
                                  {plan.badge}
                                </span>
                              )}
                            </div>
                            {plan.sub && <p className="text-[11px] text-white/70 mt-0.5">{plan.sub}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold">{plan.price}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={unlockPremium}
                  className={`w-full py-3.5 rounded-2xl font-bold text-base shadow-xl active:scale-95 transition ${primaryBtn} ${primaryText}`}
                >
                  {selectedPlan === 'trial' ? 'Start $0 Premium Trial' : selectedPlan === 'monthly' ? 'Choose Monthly - $7.77' : 'Choose Yearly - $77.77'}
                </button>

                {canDismiss && (
                  <div className="text-center">
                    <button onClick={() => setShowPaywall(false)} className="text-sm opacity-80 hover:opacity-100 font-medium text-white">
                      Skip for now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes paywallBorderSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};