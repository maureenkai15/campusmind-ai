import Link from "next/link";

const features = [
  {
    icon: "🗺️",
    title: "Smart Map",
    description: "Interactive campus map with real-time location and indoor navigation support.",
    href: "/map",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description: "Ask anything about NTU — buildings, canteens, shuttle buses, and events.",
    href: "/assistant",
  },
  {
    icon: "🧭",
    title: "Get Directions",
    description: "A* pathfinding across the NTU campus with walking, cycling, and shuttle modes.",
    href: "/map",
  },
  {
    icon: "📅",
    title: "My Schedule",
    description: "Import your timetable and get auto-navigation to your next class.",
    href: "/schedule",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-red-700 via-red-600 to-orange-500 px-6 py-24 text-white text-center">
        <span className="text-6xl">🎓</span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          CampusMind AI
        </h1>
        <p className="max-w-xl text-lg text-red-100">
          Your AI-powered smart navigator for Nanyang Technological University.
          Find buildings, get routes, and ask your campus assistant — all in one place.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/map"
            className="rounded-full bg-white px-6 py-3 font-semibold text-red-700 shadow hover:bg-red-50 transition"
          >
            Open Map →
          </Link>
          <Link
            href="/assistant"
            className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Chat with Assistant
          </Link>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-red-200 transition group"
          >
            <span className="text-4xl">{f.icon}</span>
            <h2 className="text-lg font-semibold group-hover:text-red-700 transition">
              {f.title}
            </h2>
            <p className="text-sm text-gray-500">{f.description}</p>
          </Link>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        CampusMind AI · NTU Singapore · Powered by{" "}
        <span className="font-medium text-gray-600">Ollama + Next.js + FastAPI</span>
      </footer>
    </main>
  );
}
