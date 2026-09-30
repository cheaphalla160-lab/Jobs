import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import {
  toggleBgm,
  getIsBgmPlaying,
  setBgmVolume,
  getBgmVolume,
  getSoundEffectsEnabled,
  setSoundEffectsEnabled,
  playSparkleSound
} from '../utils/audio';

export type NavTabId = 'flashcards' | 'bubble-pop' | 'detective' | 'memory' | 'spelling' | 'wheel' | 'teacher-kit';

interface NavbarProps {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  starCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, starCount }) => {
  const [bgmActive, setBgmActive] = useState(false);
  const [sfxActive, setSfxActive] = useState(true);
  const [volume, setVolume] = useState(0.25);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    setBgmActive(getIsBgmPlaying());
    setVolume(getBgmVolume());
    setSfxActive(getSoundEffectsEnabled());
  }, []);

  const handleToggleBgm = () => {
    const isNowPlaying = toggleBgm();
    setBgmActive(isNowPlaying);
    if (isNowPlaying) {
      playSparkleSound();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setBgmVolume(val);
  };

  const handleToggleSfx = () => {
    const next = !sfxActive;
    setSfxActive(next);
    setSoundEffectsEnabled(next);
  };

  const navLinks: { id: NavTabId; label: string; icon: string }[] = [
    { id: 'flashcards', label: '单词闪卡', icon: '🌟' },
    { id: 'bubble-pop', label: '泡泡听音', icon: '🎈' },
    { id: 'detective', label: '职业侦探', icon: '🕵️' },
    { id: 'memory', label: '记忆翻牌', icon: '🃏' },
    { id: 'spelling', label: '拼词火车', icon: '🚂' },
    { id: 'wheel', label: '课堂转盘', icon: '🎡' },
    { id: 'teacher-kit', label: '备课锦囊', icon: '📚' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('flashcards')}
          className="text-left group flex items-center gap-2.5 transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-xs group-hover:rotate-6 transition-transform">
            <span className="text-xl">🎒</span>
          </div>
          <div>
            <div className="font-fun text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
              Job Land
            </div>
            <div className="text-[11px] font-medium text-slate-400 tracking-wide">
              小学英语职业乐园
            </div>
          </div>
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-amber-50/80 p-1.5 rounded-2xl border border-amber-200/50">
          {navLinks.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-amber-900 shadow-xs scale-102 font-bold'
                    : 'text-slate-600 hover:text-amber-800 hover:bg-amber-100/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive audio & stars controls */}
        <div className="flex items-center gap-2">
          {/* Star counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
            <span className="font-mono tabular-nums">{starCount}</span>
            <span className="hidden sm:inline text-amber-600/80 font-normal">星星</span>
          </div>

          {/* Cheerful BGM Toggle */}
          <div className="relative">
            <button
              onClick={handleToggleBgm}
              onMouseEnter={() => setShowVolumeSlider(true)}
              title={bgmActive ? '暂停欢快背景音乐' : '播放欢快背景音乐'}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                bgmActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-200 animate-pulse-subtle'
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Music className={`w-4 h-4 ${bgmActive ? 'text-emerald-600 animate-spin-slow' : 'text-slate-400'}`} />
              <span className="hidden lg:inline">{bgmActive ? 'BGM 播放中' : '伴奏音乐'}</span>
            </button>

            {/* Volume dropdown on hover */}
            {showVolumeSlider && (
              <div
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="absolute right-0 top-11 p-3 bg-white rounded-2xl shadow-xl border border-slate-200 w-44 z-50 flex flex-col gap-2"
              >
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>音乐音量</span>
                  <span className="font-mono">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSfx}
            title={sfxActive ? '音效开启' : '音效静音'}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
              sfxActive
                ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            {sfxActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-3 py-2 bg-amber-50/50 border-t border-amber-100 scrollbar-none">
        {navLinks.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-xs font-bold'
                  : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
