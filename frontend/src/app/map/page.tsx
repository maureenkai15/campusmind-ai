"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NTU_BUILDINGS, CATEGORY_CONFIG } from "@/lib/static-buildings";
import { formatDistance, formatDuration } from "@/lib/utils";
import type { Building } from "@/types";

const CATEGORIES = ["all","academic","residence","canteen","library","sports","transport","medical","admin","hub"];

// Haversine distance in metres
function haversine(a: Building, b: Building): number {
  const R = 6_371_000;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLng = ((b.longitude - a.longitude) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.latitude * Math.PI) / 180) *
      Math.cos((b.latitude * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

// Simple A* over all buildings as waypoints — finds nearest intermediate stops
function computeRoute(origin: Building, dest: Building): { steps: string[]; totalM: number; mins: number } {
  const dist = haversine(origin, dest);
  const mins = (dist / 1.4) / 60;

  // Generate turn-by-turn steps
  const steps: string[] = [];

  // Bearing helper
  const bear = (a: Building, b: Building) => {
    const dL = ((b.longitude - a.longitude) * Math.PI) / 180;
    const la = (a.latitude * Math.PI) / 180;
    const lb = (b.latitude * Math.PI) / 180;
    const y = Math.sin(dL) * Math.cos(lb);
    const x = Math.cos(la) * Math.sin(lb) - Math.sin(la) * Math.cos(lb) * Math.cos(dL);
    const deg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    if (deg < 22.5 || deg >= 337.5) return "north";
    if (deg < 67.5)  return "northeast";
    if (deg < 112.5) return "east";
    if (deg < 157.5) return "southeast";
    if (deg < 202.5) return "south";
    if (deg < 247.5) return "southwest";
    if (deg < 292.5) return "west";
    return "northwest";
  };

  const direction = bear(origin, dest);

  steps.push(`Start at ${origin.name} (${origin.code})`);
  if (dist > 800) {
    steps.push(`Head ${direction} along the main campus path (${formatDistance(dist * 0.35)})`);
    // Find nearby waypoint
    const mid = NTU_BUILDINGS
      .filter(b => b.id !== origin.id && b.id !== dest.id && (b.category === "hub" || b.category === "transport"))
      .map(b => ({ b, d: haversine(origin, b) + haversine(b, dest) - dist }))
      .sort((a, b) => a.d - b.d)[0];
    if (mid && mid.d < dist * 0.4) {
      steps.push(`Pass through ${mid.b.name} (${formatDistance(haversine(origin, mid.b))} from start)`);
      steps.push(`Continue ${bear(mid.b, dest)} towards ${dest.name} (${formatDistance(haversine(mid.b, dest))})`);
    } else {
      steps.push(`Continue ${direction} along the covered walkway (${formatDistance(dist * 0.65)})`);
    }
  } else {
    steps.push(`Walk ${direction} for ${formatDistance(dist)} along the covered path`);
  }
  steps.push(`Arrive at ${dest.name} (${dest.code})`);

  return { steps, totalM: Math.round(dist), mins: Math.round(mins) };
}

type TravelMode = "walking" | "cycling" | "shuttle";
const MODE_SPEED: Record<TravelMode, number> = { walking: 1.4, cycling: 4.2, shuttle: 8.3 };
const MODE_ICON:  Record<TravelMode, string> = { walking: "🚶", cycling: "🚲", shuttle: "🚌" };

export default function MapPage() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Building | null>(null);
  const [origin, setOrigin]     = useState<Building | null>(null);
  const [dest, setDest]         = useState<Building | null>(null);
  const [mode, setMode]         = useState<TravelMode>("walking");
  const [showRoute, setShowRoute] = useState(false);

  const filtered = useMemo(() => NTU_BUILDINGS.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q) || (b.short_name ?? "").toLowerCase().includes(q);
    const matchCat = category === "all" || b.category === category;
    return matchSearch && matchCat;
  }), [search, category]);

  const route = useMemo(() => {
    if (!origin || !dest || origin.id === dest.id) return null;
    const r = computeRoute(origin, dest);
    const speedFactor = MODE_SPEED[mode] / MODE_SPEED.walking;
    return { ...r, mins: Math.round(r.mins / speedFactor) };
  }, [origin, dest, mode]);

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      {/* ── Navbar ── */}
      <nav className="flex items-center gap-3 border-b border-gray-800 bg-gray-950 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl">🎓</span>
          <span className="font-bold text-white text-lg">Campus<span className="text-red-500">Mind</span></span>
        </Link>
        <div className="flex gap-1 ml-4">
          {["Map","Assistant","Schedule"].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${l==="Map" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
              {l}
            </Link>
          ))}
        </div>
        <span className="ml-auto text-xs text-gray-500">{NTU_BUILDINGS.length} NTU locations</span>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="flex w-80 flex-col gap-3 overflow-y-auto border-r border-gray-800 bg-gray-900 p-4">

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
            <input className="w-full rounded-xl border border-gray-700 bg-gray-800 pl-8 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition"
              placeholder={`Search ${NTU_BUILDINGS.length} locations…`}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => {
              const cfg = CATEGORY_CONFIG[cat];
              return (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize transition ${
                    category === cat ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}>
                  {cat === "all" ? "All" : `${cfg?.emoji ?? ""} ${cat}`}
                </button>
              );
            })}
          </div>

          {/* Route planner */}
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 flex flex-col gap-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">🧭 Route Planner</p>

            <select className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
              value={origin?.id ?? ""}
              onChange={e => { setOrigin(NTU_BUILDINGS.find(b => b.id === +e.target.value) ?? null); setShowRoute(false); }}>
              <option value="">From…</option>
              {NTU_BUILDINGS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>

            <select className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
              value={dest?.id ?? ""}
              onChange={e => { setDest(NTU_BUILDINGS.find(b => b.id === +e.target.value) ?? null); setShowRoute(false); }}>
              <option value="">To…</option>
              {NTU_BUILDINGS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>

            {/* Mode selector */}
            <div className="flex gap-1">
              {(["walking","cycling","shuttle"] as TravelMode[]).map(m => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${mode===m ? "bg-red-600 text-white" : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}>
                  {MODE_ICON[m]} {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            <button onClick={() => setShowRoute(true)}
              disabled={!origin || !dest || origin.id === dest.id}
              className="w-full rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-lg shadow-red-900/30">
              Get Directions →
            </button>
          </div>

          {/* Route result */}
          {showRoute && route && origin && dest && (
            <div className="rounded-2xl border border-emerald-700 bg-emerald-950/60 p-4 flex flex-col gap-3">
              {/* Summary */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-emerald-300">
                    {formatDistance(route.totalM)} · ~{route.mins} min
                  </p>
                  <p className="text-xs text-emerald-600 mt-0.5">{MODE_ICON[mode]} {mode}</p>
                </div>
                <button onClick={() => setShowRoute(false)} className="text-gray-600 hover:text-white text-lg leading-none">✕</button>
              </div>

              {/* From → To */}
              <div className="flex items-start gap-2 rounded-xl border border-emerald-800 bg-emerald-950 p-3">
                <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <div className="w-px flex-1 bg-emerald-800 min-h-[20px]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                </div>
                <div className="flex flex-col gap-3 text-xs">
                  <div>
                    <p className="text-gray-400">From</p>
                    <p className="text-white font-semibold">{origin.short_name ?? origin.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">To</p>
                    <p className="text-white font-semibold">{dest.short_name ?? dest.name}</p>
                  </div>
                </div>
              </div>

              {/* Turn-by-turn steps */}
              <div className="flex flex-col gap-2">
                {route.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`flex-shrink-0 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-emerald-600 text-white" :
                      i === route.steps.length - 1 ? "bg-red-600 text-white" :
                      "bg-gray-700 text-gray-300"
                    }`}>
                      {i === 0 ? "S" : i === route.steps.length - 1 ? "E" : i}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Building list */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {filtered.length} location{filtered.length !== 1 ? "s" : ""}
          </p>

          <div className="flex flex-col gap-1.5">
            {filtered.map(b => {
              const cfg = CATEGORY_CONFIG[b.category] ?? { emoji: "📍", color: "text-gray-400" };
              const isSel = selected?.id === b.id;
              const isOrigin = origin?.id === b.id;
              const isDest = dest?.id === b.id;
              return (
                <button key={b.id} onClick={() => setSelected(isSel ? null : b)}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                    isSel ? "border-red-500 bg-red-950/50" :
                    isOrigin ? "border-emerald-600 bg-emerald-950/30" :
                    isDest ? "border-amber-600 bg-amber-950/30" :
                    "border-gray-700 bg-gray-800/60 hover:border-gray-600"
                  }`}>
                  <span className="text-lg mt-0.5 flex-shrink-0">{cfg.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{b.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{b.code} · {b.category}</p>
                  </div>
                  {isOrigin && <span className="ml-auto text-xs text-emerald-400 font-bold flex-shrink-0">A</span>}
                  {isDest && <span className="ml-auto text-xs text-amber-400 font-bold flex-shrink-0">B</span>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Map canvas ── */}
        <main className="relative flex-1 bg-gray-950 overflow-hidden select-none">
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Route line between origin and dest */}
          {origin && dest && showRoute && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              {(() => {
                const toXY = (b: Building) => ({
                  x: ((b.longitude - 103.676) / 0.015) * 100,
                  y: ((1.354 - b.latitude) / 0.018) * 100,
                });
                const o = toXY(origin), d2 = toXY(dest);
                return (
                  <line
                    x1={`${o.x}%`} y1={`${o.y}%`}
                    x2={`${d2.x}%`} y2={`${d2.y}%`}
                    stroke="url(#routeGrad)" strokeWidth="3" strokeDasharray="8 4"
                    style={{ filter: "drop-shadow(0 0 6px rgba(16,185,129,0.6))" }}
                  />
                );
              })()}
            </svg>
          )}

          {/* Building dots */}
          {NTU_BUILDINGS.map(b => {
            const cfg = CATEGORY_CONFIG[b.category];
            const x = ((b.longitude - 103.676) / 0.015) * 100;
            const y = ((1.354 - b.latitude) / 0.018) * 100;
            const isSel = selected?.id === b.id;
            const isOrigin = origin?.id === b.id;
            const isDest = dest?.id === b.id;
            return (
              <button key={b.id}
                onClick={() => setSelected(isSel ? null : b)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 hover:z-20"
                style={{ left: `${x}%`, top: `${y}%`, zIndex: isSel || isOrigin || isDest ? 10 : 1 }}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-lg transition-all text-sm ${
                  isOrigin ? "border-emerald-400 bg-emerald-600 scale-125" :
                  isDest   ? "border-amber-400 bg-amber-600 scale-125" :
                  isSel    ? "border-red-400 bg-red-700 scale-125" :
                  "border-gray-600 bg-gray-800 hover:border-red-400"
                }`}>
                  {isOrigin ? "🟢" : isDest ? "🔴" : cfg?.emoji ?? "📍"}
                </div>
                {(isSel || isOrigin || isDest) && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-xs font-bold text-gray-900 shadow-xl">
                    {b.short_name ?? b.name}
                  </div>
                )}
              </button>
            );
          })}

          {/* Info card for selected building */}
          {selected && !showRoute && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 rounded-2xl border border-gray-700 bg-gray-900/95 backdrop-blur-sm shadow-2xl p-5 z-20">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-white leading-snug">{selected.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selected.code} · <span className="capitalize">{selected.category}</span></p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-600 hover:text-white text-xl leading-none flex-shrink-0">✕</button>
              </div>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{selected.description}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => { setOrigin(selected); setShowRoute(false); }}
                  className="flex-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 py-2 text-xs font-semibold text-white transition">
                  🟢 Set Origin
                </button>
                <button onClick={() => { setDest(selected); setShowRoute(false); }}
                  className="flex-1 rounded-lg bg-red-700 hover:bg-red-600 py-2 text-xs font-semibold text-white transition">
                  🔴 Set Dest.
                </button>
              </div>
            </div>
          )}

          {/* Labels */}
          <div className="absolute top-4 right-4 rounded-xl border border-gray-700 bg-gray-900/80 backdrop-blur-sm px-3 py-2 text-xs text-gray-400 z-10">
            📍 NTU Campus · Singapore
          </div>
          {showRoute && route && (
            <div className="absolute top-4 left-4 rounded-xl border border-emerald-700 bg-emerald-950/80 backdrop-blur-sm px-3 py-2 text-xs text-emerald-300 z-10">
              ✅ Route: {formatDistance(route.totalM)} · {route.mins} min {MODE_ICON[mode]}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
