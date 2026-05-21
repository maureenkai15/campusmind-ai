"use client";

/** /schedule – My Class Schedule page (placeholder, ready to build out) */

export default function SchedulePage() {
  return (
    <div className="flex h-screen flex-col">
      <nav className="flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <a href="/" className="text-xl font-bold text-red-700">🎓 CampusMind AI</a>
        <span className="text-sm text-gray-400">My Schedule</span>
      </nav>
      <main className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-5xl">📅</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-700">My Schedule</h1>
          <p className="mt-2 text-gray-400">
            Import your NTU timetable to get auto-navigation to each class.
          </p>
          <button className="mt-6 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition">
            Import Timetable (coming soon)
          </button>
        </div>
      </main>
    </div>
  );
}
