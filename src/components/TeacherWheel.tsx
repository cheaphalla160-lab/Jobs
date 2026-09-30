import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Plus, Minus, RotateCw, Volume2, Smile, Award } from 'lucide-react';
import { JobItem, JOBS_DATA } from '../types/job';
import { JobCharacterSvg } from './JobCharacterSvg';
import {
  speakWord,
  playCardFlipSound,
  playCorrectSound,
  playSparkleSound,
  playFanfareSound
} from '../utils/audio';

interface TeacherWheelProps {
  onEarnStar: () => void;
}

const CLASS_TASKS = [
  { type: 'TPR 表演秀', desc: '请被抽中的同学/小组用肢体动作模仿该职业，全班大声猜出英文！' },
  { type: '儿歌大合唱', desc: '全班打节拍，齐声念出该职业的英文儿歌口诀！' },
  { type: '闪电拼读', desc: '请一位同学起立，大声拼出单词的每一个字母！' },
  { type: '例句造句', desc: '用 "He / She is a..." 或是 "I want to be a..." 完整造句！' },
  { type: '快问快答', desc: '回答问题：Where does this person work? (TA在哪里工作？)' },
];

export const TeacherWheel: React.FC<TeacherWheelProps> = ({ onEarnStar }) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [selectedTask, setSelectedTask] = useState<string>('');

  // Team PK scores
  const [redTeamScore, setRedTeamScore] = useState<number>(0);
  const [blueTeamScore, setBlueTeamScore] = useState<number>(0);
  const [greenTeamScore, setGreenTeamScore] = useState<number>(0);

  const numSlices = JOBS_DATA.length; // 9 slices
  const sliceAngle = 360 / numSlices; // 40 degrees

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedJob(null);

    // Play ticking sounds
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      playCardFlipSound();
      tickCount++;
      if (tickCount > 18) clearInterval(tickInterval);
    }, 120);

    // Spin at least 4 full rotations + random slice
    const randomSlice = Math.floor(Math.random() * numSlices);
    const extraSpins = 360 * 5;
    // Calculate final rotation so arrow at top (270deg or 0deg) lands on this slice
    const targetAngle = extraSpins + (360 - (randomSlice * sliceAngle + sliceAngle / 2));
    const finalRotation = rotation + targetAngle;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const landedJob = JOBS_DATA[randomSlice];
      setSelectedJob(landedJob);

      // Random task
      const randomTask = CLASS_TASKS[Math.floor(Math.random() * CLASS_TASKS.length)];
      setSelectedTask(`${randomTask.type}: ${randomTask.desc}`);

      playCorrectSound();
      speakWord(`It's the ${landedJob.name}!`, 1.0);
      onEarnStar();

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 3200);
  };

  const modifyTeamScore = (team: 'red' | 'blue' | 'green', delta: number) => {
    playSparkleSound();
    if (team === 'red') setRedTeamScore((s) => Math.max(0, s + delta));
    if (team === 'blue') setBlueTeamScore((s) => Math.max(0, s + delta));
    if (team === 'green') setGreenTeamScore((s) => Math.max(0, s + delta));
  };

  const resetAllScores = () => {
    setRedTeamScore(0);
    setBlueTeamScore(0);
    setGreenTeamScore(0);
  };

  // Wheel slice colors (bright, distinct, kid-friendly)
  const WHEEL_COLORS = [
    '#EF4444', // Red
    '#F97316', // Orange
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#84CC16', // Lime
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-100/90 via-rose-100/80 to-amber-100/90 rounded-3xl p-5 sm:p-6 border border-purple-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider mb-1">
            <span>🎡 课堂互动</span>
            <span>·</span>
            <span>大转盘与小组PK</span>
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-800">
            课堂幸运大转盘 (Lucky Wheel & PK)
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            老师可在投影大屏上转动转盘抽取职业与课堂互动任务，并为活跃回答的小组加星计分！
          </p>
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-fun font-bold text-base shadow-md transition-transform active:scale-95 flex items-center gap-2 self-start md:self-auto"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? '正在旋转中...' : '开始转盘 (Spin!)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Big Lucky Wheel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs flex flex-col items-center justify-center relative min-h-[460px] overflow-hidden">
          {/* Wheel Pointer Arrow */}
          <div className="absolute top-4 z-20 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-rose-600 filter drop-shadow-md" />
            <div className="w-3 h-3 rounded-full bg-rose-700 -mt-6 border-2 border-white" />
          </div>

          {/* SVG Rotating Wheel */}
          <div className="relative p-4 mt-6">
            <svg
              width="340"
              height="340"
              viewBox="0 0 400 400"
              className="drop-shadow-xl transition-transform ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: isSpinning ? '3.2s' : '0s',
                transitionTimingFunction: 'cubic-bezier(0.15, 0.9, 0.2, 1)',
              }}
            >
              {/* Slices */}
              {JOBS_DATA.map((job, idx) => {
                const startAngle = idx * sliceAngle;
                const endAngle = (idx + 1) * sliceAngle;
                const midAngle = startAngle + sliceAngle / 2;

                // Polar to Cartesian
                const r = 185;
                const cx = 200;
                const cy = 200;

                const x1 = cx + r * Math.cos((Math.PI * (startAngle - 90)) / 180);
                const y1 = cy + r * Math.sin((Math.PI * (startAngle - 90)) / 180);
                const x2 = cx + r * Math.cos((Math.PI * (endAngle - 90)) / 180);
                const y2 = cy + r * Math.sin((Math.PI * (endAngle - 90)) / 180);

                const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

                // Text position
                const textR = 125;
                const tx = cx + textR * Math.cos((Math.PI * (midAngle - 90)) / 180);
                const ty = cy + textR * Math.sin((Math.PI * (midAngle - 90)) / 180);

                return (
                  <g key={job.id}>
                    <path
                      d={pathData}
                      fill={WHEEL_COLORS[idx % WHEEL_COLORS.length]}
                      stroke="#FFFFFF"
                      strokeWidth="3"
                    />
                    <g transform={`translate(${tx}, ${ty}) rotate(${midAngle})`}>
                      <text
                        x="0"
                        y="-4"
                        fill="#FFFFFF"
                        fontSize="13"
                        fontFamily="Fredoka, sans-serif"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {job.name}
                      </text>
                      <text
                        x="0"
                        y="10"
                        fill="#FEF08A"
                        fontSize="10"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                      >
                        {job.chinese}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Center Hub */}
              <circle cx="200" cy="200" r="32" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />
              <circle cx="200" cy="200" r="22" fill="#F59E0B" />
              <text x="200" y="206" fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">★</text>
            </svg>
          </div>

          {/* Quick Spin Button on bottom */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white font-fun font-bold text-lg shadow-lg active:scale-95 transition-transform"
          >
            {isSpinning ? '旋转中...' : '转动转盘 🎲'}
          </button>
        </div>

        {/* Right: Selected Result & Team PK Scoreboard (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected Job Result Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>🎯 抽中结果 (Landed Job)</span>
              {selectedJob && (
                <button
                  onClick={() => speakWord(selectedJob.name, 1.0)}
                  className="text-purple-600 hover:text-purple-800 flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>发音</span>
                </button>
              )}
            </div>

            {selectedJob ? (
              <div className="space-y-3 animate-in fade-in zoom-in-95">
                <div className="flex items-center gap-3">
                  <JobCharacterSvg jobId={selectedJob.id} size={70} />
                  <div>
                    <h3 className="font-fun text-2xl font-bold text-slate-900">
                      {selectedJob.name}
                    </h3>
                    <div className="text-sm font-semibold text-purple-600">
                      {selectedJob.chinese} · {selectedJob.phonetic}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200">
                  <div className="text-xs font-bold text-purple-900 mb-1 flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5 text-purple-600" />
                    <span>课堂互动任务 (Classroom Challenge):</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedTask}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 italic bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50">
                  口诀节奏：&ldquo;{selectedJob.chant.line1} {selectedJob.chant.line2}&rdquo;
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <span className="text-4xl block">🎡</span>
                <p className="text-xs">点击“开始转盘”抽取本轮幸运职业与挑战！</p>
              </div>
            )}
          </div>

          {/* Group PK Scoreboard (小组PK得分板) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-fun text-lg font-bold text-slate-800 flex items-center gap-1.5">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>小组课堂PK积分榜</span>
              </h3>
              <button
                onClick={resetAllScores}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline"
              >
                积分清零
              </button>
            </div>

            {/* Teams List */}
            <div className="space-y-2.5">
              {/* Red Team */}
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    红队
                  </div>
                  <div>
                    <div className="text-xs font-bold text-rose-950">猛狮队 (Lions)</div>
                    <div className="text-xs text-rose-600 font-mono font-bold">
                      ⭐ {redTeamScore} 颗星
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => modifyTeamScore('red', 1)}
                    className="p-1.5 rounded-lg bg-white text-rose-700 hover:bg-rose-100 font-bold border border-rose-200 text-xs"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => modifyTeamScore('red', 2)}
                    className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 font-bold text-xs shadow-xs"
                  >
                    +2
                  </button>
                  <button
                    onClick={() => modifyTeamScore('red', -1)}
                    className="p-1.5 rounded-lg bg-white text-slate-400 hover:text-slate-600 text-xs"
                  >
                    -1
                  </button>
                </div>
              </div>

              {/* Blue Team */}
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    蓝队
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-950">飞鹰队 (Eagles)</div>
                    <div className="text-xs text-blue-600 font-mono font-bold">
                      ⭐ {blueTeamScore} 颗星
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => modifyTeamScore('blue', 1)}
                    className="p-1.5 rounded-lg bg-white text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 text-xs"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => modifyTeamScore('blue', 2)}
                    className="p-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-bold text-xs shadow-xs"
                  >
                    +2
                  </button>
                  <button
                    onClick={() => modifyTeamScore('blue', -1)}
                    className="p-1.5 rounded-lg bg-white text-slate-400 hover:text-slate-600 text-xs"
                  >
                    -1
                  </button>
                </div>
              </div>

              {/* Green Team */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    绿队
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-950">熊猫队 (Pandas)</div>
                    <div className="text-xs text-emerald-600 font-mono font-bold">
                      ⭐ {greenTeamScore} 颗星
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => modifyTeamScore('green', 1)}
                    className="p-1.5 rounded-lg bg-white text-emerald-700 hover:bg-emerald-100 font-bold border border-emerald-200 text-xs"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => modifyTeamScore('green', 2)}
                    className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-xs shadow-xs"
                  >
                    +2
                  </button>
                  <button
                    onClick={() => modifyTeamScore('green', -1)}
                    className="p-1.5 rounded-lg bg-white text-slate-400 hover:text-slate-600 text-xs"
                  >
                    -1
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
