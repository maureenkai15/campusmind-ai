"use client";

/**
 * /map – Campus Map page
 * Uses Leaflet (free, open-source) for interactive map rendering.
 * Install: npm i leaflet @types/leaflet react-leaflet
 */

import { useEffect, useRef, useState } from "react";
import { buildingsApi, navigationApi } from "@/lib/api";
import { formatDistance, formatDuration, CATEGORY_EMOJI } from "@/lib/utils";
import type { Building, NavigationResponse, TravelMode } from "@/types";

const MODE_LABELS: Record<TravelMode, string> = {
  walking: "🚶 Walk",
  cycling: "🚲 Cycle",
  shuttle: "🚌 Shuttle",
};

export default function MapPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selected, setSelected] = useState<Building | null>(null);
  const [origin, setOrigin] = useState<Building | null>(null);
  const [destination, setDestination] = useState<Building | null>(null);
  const [mode, setMode] = useState<TravelMode>("walking");
  const [route, setRoute] = useState<NavigationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    buildingsApi.list().then(setBuildings).catch(console.error);
  }, []);

  const handleRoute = async () => {
    if (!origin || !destination) return;
    setLoading(true);
    try {
      const result = await navigationApi.getRoute(origin.id, destination.id, mode);
      setRoute(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <nav className="flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <a href="/" className="text-xl font-bold text-red-700">🎓 CampusMind AI</a>
        <span className="ml-auto text-sm text-gray-400">NTU Campus Map</span>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="flex w-80 flex-col gap-4 overflow-y-auto border-r border-gray-200 bg-white p-4">
          {/* Search */}
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
            placeholder="Search buildings…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Route planner */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 flex flex-col gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Route Planner</p>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={origin?.id ?? ""}
              onChange={(e) => setOrigin(buildings.find((b) => b.id === +e.target.value) ?? null)}
            >
              <option value="">From…</option>
              {buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={destination?.id ?? ""}
              onChange={(e) => setDestination(buildings.find((b) => b.id === +e.target.value) ?? null)}
            >
              <option value="">To…</option>
              {buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <div className="flex gap-1">
              {(Object.keys(MODE_LABELS) as TravelMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${
                    mode === m ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>
            <button
              onClick={handleRoute}
              disabled={!origin || !destination || loading}
              className="rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition"
            >
              {loading ? "Calculating…" : "Get Directions"}
            </button>
          </div>

          {/* Route result */}
          {route && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 flex flex-col gap-1">
              <p className="text-sm font-semibold text-green-800">
                {formatDistance(route.total_distance_m)} · {formatDuration(route.estimated_minutes)}
              </p>
              <ul className="mt-1 flex flex-col gap-1">
                {route.steps.map((s, i) => (
                  <li key={i} className="text-xs text-gray-600">
                    {i + 1}. {s.instruction} ({formatDistance(s.distance_m)})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Building list */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {filtered.length} locations
          </p>
          {filtered.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b)}
              className={`flex items-start gap-2 rounded-xl border p-3 text-left text-sm transition hover:border-red-300 hover:bg-red-50 ${
                selected?.id === b.id ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-xl">{CATEGORY_EMOJI[b.category] ?? "📍"}</span>
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-xs text-gray-400">{b.code} · {b.category}</p>
              </div>
            </button>
          ))}
        </aside>

        {/* ── Map placeholder (replace with Leaflet/react-leaflet component) ── */}
        <main className="relative flex-1 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-5xl">🗺️</p>
            <p className="mt-3 font-semibold text-gray-500">Interactive Map</p>
            <p className="text-sm">
              Install <code className="rounded bg-gray-200 px-1">react-leaflet</code> and drop in the{" "}
              <code className="rounded bg-gray-200 px-1">MapView</code> component
            </p>
            {selected && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-4 shadow text-left max-w-xs mx-auto">
                <p className="text-lg font-bold">{CATEGORY_EMOJI[selected.category]} {selected.name}</p>
                <p className="text-xs text-gray-400 mb-1">{selected.code}</p>
                <p className="text-sm text-gray-600">{selected.description}</p>
                <p className="mt-2 text-xs text-gray-400">
                  📍 {selected.latitude.toFixed(4)}, {selected.longitude.toFixed(4)}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
