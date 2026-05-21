"use client";

import Link from "next/link";

const sampleSchedule = [
  { time: "08:30", code: "MH1812", name: "Calculus", venue: "SPMS LT", building: "SPMS", duration: 90 },
  { time: "10:30", code: "CC0001", name: "Knowing the Unknown", venue: "NS3-01-60", building: "NS3", duration: 60 },
  { time: "13:30", code: "CZ2001", name: "Algorithms", venue: "N4-B1-B17", building: "N4", duration: 120 },
  { time: "16:00", code: "CZ3005", name: "Artificial Intelligence", venue: "LHN-TR+29", building: "The Hive", duration: 90 },
];

export default function SchedulePage() {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      {/* ── Navbar ── */}
      <nav className="flex items-center gap-4 border-b border-gray-800 bg-gray-950 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <span className="font-bold text-white text-lg">Campus<span className="text-red-500">Mind</span></span>
        </Link>
        <div className="flex gap-1 ml-6">
          {["Map", "Assistant", "Schedule"].map((label) => (
            <Link key={label} href={`/${label.toLowerCase()}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                label === "Schedule"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-6 py-8"
        style={{ background: "linear-gradient(to bottom, #030712, #111827)" }}>
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Today</p>
            <h1 className="text-3xl font-extrabold text-white">
              {now.toLocaleDateString("en-SG", { weekday: "long", day: "numeric", month: "long" })}
            </h1>
            <p className="text-gray-400 mt-1">4 classes · NTU Campus</p>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col gap-4">
            {/* Time line */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-800" />

            {sampleSchedule.map((cls, i) => {
              const [h, m] = cls.time.split(":").map(Number);
              const startDecimal = h + m / 60;
              const endDecimal = startDecimal + cls.duration / 60;
              const isActive = currentHour >= startDecimal && currentHour < endDecimal;
              const isPast = currentHour >= endDecimal;

              return (
                <div key={i} className="flex items-start gap-4">
                  {/* Time */}
                  <div className="w-12 text-right flex-shrink-0">
                    <p className={`text-sm font-mono font-bold ${isActive ? "text-red-400" : isPast ? "text-gray-600" : "text-gray-400"}`}>
                      {cls.time}
                    </p>
                  </div>

                  {/* Dot */}
                  <div className={`relative z-10 flex-shrink-0 mt-1 h-4 w-4 rounded-full border-2 ${
                    isActive ? "border-red-500 bg-red-500 shadow-lg shadow-red-500/50" :
                    isPast  ? "border-gray-700 bg-gray-800" :
                              "border-gray-600 bg-gray-900"
                  }`}>
                    {isActive && <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 rounded-2xl border p-4 transition-all ${
                    isActive ? "border-red-700 bg-red-950/40 shadow-lg shadow-red-900/20" :
                    isPast  ? "border-gray-800 bg-gray-900/40 opacity-50" :
                              "border-gray-700 bg-gray-900"
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {isActive && <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">NOW</span>}
                          <span className="text-xs font-mono text-gray-500">{cls.code}</span>
                        </div>
                        <h3 className={`font-bold text-base ${isPast ? "text-gray-500" : "text-white"}`}>{cls.name}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">📍 {cls.venue} · {cls.building}</p>
                        <p className="text-xs text-gray-600 mt-1">{cls.time} — {cls.duration} min</p>
                      </div>
                      <Link href="/map"
                        className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                          isPast ? "bg-gray-800 text-gray-600" : "bg-red-600 text-white hover:bg-red-700"
                        }`}>
                        Navigate →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Import CTA */}
          <div className="mt-10 rounded-2xl border border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">
            <p className="text-3xl mb-3">📅</p>
            <h2 className="text-lg font-bold text-white">Import Your Timetable</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
              Connect your NTU STARS timetable and get auto-navigation to every class.
            </p>
            <button className="mt-4 rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition opacity-60 cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
