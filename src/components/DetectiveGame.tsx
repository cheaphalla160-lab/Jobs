import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Search, Volume2, Sparkles, HelpCircle, CheckCircle2, ChevronRight, RefreshCw, Eye } from 'lucide-react';
import { JobItem, JOBS_DATA } from '../types/job';
import { JobCharacterSvg } from './JobCharacterSvg';
import {
  speakWord,
  playCorrectSound,
  playWrongSound,
  playSparkleSound,
  playFanfareSound
} from '../utils/audio';

interface DetectiveGameProps {
  onEarnStar: () => void;
}

export const DetectiveGame: React.FC<DetectiveGameProps> = ({ onEarnStar }) => {
  const [currentJob, setCurrentJob] = useState<JobItem>(JOBS_DATA[0]);
  const [revealedClues, setRevealedClues] = useState<number>(1);
  const [solved, setSolved] = useState<boolean>(false);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [wrongGuesses, setWrongGuesses] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Setup round
  const setupNewRiddle = () => {
    const randomIndex = Math.floor(Math.random() * JOBS_DATA.length);
    const newTarget = JOBS_DATA[randomIndex];
    setCurrentJob(newTarget);
    setRevealedClues(1);
    setSolved(false);
    setSelectedGuess(null);
    setWrongGuesses(new Set());

    // Speak initial clue
    speakWord(`Clue number 1: ${newTarget.riddleClues[0]}`, 1.0);
  };

  useEffect(() => {
    setupNewRiddle();
  }, []);

  const handleRevealNextClue = () => {
    if (revealedClues < 3) {
      const nextClue = revealedClues + 1;
      setRevealedClues(nextClue);
      playSparkleSound();
      speakWord(`Clue number ${nextClue}: ${currentJob.riddleClues[nextClue - 1]}`, 1.0);
    }
  };

  const handleGuess = (guessJob: JobItem) => {
    if (solved) return;
    setSelectedGuess(guessJob.id);

    if (guessJob.id === currentJob.id) {
      // Solved!
      setSolved(true);
      playCorrectSound();
      onEarnStar();

      // Points based on clue tier
      const starsWon = revealedClues === 1 ? 3 : revealedClues === 2 ? 2 : 1;
      const pointsWon = starsWon * 15;
      setScore((s) => s + pointsWon);
      setStreak((st) => st + 1);

      speakWord(`Bingo! I am a ${currentJob.name}!`, 1.0);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      // Wrong guess
      playWrongSound();
      setWrongGuesses((prev) => new Set(prev).add(guessJob.id));
      speakWord(`Not quite! I am not a ${guessJob.name}. Listen to the clues!`, 1.0);
    }
  };

  const readClueAloud = (clueText: string) => {
    speakWord(clueText, 1.0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-yellow-100/90 rounded-3xl p-5 sm:p-6 border border-amber-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <span>🕵️ 逻辑推理</span>
            <span>·</span>
            <span>猜猜我是谁</span>
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-800">
            职业小侦探 (Job Detective)
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            根据逐步揭开的英语线索（地点、随身道具、口头禅），推断出他是哪位职业人物！
          </p>
        </div>

        {/* Score & Streak counter */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="px-4 py-2 bg-white rounded-2xl border border-amber-200 shadow-2xs text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">侦探积分</span>
            <span className="font-fun text-xl font-bold text-amber-600 font-mono tabular-nums">{score}</span>
          </div>
          <div className="px-4 py-2 bg-white rounded-2xl border border-amber-200 shadow-2xs text-center">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">连胜纪录</span>
            <span className="font-fun text-xl font-bold text-emerald-600 font-mono tabular-nums">{streak} 连对</span>
          </div>
        </div>
      </div>

      {/* Main Investigation Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Mystery Character Box (4 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[380px]">
          {/* Magnifying Glass badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Search className="w-3.5 h-3.5" />
            <span>神秘档案 #{currentJob.id}</span>
          </div>

          {!solved ? (
            <div className="flex flex-col items-center justify-center space-y-4 my-auto">
              <div className="relative w-44 h-44 rounded-full bg-slate-100 border-4 border-dashed border-amber-300 flex items-center justify-center group animate-pulse-subtle">
                <HelpCircle className="w-20 h-20 text-amber-400 animate-bounce-gentle" />
                <span className="absolute -bottom-2 px-3 py-1 bg-amber-500 text-white text-[11px] font-bold rounded-full shadow-xs">
                  我是谁？ Who am I?
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xs">
                仔细阅读右侧线索，点击最下方的职业按钮进行推断！
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3 my-auto animate-in zoom-in-95 duration-300">
              <div className="relative">
                <JobCharacterSvg jobId={currentJob.id} size={160} />
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-md animate-bounce">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h3 className="font-fun text-3xl font-extrabold text-slate-900">
                  {currentJob.name}
                </h3>
                <div className="text-sm font-bold text-amber-600">
                  {currentJob.chinese} · <span className="font-mono font-normal text-slate-500">{currentJob.phonetic}</span>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-medium border border-emerald-200">
                🎉 推理正确！获得 {revealedClues === 1 ? '⭐⭐⭐' : revealedClues === 2 ? '⭐⭐' : '⭐'} 星星！
              </div>

              <button
                onClick={setupNewRiddle}
                className="mt-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>进入下一关 (Next Riddle)</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Progressive Clue Cards & Guess Options (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Clues Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-fun text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>🔍 破案线索 (Case Clues)</span>
                <span className="text-xs font-normal text-slate-500">已解锁 {revealedClues}/3</span>
              </h3>

              {revealedClues < 3 && !solved && (
                <button
                  onClick={handleRevealNextClue}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>揭开下一个线索 (+1 Clue)</span>
                </button>
              )}
            </div>

            {/* 3 Tiered Clues */}
            <div className="space-y-2.5">
              {currentJob.riddleClues.map((clue, idx) => {
                const isUnlocked = idx < revealedClues;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isUnlocked
                        ? 'bg-amber-50/60 border-amber-200/80 text-slate-800'
                        : 'bg-slate-50 border-slate-200/50 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-amber-800">
                        线索 {idx + 1} {idx === 0 ? '(工作地点与环境)' : idx === 1 ? '(日常行为与道具)' : '(标志性口头禅)'}
                      </span>
                      {isUnlocked && (
                        <button
                          onClick={() => readClueAloud(clue)}
                          className="text-amber-700 hover:text-amber-900 p-0.5"
                          title="听线索语音"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm font-medium">
                      {isUnlocked ? clue : '🔒 点击上方按钮解锁线索...'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Job Selection Buttons */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              请做出你的推断 (Make Your Guess):
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {JOBS_DATA.map((job) => {
                const isSelected = selectedGuess === job.id;
                const isWrong = wrongGuesses.has(job.id);
                const isTarget = solved && job.id === currentJob.id;

                return (
                  <button
                    key={job.id}
                    onClick={() => handleGuess(job)}
                    disabled={solved || isWrong}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isTarget
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102 font-bold'
                        : isWrong
                        ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through'
                        : 'bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <JobCharacterSvg jobId={job.id} size={36} />
                    </div>
                    <span className="font-fun text-xs font-bold">{job.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{job.chinese}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
