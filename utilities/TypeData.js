import { images } from "../constants";

export const challengeType =[

   {id: 0, value:"Adventure" },
   {id: 1, value:"Dance" },
   {id: 2, value:"Eating" },
   {id: 3, value:"Fitness" },
   {id: 4, value:"Magic" },
   {id: 5, value:"Music" },
   {id: 6, value:"Science" },
   {id: 7, value:"Sport" },
   {id: 8, value:"Diet" },
   {id: 9, value:"Game" },
     
]

export const privacyData =[ 

  {id: 0, value:"Public" },
  {id: 1, value:"Private" },

]

export const Audience =[ 

  {id: 0, value:"Open" },
  {id: 1, value:"Restricted"},
  {id: 2, value:"Strict"}

]


// export const talentStages = [

//   // MUSIC
//   { id: "0", name: "Singing" },
//   { id: "1", name: "Rapping" },
//   { id: "2", name: "Beatboxing" },
//   { id: "3", name: "Guitar" },
//   { id: "4", name: "Piano" },
//   { id: "5", name: "Violin" },
//   { id: "6", name: "Drumming" },
//   { id: "7", name: "DJing" },
//   { id: "8", name: "Beatmaking" },

//   // DANCE & PHYSICAL PERFORMANCE
//   { id: "9", name: "Dancing" },
//   { id: "10", name: "Fitness" },
//   { id: "11", name: "Acrobatics" },
//   { id: "12", name: "Karate" },
//   { id: "13", name: "Parkour" },
//   { id: "14", name: "Skating" },
//   { id: "15", name: "Yoga" },

//   // MAGIC & ENTERTAINMENT
//   { id: "16", name: "Magic" },
//   { id: "17", name: "Mentalism" },
//   { id: "18", name: "Comedy" },
//   { id: "19", name: "Acting" },
//   { id: "20", name: "Ventriloquism" },
//   { id: "21", name: "Juggling" },
//   { id: "22", name: "Puppetry" },
//   { id: "24", name: "Stunts" },
//   { id: "25", name: "TaleSpin" },

//   // CREATIVE & VISUAL ARTS
//   { id: "26", name: "Art" },
//   { id: "27", name: "Photography" },
//   { id: "28", name: "Filmmaking" },
//   { id: "29", name: "Animation" },
//   { id: "30", name: "Design" },
//   { id: "31", name: "Fashion" },
//   { id: "32", name: "Makeup" },

//   // TECHNOLOGY
//   { id: "33", name: "Tech" },

//   // OTHER TALENTS
//   { id: "34", name: "Modeling" },
//   { id: "35", name: "Eating" },
//   { id: "36", name: "Cooking" },
//   { id: "37", name: "Speedcubing" },
//   { id: "38", name: "Whistling" },

// ];

