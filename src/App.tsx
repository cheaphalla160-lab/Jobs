import React, { useState, useEffect } from 'react';
import { Navbar, NavTabId } from './components/Navbar';
import { FlashcardView } from './components/FlashcardView';
import { BubblePopGame } from './components/BubblePopGame';
import { DetectiveGame } from './components/DetectiveGame';
import { MemoryGame } from './components/MemoryGame';
import { SpellingTrain } from './components/SpellingTrain';
import { TeacherWheel } from './components/TeacherWheel';
import { TeacherKit } from './components/TeacherKit';
import { JOBS_DATA } from './types/job';
import {
  startBgm,
  getIsBgmPlaying,
  speakWord,
  playSparkleSound
} from './utils/audio';
import { Volume2, Sparkles, Music, Star, Award, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTabId>('flashcards');
  const [starCount, setStarCount] = useState<number>(() => {
    const saved = localStorage.getItem('jobland_stars');
    return saved ? parseInt(saved, 10) : 12;
  });
  const [showMusicPrompt, setShowMusicPrompt] = useState<boolean>(true);
  const [lastEarnedStar, setLastEarnedStar] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('jobland_stars', starCount.toString());
  }, [starCount]);

  const handleEarnStar = () => {
    playSparkleSound();
    setStarCount((prev) => prev + 1);
    setLastEarnedStar(true);
    setTimeout(() => setLastEarnedStar(false), 1200);
  };

  const handleStartMusic = () => {
    startBgm();
    setShowMusicPrompt(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        starCount={starCount}
      />

      {/* Cheerful BGM Welcome Banner (dismissable) */}
      {showMusicPrompt && (
        <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 text-white py-2.5 px-4 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="text-base animate-bounce-gentle">🎵</span>
              <span>
                <strong>老师/小朋友你好！</strong> 点击开启轻松欢快的马林巴背景音乐，让英语学习更有趣！
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleStartMusic}
                className="px-3 py-1 bg-white text-rose-600 hover:bg-amber-50 rounded-full font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1"
              >
                <Music className="w-3.5 h-3.5" />
                <span>开启音乐</span>
              </button>
              <button
                onClick={() => setShowMusicPrompt(false)}
                className="text-white/80 hover:text-white text-xs px-2 py-1"
              >
                暂不开启
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'flashcards' && (
          <FlashcardView onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'bubble-pop' && (
          <BubblePopGame onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'detective' && (
          <DetectiveGame onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'memory' && (
          <MemoryGame onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'spelling' && (
          <SpellingTrain onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'wheel' && (
          <TeacherWheel onEarnStar={handleEarnStar} />
        )}
        {currentTab === 'teacher-kit' && (
          <TeacherKit />
        )}
      </main>

      {/* Star Earned Toast Floating Alert */}
      {lastEarnedStar && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-white px-4 py-2.5 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center gap-2 animate-in slide-in-from-bottom-4 zoom-in-95">
          <Star className="w-5 h-5 fill-yellow-200 text-yellow-200 animate-spin-slow" />
          <span className="font-fun font-bold text-sm">+1 闪亮星星奖励！</span>
        </div>
      )}

      {/* Bottom Vocabulary Quick Bar for Classroom Quick Drill */}
      <section className="bg-amber-50/80 border-t border-amber-200/60 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>本单元核心词汇库 (9 Core Jobs · 点击即听发音)</span>
            </span>
            <span className="text-[11px] text-slate-500">
              小学英语义务教育课标必会词汇
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {JOBS_DATA.map((job) => (
              <button
                key={job.id}
                onClick={() => speakWord(job.name, 1.0)}
                title={`点击听发音: ${job.name} (${job.chinese})`}
                className="group flex flex-col items-center p-2 rounded-2xl bg-white hover:bg-amber-100 border border-amber-200/70 hover:border-amber-400 text-center transition-all hover:scale-105 active:scale-95 shadow-2xs"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {job.id === 'teacher' && '👩‍🏫'}
                  {job.id === 'student' && '🎒'}
                  {job.id === 'pirate' && '🏴‍☠️'}
                  {job.id === 'dentist' && '🦷'}
                  {job.id === 'film-star' && '🎬'}
                  {job.id === 'pop-star' && '🎤'}
                  {job.id === 'nurse' && '🩺'}
                  {job.id === 'doctor' && '🥼'}
                  {job.id === 'farmer' && '🌾'}
                </span>
                <span className="font-fun text-xs font-bold text-slate-800 group-hover:text-amber-900 mt-0.5 truncate w-full">
                  {job.name}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-amber-700">
                  {job.chinese}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-fun font-bold text-slate-700">Job Land 职业英语乐园</span>
            <span>·</span>
            <span>小学英语教师专属互动备课与趣味课堂平台</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>精心设计用于多媒体教学大屏与学生自学</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </footer>
    </div>
  );
}
