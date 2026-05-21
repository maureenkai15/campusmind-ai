import type { Building } from "@/types";

export const NTU_BUILDINGS: Building[] = [

  // ── Hubs & Spines ─────────────────────────────────────────────────────────
  { id:  1, code: "NS",     name: "North Spine Plaza",                    short_name: "North Spine",      category: "hub",       latitude: 1.34830, longitude: 103.68310, description: "Main north campus hub connecting academic blocks, with Canteen 1 & 2, ATMs, student services, and the main bus terminal." },
  { id:  2, code: "SS",     name: "South Spine",                          short_name: "South Spine",      category: "hub",       latitude: 1.34150, longitude: 103.68150, description: "South campus connector with Canteen 9 & 11, Co-op bookstore, and student services." },
  { id:  3, code: "NH",     name: "North Hill",                           short_name: "North Hill",       category: "hub",       latitude: 1.34980, longitude: 103.67930, description: "Residential area with canteens, a Cheers convenience store, and access to halls." },

  // ── Libraries ─────────────────────────────────────────────────────────────
  { id:  4, code: "LWN",    name: "Lee Wee Nam Library",                  short_name: "LWN Library",      category: "library",   latitude: 1.34740, longitude: 103.68100, description: "Main NTU library with 24/7 study zones, makerspace, digital resources, and printing." },
  { id:  5, code: "NIE-LIB",name: "NIE Library",                          short_name: "NIE Library",      category: "library",   latitude: 1.34940, longitude: 103.68830, description: "Library serving NIE students and faculty, with education-focused collections." },
  { id:  6, code: "CHLIB",  name: "Chinese Heritage Centre Library",      short_name: "CHC Library",      category: "library",   latitude: 1.34760, longitude: 103.68050, description: "Specialised library within the Chinese Heritage Centre." },

  // ── Engineering Schools ───────────────────────────────────────────────────
  { id:  7, code: "EEE",    name: "School of Electrical & Electronic Eng.",short_name: "EEE",             category: "academic",  latitude: 1.34820, longitude: 103.68520, description: "One of NTU's largest schools covering power systems, communications, and microelectronics." },
  { id:  8, code: "MAE",    name: "School of Mechanical & Aerospace Eng.", short_name: "MAE",             category: "academic",  latitude: 1.34750, longitude: 103.68620, description: "Mechanical, aerospace and manufacturing engineering research and teaching." },
  { id:  9, code: "CEE",    name: "School of Civil & Environmental Eng.",  short_name: "CEE",             category: "academic",  latitude: 1.34700, longitude: 103.68550, description: "Civil, structural, geotechnical, and environmental engineering." },
  { id: 10, code: "SCBE",   name: "School of Chemical & Biomedical Eng.",  short_name: "SCBE",            category: "academic",  latitude: 1.34720, longitude: 103.68480, description: "Chemical engineering, biomedical engineering, and food science programmes." },
  { id: 11, code: "MSE",    name: "School of Materials Science & Eng.",    short_name: "MSE",             category: "academic",  latitude: 1.34780, longitude: 103.68450, description: "Materials science, nanotechnology, and sustainable materials research." },
  { id: 12, code: "SCSE",   name: "School of Computer Science & Eng.",     short_name: "SCSE",            category: "academic",  latitude: 1.34880, longitude: 103.68600, description: "Computer science, data science, AI, cybersecurity, and software engineering." },
  { id: 13, code: "N4",     name: "SCSE Block N4",                         short_name: "N4",              category: "academic",  latitude: 1.34900, longitude: 103.68620, description: "Main teaching and lab building for the School of Computer Science & Engineering." },

  // ── Science Schools ───────────────────────────────────────────────────────
  { id: 14, code: "SPMS",   name: "School of Physical & Math Sciences",    short_name: "SPMS",            category: "academic",  latitude: 1.34650, longitude: 103.68380, description: "Mathematics, physics, chemistry, and biological chemistry programmes." },
  { id: 15, code: "SBS",    name: "School of Biological Sciences",         short_name: "SBS",             category: "academic",  latitude: 1.34600, longitude: 103.68450, description: "Biology, microbiology, ecology, and marine biology research and teaching." },
  { id: 16, code: "ASE",    name: "Asian School of the Environment",       short_name: "ASE",             category: "academic",  latitude: 1.34620, longitude: 103.68500, description: "Interdisciplinary environmental science and sustainability programmes." },

  // ── Business & Humanities ──────────────────────────────────────────────────
  { id: 17, code: "NBS",    name: "Nanyang Business School",               short_name: "NBS",             category: "academic",  latitude: 1.34920, longitude: 103.68200, description: "One of Asia's top business schools with MBA, accountancy, and business programmes. Home to The Arc building." },
  { id: 18, code: "SSS",    name: "School of Social Sciences",             short_name: "SSS",             category: "academic",  latitude: 1.34880, longitude: 103.68250, description: "Psychology, sociology, economics, political science, and Chinese studies." },
  { id: 19, code: "SOH",    name: "School of Humanities",                  short_name: "SoH",             category: "academic",  latitude: 1.34760, longitude: 103.68080, description: "English, history, linguistics, philosophy, and translation studies." },
  { id: 20, code: "WKWSCI", name: "Wee Kim Wee Sch. of Communication & Info.",short_name: "WKWSCI",      category: "academic",  latitude: 1.34870, longitude: 103.68150, description: "Communication studies, journalism, information studies, and public relations." },

  // ── Design, Medicine & Education ──────────────────────────────────────────
  { id: 21, code: "ADM",    name: "School of Art, Design & Media",        short_name: "ADM",             category: "academic",  latitude: 1.34800, longitude: 103.68000, description: "Iconic curved green-roofed building with studios, gallery, digital labs, and animation suites." },
  { id: 22, code: "LKCMED", name: "Lee Kong Chian School of Medicine",    short_name: "LKCMed",          category: "academic",  latitude: 1.34500, longitude: 103.68420, description: "Joint NTU-Imperial College London medical school. Trains doctors in Singapore." },
  { id: 23, code: "CCDS",   name: "College of Computing & Data Science",  short_name: "CCDS",            category: "academic",  latitude: 1.34850, longitude: 103.68580, description: "New college bringing together computing, AI, and data science programmes." },

  // ── NIE ───────────────────────────────────────────────────────────────────
  { id: 24, code: "NIE",    name: "National Institute of Education",      short_name: "NIE",             category: "academic",  latitude: 1.34920, longitude: 103.68850, description: "Singapore's only teacher-training institution, preparing educators for schools nationwide." },
  { id: 25, code: "NIE-TR", name: "NIE Teaching Resource Centre",        short_name: "NIE TRC",         category: "academic",  latitude: 1.34940, longitude: 103.68870, description: "Teaching resources, e-learning support, and curriculum development for NIE faculty." },
  { id: 26, code: "NIE-PA", name: "NIE Performing Arts Centre",          short_name: "NIE PAC",         category: "academic",  latitude: 1.34910, longitude: 103.68900, description: "Performance and rehearsal spaces for NTU and NIE arts groups." },

  // ── The Hive & Key Academic Buildings ────────────────────────────────────
  { id: 27, code: "HIVE",   name: "The Hive (Learning Hub)",             short_name: "The Hive",        category: "academic",  latitude: 1.34550, longitude: 103.68200, description: "Iconic 12-storey beehive-shaped building with collaborative studios, tutorial rooms, and a café." },
  { id: 28, code: "NAUD",   name: "Nanyang Auditorium",                  short_name: "Nanyang Aud.",    category: "admin",     latitude: 1.34720, longitude: 103.68000, description: "NTU's main auditorium for convocation, major events, and performances. Capacity ~1,800." },
  { id: 29, code: "CHC",    name: "Chinese Heritage Centre",             short_name: "CHC",             category: "admin",     latitude: 1.34780, longitude: 103.68050, description: "Museum and heritage centre preserving the history of Nanyang University and Chinese culture in Singapore." },
  { id: 30, code: "ICC",    name: "Innovation Centre of NTU",            short_name: "Innovation Ctr",  category: "admin",     latitude: 1.34790, longitude: 103.68180, description: "Technology incubator hosting NTU start-ups and industry collaborations." },
  { id: 31, code: "ERIAN",  name: "Energy Research Institute @ NTU",    short_name: "ERI@N",           category: "academic",  latitude: 1.34720, longitude: 103.68150, description: "Flagship energy research institute focusing on solar, fuel cells, and sustainable energy." },

  // ── Canteens & Food ───────────────────────────────────────────────────────
  { id: 32, code: "CAN1",   name: "North Spine Canteen 1",               short_name: "Canteen 1",       category: "canteen",   latitude: 1.34870, longitude: 103.68280, description: "Large canteen at North Spine with Malay, Chinese, Indian, and Western stalls. Open 7am–9pm." },
  { id: 33, code: "CAN2",   name: "North Spine Canteen 2",               short_name: "Canteen 2",       category: "canteen",   latitude: 1.34820, longitude: 103.68240, description: "Second North Spine canteen with hot food, drinks, and a popular chicken rice stall." },
  { id: 34, code: "CAN9",   name: "South Spine Canteen 9",               short_name: "Canteen 9",       category: "canteen",   latitude: 1.34130, longitude: 103.68120, description: "South campus canteen near the engineering blocks. Offers a range of local dishes." },
  { id: 35, code: "CAN11",  name: "South Spine Canteen 11",              short_name: "Canteen 11",      category: "canteen",   latitude: 1.34100, longitude: 103.68200, description: "Canteen 11 serving southern campus students with economy rice, noodles, and more." },
  { id: 36, code: "CAN13",  name: "Canteen 13 (Sports & Rec Centre)",   short_name: "Canteen 13",      category: "canteen",   latitude: 1.34900, longitude: 103.67900, description: "Canteen near the Sports Hall serving post-workout meals and drinks." },
  { id: 37, code: "NHCAN",  name: "North Hill Canteen",                  short_name: "North Hill Can.", category: "canteen",   latitude: 1.34980, longitude: 103.67930, description: "Canteen in the residential hall area with a Koufu food court. Open late." },
  { id: 38, code: "KOUFU",  name: "Koufu Food Court (Pioneer)",          short_name: "Koufu",           category: "canteen",   latitude: 1.35020, longitude: 103.67980, description: "Popular food court in the Pioneer area with many stalls and late-night opening hours." },
  { id: 39, code: "HIVECC", name: "The Hive Café",                       short_name: "Hive Café",       category: "canteen",   latitude: 1.34540, longitude: 103.68210, description: "Café inside The Hive with coffee, pastries, and light meals. Great study spot." },

  // ── Sports & Recreation ───────────────────────────────────────────────────
  { id: 40, code: "SH",     name: "Sports Hall",                         short_name: "Sports Hall",     category: "sports",    latitude: 1.34900, longitude: 103.67800, description: "Indoor sports complex with badminton courts, basketball courts, squash courts, and a fully-equipped gym." },
  { id: 41, code: "POOL",   name: "Olympic Swimming Pool",               short_name: "Pool",            category: "sports",    latitude: 1.34880, longitude: 103.67750, description: "Olympic-length outdoor pool open to NTU students and staff. Swim training available." },
  { id: 42, code: "TF",     name: "Track & Field",                       short_name: "Track",           category: "sports",    latitude: 1.34850, longitude: 103.67700, description: "400m athletic track with a multi-purpose field for football, rugby, and athletics." },
  { id: 43, code: "TENNIS", name: "Tennis Courts",                       short_name: "Tennis",          category: "sports",    latitude: 1.34920, longitude: 103.67650, description: "Hard-surface tennis courts available for booking via OSC. Equipment rental available." },
  { id: 44, code: "MPSH",   name: "Multi-Purpose Sports Hall",           short_name: "MPSH",            category: "sports",    latitude: 1.34860, longitude: 103.67820, description: "Large indoor hall for volleyball, futsal, and student events." },

  // ── Halls of Residence ────────────────────────────────────────────────────
  { id: 45, code: "HALL1",  name: "Hall of Residence 1",                 short_name: "Hall 1",          category: "residence", latitude: 1.35020, longitude: 103.67950, description: "One of NTU's oldest halls with single and double rooms. Served by Shuttle Route A." },
  { id: 46, code: "HALL2",  name: "Hall of Residence 2",                 short_name: "Hall 2",          category: "residence", latitude: 1.35080, longitude: 103.67880, description: "Residential hall with strong sports culture and Inter-Hall Games participation." },
  { id: 47, code: "HALL3",  name: "Hall of Residence 3",                 short_name: "Hall 3",          category: "residence", latitude: 1.35150, longitude: 103.67800, description: "Hall 3 is known for its active hall culture and proximity to North Hill facilities." },
  { id: 48, code: "HALL4",  name: "Hall of Residence 4",                 short_name: "Hall 4",          category: "residence", latitude: 1.35100, longitude: 103.68100, description: "Mid-campus hall popular for its central location near academic buildings." },
  { id: 49, code: "HALL5",  name: "Hall of Residence 5",                 short_name: "Hall 5",          category: "residence", latitude: 1.35180, longitude: 103.68080, description: "Hall 5 features newer facilities and a vibrant arts and cultural scene." },
  { id: 50, code: "HALL6",  name: "Hall of Residence 6",                 short_name: "Hall 6",          category: "residence", latitude: 1.35120, longitude: 103.67900, description: "Traditional hall with block parties, hall productions, and sports teams." },
  { id: 51, code: "HALL7",  name: "Hall of Residence 7 (Pei Hwa)",      short_name: "Hall 7",          category: "residence", latitude: 1.34980, longitude: 103.67780, description: "Pei Hwa Hall — known for its Chinese cultural activities and community spirit." },
  { id: 52, code: "HALL8",  name: "Hall of Residence 8",                 short_name: "Hall 8",          category: "residence", latitude: 1.34930, longitude: 103.67720, description: "Hall 8 offers air-conditioned rooms and is close to the Sports Hall." },
  { id: 53, code: "HALL9",  name: "Hall of Residence 9",                 short_name: "Hall 9",          category: "residence", latitude: 1.34880, longitude: 103.67680, description: "One of NTU's newer residential halls with modern en-suite facilities." },
  { id: 54, code: "HALL10", name: "Hall of Residence 10",                short_name: "Hall 10",         category: "residence", latitude: 1.34830, longitude: 103.67650, description: "Hall 10 is known for its music culture and annual hall production." },
  { id: 55, code: "HALL11", name: "Hall of Residence 11",                short_name: "Hall 11",         category: "residence", latitude: 1.34750, longitude: 103.67680, description: "Residential hall with a strong athletics contingent and hall games tradition." },
  { id: 56, code: "HALL12", name: "Hall of Residence 12",                short_name: "Hall 12",         category: "residence", latitude: 1.34700, longitude: 103.67720, description: "Hall 12 features a mix of local and international students in a community setting." },
  { id: 57, code: "HALL13", name: "Hall of Residence 13",                short_name: "Hall 13",         category: "residence", latitude: 1.34620, longitude: 103.67780, description: "Newer residential hall with en-suite rooms and a vibrant freshmen culture." },
  { id: 58, code: "HALL14", name: "Hall of Residence 14",                short_name: "Hall 14",         category: "residence", latitude: 1.34550, longitude: 103.67820, description: "Hall 14 is known for its dance and performing arts groups." },
  { id: 59, code: "HALL15", name: "Hall of Residence 15",                short_name: "Hall 15",         category: "residence", latitude: 1.34500, longitude: 103.67850, description: "One of the newest halls with fully air-conditioned rooms and modern amenities." },
  { id: 60, code: "HALL16", name: "Hall of Residence 16",                short_name: "Hall 16",         category: "residence", latitude: 1.34450, longitude: 103.67880, description: "Hall 16 — modern residential hall with strong inter-hall games participation." },

  // ── Residential Colleges ──────────────────────────────────────────────────
  { id: 61, code: "RCP",    name: "Pioneer Hall (Residential College)",  short_name: "Pioneer RC",      category: "residence", latitude: 1.35050, longitude: 103.68000, description: "Pioneer House RC fosters leadership, sustainability, and interdisciplinary learning. Part of the NTU RC system." },
  { id: 62, code: "RCNY",   name: "Nanyang Hall (Residential College)",  short_name: "Nanyang RC",      category: "residence", latitude: 1.35080, longitude: 103.67980, description: "Nanyang House RC with a focus on East-West dialogue, entrepreneurship, and community engagement." },
  { id: 63, code: "RCCAM",  name: "Camellia Hall (Residential College)", short_name: "Camellia RC",     category: "residence", latitude: 1.35120, longitude: 103.68050, description: "Camellia Hall RC emphasising wellness, environment, and Asian heritage." },
  { id: 64, code: "RCBIN",  name: "Binjai Hall (Residential College)",   short_name: "Binjai RC",       category: "residence", latitude: 1.35150, longitude: 103.68000, description: "Binjai Hall RC focusing on innovation, technology, and community service." },
  { id: 65, code: "RCTAN",  name: "Tanjong Hall (Residential College)",  short_name: "Tanjong RC",      category: "residence", latitude: 1.34980, longitude: 103.68030, description: "Tanjong Hall RC with vibrant arts culture and service-learning programmes." },
  { id: 66, code: "RCPALM", name: "Palm Hall (Residential College)",     short_name: "Palm RC",         category: "residence", latitude: 1.35000, longitude: 103.68080, description: "Palm Hall RC emphasising global citizenship and interdisciplinary education." },

  // ── Medical & Wellness ────────────────────────────────────────────────────
  { id: 67, code: "HLTH",   name: "Campus Health & Medical Centre",      short_name: "Health Centre",   category: "medical",   latitude: 1.34770, longitude: 103.68220, description: "NTU's on-campus clinic offering GP consultations, vaccinations, and mental health support. Near North Spine." },
  { id: 68, code: "MFSC",   name: "Multi-Faith Spiritual Centre",        short_name: "MFSC",            category: "admin",     latitude: 1.34760, longitude: 103.68230, description: "Quiet multi-faith centre for prayer and spiritual reflection, open to all religions." },

  // ── Transport & Access ─────────────────────────────────────────────────────
  { id: 69, code: "BUS-N",  name: "North Bus Terminal",                  short_name: "North Bus Term.",  category: "transport", latitude: 1.34950, longitude: 103.68350, description: "Main north campus bus terminus. Shuttle routes A, B, C depart here. NTU Campus Rider app shows live arrivals." },
  { id: 70, code: "BUS-S",  name: "South Bus Terminal",                  short_name: "South Bus Term.",  category: "transport", latitude: 1.34100, longitude: 103.68250, description: "South campus shuttle stop. Route C & D services. Near South Spine." },
  { id: 71, code: "BUS-NH", name: "North Hill Bus Stop",                 short_name: "North Hill Bus",   category: "transport", latitude: 1.34980, longitude: 103.67950, description: "Bus stop serving the halls area. Routes A and D stop here." },
  { id: 72, code: "BUS-NIE",name: "NIE Bus Stop",                        short_name: "NIE Bus",          category: "transport", latitude: 1.34900, longitude: 103.68900, description: "Dedicated bus stop outside NIE. Routes B and C stop here." },
  { id: 73, code: "BUS-ADM",name: "ADM Bus Stop",                        short_name: "ADM Bus",          category: "transport", latitude: 1.34800, longitude: 103.67950, description: "Bus stop near the School of Art, Design & Media. Route A." },
  { id: 74, code: "CARPARK",name: "Pioneer Car Park (Visitor Parking)",  short_name: "Visitor Parking",  category: "transport", latitude: 1.35000, longitude: 103.68020, description: "Main visitor car park. Season parking available for students with vehicles." },

  // ── Admin & Other Facilities ──────────────────────────────────────────────
  { id: 75, code: "ADM-BLK",name: "Administration Building",             short_name: "Admin Block",      category: "admin",     latitude: 1.34830, longitude: 103.68320, description: "NTU's administrative offices, Registrar's Office, and student affairs. Near North Spine." },
  { id: 76, code: "GSSR",   name: "Graduate Students' Resource Room",    short_name: "Grad. Students",   category: "admin",     latitude: 1.34840, longitude: 103.68300, description: "Resource room with printing, lockers, and a rest area for graduate students." },
  { id: 77, code: "COOP",   name: "NTU Co-op Bookstore",                 short_name: "Co-op",            category: "admin",     latitude: 1.34120, longitude: 103.68160, description: "Official NTU bookstore at South Spine selling textbooks, stationery, NTU merchandise, and electronics." },
  { id: 78, code: "ATM-N",  name: "ATM Cluster (North Spine)",           short_name: "ATM North",        category: "admin",     latitude: 1.34840, longitude: 103.68340, description: "DBS, OCBC, and UOB ATMs clustered near North Spine Plaza." },
  { id: 79, code: "ATM-S",  name: "ATM Cluster (South Spine)",           short_name: "ATM South",        category: "admin",     latitude: 1.34130, longitude: 103.68170, description: "ATMs at South Spine near the Co-op store." },
  { id: 80, code: "NTUONE", name: "NTU One-Stop Student Service Centre", short_name: "One-Stop Centre",  category: "admin",     latitude: 1.34860, longitude: 103.68310, description: "Central hub for student services: bursaries, accommodation applications, academic matters, and student IDs." },
];