export const talentStages = [
  // MUSIC
  {
    id: "0",
    name: "Singing",
    label: "Singing",
    icon: "microphone-stage",
    description: "Express melodies and emotions through vocal technique, pitch, tone and musical interpretation.",
  },
  {
    id: "1",
    name: "Rapping",
    label: "Rapping",
    icon: "microphone",
    description: "Deliver rhythmic lyrics through creative flow, rhyme, wordplay and expressive vocal performance.",
  },
  {
    id: "2",
    name: "Beatboxing",
    label: "Beatboxing",
    icon: "mouth-sound",
    description: "Create beats, basslines and rhythmic sounds using only your voice and mouth.",
  },
  {
    id: "3",
    name: "Guitar",
    label: "Guitar",
    icon: "guitar",
    description: "Perform melodies, chords and rhythms using acoustic or electric guitar.",
  },
  {
    id: "4",
    name: "Piano",
    label: "Piano",
    icon: "piano-keys",
    description: "Create expressive musical performances through melodies, harmonies and piano technique.",
  },
  {
    id: "5",
    name: "Violin",
    label: "Violin",
    icon: "violin",
    description: "Perform expressive melodies using bowing techniques, musical phrasing and violin skills.",
  },
  {
    id: "6",
    name: "Flute",
    label: "Flute",
    icon: "flute",
    description: "Perform expressive melodies and beautiful music using the flute, showcasing breath control, technique, tone and musical creativity.",
  },
  {
    id: "7",
    name: "Drumming",
    label: "Drumming",
    icon: "drum-kit",
    description: "Create powerful rhythms and dynamic percussion through timing, coordination and technique.",
  },
  {
    id: "8",
    name: "DJing",
    label: "DJing",
    icon: "turntables",
    description: "Mix tracks, control transitions and build energetic musical experiences for audiences.",
  },

  // DANCE & PHYSICAL PERFORMANCE
  {
    id: "9",
    name: "Dancing",
    label: "Dancing",
    icon: "dancer",
    description: "Express rhythm, creativity and emotion through choreography, movement and dance styles.",
  },
  {
    id: "10",
    name: "Fitness",
    label: "Fitness",
    icon: "dumbbell",
    description: "Showcase physical strength, endurance and conditioning through fitness challenges and routines.",
  },
  {
    id: "11",
    name: "Acrobatics",
    label: "Acrobatics",
    icon: "acrobatics",
    description: "Demonstrate flexibility, balance, strength and body control through impressive physical movements.",
  },
  {
    id: "12",
    name: "Karate",
    label: "Karate",
    icon: "karate",
    description: "Showcase martial arts discipline through precise strikes, forms, techniques and controlled movement.",
  },
  {
    id: "13",
    name: "Parkour",
    label: "Parkour",
    icon: "parkour",
    description: "Navigate obstacles through fluid movement, vaults, jumps, climbing and precision landings.",
  },
  {
    id: "14",
    name: "Skating",
    label: "Skating",
    icon: "skateboard",
    description: "Perform creative tricks, technical maneuvers and fluid movement on skates or skateboards.",
  },
  {
    id: "15",
    name: "Yoga",
    label: "Yoga",
    icon: "lotus-pose",
    description: "Demonstrate balance, flexibility, strength and mindful movement through yoga poses and flows.",
  },

  // MAGIC & ENTERTAINMENT
  {
    id: "16",
    name: "Magic",
    label: "Magic",
    icon: "magic-wand",
    description: "Amaze audiences with illusions, sleight of hand and astonishing magical demonstrations.",
  },
  {
    id: "17",
    name: "Mentalism",
    label: "Mentalism",
    icon: "mind-reading",
    description: "Captivate audiences with mind-reading demonstrations, psychological illusions and thought experiments.",
  },
  {
    id: "18",
    name: "Comedy",
    label: "Comedy",
    icon: "comedy-mask",
    description: "Make audiences laugh through jokes, characters, comic timing and humorous performances.",
  },

  {
    id: "20",
    name: "Ventriloquism",
    label: "Ventriloquism",
    icon: "ventriloquist-dummy",
    description: "Create the illusion of talking characters through controlled voices and expressive puppet performances.",
  },
  {
    id: "21",
    name: "Juggling",
    label: "Juggling",
    icon: "juggling-balls",
    description: "Keep objects moving through coordinated throws, catches, rhythm and impressive control.",
  },
  {
    id: "22",
    name: "Puppetry",
    label: "Puppetry",
    icon: "hand-puppet",
    description: "Bring puppet characters to life through movement, storytelling and expressive manipulation.",
  },
  {
    id: "24",
    name: "Stunts",
    label: "Stunts",
    icon: "stunt-performer",
    description: "Perform choreographed action sequences, dramatic physical moves and controlled stunt techniques.",
  },
  {
    id: "25",
    name: "TaleSpin",
    label: "Talespin",
    icon: "storytelling",
    description: "Turn everyday moments into entertaining stories through humor, imagination and expressive narration.",
  },

  // CREATIVE & VISUAL ARTS
  {
    id: "26",
    name: "Art",
    label: "Art",
    icon: "paint-palette",
    description: "Create original visual artwork through drawing, painting, illustration and artistic expression.",
  },
  {
    id: "27",
    name: "Photography",
    label: "Photography",
    icon: "camera",
    description: "Capture compelling moments, compositions and visual stories through photographic techniques.",
  },
  {
    id: "28",
    name: "Filmmaking",
    label: "Filmmaking",
    icon: "film-camera",
    description: "Create films through visual storytelling, cinematography, direction and editing.",
  },

  {
    id: "29",
    name: "Animation",
    label: "Animation",
    icon: "animation-frames",
    description: "Bring images and characters to life through motion, timing and visual storytelling.",
  },

  {
    id: "30",
    name: "Design",
    label: "Design",
    icon: "design-tools",
    description: "Transform ideas into purposeful visual solutions through creativity, composition and design skills.",
  },
  {
    id: "31",
    name: "Fashion",
    label: "Fashion",
    icon: "fashion-hanger",
    description: "Showcase personal style and creativity through clothing, styling and fashion design.",
  },
  // {
  //   id: "32",
  //   name: "Makeup",
  //   label: "Makeup",
  //   icon: "makeup-brush",
  //   description: "Transform appearances through makeup artistry, color techniques and creative application.",
  // },

  // TECHNOLOGY
  {
    id: "33",
    name: "Tech",
    label: "Tech",
    icon: "microchip",
    description: "Showcase technical creativity through programming, electronics, inventions and digital innovation.",
  },

  // OTHER TALENTS
  // {
  //   id: "34",
  //   name: "Modeling",
  //   label: "Modeling",
  //   icon: "runway",
  //   description: "Present fashion, products and creative concepts through posing, movement and visual presence.",
  // },
  {
    id: "35",
    name: "Eating",
    label: "Eating",
    icon: "food",
    description: "Showcase entertaining food challenges, tasting experiences and impressive eating performances.",
  },
  {
    id: "36",
    name: "Cooking",
    label: "Cooking",
    icon: "chef-hat",
    description: "Prepare and present delicious dishes through culinary techniques, creativity and presentation.",
  },
  {
    id: "37",
    name: "Speedcubing",
    label: "Speedcubing",
    icon: "rubiks-cube",
    description: "Solve twisty puzzles at remarkable speed through pattern recognition, algorithms and precision.",
  },
  {
    id: "38",
    name: "Whistling",
    label: "Whistling",
    icon: "whistle",
    description: "Perform melodies and musical expressions using controlled whistling, pitch and breath.",
  },
];


