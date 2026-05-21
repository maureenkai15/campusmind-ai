"use client";

import { useState } from "react";
import Link from "next/link";
import { NTU_BUILDINGS, CATEGORY_CONFIG } from "@/lib/static-buildings";
import type { Building } from "@/types";

const CATEGORIES = ["all", "academic", "hub", "library", "sports", "transport", "residence"];

export default function MapPage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("all");
  const [selected, setSelected]   = useState<Building | null>(null);
  const [origin, setOrigin]       = useState<Building | null>(null);
  const [destination, setDest]    = useState<Building | null>(null);

  const filtered = NTU_BUILDINGS.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.code.toLowerCase().includes(search.toLowerCase()) ||
      (b.short_name ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "all" || b.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      {/* ── Navbar ── */}
      <nav className="flex items-center gap-4 border-b border-gray-800 bg-gray-950 px-4 py-3 shadow-lg">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <span className="font-bold text-white text-lg">Campus<span className="text-red-500">Mind</span></span>
        </Link>
        <div className="flex gap-1 ml-6">
          {["Map", "Assistant", "Schedule"].map((label) => (
            <Link key={label} href={`/${label.toLowerCase()}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                label === "Map"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}>
              {label}
            </Link>
          ))}
        </div>
        <span className="ml-auto text-xs text-gray-500">{NTU_BUILDINGS.length} locations loaded</span>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="flex w-80 flex-col gap-3 overflow-y-auto border-r border-gray-800 bg-gray-900 p-4">

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input
              className="w-full rounded-xl border border-gray-700 bg-gray-800 pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
              placeholder="Search buildings, codes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
                  category === cat
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}>
                {cat === "all" ? "All" : (CATEGORY_CONFIG[cat]?.emoji ?? "") + " " + cat}
              </button>
            ))}
          </div>

          {/* Route planner */}
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 flex flex-col gap-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">🧭 Route Planner</p>

            <select className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
              value={origin?.id ?? ""}
              onChange={(e) => setOrigin(NTU_BUILDINGS.find((b) => b.id === +e.target.value) ?? null)}>
              <option value="">From…</option>
              {NTU_BUILDINGS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>

            <select className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
              value={destination?.id ?? ""}
              onChange={(e) => setDest(NTU_BUILDINGS.find((b) => b.id === +e.target.value) ?? null)}>
              <option value="">To…</option>
              {NTU_BUILDINGS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>

            {origin && destination && origin.id !== destination.id ? (
              <div className="rounded-xl border border-emerald-700 bg-emerald-950 p-3 text-sm text-emerald-300">
                <p className="font-semibold">✅ Route Ready</p>
                <p className="text-xs mt-1 text-emerald-400">{origin.short_name ?? origin.name} → {destination.short_name ?? destination.name}</p>
                <p className="text-xs mt-1 text-gray-400">Full A* routing available with backend running locally.</p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 text-center">Select an origin and destination above</p>
            )}
          </div>

          {/* Results count */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {filtered.length} location{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Building list */}
          <div className="flex flex-col gap-2">
            {filtered.map((b) => {
              const cfg = CATEGORY_CONFIG[b.category] ?? { emoji: "📍", color: "text-gray-400", bg: "" };
              const isSelected = selected?.id === b.id;
              return (
                <button key={b.id} onClick={() => setSelected(isSelected ? null : b)}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-red-500 bg-red-950"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600 hover:bg-gray-750"
                  }`}>
                  <span className="text-xl mt-0.5">{cfg.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{b.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{b.code} · {b.category}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Map area ── */}
        <main className="relative flex-1 bg-gray-950 overflow-hidden">
          {/* Fake map grid */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Decorative campus paths */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 4"/>
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 4"/>
            <circle cx="50%" cy="50%" r="80" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 4"/>
          </svg>

          {/* Building dots on mock map */}
          {NTU_BUILDINGS.map((b) => {
            const cfg = CATEGORY_CONFIG[b.category];
            const x = ((b.longitude - 103.676) / 0.012) * 100;
            const y = ((1.352 - b.latitude) / 0.012) * 100;
            const isSelected = selected?.id === b.id;
            return (
              <button key={b.id} onClick={() => setSelected(isSelected ? null : b)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125"
                style={{ left: `${x}%`, top: `${y}%` }}>
                <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-lg transition-all ${
                  isSelected ? "border-red-400 bg-red-600 scale-125" : "border-gray-600 bg-gray-800 hover:border-red-400"
                }`}>
                  <span className="text-base">{cfg?.emoji ?? "📍"}</span>
                </div>
                {isSelected && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xl">
                    {b.short_name ?? b.name}
                  </div>
                )}
              </button>
            );
          })}

          {/* Selected building card */}
          {selected && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-80 rounded-2xl border border-gray-700 bg-gray-900/95 backdrop-blur-sm shadow-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold text-white leading-snug">{selected.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selected.code} · {selected.category}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-600 hover:text-white transition text-xl leading-none">✕</button>
              </div>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{selected.description}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setOrigin(selected)}
                  className="flex-1 rounded-lg bg-gray-800 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-700 transition">
                  Set as Origin
                </button>
                <button onClick={() => setDest(selected)}
                  className="flex-1 rounded-lg bg-red-600 py-2 text-xs font-semibold text-white hover:bg-red-700 transition">
                  Set as Destination
                </button>
              </div>
            </div>
          )}

          {/* Map label */}
          <div className="absolute top-4 right-4 rounded-xl border border-gray-700 bg-gray-900/80 backdrop-blur-sm px-3 py-2 text-xs text-gray-400">
            📍 NTU Campus · Singapore
          </div>

          {/* Install Leaflet hint */}
          <div className="absolute top-4 left-4 rounded-xl border border-amber-800 bg-amber-950/80 backdrop-blur-sm px-3 py-2 text-xs text-amber-300 max-w-xs">
            💡 Full interactive map: install <code className="font-mono">react-leaflet</code>
          </div>
        </main>
      </div>
    </div>
  );
}
