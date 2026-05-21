import type { Building } from "@/types";

export const NTU_BUILDINGS: Building[] = [
  { id: 1,  code: "NS1",    name: "The Hive (Learning Hub)",           short_name: "The Hive",      category: "academic",   latitude: 1.3455, longitude: 103.6820, description: "Iconic 12-storey beehive structure with collaborative learning spaces, tutorial rooms, and studios." },
  { id: 2,  code: "NS2",    name: "North Spine Plaza",                 short_name: "North Spine",   category: "hub",        latitude: 1.3483, longitude: 103.6831, description: "Main north campus hub connecting academic buildings, canteens, and admin offices." },
  { id: 3,  code: "SS2",    name: "South Spine",                       short_name: "South Spine",   category: "hub",        latitude: 1.3415, longitude: 103.6815, description: "South campus connector with canteens, Co-op bookstore, and student services." },
  { id: 4,  code: "LWN",    name: "Lee Wee Nam Library",               short_name: "LWN Library",   category: "library",    latitude: 1.3474, longitude: 103.6810, description: "Main NTU library with 24/7 study zones, digital resources, and a maker space." },
  { id: 5,  code: "ADM",    name: "School of Art, Design & Media",     short_name: "ADM",           category: "academic",   latitude: 1.3480, longitude: 103.6800, description: "Curved green-roofed building housing art, design, and media programmes." },
  { id: 6,  code: "SBS",    name: "School of Biological Sciences",     short_name: "SBS",           category: "academic",   latitude: 1.3460, longitude: 103.6845, description: "Biological sciences research and teaching facility." },
  { id: 7,  code: "SPMS",   name: "School of Physical & Math Sciences",short_name: "SPMS",          category: "academic",   latitude: 1.3465, longitude: 103.6838, description: "Departments of Mathematics, Physics, and Chemistry." },
  { id: 8,  code: "SH",     name: "Sports Hall",                       short_name: "Sports Hall",   category: "sports",     latitude: 1.3490, longitude: 103.6780, description: "Indoor sports complex with badminton, basketball, squash, gym, and swimming pool." },
  { id: 9,  code: "BUS-N",  name: "Shuttle Bus Stop – North",          short_name: "Bus North",     category: "transport",  latitude: 1.3495, longitude: 103.6835, description: "North campus shuttle terminus. Routes A, B, C depart here." },
  { id: 10, code: "BUS-S",  name: "Shuttle Bus Stop – South",          short_name: "Bus South",     category: "transport",  latitude: 1.3410, longitude: 103.6820, description: "South campus shuttle stop. Route D loop." },
  { id: 11, code: "HALL1",  name: "Hall of Residence 1",               short_name: "Hall 1",        category: "residence",  latitude: 1.3500, longitude: 103.6795, description: "Residential hall on the west side of campus." },
  { id: 12, code: "CEE",    name: "School of Civil & Env. Engineering",short_name: "CEE",           category: "academic",   latitude: 1.3470, longitude: 103.6855, description: "Civil, environmental, and geomatics engineering department." },
];

export const CATEGORY_CONFIG: Record<string, { emoji: string; color: string; bg: string }> = {
  academic:  { emoji: "🏛️", color: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  hub:       { emoji: "🔀", color: "text-violet-700",  bg: "bg-violet-50 border-violet-200" },
  library:   { emoji: "📚", color: "text-amber-700",   bg: "bg-amber-50 border-amber-200" },
  sports:    { emoji: "🏋️", color: "text-green-700",   bg: "bg-green-50 border-green-200" },
  transport: { emoji: "🚌", color: "text-orange-700",  bg: "bg-orange-50 border-orange-200" },
  residence: { emoji: "🏠", color: "text-pink-700",    bg: "bg-pink-50 border-pink-200" },
  canteen:   { emoji: "🍽️", color: "text-red-700",     bg: "bg-red-50 border-red-200" },
  admin:     { emoji: "🏢", color: "text-slate-700",   bg: "bg-slate-50 border-slate-200" },
};