export const stageOrderMap = {
  Singing: 1,
  Dancing: 2,
  Fitness: 3,
  Magic: 4,
  Food: 5,
  Adventure: 6,
  Sport: 7,
  Melody: 8,
  Gaming: 9,
  Art: 10,
  Tech: 11,
  Comedy: 12,
};

export const stageCoverImages = {
  Singing: images.singing,
  Dancing: images.dancing,
  Fitness: images.fitness,
  Magic: images.magic,
  Sport: images.sport,
  Melody: images.melody,
  Art: images.art,
  Comedy: images.comedy,
};

export const stageCenterImages = {
  Singing: images.micheal,
  Dancing: images.salsa,
  Fitness: images.arnold,
  Magic: images.shin,
  Sport: images.christiano,
  Melody: images.guitarist,
  Art: images.artist,
  Comedy: images.bean,
};


export const stageIcons = {
  Singing: "🎤",
  Dancing: "💃",
  Fitness: "🏋️",
  Magic: "🪄",
  Sport: "⚽",
  Instrument: "🎸",
  Art: "🎨",
  Comedy: "🎭",
};

export const STAGES = [
  "⚽ Sport",
  "🏋️ Fitness",
  "🎨 Art",
  "🎤 Singing",
  "🕺 Dancing",
  "🎸 Instrument",
  "🎭 Comedy",
  "🪄 Magic"
];
export const TALENTS = [
  "Sport",
  "Fitness",
  "Art",
  "Singing",
  "Dancing",
  "Music",
  "Comedy",
  "Magic"
];

export const continentIcons = {
    Africa: "🌍",      // Globe showing Africa/Europe
    America: "🌎",    // Globe showing Americas
    Asia: "🌏",        // Globe showing Asia/Oceania
    Europe: "🌍",      // Reuse Africa/Europe globe for Europe
  };

