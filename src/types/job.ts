export interface JobProp {
  name: string;
  chinese: string;
  icon: string;
}

export interface JobItem {
  id: string;
  name: string;
  chinese: string;
  phonetic: string;
  syllables: string[];
  themeColor: string;
  accentBg: string;
  badgeColor: string;
  lightBg: string;
  tagline: string;
  catchphrase: string;
  sampleSentence: string;
  sentenceChinese: string;
  workplace: string;
  workplaceChinese: string;
  props: JobProp[];
  tprAction: string;
  riddleClues: [string, string, string];
  chant: {
    line1: string;
    line2: string;
  };
}

export const JOBS_DATA: JobItem[] = [
  {
    id: 'teacher',
    name: 'Teacher',
    chinese: '老师',
    phonetic: '/ˈtiː.tʃər/',
    syllables: ['teach', 'er'],
    themeColor: '#059669', // Emerald
    accentBg: 'bg-emerald-500',
    badgeColor: 'text-emerald-700 bg-emerald-100',
    lightBg: 'bg-emerald-50/70',
    tagline: 'Passionate Guide in the Classroom',
    catchphrase: 'Good morning, class! Open your books, please!',
    sampleSentence: 'Miss White is our kind English teacher.',
    sentenceChinese: '怀特小姐是我们和蔼的英语老师。',
    workplace: 'School & Classroom',
    workplaceChinese: '学校与教室',
    props: [
      { name: 'Blackboard', chinese: '黑板', icon: '📋' },
      { name: 'Book', chinese: '课本', icon: '📖' },
      { name: 'Pointer', chinese: '教鞭', icon: '🪄' }
    ],
    tprAction: '双手抱书，扶扶眼镜，微笑做向黑板指书的动作。',
    riddleClues: [
      'I work in a school with many energetic children.',
      'I write English words on the blackboard and read stories.',
      'You say "Good morning" to me every weekday!'
    ],
    chant: {
      line1: 'Teacher, teacher, teach with pride,',
      line2: 'Books and chalk right by our side!'
    }
  },
  {
    id: 'student',
    name: 'Student',
    chinese: '学生',
    phonetic: '/ˈstjuː.dənt/',
    syllables: ['stu', 'dent'],
    themeColor: '#2563eb', // Blue
    accentBg: 'bg-blue-500',
    badgeColor: 'text-blue-700 bg-blue-100',
    lightBg: 'bg-blue-50/70',
    tagline: 'Curious Learner of the World',
    catchphrase: 'I love learning new words and playing with friends!',
    sampleSentence: 'I am a smart and happy student.',
    sentenceChinese: '我是一名聪明快乐的小学生。',
    workplace: 'School & Study Room',
    workplaceChinese: '学校与书房',
    props: [
      { name: 'Backpack', chinese: '书包', icon: '🎒' },
      { name: 'Pencil', chinese: '铅笔', icon: '✏️' },
      { name: 'Notebook', chinese: '笔记本', icon: '📓' }
    ],
    tprAction: '背好双肩书包，挺直身板，举起右手积极发言。',
    riddleClues: [
      'I wear a backpack and come to school every morning.',
      'I listen carefully, read books, and do my homework.',
      'Look at yourself right now, you are one of me!'
    ],
    chant: {
      line1: 'Student, student, girl and boy,',
      line2: 'Learning English full of joy!'
    }
  },
  {
    id: 'pirate',
    name: 'Pirate',
    chinese: '海盗',
    phonetic: '/ˈpaɪ.rət/',
    syllables: ['pi', 'rate'],
    themeColor: '#d97706', // Amber/Wood
    accentBg: 'bg-amber-600',
    badgeColor: 'text-amber-800 bg-amber-100',
    lightBg: 'bg-amber-50/70',
    tagline: 'Brave Sailor of the Seven Seas',
    catchphrase: 'Ahoy, matey! Follow the treasure map!',
    sampleSentence: 'The pirate sails across the blue ocean in search of gold.',
    sentenceChinese: '海盗驾着大船横渡蔚蓝大海寻找金币。',
    workplace: 'Pirate Ship & Secret Island',
    workplaceChinese: '海盗船与神秘宝岛',
    props: [
      { name: 'Eyepatch', chinese: '眼罩', icon: '👁️' },
      { name: 'Treasure Map', chinese: '藏宝图', icon: '🗺️' },
      { name: 'Parrot', chinese: '小鹦鹉', icon: '🦜' }
    ],
    tprAction: '一只手蒙住眼睛做独眼动作，大喊一声 "Ahoy!"，做掌舵开船姿势。',
    riddleClues: [
      'I sail on a big wooden ship across stormy oceans.',
      'I often have an eyepatch and a friendly parrot on my shoulder.',
      'I look for secret treasure chests with "X marks the spot"!'
    ],
    chant: {
      line1: 'Pirate, pirate, sail the sea,',
      line2: 'Find the treasure, one, two, three!'
    }
  },
  {
    id: 'dentist',
    name: 'Dentist',
    chinese: '牙医',
    phonetic: '/ˈden.tɪst/',
    syllables: ['den', 'tist'],
    themeColor: '#0284c7', // Sky / Cyan
    accentBg: 'bg-sky-500',
    badgeColor: 'text-sky-700 bg-sky-100',
    lightBg: 'bg-sky-50/70',
    tagline: 'Protector of Bright Smiles',
    catchphrase: 'Open wide and say "Ahhh"! Brush twice every day!',
    sampleSentence: 'The dentist checks my teeth and gives me a shiny sticker.',
    sentenceChinese: '牙医为我检查牙齿，还奖励了我一张闪亮贴纸。',
    workplace: 'Dental Clinic',
    workplaceChinese: '牙科诊所',
    props: [
      { name: 'Toothbrush', chinese: '牙刷', icon: '🪥' },
      { name: 'Dental Mirror', chinese: '口镜', icon: '🔍' },
      { name: 'Shiny Tooth', chinese: '洁白牙齿', icon: '🦷' }
    ],
    tprAction: '戴口罩手势，拿起小镜子假装检查牙齿，露出大大的笑脸指着白牙。',
    riddleClues: [
      'I wear a clean mask and have a special reclining chair.',
      'I help keep your teeth strong, clean, and cavity-free.',
      'I often say: "Open wide and brush twice a day!"'
    ],
    chant: {
      line1: 'Dentist, dentist, clean and bright,',
      line2: 'Brush your teeth morning and night!'
    }
  },
  {
    id: 'film-star',
    name: 'Film Star',
    chinese: '电影明星',
    phonetic: '/ˈfɪlm ˌstɑːr/',
    syllables: ['film', 'star'],
    themeColor: '#7c3aed', // Purple
    accentBg: 'bg-purple-600',
    badgeColor: 'text-purple-700 bg-purple-100',
    lightBg: 'bg-purple-50/70',
    tagline: 'Dazzling Hero on the Big Screen',
    catchphrase: 'Lights, camera, action! See you at the movies!',
    sampleSentence: 'The film star walks down the red carpet with stylish sunglasses.',
    sentenceChinese: '电影明星戴着时尚墨镜走在红毯上。',
    workplace: 'Film Studio & Red Carpet',
    workplaceChinese: '电影制片厂与红毯',
    props: [
      { name: 'Clapperboard', chinese: '场记板', icon: '🎬' },
      { name: 'Sunglasses', chinese: '墨镜', icon: '🕶️' },
      { name: 'Oscar Trophy', chinese: '奖杯', icon: '🏆' }
    ],
    tprAction: '双手戴上帅气墨镜，双手合拍打出 "Action!" 场记板姿态，向观众挥手飞吻。',
    riddleClues: [
      'I act in exciting movies and television shows.',
      'You can see my giant face on cinema posters and billboards.',
      'I hear the director shout: "Lights, Camera, Action!"'
    ],
    chant: {
      line1: 'Film star, film star, on the screen,',
      line2: 'The coolest hero ever seen!'
    }
  },
  {
    id: 'pop-star',
    name: 'Pop Star',
    chinese: '流行歌手',
    phonetic: '/ˈpɒp ˌstɑːr/',
    syllables: ['pop', 'star'],
    themeColor: '#db2777', // Pink
    accentBg: 'bg-pink-500',
    badgeColor: 'text-pink-700 bg-pink-100',
    lightBg: 'bg-pink-50/70',
    tagline: 'Shining Melody on Concert Stage',
    catchphrase: 'Sing along with me! Music brings us together!',
    sampleSentence: 'The pop star holds a golden microphone and sings happily.',
    sentenceChinese: '流行歌手手握金色麦克风欢快歌唱。',
    workplace: 'Concert Stage & Music Arena',
    workplaceChinese: '演唱会舞台与音乐厅',
    props: [
      { name: 'Microphone', chinese: '麦克风', icon: '🎤' },
      { name: 'Electric Guitar', chinese: '吉他', icon: '🎸' },
      { name: 'Music Notes', chinese: '音符', icon: '🎵' }
    ],
    tprAction: '手握话筒深情歌唱，脚下打节拍，向全场小观众比心呼唤。',
    riddleClues: [
      'I stand on a brightly lit concert stage surrounded by fans.',
      'I sing lovely songs into a shiny microphone.',
      'Everyone claps their hands and dances to my beat!'
    ],
    chant: {
      line1: 'Pop star, pop star, sing a song,',
      line2: 'We can clap and dance along!'
    }
  },
  {
    id: 'nurse',
    name: 'Nurse',
    chinese: '护士',
    phonetic: '/nɜːs/',
    syllables: ['nurse'],
    themeColor: '#0d9488', // Teal
    accentBg: 'bg-teal-500',
    badgeColor: 'text-teal-700 bg-teal-100',
    lightBg: 'bg-teal-50/70',
    tagline: 'Gentle Caregiver for the Sick',
    catchphrase: 'Take your temperature and rest well. You will feel better soon!',
    sampleSentence: 'The gentle nurse puts a colorful bandage on my arm.',
    sentenceChinese: '温柔的护士在我的手臂上贴了一枚可爱的创口贴。',
    workplace: 'Hospital & Clinic Ward',
    workplaceChinese: '医院与诊疗室',
    props: [
      { name: 'Nurse Cap', chinese: '护士帽', icon: '🩺' },
      { name: 'Bandage', chinese: '创口贴', icon: '🩹' },
      { name: 'Thermometer', chinese: '体温计', icon: '🌡️' }
    ],
    tprAction: '双手轻扶护士帽，动作温柔地拿出体温计，轻轻拍拍病人的肩膀。',
    riddleClues: [
      'I work in a hospital wearing a clean uniform.',
      'I check your temperature and bring warm medicine.',
      'I am gentle and help you recover when you feel unwell.'
    ],
    chant: {
      line1: 'Nurse, nurse, so soft and kind,',
      line2: 'The sweetest helper you will find!'
    }
  },
  {
    id: 'doctor',
    name: 'Doctor',
    chinese: '医生',
    phonetic: '/ˈdɒk.tər/',
    syllables: ['doc', 'tor'],
    themeColor: '#0891b2', // Cyan-blue
    accentBg: 'bg-cyan-600',
    badgeColor: 'text-cyan-700 bg-cyan-100',
    lightBg: 'bg-cyan-50/70',
    tagline: 'Health Guardian in White Coat',
    catchphrase: 'Take a deep breath. Exercise and eat fruit to stay strong!',
    sampleSentence: 'The doctor listens to my heartbeat with a stethoscope.',
    sentenceChinese: '医生用听诊器仔细倾听我的心跳。',
    workplace: 'Hospital & Medical Center',
    workplaceChinese: '医院与医疗中心',
    props: [
      { name: 'Stethoscope', chinese: '听诊器', icon: '🩺' },
      { name: 'White Coat', chinese: '白大褂', icon: '🥼' },
      { name: 'Medical Chart', chinese: '病历夹', icon: '📋' }
    ],
    tprAction: '耳朵戴好听诊器，手握听筒做在胸前听心跳 "Thump, thump, thump" 的手势。',
    riddleClues: [
      'I wear a clean white coat in a hospital.',
      'I have a stethoscope around my neck to listen to your heart.',
      'An apple a day keeps me away!'
    ],
    chant: {
      line1: 'Doctor, doctor, check my heart,',
      line2: 'Healthy and strong right from the start!'
    }
  },
  {
    id: 'farmer',
    name: 'Farmer',
    chinese: '农民',
    phonetic: '/ˈfɑː.mər/',
    syllables: ['farm', 'er'],
    themeColor: '#65a30d', // Lime / Green
    accentBg: 'bg-lime-600',
    badgeColor: 'text-lime-800 bg-lime-100',
    lightBg: 'bg-lime-50/70',
    tagline: 'Green Grower of Healthy Food',
    catchphrase: 'Wake up with the sun! Time to harvest sweet apples and corn!',
    sampleSentence: 'The farmer feeds cute sheep and drives a green tractor.',
    sentenceChinese: '农民喂养可爱的小羊，驾驶着绿色的拖拉机。',
    workplace: 'Sunny Farm & Green Fields',
    workplaceChinese: '阳光农场与田野',
    props: [
      { name: 'Straw Hat', chinese: '草帽', icon: '👒' },
      { name: 'Tractor', chinese: '拖拉机', icon: '🚜' },
      { name: 'Fresh Vegetables', chinese: '新鲜蔬菜', icon: '🥕' }
    ],
    tprAction: '头戴宽草帽，双手做扛锄头或拔萝卜用力拉 "Heave-ho!" 的劳作姿态。',
    riddleClues: [
      'I wake up early before sunrise to work in golden fields.',
      'I take care of cute cows, sheep, and chickens.',
      'I drive a tractor and grow sweet vegetables and fruits!'
    ],
    chant: {
      line1: 'Farmer, farmer, in the field,',
      line2: 'Growing crops for every meal!'
    }
  }
];
