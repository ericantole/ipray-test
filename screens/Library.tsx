import React, { useMemo, useState } from 'react';
import { Lock, Search } from 'lucide-react';
import { LIBRARY_CONTENT } from '../constants';
import { useApp } from '../contexts/AppContext';
import { DayBackground, NightBackground } from '../components/Backgrounds';

export const LibraryScreen: React.FC = () => {
  const { theme, entitlement, triggerPaywall } = useApp();
  const isNight = theme === 'night';
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');
  const [selected, setSelected] = useState<{
    title: string;
    text: string;
    section: string;
    isPremium: boolean;
  } | null>(null);

  const tags = useMemo(() => ['All', ...LIBRARY_CONTENT.map((s) => s.title)], []);

  const filtered = LIBRARY_CONTENT.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
    }))
  ).filter((item) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.text.toLowerCase().includes(q) ||
      (item.theme || '').toLowerCase().includes(q);
    const matchesTag = activeTag === 'All' || item.section === activeTag;
    return matchesSearch && matchesTag;
  });

  const cardBg = isNight ? 'bg-bg-cardNight border-gray-800 hover:border-gray-600' : 'bg-white border-gray-100 hover:shadow-lg';
  const textMuted = isNight ? 'text-gray-400' : 'text-gray-600';
  const accent = isNight ? 'text-accent-pink' : 'text-accent-gold';

  return (
    <div className={`relative h-screen overflow-hidden pb-32 px-6 pt-8 ${isNight ? 'text-white' : 'text-text-primary'}`}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {isNight ? <NightBackground /> : <DayBackground />}
        <div className={isNight ? 'absolute inset-0 bg-black/30' : 'absolute inset-0 bg-white/10'} />
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <div className={`flex items-center justify-between rounded-3xl border px-5 py-4 shadow-xl backdrop-blur ${isNight ? 'bg-bg-cardNight/80 border-gray-700 text-white' : 'bg-white/85 border-white/60'}`}>
          <div>
            <p className={`text-xs uppercase tracking-[0.16em] font-semibold ${isNight ? 'text-gray-300' : 'text-gray-600'}`}>Discover</p>
            <h1 className="text-3xl font-serif font-bold">Library</h1>
          </div>
        </div>

      <div className={`relative rounded-2xl border shadow-lg backdrop-blur ${isNight ? 'bg-bg-cardNight/80 border-gray-700' : 'bg-white/85 border-white/60'}`}>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prayers, topics, feelings..."
            className={`w-full rounded-2xl pl-10 pr-4 py-3 text-sm bg-transparent outline-none ${isNight ? 'text-white placeholder:text-gray-500' : 'text-text-primary placeholder:text-gray-500'}`}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const active = tag === activeTag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${
                  active
                    ? isNight
                      ? 'bg-accent-pink text-bg-night'
                      : 'bg-accent-gold text-white'
                    : isNight
                      ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                      : 'bg-white text-text-primary border border-gray-200 hover:shadow-sm'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="space-y-4 overflow-y-auto no-scrollbar pr-2 pb-64"
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        {filtered.length === 0 && (
          <div className={`text-center py-16 rounded-2xl border ${isNight ? 'border-gray-800 bg-bg-cardNight' : 'border-gray-200 bg-white/80'} text-sm ${textMuted}`}>
            No items match your search.
          </div>
        )}

        {filtered.map((item) => {
          const isLocked = item.isPremium && !entitlement.isPremium;
          return (
            <div
              key={item.id}
              onClick={() => {
                if (isLocked) {
                  triggerPaywall();
                  return;
                }
                setSelected(item);
              }}
              className={`relative p-5 rounded-2xl border transition-all duration-200 active:scale-[0.98] cursor-pointer ${cardBg}`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-1 w-8 rounded-full ${isNight ? 'bg-accent-pink' : 'bg-accent-gold'}`} />
                    <span className={`text-[11px] uppercase tracking-[0.16em] font-semibold ${isNight ? 'text-gray-300' : 'text-gray-500'}`}>
                      {item.section}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>
                    {item.text}
                  </p>
                </div>

                {isLocked && (
                  <div className={`p-2 rounded-full ${isNight ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Lock size={16} className={accent} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {selected && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className={`relative w-full max-w-md rounded-3xl p-6 shadow-2xl ${isNight ? 'bg-bg-cardNight text-white border border-gray-700' : 'bg-white text-text-primary border border-gray-200'}`}>
            <button
              onClick={() => setSelected(null)}
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${isNight ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-text-primary'}`}
            >
              Close
            </button>
            <div className="mb-3 flex items-center gap-2">
              <div className={`h-1 w-10 rounded-full ${isNight ? 'bg-accent-pink' : 'bg-accent-gold'}`} />
              <span className={`text-[11px] uppercase tracking-[0.16em] font-semibold ${isNight ? 'text-gray-300' : 'text-gray-600'}`}>
                {selected.section}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{selected.title}</h3>
            <p className={`text-sm leading-relaxed ${isNight ? 'text-gray-200' : 'text-gray-700'}`}>
              {selected.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};