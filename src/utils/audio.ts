/**
 * Web Audio Synthesizer for cheerful background music and interactive sound effects
 * Plus Web Speech API integration for native English pronunciation
 */

let audioCtx: AudioContext | null = null;
let bgmGainNode: GainNode | null = null;
let bgmInterval: number | null = null;
let isBgmPlaying = false;
let currentBgmVolume = 0.22;
let soundEffectsEnabled = true;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Pentatonic cheerful melody notes in Hz (C Major Pentatonic: C4, D4, E4, G4, A4, C5, D5, E5, G5)
const PENTATONIC_SCALE = [
  261.63, 293.66, 329.63, 392.00, 440.00,
  523.25, 587.33, 659.25, 783.99
];

// Cheerful xylophone / marimba music loop notes sequence
const BGM_MELODY_STEPS = [
  0, 2, 4, 7, 5, 4, 2, 0,
  2, 4, 7, 8, 7, 5, 4, 2,
  4, 5, 7, 4, 2, 0, 2, 4,
  5, 4, 2, 0, 2, 0, -1, 0
];

const BASS_CHORDS = [
  130.81, 130.81, 164.81, 164.81, // C - C - E - E
  174.61, 174.61, 196.00, 196.00  // F - F - G - G
];

let melodyIndex = 0;
let bassIndex = 0;

/**
 * Play a single cute marimba/music-box chime tone
 */
function playSynthNote(freq: number, duration: number, gainValue: number, type: OscillatorType = 'triangle') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm marimba envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    if (bgmGainNode) {
      osc.connect(gain);
      gain.connect(bgmGainNode);
    } else {
      osc.connect(gain);
      gain.connect(ctx.destination);
    }

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio error if user hasn't interacted yet
  }
}

/**
 * Start or resume the cheerful background music loop
 */
export function startBgm(): boolean {
  try {
    const ctx = getAudioContext();
    if (!bgmGainNode) {
      bgmGainNode = ctx.createGain();
      bgmGainNode.gain.setValueAtTime(currentBgmVolume, ctx.currentTime);
      bgmGainNode.connect(ctx.destination);
    }

    if (isBgmPlaying) return true;
    isBgmPlaying = true;

    // Tempo: ~115 BPM (step interval ~ 260ms)
    melodyIndex = 0;
    bassIndex = 0;

    bgmInterval = window.setInterval(() => {
      if (!isBgmPlaying) return;

      const noteIdx = BGM_MELODY_STEPS[melodyIndex % BGM_MELODY_STEPS.length];
      if (noteIdx >= 0 && noteIdx < PENTATONIC_SCALE.length) {
        const freq = PENTATONIC_SCALE[noteIdx];
        // Bell-like high xylophone
        playSynthNote(freq, 0.45, 0.14, 'triangle');
        // Gentle overtone
        if (melodyIndex % 4 === 0) {
          playSynthNote(freq * 1.5, 0.3, 0.04, 'sine');
        }
      }

      // Warm bass pulse every 4 steps
      if (melodyIndex % 4 === 0) {
        const bassFreq = BASS_CHORDS[bassIndex % BASS_CHORDS.length];
        playSynthNote(bassFreq, 0.65, 0.16, 'sine');
        bassIndex++;
      }

      melodyIndex++;
    }, 260);

    return true;
  } catch {
    return false;
  }
}

/**
 * Stop background music
 */
export function stopBgm() {
  isBgmPlaying = false;
  if (bgmInterval !== null) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

/**
 * Toggle BGM on / off
 */
export function toggleBgm(): boolean {
  if (isBgmPlaying) {
    stopBgm();
    return false;
  } else {
    return startBgm();
  }
}

export function getIsBgmPlaying(): boolean {
  return isBgmPlaying;
}

export function setBgmVolume(volume: number) {
  currentBgmVolume = Math.max(0, Math.min(1, volume));
  if (bgmGainNode && audioCtx) {
    bgmGainNode.gain.setValueAtTime(currentBgmVolume, audioCtx.currentTime);
  }
}

export function getBgmVolume(): number {
  return currentBgmVolume;
}

export function setSoundEffectsEnabled(enabled: boolean) {
  soundEffectsEnabled = enabled;
}

export function getSoundEffectsEnabled(): boolean {
  return soundEffectsEnabled;
}

// -------------------------------------------------------------
// Interactive Sound Effects (Web Audio API)
// -------------------------------------------------------------

/**
 * Cheerful ascending chord when student answers correctly
 */
export function playCorrectSound() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
    });
  } catch {
    // Ignore audio error
  }
}

/**
 * Soft cartoon boing for friendly retry (encouraging)
 */
export function playWrongSound() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.28);

    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.32);
  } catch {
    // Ignore
  }
}

/**
 * Crisp bubble pop sound
 */
export function playPopSound() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore
  }
}

/**
 * Bright sparkle sound for rewards
 */
export function playSparkleSound() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const notes = [1200, 1600, 2000, 2400];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.04);
      osc.stop(ctx.currentTime + i * 0.04 + 0.2);
    });
  } catch {
    // Ignore
  }
}

/**
 * Little wooden click for card flips / wheel ticks
 */
export function playCardFlipSound() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore
  }
}

/**
 * Celebratory fanfare when completing a round
 */
export function playFanfareSound() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const notes = [
      { f: 523.25, d: 0.15, t: 0.0 },   // C5
      { f: 659.25, d: 0.15, t: 0.16 },  // E5
      { f: 783.99, d: 0.15, t: 0.32 },  // G5
      { f: 1046.50, d: 0.45, t: 0.48 }  // C6
    ];

    notes.forEach((item) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, ctx.currentTime + item.t);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + item.t);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + item.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.t + item.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + item.t);
      osc.stop(ctx.currentTime + item.t + item.d + 0.05);
    });
  } catch {
    // Ignore
  }
}

// -------------------------------------------------------------
// Web Speech API for English Pronunciation
// -------------------------------------------------------------

/**
 * Speak any English word or sentence with native pronunciation
 * @param text The text to speak
 * @param rate Speech rate (0.75 for slow phonics, 1.0 for normal)
 * @param onEnd Optional callback when speaking completes
 */
export function speakWord(text: string, rate = 1.0, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel prior utterance
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.1; // Slightly higher, friendly tone for kids

  // Find preferred English voices
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(
    (v) => (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en')) &&
           (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}