export const stageImages = {
    Singing: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    Dancing: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
    Fitness: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    Magic: "https://images.unsplash.com/photo-1520975922284-9e0ce8273b8d",
    Sport: "https://images.unsplash.com/photo-1505842465776-3bfd18837915",
    Melody: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    Art: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    Comedy: "https://images.unsplash.com/photo-1541534401786-2077eed87a74",
  };

  export const stageDescriptions = {
    Singing: "Let your voice be heard. Step into the spotlight, captivate the audience, and rise with every note.",
    Dancing: "Feel the rhythm, own the stage, and tell your story through movement. Every step brings you closer to the top.",
    Fitness: "Push your limits, show your strength, and inspire discipline. Every performance proves your power.",
    Magic: "Create the impossible. Captivate minds, spark wonder, and leave the audience questioning reality.",
    Sport: "Bring the energy, the skill, and the drive. Compete, perform, and prove your dominance on stage.",
    Melody: "Let your sound speak. Craft emotions through every note and move the crowd with your vibe.",
    Art: "Turn creativity into expression. Paint, design, and showcase your vision to the world.",
    Comedy: "Own the moment with laughter. Entertain, connect, and light up the stage with your humor.",
  };

  export const countries = [
    { name: "Africa", code: "Africa", flag: "🌍" },
    { name: "America", code: "America", flag: "🌎"},
    { name: "Asia", code: "Asia", flag:"🌏"},
    { name: "Europe", code: "Europe", flag: "🌍"},

    { name: "Afghanistan", code: "AF", flag: "🇦🇫" },
    { name: "Albania", code: "AL", flag: "🇦🇱" },
    { name: "Algeria", code: "DZ", flag: "🇩🇿" },
    { name: "Andorra", code: "AD", flag: "🇦🇩" },
    { name: "Angola", code: "AO", flag: "🇦🇴" },
    { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬" },
    { name: "Argentina", code: "AR", flag: "🇦🇷" },
    { name: "Armenia", code: "AM", flag: "🇦🇲" },
    { name: "Australia", code: "AU", flag: "🇦🇺" },
    { name: "Austria", code: "AT", flag: "🇦🇹" },
    { name: "Azerbaijan", code: "AZ", flag: "🇦🇿" },
  
    { name: "Bahamas", code: "BS", flag: "🇧🇸" },
    { name: "Bahrain", code: "BH", flag: "🇧🇭" },
    { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
    { name: "Barbados", code: "BB", flag: "🇧🇧" },
    { name: "Belarus", code: "BY", flag: "🇧🇾" },
    { name: "Belgium", code: "BE", flag: "🇧🇪" },
    { name: "Belize", code: "BZ", flag: "🇧🇿" },
    { name: "Benin", code: "BJ", flag: "🇧🇯" },
    { name: "Bhutan", code: "BT", flag: "🇧🇹" },
    { name: "Bolivia", code: "BO", flag: "🇧🇴" },
    { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦" },
    { name: "Botswana", code: "BW", flag: "🇧🇼" },
    { name: "Brazil", code: "BR", flag: "🇧🇷" },
    { name: "Brunei", code: "BN", flag: "🇧🇳" },
    { name: "Bulgaria", code: "BG", flag: "🇧🇬" },
    { name: "Burkina Faso", code: "BF", flag: "🇧🇫" },
    { name: "Burundi", code: "BI", flag: "🇧🇮" },
  
    { name: "Cabo Verde", code: "CV", flag: "🇨🇻" },
    { name: "Cambodia", code: "KH", flag: "🇰🇭" },
    { name: "Cameroon", code: "CM", flag: "🇨🇲" },
    { name: "Canada", code: "CA", flag: "🇨🇦" },
    { name: "Central African Republic", code: "CF", flag: "🇨🇫" },
    { name: "Chad", code: "TD", flag: "🇹🇩" },
    { name: "Chile", code: "CL", flag: "🇨🇱" },
    { name: "China", code: "CN", flag: "🇨🇳" },
    { name: "Colombia", code: "CO", flag: "🇨🇴" },
    { name: "Comoros", code: "KM", flag: "🇰🇲" },
    { name: "Congo (Congo-Brazzaville)", code: "CG", flag: "🇨🇬" },
    { name: "Costa Rica", code: "CR", flag: "🇨🇷" },
    { name: "Croatia", code: "HR", flag: "🇭🇷" },
    { name: "Cuba", code: "CU", flag: "🇨🇺" },
    { name: "Cyprus", code: "CY", flag: "🇨🇾" },
    { name: "Czechia (Czech Republic)", code: "CZ", flag: "🇨🇿" },
  
    { name: "Democratic Republic of the Congo", code: "CD", flag: "🇨🇩" },
    { name: "Denmark", code: "DK", flag: "🇩🇰" },
    { name: "Djibouti", code: "DJ", flag: "🇩🇯" },
    { name: "Dominica", code: "DM", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "DO", flag: "🇩🇴" },
  
    { name: "Ecuador", code: "EC", flag: "🇪🇨" },
    { name: "Egypt", code: "EG", flag: "🇪🇬" },
    { name: "El Salvador", code: "SV", flag: "🇸🇻" },
    { name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶" },
    { name: "Eritrea", code: "ER", flag: "🇪🇷" },
    { name: "Estonia", code: "EE", flag: "🇪🇪" },
    { name: "Eswatini", code: "SZ", flag: "🇸🇿" },
    { name: "Ethiopia", code: "ET", flag: "🇪🇹" },
  
    { name: "Fiji", code: "FJ", flag: "🇫🇯" },
    { name: "Finland", code: "FI", flag: "🇫🇮" },
    { name: "France", code: "FR", flag: "🇫🇷" },
  
    { name: "Gabon", code: "GA", flag: "🇬🇦" },
    { name: "Gambia", code: "GM", flag: "🇬🇲" },
    { name: "Georgia", code: "GE", flag: "🇬🇪" },
    { name: "Germany", code: "DE", flag: "🇩🇪" },
    { name: "Ghana", code: "GH", flag: "🇬🇭" },
    { name: "Greece", code: "GR", flag: "🇬🇷" },
    { name: "Grenada", code: "GD", flag: "🇬🇩" },
    { name: "Guatemala", code: "GT", flag: "🇬🇹" },
    { name: "Guinea", code: "GN", flag: "🇬🇳" },
    { name: "Guinea-Bissau", code: "GW", flag: "🇬🇼" },
    { name: "Guyana", code: "GY", flag: "🇬🇾" },
  
    { name: "Haiti", code: "HT", flag: "🇭🇹" },
    { name: "Honduras", code: "HN", flag: "🇭🇳" },
    { name: "Hungary", code: "HU", flag: "🇭🇺" },
  
    { name: "Iceland", code: "IS", flag: "🇮🇸" },
    { name: "India", code: "IN", flag: "🇮🇳" },
    { name: "Indonesia", code: "ID", flag: "🇮🇩" },
    { name: "Iran", code: "IR", flag: "🇮🇷" },
    { name: "Iraq", code: "IQ", flag: "🇮🇶" },
    { name: "Ireland", code: "IE", flag: "🇮🇪" },
    { name: "Israel", code: "IL", flag: "🇮🇱" },
    { name: "Italy", code: "IT", flag: "🇮🇹" },
  
    { name: "Jamaica", code: "JM", flag: "🇯🇲" },
    { name: "Japan", code: "JP", flag: "🇯🇵" },
    { name: "Jordan", code: "JO", flag: "🇯🇴" },
  
    { name: "Kazakhstan", code: "KZ", flag: "🇰🇿" },
    { name: "Kenya", code: "KE", flag: "🇰🇪" },
    { name: "Kiribati", code: "KI", flag: "🇰🇮" },
    { name: "Kuwait", code: "KW", flag: "🇰🇼" },
    { name: "Kyrgyzstan", code: "KG", flag: "🇰🇬" },
  
    { name: "Laos", code: "LA", flag: "🇱🇦" },
    { name: "Latvia", code: "LV", flag: "🇱🇻" },
    { name: "Lebanon", code: "LB", flag: "🇱🇧" },
    { name: "Lesotho", code: "LS", flag: "🇱🇸" },
    { name: "Liberia", code: "LR", flag: "🇱🇷" },
    { name: "Libya", code: "LY", flag: "🇱🇾" },
    { name: "Liechtenstein", code: "LI", flag: "🇱🇮" },
    { name: "Lithuania", code: "LT", flag: "🇱🇹" },
    { name: "Luxembourg", code: "LU", flag: "🇱🇺" },
  
    { name: "Madagascar", code: "MG", flag: "🇲🇬" },
    { name: "Malawi", code: "MW", flag: "🇲🇼" },
    { name: "Malaysia", code: "MY", flag: "🇲🇾" },
    { name: "Maldives", code: "MV", flag: "🇲🇻" },
    { name: "Mali", code: "ML", flag: "🇲🇱" },
    { name: "Malta", code: "MT", flag: "🇲🇹" },
    { name: "Marshall Islands", code: "MH", flag: "🇲🇭" },
    { name: "Mauritania", code: "MR", flag: "🇲🇷" },
    { name: "Mauritius", code: "MU", flag: "🇲🇺" },
    { name: "Mexico", code: "MX", flag: "🇲🇽" },
    { name: "Micronesia", code: "FM", flag: "🇫🇲" },
    { name: "Moldova", code: "MD", flag: "🇲🇩" },
    { name: "Monaco", code: "MC", flag: "🇲🇨" },
    { name: "Mongolia", code: "MN", flag: "🇲🇳" },
    { name: "Montenegro", code: "ME", flag: "🇲🇪" },
    { name: "Morocco", code: "MA", flag: "🇲🇦" },
    { name: "Mozambique", code: "MZ", flag: "🇲🇿" },
  
    { name: "Myanmar (Burma)", code: "MM", flag: "🇲🇲" },
    { name: "Namibia", code: "NA", flag: "🇳🇦" },
    { name: "Nauru", code: "NR", flag: "🇳🇷" },
    { name: "Nepal", code: "NP", flag: "🇳🇵" },
    { name: "Netherlands", code: "NL", flag: "🇳🇱" },
    { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
    { name: "Nicaragua", code: "NI", flag: "🇳🇮" },
    { name: "Niger", code: "NE", flag: "🇳🇪" },
    { name: "Nigeria", code: "NG", flag: "🇳🇬" },
    { name: "North Korea", code: "KP", flag: "🇰🇵" },
    { name: "North Macedonia", code: "MK", flag: "🇲🇰" },
    { name: "Norway", code: "NO", flag: "🇳🇴" },
  
    { name: "Oman", code: "OM", flag: "🇴🇲" },
  
    { name: "Pakistan", code: "PK", flag: "🇵🇰" },
    { name: "Palau", code: "PW", flag: "🇵🇼" },
    { name: "Panama", code: "PA", flag: "🇵🇦" },
    { name: "Papua New Guinea", code: "PG", flag: "🇵🇬" },
    { name: "Paraguay", code: "PY", flag: "🇵🇾" },
    { name: "Peru", code: "PE", flag: "🇵🇪" },
    { name: "Philippines", code: "PH", flag: "🇵🇭" },
    { name: "Poland", code: "PL", flag: "🇵🇱" },
    { name: "Portugal", code: "PT", flag: "🇵🇹" },
  
    { name: "Qatar", code: "QA", flag: "🇶🇦" },
  
    { name: "Romania", code: "RO", flag: "🇷🇴" },
    { name: "Russia", code: "RU", flag: "🇷🇺" },
  
    { name: "Rwanda", code: "RW", flag: "🇷🇼" },
  
    { name: "Saint Kitts and Nevis", code: "KN", flag: "🇰🇳" },
    { name: "Saint Lucia", code: "LC", flag: "🇱🇨" },
    { name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨" },
    { name: "Samoa", code: "WS", flag: "🇼🇸" },
    { name: "San Marino", code: "SM", flag: "🇸🇲" },
    { name: "Sao Tome and Principe", code: "ST", flag: "🇸🇹" },
    { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
    { name: "Senegal", code: "SN", flag: "🇸🇳" },
    { name: "Serbia", code: "RS", flag: "🇷🇸" },
    { name: "Seychelles", code: "SC", flag: "🇸🇨" },
    { name: "Sierra Leone", code: "SL", flag: "🇸🇱" },
    { name: "Singapore", code: "SG", flag: "🇸🇬" },
    { name: "Slovakia", code: "SK", flag: "🇸🇰" },
    { name: "Slovenia", code: "SI", flag: "🇸🇮" },
    { name: "Solomon Islands", code: "SB", flag: "🇸🇧" },
    { name: "Somalia", code: "SO", flag: "🇸🇴" },
    { name: "South Africa", code: "ZA", flag: "🇿🇦" },
    { name: "South Korea", code: "KR", flag: "🇰🇷" },
    { name: "South Sudan", code: "SS", flag: "🇸🇸" },
    { name: "Spain", code: "ES", flag: "🇪🇸" },
    { name: "Sri Lanka", code: "LK", flag: "🇱🇰" },
    { name: "Sudan", code: "SD", flag: "🇸🇩" },
    { name: "Suriname", code: "SR", flag: "🇸🇷" },
    { name: "Sweden", code: "SE", flag: "🇸🇪" },
    { name: "Switzerland", code: "CH", flag: "🇨🇭" },
    { name: "Syria", code: "SY", flag: "🇸🇾" },
  
    { name: "Taiwan", code: "TW", flag: "🇹🇼" },
    { name: "Tajikistan", code: "TJ", flag: "🇹🇯" },
    { name: "Tanzania", code: "TZ", flag: "🇹🇿" },
    { name: "Thailand", code: "TH", flag: "🇹🇭" },
    { name: "Timor-Leste", code: "TL", flag: "🇹🇱" },
    { name: "Togo", code: "TG", flag: "🇹🇬" },
    { name: "Tonga", code: "TO", flag: "🇹🇴" },
    { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹" },
    { name: "Tunisia", code: "TN", flag: "🇹🇳" },
    { name: "Turkey", code: "TR", flag: "🇹🇷" },
    { name: "Turkmenistan", code: "TM", flag: "🇹🇲" },
    { name: "Tuvalu", code: "TV", flag: "🇹🇻" },
  
    { name: "Uganda", code: "UG", flag: "🇺🇬" },
    { name: "Ukraine", code: "UA", flag: "🇺🇦" },
    { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { name: "United States", code: "US", flag: "🇺🇸" },
    { name: "Uruguay", code: "UY", flag: "🇺🇾" },
    { name: "Uzbekistan", code: "UZ", flag: "🇺🇿" },
  
    { name: "Vanuatu", code: "VU", flag: "🇻🇺" },
    { name: "Vatican City", code: "VA", flag: "🇻🇦" },
    { name: "Venezuela", code: "VE", flag: "🇻🇪" },
    { name: "Vietnam", code: "VN", flag: "🇻🇳" },
    { name: "Yemen", code: "YE", flag: "🇾🇪" },
    { name: "Zambia", code: "ZM", flag: "🇿🇲" },
    { name: "Zimbabwe", code: "ZW", flag: "🇿🇼" },
  ];

//   export const COUNTRY_CONTINENTS = {
//     africa: [
//       "DZ","AO","BJ","BW","BF","BI","CM","CV",
//       "CF","TD","KM","CG","CD","DJ","EG","GQ",
//       "ER","SZ","ET","GA","GM","GH","GN","GW",
//       "CI","KE","LS","LR","LY","MG","MW","ML",
//       "MR","MU","MA","MZ","NA","NE","NG","RW",
//       "SN","SC","SL","SO","ZA","SS","SD","TZ",
//       "TG","TN","UG","ZM","ZW"
//     ],
//     america: [
//       "AG","AR","BS","BB","BZ","BO","BR","CA",
//       "CL","CO","CR","CU","DM","DO","EC","SV",
//       "GD","GT","GY","HT","HN","JM","MX","NI",
//       "PA","PY","PE","KN","LC","VC","SR","TT",
//       "US","UY","VE"
//     ],
//     asia: [
//       "AF","AM","AZ","BH","BD","BT","BN","KH",
//       "CN","GE","IN","ID","IR","IQ","IL","JP",
//       "JO","KZ","KW","KG","LA","LB","MY","MV",
//       "MN","MM","NP","KP","OM","PK","PH","QA",
//       "SA","SG","KR","LK","SY","TW","TJ","TH",
//       "TL","TR","TM","AE","UZ","VN","YE"
//     ],
//     europe: [
//       "AL","AD","AT","BY","BE","BA","BG","HR",
//       "CY","CZ","DK","EE","FI","FR","DE","GR",
//       "HU","IS","IE","IT","LV","LI","LT","LU",
//       "MT","MD","MC","ME","NL","MK","NO","PL",
//       "PT","RO","RU","SM","RS","SK","SI","ES",
//       "SE","CH","UA","GB","VA"
//     ],
//     oceania: [
//       "AU","FJ","KI","MH","FM","NR","NZ","PW",
//       "PG","WS","SB","TO","TV","VU"
//     ]
// }

export const COUNTRY_CONTINENTS= {
  // AFRICA
  "North Africa": [
    "DZ","EG","LY","MA","SD","TN"
  ],

  "West Africa": [
    "BJ","BF","CV","CI","GM","GH","GN","GW",
    "LR","ML","MR","NE","NG","SN","SL","TG"
  ],

  "Central Africa": [
    "AO","CM","CF","TD","CG","CD","GQ","GA"
  ],

  "East Africa": [
    "BI","DJ","ER","ET","KE","RW","SO",
    "SS","TZ","UG"
  ],

  "Southern Africa": [
    "BW","LS","MG","MW","MU","MZ","NA",
    "SC","SZ","ZA","ZM","ZW","KM"
  ],

  // NORTH AMERICA
  "North America": [
    "CA",
    "US"
  ],

  "Central America": [
    "BZ","CR","SV","GT",
    "HN","MX","NI","PA"
  ],

  "Caribbean": [
    "AG","BS","BB","CU","DM","DO",
    "GD","HT","JM","KN","LC",
    "VC","TT"
  ],

  "South America": [
    "AR","BO","BR","CL","CO",
    "EC","GY","PY","PE",
    "SR","UY","VE"
  ],

  // EUROPE
  "Western Europe": [
    "AT","BE","FR","DE","IE",
    "LI","LU","MC","NL",
    "CH","GB"
  ],

  "Northern Europe": [
    "DK","EE","FI","IS",
    "LV","LT","NO","SE"
  ],

  "Southern Europe": [
    "AL","AD","BA","HR","CY",
    "GR","IT","MT","ME",
    "MK","PT","SM","RS",
    "SI","ES","VA"
  ],

  "Eastern Europe": [
    "BY","BG","CZ","HU",
    "MD","PL","RO","RU",
    "SK","UA"
  ],

  // MIDDLE EAST
  "MiddleEast": [
    "BH","IR","IQ","IL","JO",
    "KW","LB","OM","QA",
    "SA","SY","AE","YE","TR"
  ],

  // SOUTH ASIA
  "South Asia": [
    "AF","BD","BT","IN",
    "MV","NP","PK","LK"
  ],

  // EAST ASIA
  "East Asia": [
    "CN","JP","KP",
    "KR","MN","TW"
  ],

  // SOUTHEAST ASIA
  "Southeast Asia": [
    "BN","KH","ID","LA",
    "MY","MM","PH","SG",
    "TH","TL","VN"
  ],

  // CENTRAL ASIA
  "Central Asia": [
    "AM","AZ","GE","KZ",
    "KG","TJ","TM","UZ"
  ],

  // OCEANIA
  "Australia NewZealand": [
    "AU","NZ"
  ],

  "Pacific Islands": [
    "FJ","KI","MH","FM",
    "NR","PW","PG","WS",
    "SB","TO","TV","VU"
  ]
};

export const regionIcons = {
  "North Africa": "🕌",
  "West Africa": "🥁",
  "East Africa": "🦁",
  "Central Africa": "🌿",
  "Southern Africa": "🌍",

  "North America": "🦬",
  "Central America": "🌋",
  "Caribbean": "🌴",
  "South America": "🦙",

  "Western Europe": "🏰",
  "Northern Europe": "⚔️",
  "Southern Europe": "🏛️",
  "Eastern Europe": "⛪",

  "Middle East": "🕌",
  "Central Asia": "🐎",
  "South Asia": "🪷",
  "East Asia": "🏯",
  "Southeast Asia": "🛕",

  "Oceania": "🌊",
  "Australia & New Zealand": "🦘",

  "Global": "🌍",
};



export const REGION_TITLES = {
  northAfrica: "North Africa",
  westAfrica: "West Africa",
  centralAfrica: "Central Africa",
  eastAfrica: "East Africa",
  southernAfrica: "Southern Africa",

  northAmerica: "North America",
  centralAmerica: "Central America",
  caribbean: "Caribbean",
  southAmerica: "South America",

  westernEurope: "Western Europe",
  easternEurope: "Eastern Europe",
  northernEurope: "Northern Europe",
  southernEurope: "Southern Europe",

  middleEast: "Middle East",

  southAsia: "South Asia",
  eastAsia: "East Asia",
  southeastAsia: "Southeast Asia",
  centralAsia: "Central Asia",

  australiaNewZealand: "Australia & New Zealand",
  pacificIslands: "Pacific Islands",
};