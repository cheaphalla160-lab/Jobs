import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, Trophy, Play, CheckCircle2 } from 'lucide-react';
import { JobItem, JOBS_DATA } from '../types/job';
import { JobCharacterSvg } from './JobCharacterSvg';
import {
  speakWord,
  playPopSound,
  playCorrectSound,
  playWrongSound,
  playFanfareSound
} from '../utils/audio';

interface BubblePopGameProps {
  onEarnStar: () => void;
}

interface BubbleItem {
  id: string;
  job: JobItem;
  x: number; // percentage 10% - 80%
  y: number; // percentage
  size: number;
  speed: number;
  popped: boolean;
  color: string;
}

const BUBBLE_COLORS = [
  'bg-rose-100/90 border-rose-300 text-rose-800',
  'bg-amber-100/90 border-amber-300 text-amber-800',
  'bg-emerald-100/90 border-emerald-300 text-emerald-800',
  'bg-sky-100/90 border-sky-300 text-sky-800',
  'bg-purple-100/90 border-purple-300 text-purple-800',
  'bg-pink-100/90 border-pink-300 text-pink-800',
];

export const BubblePopGame: React.FC<BubblePopGameProps> = ({ onEarnStar }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [targetJob, setTargetJob] = useState<JobItem>(JOBS_DATA[0]);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [mode, setMode] = useState<'practice' | 'timer'>('practice');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Pick a new target and spawn new bubbles
  const startNextRound = useCallback((currentScore = score) => {
    // Pick random target
    const randomTarget = JOBS_DATA[Math.floor(Math.random() * JOBS_DATA.length)];
    setTargetJob(randomTarget);
    setFeedback(null);

    // Pronounce the target job word to guide student
    speakWord(`Find the ${randomTarget.name}!`, 1.0);

    // Pick 3-4 other distinct jobs as distractors
    const otherJobs = JOBS_DATA.filter((j) => j.id !== randomTarget.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    const candidates = [randomTarget, ...otherJobs].sort(() => 0.5 - Math.random());

    const newBubbles: BubbleItem[] = candidates.map((job, idx) => ({
      id: `${job.id}-${Date.now()}-${idx}`,
      job,
      x: 12 + (idx * 18) + (Math.random() * 6 - 3),
      y: 20 + (idx % 2 === 0 ? 0 : 35) + (Math.random() * 8),
      size: 110,
      speed: 1 + Math.random() * 0.5,
      popped: false,
      color: BUBBLE_COLORS[idx % BUBBLE_COLORS.length],
    }));

    setBubbles(newBubbles);
  }, [score]);

  // Start the entire game
  const startGame = (selectedMode: 'practice' | 'timer' = mode) => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCombo(0);
    setRound(1);
    setMode(selectedMode);
    setTimeLeft(60);
    startNextRound(0);
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || mode !== 'timer' || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, mode, isGameOver]);

  const endGame = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    playFanfareSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleBubbleClick = (bubble: BubbleItem) => {
    if (bubble.popped) return;

    if (bubble.job.id === targetJob.id) {
      // Correct!
      playPopSound();
      playCorrectSound();
      onEarnStar();

      setBubbles((prev) =>
        prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b))
      );

      const newCombo = combo + 1;
      const points = 10 + newCombo * 2;
      setCombo(newCombo);
      setScore((s) => s + points);
      setFeedback({ text: `Great Job! That's the ${targetJob.name}!`, isCorrect: true });

      // Trigger sparkle confetti on high combo
      if (newCombo % 3 === 0) {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 }
        });
      }

      setTimeout(() => {
        setRound((r) => r + 1);
        startNextRound();
      }, 700);
    } else {
      // Friendly try again
      playWrongSound();
      setCombo(0);
      setFeedback({ text: `That's a ${bubble.job.name} (${bubble.job.chinese}), try again!`, isCorrect: false });
      speakWord(`That is ${bubble.job.name}. Try again!`, 1.0);
    }
  };

  const replayAudio = () => {
    speakWord(targetJob.name, 1.0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-100/90 via-pink-100/80 to-purple-100/90 rounded-3xl p-5 sm:p-6 border border-rose-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">
            <span>🎈 趣味听音</span>
            <span>·</span>
            <span>泡泡大作战</span>
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-800">
            泡泡听音对对碰 (Bubble Pop)
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            仔细倾听英语语音或查看题目，点击漂浮的泡泡选出正确的职业人物，看谁反应最快！
          </p>
        </div>

        {/* Game Stats & Mode selector */}
        {isPlaying ? (
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-2xl border border-rose-200 shadow-2xs text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">得分 Score</span>
              <span className="font-fun text-xl font-bold text-rose-600 font-mono tabular-nums">{score}</span>
            </div>

            {combo > 1 && (
              <div className="px-3 py-2 bg-amber-500 text-white rounded-2xl shadow-xs text-center animate-bounce-gentle">
                <span className="text-[10px] font-bold block">连击 COMBO</span>
                <span className="font-fun text-lg font-bold">x{combo}</span>
              </div>
            )}

            {mode === 'timer' && (
              <div className="px-4 py-2 bg-white rounded-2xl border border-purple-200 shadow-2xs text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">倒计时</span>
                <span className={`font-fun text-xl font-bold font-mono tabular-nums ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-purple-600'}`}>
                  {timeLeft}s
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => startGame('practice')}
              className="px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-fun font-bold text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Play className="w-4 h-4" />
              <span>课堂练习模式</span>
            </button>
            <button
              onClick={() => startGame('timer')}
              className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-fun font-bold text-sm shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4" />
              <span>60秒挑战赛</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Game Arena */}
      {!isPlaying && !isGameOver ? (
        <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-rose-200 text-center max-w-xl mx-auto shadow-xs space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-100 mx-auto flex items-center justify-center text-4xl animate-float">
            🎈
          </div>
          <h3 className="font-fun text-2xl font-bold text-slate-800">
            准备好抓泡泡了吗？
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            系统会读出职业单词（如 <em>Dentist</em> 或 <em>Pirate</em>），点击屏幕中飘扬的对应职业泡泡即可得分！
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => startGame('practice')}
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-fun text-base font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              <span>开始轻松练习 (Casual)</span>
            </button>
          </div>
        </div>
      ) : isGameOver ? (
        // Game Over modal
        <div className="bg-white rounded-3xl p-8 border-2 border-rose-300 text-center max-w-md mx-auto shadow-xl space-y-5 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-amber-100 mx-auto flex items-center justify-center text-4xl animate-bounce-gentle">
            🏆
          </div>
          <h3 className="font-fun text-3xl font-extrabold text-slate-800">
            挑战完成！太棒了！
          </h3>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1">
            <div className="text-xs text-amber-700 font-bold uppercase">最终得分</div>
            <div className="font-fun text-4xl font-extrabold text-amber-600 font-mono">{score} 分</div>
            <div className="text-xs text-slate-500">累计答对 {round - 1} 题 · 获得 ⭐ 星星奖励！</div>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => startGame(mode)}
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-fun font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>再玩一次</span>
            </button>
          </div>
        </div>
      ) : (
        // Active Game Playfield
        <div className="relative bg-gradient-to-b from-sky-50 via-pink-50/40 to-amber-50/60 rounded-3xl p-6 border-2 border-rose-200/80 min-h-[500px] overflow-hidden shadow-inner flex flex-col justify-between" ref={containerRef}>
          {/* Target Prompt Box at Top */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-rose-200 shadow-sm max-w-lg mx-auto w-full flex items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={replayAudio}
                title="重新听发音"
                className="w-12 h-12 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xs transition-transform active:scale-90"
              >
                <Volume2 className="w-6 h-6 animate-pulse" />
              </button>
              <div>
                <div className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">
                  请找出这个职业 (Find Target)
                </div>
                <div className="font-fun text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{targetJob.name}</span>
                  <span className="text-sm font-normal text-slate-400">({targetJob.chinese})</span>
                </div>
              </div>
            </div>

            <button
              onClick={replayAudio}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>重听</span>
            </button>
          </div>

          {/* Floating Bubble Field */}
          <div className="relative flex-1 my-6 min-h-[320px] flex flex-wrap items-center justify-center gap-6 z-10">
            {bubbles.map((bubble) => {
              if (bubble.popped) {
                return (
                  <div
                    key={bubble.id}
                    className="w-28 h-28 flex items-center justify-center animate-ping opacity-40"
                  >
                    <span className="text-4xl">✨</span>
                  </div>
                );
              }

              return (
                <button
                  key={bubble.id}
                  onClick={() => handleBubbleClick(bubble)}
                  className={`group relative rounded-full p-3 border-2 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex flex-col items-center justify-center cursor-pointer animate-float ${bubble.color}`}
                  style={{
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                  }}
                >
                  {/* Bubble shine reflection */}
                  <div className="absolute top-2 left-4 w-4 h-2 bg-white/70 rounded-full rotate-[-30deg]" />

                  {/* Character Illustration */}
                  <div className="group-hover:rotate-6 transition-transform">
                    <JobCharacterSvg jobId={bubble.job.id} size={54} />
                  </div>

                  {/* English Word */}
                  <span className="font-fun text-xs font-bold mt-1 tracking-tight">
                    {bubble.job.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback Bar */}
          {feedback && (
            <div className={`p-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2 max-w-md mx-auto transition-all ${
              feedback.isCorrect
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 animate-in zoom-in-95'
                : 'bg-rose-100 text-rose-800 border border-rose-300 animate-shake'
            }`}>
              {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span>💡</span>}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Bottom control row */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-rose-100">
            <span>第 {round} 题</span>
            <button
              onClick={() => startNextRound()}
              className="text-slate-500 hover:text-rose-600 font-medium"
            >
              跳过这题 (Skip) →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
