import React, { useState } from 'react';
import { Volume2, RotateCw, Maximize2, X, ChevronLeft, ChevronRight, Bookmark, Sparkles, Smile } from 'lucide-react';
import { JobItem, JOBS_DATA } from '../types/job';
import { JobCharacterSvg } from './JobCharacterSvg';
import { speakWord, playCardFlipSound, playSparkleSound } from '../utils/audio';

interface FlashcardViewProps {
  onEarnStar?: () => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ onEarnStar }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeSpeechSpeed, setActiveSpeechSpeed] = useState<number>(1.0);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [spotlightJob, setSpotlightJob] = useState<JobItem | null>(null);
  const [spotlightFlipped, setSpotlightFlipped] = useState<boolean>(false);
  const [favoriteJobs, setFavoriteJobs] = useState<Set<string>>(new Set());

  const handleCardFlip = (jobId: string) => {
    playCardFlipSound();
    setFlippedCards((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const handlePronounce = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSpeakingWord(text);
    speakWord(text, activeSpeechSpeed, () => {
      setSpeakingWord(null);
    });
    if (onEarnStar && Math.random() > 0.6) {
      onEarnStar();
    }
  };

  const toggleFavorite = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playSparkleSound();
    setFavoriteJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  const openSpotlight = (job: JobItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSpotlightJob(job);
    setSpotlightFlipped(false);
    handlePronounce(job.name);
  };

  const handleSpotlightNext = () => {
    if (!spotlightJob) return;
    const currentIndex = JOBS_DATA.findIndex((j) => j.id === spotlightJob.id);
    const nextIndex = (currentIndex + 1) % JOBS_DATA.length;
    const nextJob = JOBS_DATA[nextIndex];
    setSpotlightJob(nextJob);
    setSpotlightFlipped(false);
    handlePronounce(nextJob.name);
  };

  const handleSpotlightPrev = () => {
    if (!spotlightJob) return;
    const currentIndex = JOBS_DATA.findIndex((j) => j.id === spotlightJob.id);
    const prevIndex = (currentIndex - 1 + JOBS_DATA.length) % JOBS_DATA.length;
    const prevJob = JOBS_DATA[prevIndex];
    setSpotlightJob(prevJob);
    setSpotlightFlipped(false);
    handlePronounce(prevJob.name);
  };

  return (
    <div className="space-y-6">
      {/* Friendly banner & speed controls */}
      <div className="bg-gradient-to-r from-amber-100/90 via-rose-100/80 to-sky-100/90 rounded-3xl p-5 sm:p-6 border border-amber-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <span>🌟 听说训练</span>
            <span>·</span>
            <span>9个核心职业单词</span>
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-800">
            职业单词魔法卡片 (Job Cards)
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            点击卡片可翻面查看职业工具与口诀，点击小喇叭听标准英语发音，适合全班跟读！
          </p>
        </div>

        {/* Speed toggle & quick stats */}
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-1.5 rounded-2xl border border-amber-200 shadow-2xs self-start md:self-auto">
          <span className="text-xs text-slate-500 font-medium px-2">发音语速:</span>
          <button
            onClick={() => setActiveSpeechSpeed(0.75)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSpeechSpeed === 0.75
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            🐢 慢速自然拼读
          </button>
          <button
            onClick={() => setActiveSpeechSpeed(1.0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSpeechSpeed === 1.0
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            🐰 正常标准发音
          </button>
        </div>
      </div>

      {/* Grid of 9 Job Flashcards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {JOBS_DATA.map((job) => {
          const isFlipped = !!flippedCards[job.id];
          const isFav = favoriteJobs.has(job.id);
          const isCurrentSpeaking = speakingWord === job.name;

          return (
            <div
              key={job.id}
              onClick={() => handleCardFlip(job.id)}
              className="group cursor-pointer select-none relative bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-amber-300 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between min-h-[360px]"
            >
              {/* Top row actions */}
              <div className="flex items-center justify-between z-10">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${job.badgeColor}`}>
                  {job.chinese}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => toggleFavorite(job.id, e)}
                    title="标记重点单词"
                    className={`p-1.5 rounded-full transition-colors ${
                      isFav ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-400'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => openSpotlight(job, e)}
                    title="课堂大屏放映模式"
                    className="p-1.5 rounded-full text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Face: Front or Back */}
              {!isFlipped ? (
                // FRONT VIEW: Character, English word, Syllables, Audio button
                <div className="flex flex-col items-center text-center my-auto py-2">
                  <div className="relative mb-3 group-hover:scale-105 transition-transform duration-300">
                    <JobCharacterSvg jobId={job.id} size={130} />
                  </div>

                  {/* Word title */}
                  <div className="font-fun text-2xl sm:text-3xl font-bold text-slate-800 tracking-wide flex items-center justify-center gap-2">
                    <span>{job.name}</span>
                    <button
                      onClick={(e) => handlePronounce(job.name, e)}
                      title="点击发音"
                      className={`p-2 rounded-full transition-transform active:scale-90 ${
                        isCurrentSpeaking
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Syllables breakdown */}
                  <div className="mt-1 flex items-center justify-center gap-1 text-xs font-mono text-slate-500">
                    {job.syllables.map((syl, i) => (
                      <React.Fragment key={i}>
                        <span className="hover:text-amber-600 transition-colors">{syl}</span>
                        {i < job.syllables.length - 1 && <span className="text-amber-400">·</span>}
                      </React.Fragment>
                    ))}
                    <span className="ml-1 text-slate-400 font-sans">{job.phonetic}</span>
                  </div>

                  {/* Short catchphrase */}
                  <p className="mt-3 text-xs text-slate-500 italic max-w-xs line-clamp-1">
                    &ldquo;{job.catchphrase}&rdquo;
                  </p>
                </div>
              ) : (
                // BACK VIEW: Workplace, Props, Sentence & Chant
                <div className="flex flex-col justify-between h-full py-1 text-left space-y-3">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      🏢 工作地点 (Workplace)
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {job.workplace} · <span className="text-xs text-slate-500 font-normal">{job.workplaceChinese}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      🎒 职业随身道具 (Tools)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.props.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => handlePronounce(p.name, e)}
                          title="点击发音"
                          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
                        >
                          <span>{p.icon}</span>
                          <span className="font-semibold">{p.name}</span>
                          <span className="text-[10px] text-slate-400">{p.chinese}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50/70 p-2.5 rounded-2xl border border-amber-200/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 mb-0.5">
                      <span>💬 例句 (Sentence)</span>
                      <button
                        onClick={(e) => handlePronounce(job.sampleSentence, e)}
                        className="text-amber-700 hover:text-amber-900 p-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs font-medium text-slate-800">{job.sampleSentence}</p>
                    <p className="text-[11px] text-slate-500">{job.sentenceChinese}</p>
                  </div>

                  <div className="bg-rose-50/60 p-2.5 rounded-2xl border border-rose-200/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-rose-900 mb-0.5">
                      <span>🎵 课堂儿歌口诀 (Chant)</span>
                      <button
                        onClick={(e) => handlePronounce(`${job.chant.line1} ${job.chant.line2}`, e)}
                        className="text-rose-700 hover:text-rose-900 p-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-rose-800 italic leading-snug">{job.chant.line1}</p>
                    <p className="text-xs text-rose-800 italic leading-snug">{job.chant.line2}</p>
                  </div>
                </div>
              )}

              {/* Bottom flip button hint */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <RotateCw className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                  <span>{isFlipped ? '点击翻回正面' : '点击查看道具与口诀'}</span>
                </span>
                <span className="text-[10px] text-slate-300 font-mono">#{job.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Classroom Spotlight Modal for Teacher Projection */}
      {spotlightJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border-4 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setSpotlightJob(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Carousel navigation arrows */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleSpotlightPrev}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> 上一个
              </button>
              <span className="text-xs font-bold text-slate-400">
                大屏精讲模式 · {spotlightJob.chinese}
              </span>
              <button
                onClick={handleSpotlightNext}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
              >
                下一个 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Spotlight Content */}
            {!spotlightFlipped ? (
              <div className="text-center flex flex-col items-center">
                <div className="my-2">
                  <JobCharacterSvg jobId={spotlightJob.id} size={200} />
                </div>

                <h2 className="font-fun text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-wide mt-2">
                  {spotlightJob.name}
                </h2>
                <div className="text-lg font-bold text-amber-600 mt-1">
                  {spotlightJob.chinese} · <span className="font-mono font-normal text-slate-500">{spotlightJob.phonetic}</span>
                </div>

                {/* Big pronunciation CTA button */}
                <div className="flex items-center gap-3 mt-5">
                  <button
                    onClick={() => handlePronounce(spotlightJob.name)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-fun text-lg font-bold shadow-md hover:shadow-lg transition-transform active:scale-95"
                  >
                    <Volume2 className="w-6 h-6 animate-pulse" />
                    <span>全班大声朗读</span>
                  </button>
                  <button
                    onClick={() => {
                      speakWord(spotlightJob.name, 0.7);
                    }}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-sm transition-all"
                  >
                    🐢 慢速拼读
                  </button>
                </div>

                {/* TPR Class Action cue */}
                <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-left w-full">
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1">
                    <Smile className="w-4 h-4 text-emerald-600" />
                    <span>TPR 肢体动作互动 (Let&apos;s Act!):</span>
                  </div>
                  <p className="text-sm font-medium text-emerald-950">
                    {spotlightJob.tprAction}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <JobCharacterSvg jobId={spotlightJob.id} size={70} />
                  <div>
                    <h3 className="font-fun text-2xl font-bold text-slate-900">{spotlightJob.name} ({spotlightJob.chinese})</h3>
                    <p className="text-xs text-slate-500">{spotlightJob.tagline}</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 mb-1 flex items-center justify-between">
                    <span>课堂跟读例句:</span>
                    <button
                      onClick={() => handlePronounce(spotlightJob.sampleSentence)}
                      className="text-amber-700 hover:text-amber-900"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-base font-semibold text-slate-800">{spotlightJob.sampleSentence}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{spotlightJob.sentenceChinese}</p>
                </div>

                <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200">
                  <div className="text-xs font-bold text-rose-800 mb-1 flex items-center justify-between">
                    <span>儿歌节奏说唱 (Chant along!):</span>
                    <button
                      onClick={() => handlePronounce(`${spotlightJob.chant.line1} ${spotlightJob.chant.line2}`)}
                      className="text-rose-700 hover:text-rose-900"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-base font-bold text-rose-900 italic">{spotlightJob.chant.line1}</p>
                  <p className="text-base font-bold text-rose-900 italic">{spotlightJob.chant.line2}</p>
                </div>
              </div>
            )}

            {/* Toggle front/back inside spotlight */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center">
              <button
                onClick={() => setSpotlightFlipped(!spotlightFlipped)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-amber-800 bg-slate-100 hover:bg-amber-100 px-4 py-2 rounded-xl transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                <span>{spotlightFlipped ? '返回人物大图' : '查看例句与儿歌'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
