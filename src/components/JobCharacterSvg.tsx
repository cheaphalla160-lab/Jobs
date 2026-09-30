import React from 'react';

interface JobCharacterSvgProps {
  jobId: string;
  className?: string;
  size?: number;
}

export const JobCharacterSvg: React.FC<JobCharacterSvgProps> = ({
  jobId,
  className = '',
  size = 140
}) => {
  const s = size;

  switch (jobId) {
    case 'teacher':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          {/* Background circle / blackboard */}
          <circle cx="100" cy="100" r="92" fill="#E6F4EA" />
          <rect x="42" y="32" width="116" height="66" rx="8" fill="#1E3A2F" stroke="#8D6E63" strokeWidth="4" />
          {/* ABC on board */}
          <text x="56" y="58" fill="#F8FAFC" fontSize="16" fontFamily="Fredoka, sans-serif" fontWeight="bold">ABC</text>
          <text x="56" y="78" fill="#FDE047" fontSize="12" fontFamily="sans-serif">1 + 2 = 3</text>
          <path d="M125 50 L142 50 L133 66 Z" fill="#F472B6" opacity="0.8" />
          {/* Body */}
          <ellipse cx="100" cy="168" rx="48" ry="32" fill="#059669" />
          <path d="M85 142 L100 162 L115 142" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          {/* Neck */}
          <rect x="91" y="126" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="104" rx="34" ry="34" fill="#FED7AA" />
          {/* Hair */}
          <path d="M68 96 C68 64, 132 64, 132 96 C136 84, 126 66, 100 66 C74 66, 64 84, 68 96 Z" fill="#78350F" />
          <path d="M66 96 C64 116, 72 128, 76 128 C74 112, 74 98, 76 92 Z" fill="#78350F" />
          <path d="M134 96 C136 116, 128 128, 124 128 C126 112, 126 98, 124 92 Z" fill="#78350F" />
          {/* Glasses */}
          <rect x="76" y="94" width="18" height="14" rx="3" fill="#FFFFFF" fillOpacity="0.4" stroke="#DC2626" strokeWidth="2.5" />
          <rect x="106" y="94" width="18" height="14" rx="3" fill="#FFFFFF" fillOpacity="0.4" stroke="#DC2626" strokeWidth="2.5" />
          <line x1="94" y1="101" x2="106" y2="101" stroke="#DC2626" strokeWidth="2.5" />
          {/* Eyes */}
          <circle cx="85" cy="101" r="3" fill="#1E293B" />
          <circle cx="115" cy="101" r="3" fill="#1E293B" />
          <circle cx="86" cy="100" r="1" fill="#FFFFFF" />
          <circle cx="116" cy="100" r="1" fill="#FFFFFF" />
          {/* Smile */}
          <path d="M92 118 Q100 126 108 118" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Rosy cheeks */}
          <circle cx="76" cy="114" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="124" cy="114" r="5" fill="#FCA5A5" opacity="0.6" />
          {/* Pointer stick with star */}
          <line x1="140" y1="160" x2="152" y2="60" stroke="#CA8A04" strokeWidth="4" strokeLinecap="round" />
          <polygon points="152,50 155,57 162,57 157,62 159,69 152,65 146,69 148,62 143,57 150,57" fill="#FACC15" />
        </svg>
      );

    case 'student':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#EFF6FF" />
          {/* Backpack straps behind */}
          <path d="M60 130 C54 150, 56 180, 68 190" stroke="#DC2626" strokeWidth="10" strokeLinecap="round" />
          <path d="M140 130 C146 150, 144 180, 132 190" stroke="#DC2626" strokeWidth="10" strokeLinecap="round" />
          {/* Body */}
          <ellipse cx="100" cy="170" rx="46" ry="32" fill="#2563EB" />
          {/* Polo Collar */}
          <path d="M84 142 L100 156 L116 142" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="98" rx="34" ry="33" fill="#FED7AA" />
          {/* Hair & cute cap */}
          <path d="M66 90 C66 60, 134 60, 134 90 C128 72, 100 68, 66 90 Z" fill="#451A03" />
          {/* Cap */}
          <path d="M72 74 C72 50, 128 50, 128 74 Z" fill="#F97316" />
          <path d="M64 74 L138 74 C144 74, 144 78, 136 80 L70 80 C62 80, 62 74, 72 74 Z" fill="#EA580C" />
          <circle cx="100" cy="50" r="4" fill="#FDE047" />
          {/* Eyes */}
          <circle cx="86" cy="96" r="4" fill="#1E293B" />
          <circle cx="114" cy="96" r="4" fill="#1E293B" />
          <circle cx="87" cy="94" r="1.5" fill="#FFFFFF" />
          <circle cx="115" cy="94" r="1.5" fill="#FFFFFF" />
          {/* Big happy smile */}
          <path d="M90 108 Q100 120 110 108" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" fill="#EF4444" />
          <circle cx="78" cy="106" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="122" cy="106" r="5" fill="#FCA5A5" opacity="0.6" />
          {/* Pencil in hand */}
          <g transform="translate(138, 115) rotate(25)">
            <rect x="0" y="0" width="10" height="42" fill="#FACC15" rx="1" />
            <polygon points="0,42 10,42 5,52" fill="#FED7AA" />
            <polygon points="3,48 7,48 5,52" fill="#1E293B" />
            <rect x="0" y="-8" width="10" height="8" fill="#F43F5E" rx="2" />
            <rect x="0" y="-2" width="10" height="2" fill="#94A3B8" />
          </g>
        </svg>
      );

    case 'pirate':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#FEF3C7" />
          {/* Body */}
          <ellipse cx="100" cy="172" rx="46" ry="32" fill="#B45309" />
          {/* Striped shirt under coat */}
          <path d="M86 142 L100 178 L114 142" fill="#FFFFFF" />
          <line x1="90" y1="150" x2="110" y2="150" stroke="#DC2626" strokeWidth="3" />
          <line x1="92" y1="160" x2="108" y2="160" stroke="#DC2626" strokeWidth="3" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="102" rx="34" ry="32" fill="#FED7AA" />
          {/* Pirate Beard & hair */}
          <path d="M66 100 C64 126, 76 138, 100 138 C124 138, 136 126, 134 100 Z" fill="#451A03" opacity="0.3" />
          {/* Eye Patch on left eye */}
          <line x1="68" y1="92" x2="132" y2="104" stroke="#1E293B" strokeWidth="2.5" />
          <ellipse cx="86" cy="98" rx="8" ry="9" fill="#0F172A" />
          {/* Right Eye (winking or shiny) */}
          <circle cx="115" cy="98" r="4" fill="#1E293B" />
          <circle cx="116" cy="96" r="1.5" fill="#FFFFFF" />
          {/* Confident pirate smile */}
          <path d="M92 115 Q104 125 116 114" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Pirate Tricorn Hat */}
          <path d="M48 76 C52 46, 148 46, 152 76 C138 72, 114 62, 100 62 C86 62, 62 72, 48 76 Z" fill="#1E293B" />
          <path d="M70 70 C80 34, 120 34, 130 70 Z" fill="#0F172A" />
          {/* Golden skull / crossbones emblem */}
          <circle cx="100" cy="54" r="6" fill="#FACC15" />
          <circle cx="98" cy="53" r="1" fill="#000000" />
          <circle cx="102" cy="53" r="1" fill="#000000" />
          {/* Little green parrot friend on shoulder */}
          <g transform="translate(142, 108)">
            <ellipse cx="10" cy="16" rx="8" ry="14" fill="#16A34A" />
            <circle cx="10" cy="6" r="6" fill="#22C55E" />
            <polygon points="15,6 20,8 15,10" fill="#F59E0B" />
            <circle cx="12" cy="5" r="1.5" fill="#000000" />
            <path d="M6 18 Q-2 26 4 32" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'dentist':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#E0F2FE" />
          {/* Body with scrubs */}
          <ellipse cx="100" cy="170" rx="46" ry="32" fill="#0284C7" />
          {/* V-neck */}
          <path d="M84 142 L100 160 L116 142" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="100" rx="34" ry="33" fill="#FED7AA" />
          {/* Hair */}
          <path d="M68 94 C68 62, 132 62, 132 94 C128 72, 72 72, 68 94 Z" fill="#92400E" />
          {/* Dentist Headband Reflector Mirror */}
          <ellipse cx="100" cy="74" rx="36" ry="6" fill="#0369A1" />
          <circle cx="100" cy="72" r="10" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="100" cy="72" r="7" fill="#E2E8F0" />
          <circle cx="98" cy="70" r="2" fill="#FFFFFF" />
          {/* Eyes */}
          <circle cx="86" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="114" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="87" cy="96" r="1.5" fill="#FFFFFF" />
          <circle cx="115" cy="96" r="1.5" fill="#FFFFFF" />
          {/* Cheerful clean smile with shiny teeth! */}
          <rect x="90" y="112" width="20" height="9" rx="4.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
          <line x1="97" y1="112" x2="97" y2="121" stroke="#0284C7" strokeWidth="1" />
          <line x1="103" y1="112" x2="103" y2="121" stroke="#0284C7" strokeWidth="1" />
          <circle cx="78" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="122" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          {/* Giant sparkling tooth prop held on the side */}
          <g transform="translate(136, 100)">
            <path
              d="M12 0 C18 0, 24 5, 24 12 C24 18, 20 30, 16 34 C14 36, 12 30, 12 26 C12 30, 10 36, 8 34 C4 30, 0 18, 0 12 C0 5, 6 0, 12 0 Z"
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="2"
            />
            {/* Sparkle */}
            <polygon points="22,4 23,7 26,8 23,9 22,12 21,9 18,8 21,7" fill="#FACC15" />
          </g>
        </svg>
      );

    case 'film-star':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#F3E8FF" />
          {/* Red carpet star glow background */}
          <polygon points="100,20 106,38 124,38 110,50 115,68 100,56 85,68 90,50 76,38 94,38" fill="#FACC15" opacity="0.4" />
          {/* Body in glamorous jacket */}
          <ellipse cx="100" cy="170" rx="46" ry="32" fill="#7C3AED" />
          <path d="M86 142 L100 162 L114 142" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="100" rx="34" ry="33" fill="#FED7AA" />
          {/* Fabulous Styled Hair */}
          <path d="M64 92 C62 50, 138 50, 136 92 C142 82, 134 52, 100 52 C66 52, 58 82, 64 92 Z" fill="#18181B" />
          {/* Cool Star Sunglasses */}
          <path d="M72 92 L94 92 L88 108 L72 108 Z" fill="#18181B" stroke="#FACC15" strokeWidth="2.5" />
          <path d="M106 92 L128 92 L128 108 L112 108 Z" fill="#18181B" stroke="#FACC15" strokeWidth="2.5" />
          <line x1="94" y1="98" x2="106" y2="98" stroke="#FACC15" strokeWidth="3" />
          {/* Reflection on glasses */}
          <line x1="76" y1="95" x2="84" y2="105" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="112" y1="95" x2="120" y2="105" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          {/* Glamorous smile */}
          <path d="M92 116 Q100 124 108 116" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" fill="#E11D48" />
          {/* Clapperboard in hand */}
          <g transform="translate(136, 115) rotate(15)">
            <rect x="0" y="10" width="34" height="26" fill="#18181B" rx="2" />
            <rect x="0" y="0" width="34" height="10" fill="#18181B" rx="2" stroke="#FFFFFF" strokeWidth="1" />
            {/* White stripes on clapper */}
            <polygon points="4,1 9,1 5,9 0,9" fill="#FFFFFF" />
            <polygon points="12,1 17,1 13,9 8,9" fill="#FFFFFF" />
            <polygon points="20,1 25,1 21,9 16,9" fill="#FFFFFF" />
            <polygon points="28,1 33,1 29,9 24,9" fill="#FFFFFF" />
            <text x="4" y="24" fill="#FFFFFF" fontSize="7" fontWeight="bold">SCENE 1</text>
          </g>
        </svg>
      );

    case 'pop-star':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#FCE7F3" />
          {/* Musical notes in background */}
          <text x="36" y="52" fill="#EC4899" fontSize="22" fontWeight="bold">♪</text>
          <text x="148" y="58" fill="#8B5CF6" fontSize="26" fontWeight="bold">♫</text>
          {/* Body in vibrant outfit */}
          <ellipse cx="100" cy="170" rx="46" ry="32" fill="#DB2777" />
          <circle cx="100" cy="155" r="8" fill="#FDE047" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="100" rx="34" ry="33" fill="#FED7AA" />
          {/* Anime / Pop Star Pink Hair */}
          <path d="M64 92 C62 48, 138 48, 136 92 C146 112, 134 60, 100 58 C66 60, 54 112, 64 92 Z" fill="#BE185D" />
          {/* Cute star clip */}
          <polygon points="76,68 78,72 82,72 79,75 80,79 76,77 72,79 73,75 70,72 74,72" fill="#FACC15" />
          {/* Shiny eyes with star gleam */}
          <circle cx="86" cy="98" r="4" fill="#1E293B" />
          <circle cx="114" cy="98" r="4" fill="#1E293B" />
          <circle cx="88" cy="96" r="1.5" fill="#FFFFFF" />
          <circle cx="116" cy="96" r="1.5" fill="#FFFFFF" />
          {/* Singing mouth open */}
          <ellipse cx="100" cy="114" rx="7" ry="9" fill="#BE185D" stroke="#9D174D" strokeWidth="1" />
          <ellipse cx="100" cy="116" rx="4" ry="4" fill="#FDA4AF" />
          <circle cx="76" cy="108" r="5" fill="#F472B6" opacity="0.6" />
          <circle cx="124" cy="108" r="5" fill="#F472B6" opacity="0.6" />
          {/* Shiny Golden Microphone held up */}
          <g transform="translate(126, 106) rotate(-15)">
            <ellipse cx="10" cy="6" rx="9" ry="11" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
            {/* Grid pattern on mic */}
            <line x1="5" y1="6" x2="15" y2="6" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="10" y1="0" x2="10" y2="14" stroke="#94A3B8" strokeWidth="1.5" />
            <rect x="6" y="16" width="8" height="28" fill="#F59E0B" rx="2" />
            <rect x="5" y="14" width="10" height="4" fill="#D97706" rx="1" />
          </g>
        </svg>
      );

    case 'nurse':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#CCFBF1" />
          {/* Gentle medical cross glow */}
          <rect x="94" y="24" width="12" height="28" rx="2" fill="#14B8A6" opacity="0.25" />
          <rect x="86" y="32" width="28" height="12" rx="2" fill="#14B8A6" opacity="0.25" />
          {/* Body in soft teal uniform */}
          <ellipse cx="100" cy="170" rx="46" ry="32" fill="#0D9488" />
          {/* Stethoscope on shoulders */}
          <path d="M78 142 C76 166, 124 166, 122 142" stroke="#F87171" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="166" r="6" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="2" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="100" rx="34" ry="33" fill="#FED7AA" />
          {/* Hair */}
          <path d="M68 94 C68 64, 132 64, 132 94 C128 72, 72 72, 68 94 Z" fill="#78350F" />
          {/* Nurse Cap */}
          <path d="M78 74 L122 74 L114 56 L86 56 Z" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
          {/* Red Cross on Cap */}
          <rect x="97" y="60" width="6" height="12" fill="#EF4444" rx="1" />
          <rect x="94" y="63" width="12" height="6" fill="#EF4444" rx="1" />
          {/* Warm caring eyes */}
          <circle cx="86" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="114" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="87" cy="96" r="1.5" fill="#FFFFFF" />
          <circle cx="115" cy="96" r="1.5" fill="#FFFFFF" />
          {/* Gentle smile */}
          <path d="M92 114 Q100 122 108 114" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="78" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="122" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          {/* First aid clipboard prop */}
          <g transform="translate(138, 114) rotate(10)">
            <rect x="0" y="0" width="26" height="34" fill="#F8FAFC" rx="3" stroke="#94A3B8" strokeWidth="1.5" />
            <rect x="6" y="-3" width="14" height="6" fill="#64748B" rx="1" />
            <line x1="4" y1="8" x2="20" y2="8" stroke="#EF4444" strokeWidth="2" />
            <line x1="4" y1="14" x2="22" y2="14" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="4" y1="20" x2="18" y2="20" stroke="#CBD5E1" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'doctor':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#E0F2FE" />
          {/* Body in crisp white doctor coat */}
          <ellipse cx="100" cy="170" rx="46" ry="32" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          {/* Blue inner shirt and tie */}
          <path d="M90 142 L100 156 L110 142" fill="#0284C7" />
          <path d="M98 152 L102 152 L103 166 L100 170 L97 166 Z" fill="#DC2626" />
          {/* Stethoscope */}
          <path d="M76 138 C74 168, 126 168, 124 138" stroke="#334155" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="168" r="7" fill="#64748B" stroke="#F8FAFC" strokeWidth="2" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="100" rx="34" ry="33" fill="#FED7AA" />
          {/* Smart haircut */}
          <path d="M68 92 C68 58, 132 58, 132 92 C126 72, 74 72, 68 92 Z" fill="#334155" />
          {/* Confident, kind eyes */}
          <circle cx="86" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="114" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="87" cy="96" r="1.5" fill="#FFFFFF" />
          <circle cx="115" cy="96" r="1.5" fill="#FFFFFF" />
          {/* Friendly smile */}
          <path d="M92 114 Q100 122 108 114" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="78" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="122" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          {/* Doctor chest pocket with pens */}
          <rect x="114" y="148" width="16" height="14" rx="2" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="118" y1="144" x2="118" y2="150" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          <line x1="122" y1="142" x2="122" y2="150" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'farmer':
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md ${className}`}
        >
          <circle cx="100" cy="100" r="92" fill="#ECFCCB" />
          {/* Body in blue denim overalls */}
          <ellipse cx="100" cy="172" rx="46" ry="32" fill="#1E40AF" />
          {/* Plaid shirt sleeves / under */}
          <path d="M84 142 L100 156 L116 142" fill="#DC2626" />
          {/* Overalls Straps with bronze buttons */}
          <line x1="82" y1="144" x2="84" y2="174" stroke="#1D4ED8" strokeWidth="6" />
          <circle cx="83" cy="154" r="3" fill="#FACC15" />
          <line x1="118" y1="144" x2="116" y2="174" stroke="#1D4ED8" strokeWidth="6" />
          <circle cx="117" cy="154" r="3" fill="#FACC15" />
          {/* Neck */}
          <rect x="91" y="124" width="18" height="18" rx="4" fill="#FED7AA" />
          {/* Head */}
          <ellipse cx="100" cy="100" rx="34" ry="33" fill="#FED7AA" />
          {/* Big Cheerful Straw Hat */}
          <ellipse cx="100" cy="74" rx="58" ry="16" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <path d="M72 74 C72 44, 128 44, 128 74 Z" fill="#F59E0B" />
          <path d="M72 72 Q100 68 128 72" stroke="#DC2626" strokeWidth="4" />
          {/* Eyes */}
          <circle cx="86" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="114" cy="98" r="3.5" fill="#1E293B" />
          <circle cx="87" cy="96" r="1.5" fill="#FFFFFF" />
          <circle cx="115" cy="96" r="1.5" fill="#FFFFFF" />
          {/* Cheerful hearty smile */}
          <path d="M90 112 Q100 124 110 112" stroke="#854D0E" strokeWidth="3" strokeLinecap="round" fill="#EA580C" />
          <circle cx="78" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          <circle cx="122" cy="108" r="5" fill="#FCA5A5" opacity="0.6" />
          {/* Big Crunchy Carrot in hand */}
          <g transform="translate(136, 108) rotate(20)">
            <polygon points="10,12 18,12 14,38" fill="#F97316" />
            <line x1="11" y1="18" x2="16" y2="18" stroke="#EA580C" strokeWidth="1.5" />
            <line x1="12" y1="26" x2="15" y2="26" stroke="#EA580C" strokeWidth="1.5" />
            {/* Green leafy top */}
            <path d="M14 12 C10 4, 6 2, 4 4" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
            <path d="M14 12 C14 2, 14 0, 14 0" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
            <path d="M14 12 C18 4, 22 2, 24 4" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center rounded-full bg-amber-100 ${className}`} style={{ width: s, height: s }}>
          <span className="text-3xl">🌟</span>
        </div>
      );
  }
};
