import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { JobItem, JOBS_DATA } from '../types/job';
import { JobCharacterSvg } from './JobCharacterSvg';
import {
  speakWord,
  playCorrectSound,
  playWrongSound,
  playSparkleSound,
  playFanfareSound
} from '../utils/audio';

interface SpellingTrainProps {
  onEarnStar: () => void;
}

interface LetterTile {
  id: string;
  char: string;
  isUsed: boolean;
}

export const SpellingTrain: React.FC<SpellingTrainProps> = ({ onEarnStar }) => {
  const [jobIndex, setJobIndex] = useState<number>(0);
  const [currentJob, setCurrentJob] = useState<JobItem>(JOBS_DATA[0]);
  const [targetLetters, setTargetLetters] = useState<string[]>([]);
  const [scrambledTiles, setScrambledTiles] = useState<LetterTile[]>([]);
  const [placedLetters, setPlacedLetters] = useState<(LetterTile | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const setupJob = useCallback((index: number) => {
    const job = JOBS_DATA[index];
    setCurrentJob(job);
    setIsCompleted(false);

    // Filter out spaces if any for spelling (or keep uppercase)
    const upperName = job.name.toUpperCase();
    const chars = upperName.split('').filter((c) => c !== ' ');
    setTargetLetters(chars);
    setPlacedLetters(new Array(chars.length).fill(null));

    // Create scrambled tiles with unique ids
    const tiles: LetterTile[] = chars.map((char, i) => ({
      id: `${char}-${i}-${Date.now()}`,
      char,
      isUsed: false,
    })).sort(() => 0.5 - Math.random());

    setScrambledTiles(tiles);

    // Pronounce the word
    speakWord(job.name, 1.0);
  }, []);

  useEffect(() => {
    setupJob(jobIndex);
  }, [jobIndex, setupJob]);

  const handleTileClick = (tile: LetterTile) => {
    if (tile.isUsed || isCompleted) return;

    // Find first empty slot in placedLetters
    const emptySlotIdx = placedLetters.findIndex((slot) => slot === null);
    if (emptySlotIdx === -1) return;

    // Pronounce letter phonics sound
    speakWord(tile.char.toLowerCase(), 1.2);
    playSparkleSound();

    const newPlaced = [...placedLetters];
    newPlaced[emptySlotIdx] = tile;
    setPlacedLetters(newPlaced);

    // Mark tile as used
    setScrambledTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, isUsed: true } : t))
    );

    // Check if fully placed
    if (emptySlotIdx === targetLetters.length - 1) {
      // Check correctness
      const formedWord = newPlaced.map((t) => t?.char).join('');
      const targetWord = targetLetters.join('');

      if (formedWord === targetWord) {
        // SUCCESS!
        setIsCompleted(true);
        playCorrectSound();
        onEarnStar();
        setCompletedCount((c) => c + 1);

        setTimeout(() => {
          playFanfareSound();
          speakWord(`Awesome! ${currentJob.name}!`, 1.0);
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        }, 300);
      } else {
        // MISMATCH
        playWrongSound();
        speakWord('Oops, check the letters again!', 1.0);
      }
    }
  };

  const handleRemovePlaced = (slotIdx: number) => {
    const tile = placedLetters[slotIdx];
    if (!tile || isCompleted) return;

    playSparkleSound();
    const newPlaced = [...placedLetters];
    newPlaced[slotIdx] = null;
    setPlacedLetters(newPlaced);

    setScrambledTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, isUsed: false } : t))
    );
  };

  const handleResetTrain = () => {
    setupJob(jobIndex);
  };

  const handleNextJob = () => {
    const nextIdx = (jobIndex + 1) % JOBS_DATA.length;
    setJobIndex(nextIdx);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-100/90 via-indigo-100/80 to-purple-100/90 rounded-3xl p-5 sm:p-6 border border-blue-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
            <span>🚂 自然拼读</span>
            <span>·</span>
            <span>字母小火车</span>
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-800">
            字母拼词小火车 (Spelling Train)
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            点击下方散落的字母车票，按照正确的字母顺序装载到小火车车厢中，拼出正确的职业单词！
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-2xl border border-blue-200 shadow-2xs text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">已拼成单词</span>
            <span className="font-fun text-xl font-bold text-blue-600 font-mono tabular-nums">{completedCount} / 9</span>
          </div>
        </div>
      </div>

      {/* Main Train Station */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xs space-y-8">
        {/* Header with Job Picture & Audio */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <JobCharacterSvg jobId={currentJob.id} size={90} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                当前挑战职业 #{jobIndex + 1}
              </div>
              <div className="font-fun text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
                <span>{currentJob.name}</span>
                <span className="text-base font-normal text-amber-600">({currentJob.chinese})</span>
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                音节提示: {currentJob.syllables.join(' · ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => speakWord(currentJob.name, 1.0)}
              className="px-4 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>标准读音</span>
            </button>
            <button
              onClick={handleResetTrain}
              className="p-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
              title="重置小火车"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Train with carriages */}
        <div className="relative overflow-x-auto py-4">
          <div className="flex items-end justify-center gap-2 min-w-[500px]">
            {/* Locomotive Head */}
            <div className="flex flex-col items-center shrink-0">
              {/* Steam puff */}
              <span className="text-xl animate-bounce-gentle">💨</span>
              <div className="w-20 h-24 bg-gradient-to-tr from-rose-500 to-rose-600 rounded-t-3xl rounded-b-lg border-2 border-rose-700 shadow-md flex flex-col items-center justify-between p-2 text-white relative">
                <div className="w-10 h-6 bg-yellow-200/90 rounded-md border border-rose-800" />
                <span className="font-fun text-xs font-bold uppercase tracking-wider">🚂 GO</span>
                {/* Wheels */}
                <div className="absolute -bottom-3 flex justify-between w-full px-2">
                  <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-600 animate-spin-slow" />
                  <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-600 animate-spin-slow" />
                </div>
              </div>
            </div>

            {/* Letter Carriages */}
            {placedLetters.map((tile, idx) => (
              <div key={idx} className="flex flex-col items-center shrink-0">
                <button
                  onClick={() => handleRemovePlaced(idx)}
                  disabled={!tile || isCompleted}
                  className={`w-14 sm:w-16 h-20 sm:h-22 rounded-2xl border-2 transition-all flex flex-col items-center justify-center relative ${
                    tile
                      ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-sm cursor-pointer hover:bg-amber-200'
                      : 'bg-slate-50 border-dashed border-slate-300 text-slate-300'
                  }`}
                >
                  {tile ? (
                    <span className="font-fun text-2xl sm:text-3xl font-extrabold">
                      {tile.char}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-300 font-mono">#{idx + 1}</span>
                  )}

                  {/* Wheels */}
                  <div className="absolute -bottom-2 flex justify-between w-full px-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-500" />
                    <div className="w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-500" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scrambled Letter Tiles below */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            点击字母车票装入车厢 (Tap to Load):
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {scrambledTiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                disabled={tile.isUsed || isCompleted}
                className={`w-14 h-14 rounded-2xl font-fun text-2xl font-bold transition-all transform duration-200 ${
                  tile.isUsed
                    ? 'bg-slate-100 border-2 border-slate-200 text-slate-300 cursor-not-allowed scale-90 opacity-40'
                    : 'bg-gradient-to-b from-white to-blue-50 border-2 border-blue-300 text-blue-900 hover:border-blue-500 hover:scale-105 active:scale-95 shadow-xs cursor-pointer'
                }`}
              >
                {tile.char}
              </button>
            ))}
          </div>
        </div>

        {/* Victory Notification & Next Button */}
        {isCompleted && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <span className="font-fun text-lg font-bold">小火车出发啦！拼写完全正确！</span>
                <p className="text-xs text-emerald-700">太棒了，又牢牢掌握了一个职业单词！</p>
              </div>
            </div>

            <button
              onClick={handleNextJob}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-fun font-bold text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <span>拼下一个单词</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
