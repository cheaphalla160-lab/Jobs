import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { JobItem, JOBS_DATA } from '../types/job';
import { JobCharacterSvg } from './JobCharacterSvg';
import {
  speakWord,
  playCardFlipSound,
  playCorrectSound,
  playSparkleSound,
  playFanfareSound
} from '../utils/audio';

interface MemoryGameProps {
  onEarnStar: () => void;
}

interface MemoryCard {
  uniqueId: string;
  jobId: string;
  type: 'image' | 'word';
  job: JobItem;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onEarnStar }) => {
  const [difficulty, setDifficulty] = useState<4 | 6 | 9>(6);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const initGame = useCallback((pairCount = difficulty) => {
    // Pick N random jobs
    const selectedJobs = [...JOBS_DATA]
      .sort(() => 0.5 - Math.random())
      .slice(0, pairCount);

    const deck: MemoryCard[] = [];

    selectedJobs.forEach((job) => {
      deck.push({
        uniqueId: `${job.id}-img`,
        jobId: job.id,
        type: 'image',
        job,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        uniqueId: `${job.id}-word`,
        jobId: job.id,
        type: 'word',
        job,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    deck.sort(() => 0.5 - Math.random());

    setCards(deck);
    setFlippedCardIds([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsWon(false);
    setIsChecking(false);
  }, [difficulty]);

  useEffect(() => {
    initGame(difficulty);
  }, [initGame, difficulty]);

  const handleCardClick = (card: MemoryCard) => {
    if (isChecking || card.isFlipped || card.isMatched) return;

    playCardFlipSound();

    const newFlipped = [...flippedCardIds, card.uniqueId];
    setCards((prev) =>
      prev.map((c) => (c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 1) {
      setFlippedCardIds(newFlipped);
    } else if (newFlipped.length === 2) {
      setFlippedCardIds(newFlipped);
      setMoves((m) => m + 1);
      setIsChecking(true);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.uniqueId === firstId)!;
      const secondCard = card;

      if (firstCard.jobId === secondCard.jobId) {
        // MATCH!
        setTimeout(() => {
          playCorrectSound();
          speakWord(firstCard.job.name, 1.0);
          onEarnStar();

          setCards((prev) =>
            prev.map((c) =>
              c.jobId === firstCard.jobId ? { ...c, isMatched: true } : c
            )
          );
          setMatchedPairs((mp) => {
            const next = mp + 1;
            if (next === difficulty) {
              // Game Won!
              setIsWon(true);
              playFanfareSound();
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
            return next;
          });
          setFlippedCardIds([]);
          setIsChecking(false);
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uniqueId === firstId || c.uniqueId === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCardIds([]);
          setIsChecking(false);
        }, 1100);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-100/90 via-teal-100/80 to-cyan-100/90 rounded-3xl p-5 sm:p-6 border border-emerald-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <span>🃏 记忆认知</span>
            <span>·</span>
            <span>图词对对碰</span>
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-800">
            职业翻翻乐 (Memory Match)
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            翻开两张相同的职业人物与英文单词，锻炼小朋友的记忆力与单词认读能力！
          </p>
        </div>

        {/* Difficulty Selector & Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex bg-white p-1 rounded-2xl border border-emerald-200 shadow-2xs">
            <button
              onClick={() => { setDifficulty(4); initGame(4); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                difficulty === 4 ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 hover:bg-emerald-50'
              }`}
            >
              4组 (入门)
            </button>
            <button
              onClick={() => { setDifficulty(6); initGame(6); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                difficulty === 6 ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 hover:bg-emerald-50'
              }`}
            >
              6组 (进阶)
            </button>
            <button
              onClick={() => { setDifficulty(9); initGame(9); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                difficulty === 9 ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 hover:bg-emerald-50'
              }`}
            >
              9组 (全量)
            </button>
          </div>

          <button
            onClick={() => initGame(difficulty)}
            className="p-2.5 rounded-2xl bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold transition-colors shadow-2xs"
            title="重新洗牌"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-4">
          <span>翻牌步数: <strong className="font-mono text-slate-800 text-sm">{moves}</strong></span>
          <span>已配对: <strong className="font-mono text-emerald-600 text-sm">{matchedPairs} / {difficulty}</strong></span>
        </div>
        <span className="text-slate-400">配对目标：图画与对应的英语单词</span>
      </div>

      {/* Card Grid */}
      <div
        className={`grid gap-4 ${
          difficulty === 4
            ? 'grid-cols-2 sm:grid-cols-4'
            : difficulty === 6
            ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6'
            : 'grid-cols-3 sm:grid-cols-6'
        }`}
      >
        {cards.map((card) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isChecking}
              className={`relative h-36 sm:h-44 rounded-3xl p-3 border-2 transition-all duration-300 transform select-none cursor-pointer flex flex-col items-center justify-center ${
                card.isMatched
                  ? 'bg-emerald-50 border-emerald-300 shadow-none opacity-85 scale-98'
                  : isRevealed
                  ? 'bg-white border-amber-300 shadow-md scale-102 ring-2 ring-amber-100'
                  : 'bg-gradient-to-tr from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-amber-600 shadow-xs hover:-translate-y-1'
              }`}
            >
              {isRevealed ? (
                // Front content
                <div className="w-full h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
                  {card.type === 'image' ? (
                    <>
                      <JobCharacterSvg jobId={card.job.id} size={70} />
                      <span className="text-[11px] font-bold text-slate-400 mt-1">
                        {card.job.chinese}
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2">
                      <span className="text-3xl mb-1">{card.job.props[0]?.icon || '✨'}</span>
                      <span className="font-fun text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        {card.job.name}
                      </span>
                      <span className="text-xs text-amber-600 font-bold mt-0.5">
                        {card.job.chinese}
                      </span>
                    </div>
                  )}

                  {card.isMatched && (
                    <div className="absolute top-2 right-2 text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ) : (
                // Back of card
                <div className="flex flex-col items-center justify-center text-white space-y-1">
                  <span className="text-3xl">🌟</span>
                  <span className="font-fun text-xs font-bold tracking-wider uppercase opacity-90">
                    JOB
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Victory Celebration Modal */}
      {isWon && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-emerald-300 space-y-4 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-4xl animate-bounce">
              🎉
            </div>
            <h3 className="font-fun text-3xl font-extrabold text-slate-800">
              记忆大师！全部配对！
            </h3>
            <p className="text-sm text-slate-600">
              太厉害了！仅用了 <strong className="text-emerald-600 font-mono">{moves}</strong> 步就完成了全部 {difficulty} 对配对！
            </p>
            <div className="py-2">
              <button
                onClick={() => initGame(difficulty)}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-fun font-bold text-base shadow-md transition-transform active:scale-95"
              >
                再来一局 (Play Again)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
