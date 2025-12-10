import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Check, Pencil, ChevronDown, ChevronUp, Heart, Eye, EyeOff, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StorageService } from '../services/storage';
import { Prayer } from '../types';
import { DayBackground, NightBackground } from '../components/Backgrounds';

export const MyPrayersScreen: React.FC = () => {
  const { theme, entitlement, triggerPaywall } = useApp();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [composeTitle, setComposeTitle] = useState('');
  const [composeText, setComposeText] = useState('');
  const [search, setSearch] = useState('');
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

    setIsComposing(true);
    setComposeTitle('');
    setComposeText('');
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await StorageService.deletePrayer(id);
    loadPrayers();
  };

  const handleMarkAnswered = async (prayer: Prayer) => {
    const updated: Prayer = { ...prayer, answeredAt: new Date().toISOString() };
    await StorageService.updatePrayer(updated);
    loadPrayers();
  };

  const handleSaveGratitude = async (prayer: Prayer, message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const updated: Prayer = { ...prayer, gratitudeMessage: trimmed };
    await StorageService.updatePrayer(updated);
    loadPrayers();
  };

  const handleSaveNewPrayer = async () => {
    const text = composeText.trim();
    const title = composeTitle.trim() || 'My Prayer';
    if (!text) return;
    const newPrayer: Prayer = {
      id: Date.now().toString(),
      title,
      text,
      createdAt: new Date().toISOString()
    };
    await StorageService.savePrayer(newPrayer);
    setIsComposing(false);
    setComposeTitle('');
    setComposeText('');
    loadPrayers();
  };

  const PrayerCard = ({ prayer }: { prayer: Prayer }) => {
    const isAnswered = Boolean(prayer.answeredAt);
    const hasSaved = Boolean(prayer.gratitudeMessage);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showText, setShowText] = useState<boolean>(false);
    const [draft, setDraft] = useState<string>(prayer.gratitudeMessage || '');
    const prevAnsweredRef = useRef<boolean>(isAnswered);
    const summary =
      prayer.gratitudeMessage && prayer.gratitudeMessage.length > 50
        ? `${prayer.gratitudeMessage.slice(0, 50)}...`
        : prayer.gratitudeMessage;

    // When answered state flips from false -> true, auto-expand and start editing with current text
    useEffect(() => {
      if (!prevAnsweredRef.current && isAnswered) {
        setIsExpanded(true);
        setIsEditing(true);
        setDraft(prayer.gratitudeMessage || '');
      }
      prevAnsweredRef.current = isAnswered;
    }, [isAnswered, prayer.gratitudeMessage]);

    // Keep draft in sync if saved message changes externally
    useEffect(() => {
      if (!isEditing) {
        setDraft(prayer.gratitudeMessage || '');
      }
    }, [prayer.gratitudeMessage, isEditing]);

    const cardContainer = isNight
      ? 'bg-bg-cardNight text-white border border-gray-700'
      : 'bg-white text-text-primary border border-accent-gold/30';
    const answeredOverlay = isNight
      ? 'bg-black/70 text-accent-pink border-pink-200/40'
      : 'bg-white/95 text-accent-gold border-accent-gold/20';
    const answeredShadow = isNight
      ? 'shadow-[0_25px_60px_-15px_rgba(241,182,198,0.6)]'
      : 'shadow-[0_10px_30px_rgba(199,139,74,0.3)]';
    const gratitudePanel = isNight
      ? 'from-[#1f2937] to-[#111827] border-gray-700'
      : 'from-accent-goldLight to-white border-accent-gold/30';
    const gratitudeButtonBg = isNight ? 'hover:bg-white/10' : 'hover:bg-accent-goldLight/80';
    const gratitudeText = isNight ? 'text-gray-200' : 'text-text-primary';
    const accentIcon = isNight ? 'text-accent-pink' : 'text-accent-gold';
    const accentText = isNight ? 'text-accent-pink' : 'text-accent-gold';
    const accentLine = isNight ? 'bg-accent-pink' : 'bg-accent-gold';

    const editButton = isNight
      ? 'bg-white/10 text-white hover:bg-white/20'
      : 'bg-gray-100 text-text-primary hover:bg-gray-200';

    const cardShadow = isNight
      ? 'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)]'
      : 'shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)]';

    return (
      <div className="relative w-full z-0 flex flex-col transition-all duration-500">
        <div
          className={`${cardContainer} ${
            isAnswered ? 'rounded-t-2xl rounded-b-none border-b' : 'rounded-2xl'
          } ${cardShadow} p-6 flex flex-col gap-1.5 relative`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs opacity-50 uppercase tracking-wide font-bold">
                {new Date(prayer.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isAnswered && (
                <button
                  onClick={() => setShowText((prev) => !prev)}
                  className="p-1 rounded-full border border-gray-200 text-gray-500 hover:text-text-primary hover:border-gray-300 transition"
                  aria-label={showText ? 'Hide prayer text' : 'Show prayer text'}
                >
                  {showText ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              )}
              <button onClick={(e) => handleDelete(prayer.id, e)} className="opacity-40 hover:opacity-100 p-1">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {prayer.title && (
            <h3 className={`text-base font-semibold ${isNight ? 'text-accent-pink' : 'text-accent-gold'}`}>
              {prayer.title}
            </h3>
          )}

          <p className={`font-serif text-base leading-relaxed break-words ${isAnswered && !showText ? 'opacity-60 blur-[2px]' : ''}`}>
            {prayer.text}
          </p>

          {isAnswered && !showText && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center rounded-t-2xl z-20 pointer-events-none">
              <div className="relative">
                {isNight && <div className="absolute inset-[-14px] rounded-full bg-accent-pink/18 blur-2xl -z-10" />}
                <div className={`${answeredOverlay} ${answeredShadow} backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 font-bold`}>
                  <div className={`${isNight ? 'bg-accent-pink' : 'bg-accent-gold'} rounded-full p-1`}>
                    <Check size={16} strokeWidth={4} className="text-white" />
                  </div>
                  <span className="tracking-wide text-lg">Answered</span>
                </div>
              </div>
            </div>
          )}

          {!isAnswered && (
            <div className="mt-4">
              <button
                onClick={() => {
                  handleMarkAnswered(prayer);
                  setIsExpanded(true);
                  setIsEditing(true);
                  setDraft(prayer.gratitudeMessage || '');
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${isNight ? 'bg-accent-pink/20 text-white border border-accent-pink/40 hover:bg-accent-pink/30' : 'bg-gray-100 text-text-primary hover:bg-gray-200'}`}
              >
                Mark as answered
              </button>
            </div>
          )}
        </div>

        {isAnswered && (
          <div className={`bg-gradient-to-br ${gratitudePanel} border-2 border-t rounded-b-2xl shadow-xl z-10 relative overflow-hidden`}>
            {/* Collapsed strip */}
            {!isExpanded && (
              <button
                onClick={() => {
                  setIsExpanded(true);
                  setIsEditing(!hasSaved);
                  setDraft(prayer.gratitudeMessage || '');
                }}
                className={`w-full px-6 py-3 flex items-center justify-between ${gratitudeButtonBg} transition-colors rounded-b-2xl`}
              >
                <div className="flex items-center gap-2">
                  <Heart size={16} className={accentIcon} fill="currentColor" />
                  <span className={`text-xs font-bold tracking-wider uppercase ${accentText}`}>
                    {hasSaved ? 'Gratitude Message' : 'Express Gratitude'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasSaved && (
                    <span className="text-xs text-gray-500 italic line-clamp-1 max-w-[200px]">{summary}</span>
                  )}
                  <ChevronDown size={18} className={accentIcon} />
                </div>
              </button>
            )}

            {/* Expanded panel */}
            {isExpanded && (
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-1 w-8 ${accentLine} rounded-full`}></div>
                    <span className={`text-xs font-bold tracking-wider uppercase ${accentText}`}>Gratitude Message</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      setIsEditing(false);
                      setDraft(prayer.gratitudeMessage || '');
                    }}
                    className={`${accentIcon} hover:opacity-80 transition-colors p-1 active:scale-95`}
                    aria-label="Collapse gratitude"
                  >
                    <ChevronUp size={18} />
                  </button>
                </div>

                {!isEditing && (
                  <div className="space-y-2">
                    <p className={`font-serif text-sm leading-relaxed break-words ${gratitudeText}`}>
                      {prayer.gratitudeMessage}
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setDraft(prayer.gratitudeMessage || '');
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${editButton}`}
                      >
                        <Pencil size={16} /> Edit
                      </button>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="space-y-2">
                    <div className={`w-full rounded-lg border overflow-hidden ${isNight ? 'border-gray-700 bg-bg-cardNight' : 'border-gray-200 bg-white'}`}>
                      <textarea
                        className={`w-full rounded-lg p-3 text-sm resize-none bg-transparent ${isNight ? 'text-white' : 'text-text-primary'}`}
                        rows={3}
                        placeholder="Thank you, Lord, for hearing my prayer about those test results..."
                        value={draft}
                        onChange={(e) => {
                          const value = e.target.value;
                          setDraft(value);
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      {hasSaved && (
                        <button
                          onClick={() => {
                            setDraft(prayer.gratitudeMessage || '');
                            setIsEditing(false);
                          }}
                          className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-text-primary hover:bg-gray-200 transition"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => {
                          handleSaveGratitude(prayer, draft);
                          setIsEditing(false);
                          setIsExpanded(false);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${isNight ? 'bg-accent-pink text-bg-night hover:bg-accent-pink/80' : 'bg-accent-gold text-white hover:bg-accent-gold/90'}`}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative h-screen overflow-hidden pb-28 px-6 pt-8 ${isNight ? 'text-white' : 'text-text-primary'}`}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {isNight ? <NightBackground /> : <DayBackground />}
        <div className={isNight ? 'absolute inset-0 bg-black/30' : 'absolute inset-0 bg-white/20'} />
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <div className={`flex items-center justify-between rounded-3xl border px-5 py-4 shadow-xl backdrop-blur ${isNight ? 'bg-bg-cardNight/80 border-gray-700 text-white' : 'bg-white/80 border-white/60'}`}>
          <div>
            <p className={`text-xs uppercase tracking-[0.16em] font-semibold ${isNight ? 'text-gray-300' : 'text-gray-600'}`}>Journal</p>
            <h1 className="text-3xl font-serif font-bold">My Prayers</h1>
          </div>
          <button 
            onClick={handleAddPrayer}
            className={`p-3 rounded-full shadow-lg transition-transform active:scale-90 border ${isNight ? 'bg-accent-pink text-bg-night border-transparent hover:bg-pink-200' : 'bg-accent-gold text-white border-accent-gold hover:brightness-110'}`}
          >
            <Plus size={22} />
          </button>
        </div>

        <div className={`relative rounded-2xl border shadow-lg backdrop-blur ${isNight ? 'bg-bg-cardNight/80 border-gray-700' : 'bg-white/80 border-white/60'}`}>
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${isNight ? 'text-gray-400' : 'text-gray-400'}`}>
            <Search size={16} />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prayers..."
            className={`w-full rounded-2xl pl-10 pr-4 py-3 text-sm bg-transparent outline-none ${isNight ? 'text-white placeholder:text-gray-500' : 'text-text-primary placeholder:text-gray-500'}`}
          />
        </div>

        <div className="flex items-center gap-1 px-1 pb-0 pt-1">
          <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isNight ? 'text-gray-300' : 'text-gray-600'}`}>
            Your Prayers
          </span>
          <div className={`flex-1 h-[1px] ${isNight ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
      </div>

      {isComposing && (
        <div className={`mb-6 rounded-2xl border ${isNight ? 'bg-bg-cardNight border-gray-800' : 'bg-white border-gray-100'} p-4 space-y-3 shadow-sm`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold opacity-70">New Prayer</span>
            <button onClick={() => setIsComposing(false)} className="text-xs opacity-60 hover:opacity-100">Cancel</button>
          </div>
          <input
            className={`w-full rounded-xl p-3 text-sm border ${isNight ? 'bg-bg-night border-gray-800 text-white' : 'bg-white border-gray-200 text-text-primary'}`}
            placeholder="Title"
            value={composeTitle}
            onChange={(e) => setComposeTitle(e.target.value)}
          />
          <textarea
            className={`w-full rounded-xl p-3 text-sm ${isNight ? 'bg-bg-night border border-gray-800 text-white' : 'bg-white border border-gray-200 text-text-primary'}`}
            rows={4}
            placeholder="Type your prayer..."
            value={composeText}
            onChange={(e) => setComposeText(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSaveNewPrayer}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${isNight ? 'bg-accent-pink text-bg-night hover:bg-accent-pink/80' : 'bg-accent-gold text-white hover:bg-accent-gold/90'}`}
            >
              Save Prayer
            </button>
          </div>
        </div>
      )}

      {prayers.length === 0 ? (
        <div className={`text-center py-20 opacity-60 ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-lg">No prayers saved yet.</p>
          <p className="text-sm mt-2">Tap the + button to journal your first prayer.</p>
        </div>
      ) : (
        <div
          className="space-y-4 overflow-y-auto no-scrollbar pr-1 pb-24"
          style={{ maxHeight: 'calc(100vh - 220px)' }}
        >
          {prayers
            .filter((prayer) => {
              if (!search.trim()) return true;
              const q = search.toLowerCase();
              return (
                prayer.text.toLowerCase().includes(q) ||
                (prayer.title?.toLowerCase() || '').includes(q) ||
                (prayer.gratitudeMessage?.toLowerCase() || '').includes(q)
              );
            })
            .map(prayer => (
            <PrayerCard key={prayer.id} prayer={prayer} />
          ))}
        </div>
      )}
    </div>
  );
};