export const CATEGORY_CONFIG: Record<string, { emoji: string; color: string; bg: string; darkBg: string }> = {
  academic:  { emoji: "🏛️", color: "text-blue-600",   bg: "bg-blue-50 border-blue-200",    darkBg: "border-blue-800 bg-blue-950/40" },
  hub:       { emoji: "🔀", color: "text-violet-600",  bg: "bg-violet-50 border-violet-200",darkBg: "border-violet-800 bg-violet-950/40" },
  library:   { emoji: "📚", color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",  darkBg: "border-amber-800 bg-amber-950/40" },
  canteen:   { emoji: "🍽️", color: "text-orange-600",  bg: "bg-orange-50 border-orange-200",darkBg: "border-orange-800 bg-orange-950/40" },
  sports:    { emoji: "🏋️", color: "text-green-600",   bg: "bg-green-50 border-green-200",  darkBg: "border-green-800 bg-green-950/40" },
  transport: { emoji: "🚌", color: "text-sky-600",     bg: "bg-sky-50 border-sky-200",      darkBg: "border-sky-800 bg-sky-950/40" },
  residence: { emoji: "🏠", color: "text-pink-600",    bg: "bg-pink-50 border-pink-200",    darkBg: "border-pink-800 bg-pink-950/40" },
  medical:   { emoji: "🏥", color: "text-red-600",     bg: "bg-red-50 border-red-200",      darkBg: "border-red-800 bg-red-950/40" },
  admin:     { emoji: "🏢", color: "text-slate-600",   bg: "bg-slate-50 border-slate-200",  darkBg: "border-slate-700 bg-slate-800/40" },
};
