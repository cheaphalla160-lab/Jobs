import React, { useState } from 'react';
import { Printer, BookOpen, Music, Sparkles, Smile, CheckSquare, Download, Volume2 } from 'lucide-react';
import { JOBS_DATA } from '../types/job';
import { JobCharacterSvg } from './JobCharacterSvg';
import { speakWord } from '../utils/audio';

export const TeacherKit: React.FC<TeacherKitProps> = () => {
  const [activeSection, setActiveSection] = useState<'plan' | 'chants' | 'tpr' | 'print'>('plan');

  const handlePrint = () => {
    window.print();
  };

  const playChantLine = (text: string) => {
    speakWord(text, 0.9);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-100/90 via-sky-100/80 to-emerald-100/90 rounded-3xl p-5 sm:p-6 border border-amber-200/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <span>📚 教师专区</span>
            <span>·</span>
            <span>备课锦囊与教具</span>
          </div>
          <h2 className="font-fun text-2xl sm:text-3xl font-bold text-slate-800">
            高级备课助手 (Teacher&apos;s Prep Kit)
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            为小学英语教师精心定制的40分钟完整教案、拍手儿歌律动、TPR肢体教学法与可打印A4单词闪卡。
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex bg-white/90 p-1.5 rounded-2xl border border-amber-200 shadow-2xs self-start md:self-auto">
          <button
            onClick={() => setActiveSection('plan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'plan' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            40分钟完整教案
          </button>
          <button
            onClick={() => setActiveSection('chants')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'chants' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            拍手儿歌律动
          </button>
          <button
            onClick={() => setActiveSection('tpr')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'tpr' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            TPR 动作速查
          </button>
          <button
            onClick={() => setActiveSection('print')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'print' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            打印A4单词卡
          </button>
        </div>
      </div>

      {/* SECTION 1: 40-Minute Lesson Plan */}
      {activeSection === 'plan' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-fun text-2xl font-bold text-slate-800">
              小学英语四年级公开课教学设计方案
            </h3>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2 font-medium">
              <span><strong>教学主题:</strong> Unit Jobs & Occupations (职业与梦想)</span>
              <span><strong>课时:</strong> 1课时 (40分钟)</span>
              <span><strong>核心词汇:</strong> Teacher, Student, Pirate, Dentist, Film Star, Pop Star, Nurse, Doctor, Farmer</span>
            </div>
          </div>

          {/* 5 Lesson Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-fun text-sm font-bold text-amber-900">
                  Step 1: 热身与导入 (Warm-up & Lead-in · 5 分钟)
                </span>
                <span className="text-xs text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full font-mono">00:00 - 05:00</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>播放网页内置的欢快背景音乐（BGM），带领全班做课前律动 Clap hands。</li>
                <li>教师展示书包、眼罩、麦克风等实物或剪影：“Look! What can you see? Who uses this?” 引出今日主题 <em>Jobs</em>。</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-fun text-sm font-bold text-sky-900">
                  Step 2: 单词呈现与精讲 (Presentation · 12 分钟)
                </span>
                <span className="text-xs text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full font-mono">05:00 - 17:00</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>使用网页中的<strong>“单词闪卡 - 大屏精讲模式”</strong>，点击发音小喇叭带领全班跟读（先慢速音节拆分，再原速标准朗读）。</li>
                <li>结合 TPR 教学法：讲解 <em>dentist</em> 时做检查牙齿并露出白牙动作；讲解 <em>pirate</em> 时做独眼戴眼罩动作，全班齐做。</li>
                <li>成对对比教学：<em>doctor & nurse</em>（医院白衣天使）、<em>film star & pop star</em>（舞台与荧幕明星）、<em>teacher & student</em>（校园师生）。</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-fun text-sm font-bold text-emerald-900">
                  Step 3: 游戏操练与巩固 (Practice · 13 分钟)
                </span>
                <span className="text-xs text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-mono">17:00 - 30:00</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li><strong>听音反应游戏:</strong> 切换到<strong>“泡泡听音大作战”</strong>，请两位同学上台在触屏一体机上比赛，看谁先戳破读到的职业泡泡。</li>
                <li><strong>逻辑破案游戏:</strong> 切换到<strong>“职业大侦探”</strong>，全班一起阅读第1条、第2条线索，举手抢答“Who is he/she?”。</li>
                <li><strong>拼词小火车:</strong> 请拼读较薄弱的学生上台将打乱的车票按顺序排列，强化单词拼写记忆。</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-fun text-sm font-bold text-purple-900">
                  Step 4: 综合产出与小组PK (Production · 8 分钟)
                </span>
                <span className="text-xs text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full font-mono">30:00 - 38:00</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>切换到<strong>“课堂幸运大转盘”</strong>，启动转盘抽取职业。</li>
                <li>转盘抽中者所在小组起立表演该职业动作并说出句型：“I am a farmer. I have a tractor.”，胜者为红/蓝/绿队加星计分！</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-fun text-sm font-bold text-rose-900">
                  Step 5: 总结与分层作业 (Summary & Homework · 2 分钟)
                </span>
                <span className="text-xs text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full font-mono">38:00 - 40:00</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>齐唱拍手儿歌《Jobs Rhyme》收尾。</li>
                <li>基础作业：听读9个职业单词并打卡；拓展作业：采访爸爸妈妈的职业并画一幅“My Dream Job”小海报。</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Classroom Chants */}
      {activeSection === 'chants' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-fun text-2xl font-bold text-slate-800">
                课堂拍手律动儿歌 (Classroom Job Chants)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                押韵顺口，节奏感强，配合拍手与跺脚，让孩子们轻松记忆单词与代表性动作！
              </p>
            </div>
          </div>

          {/* Full Master Chant */}
          <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-5 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-fun text-base font-bold text-amber-900">
                🎶 综合串联大歌谣 (Full All-Jobs Rhyme)
              </span>
              <button
                onClick={() => playChantLine('Teacher, student, in the school. Pirate sailing, oh so cool! Dentist smiling, teeth so bright. Pop star singing left and right! Film star acting on the screen. Nurse and doctor in the team. Farmer working in the sun. Learning jobs is super fun!')}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors flex items-center gap-1 shadow-xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>播放全篇示范朗读</span>
              </button>
            </div>
            <div className="text-sm font-medium text-slate-800 space-y-1 leading-relaxed bg-white/70 p-4 rounded-xl">
              <p>Teacher, student, in the school, 🏫</p>
              <p>Pirate sailing, oh so cool! ⛵</p>
              <p>Dentist smiling, teeth so bright, 🦷</p>
              <p>Pop star singing left and right! 🎤</p>
              <p>Film star acting on the screen, 🎬</p>
              <p>Nurse and doctor in the team! 🩺</p>
              <p>Farmer working in the sun, 🚜</p>
              <p>Learning English is super fun! 🌟</p>
            </div>
          </div>

          {/* Individual Job Chants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {JOBS_DATA.map((job) => (
              <div key={job.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <JobCharacterSvg jobId={job.id} size={36} />
                    <span className="font-fun text-base font-bold text-slate-800">{job.name}</span>
                  </div>
                  <button
                    onClick={() => playChantLine(`${job.chant.line1} ${job.chant.line2}`)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-100">
                  <p>{job.chant.line1}</p>
                  <p>{job.chant.line2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TPR Action Quick Guide */}
      {activeSection === 'tpr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-fun text-2xl font-bold text-slate-800">
              TPR (Total Physical Response) 全身反应动作速查表
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              小学生注意力集中时间短，通过夸张生动的肢体动作带动肌肉记忆，能极大提升英语习得效率！
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOBS_DATA.map((job) => (
              <div key={job.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <JobCharacterSvg jobId={job.id} size={50} />
                  <div>
                    <div className="font-fun text-lg font-bold text-slate-800">
                      {job.name} ({job.chinese})
                    </div>
                    <div className="text-[11px] text-amber-700 font-medium">
                      道具：{job.props.map((p) => p.name).join(', ')}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-emerald-700 block mb-1">🎭 课堂教学动作提示:</strong>
                  {job.tprAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Printable Flashcards View */}
      {activeSection === 'print' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-fun text-2xl font-bold text-slate-800">
                可打印A4教具闪卡排版 (Printable Flashcard Sheet)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                点击右侧按钮直接唤起浏览器打印对话框，带虚线剪刀裁剪标记，适合上课作为教具或发给小组！
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>立即打印教具卡片 (Print A4)</span>
            </button>
          </div>

          {/* Printable Cards Grid */}
          <div className="p-8 bg-white rounded-3xl border-2 border-slate-200 shadow-sm print:m-0 print:p-0 print:border-none">
            <div className="grid grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
              {JOBS_DATA.map((job) => (
                <div
                  key={job.id}
                  className="border-2 border-dashed border-slate-300 rounded-3xl p-4 text-center flex flex-col items-center justify-between min-h-[220px] bg-slate-50/50 print:bg-white print:border-slate-400"
                >
                  <div className="text-[10px] text-slate-400 font-mono self-start flex items-center gap-1">
                    <span>✂ 沿虚线剪下</span>
                  </div>

                  <div className="my-1">
                    <JobCharacterSvg jobId={job.id} size={90} />
                  </div>

                  <div>
                    <div className="font-fun text-2xl font-extrabold text-slate-900 tracking-wide">
                      {job.name}
                    </div>
                    <div className="text-xs font-bold text-slate-600 mt-0.5">
                      {job.chinese} · <span className="font-mono font-normal text-slate-400">{job.phonetic}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 italic mt-1">
                    &ldquo;{job.sampleSentence}&rdquo;
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TeacherKitProps {
  // empty
}
