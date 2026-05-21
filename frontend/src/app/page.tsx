import Link from "next/link";

const stats = [
  { value: "12+", label: "Campus Buildings" },
  { value: "A*",  label: "Pathfinding" },
  { value: "4",   label: "Travel Modes" },
  { value: "AI",  label: "Chat Assistant" },
];

const features = [
  {
    icon: "🗺️",
    title: "Smart Campus Map",
    description: "Explore every building, canteen, lab, and bus stop on the NTU campus with an interactive map.",
    href: "/map",
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-200",
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description: "Ask anything — where is the nearest canteen, which shuttle goes to Hall 1, opening hours.",
    href: "/assistant",
    gradient: "from-violet-500 to-purple-400",
    glow: "shadow-violet-200",
  },
  {
    icon: "🧭",
    title: "Turn-by-Turn Routes",
    description: "A* pathfinding gives you step-by-step walking, cycling, or shuttle directions across campus.",
    href: "/map",
    gradient: "from-red-500 to-orange-400",
    glow: "shadow-red-200",
  },
  {
    icon: "📅",
    title: "Class Navigator",
    description: "Import your timetable and get auto-navigation to your next lecture before it starts.",
    href: "/schedule",
    gradient: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-200",
  },
];

const howItWorks = [
  { step: "01", title: "Search or Ask", desc: "Type a building name or ask the AI a campus question in plain English." },
  { step: "02", title: "Get Your Route", desc: "Our A* algorithm finds the fastest path, choosing walking, cycling, or shuttle." },
  { step: "03", title: "Navigate with Ease", desc: "Follow turn-by-turn instructions with landmark cues and distance markers." },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-gray-900 text-lg tracking-tight">CampusMind <span className="text-red-600">AI</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/map" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-red-600 transition">Map</Link>
          <Link href="/assistant" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-red-600 transition">Assistant</Link>
          <Link href="/map" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition btn-glow">
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-16 text-center overflow-hidden">

        {/* Animated gradient background */}
        <div className="absolute inset-0 animate-gradient-shift"
          style={{ background: "linear-gradient(135deg, #7f1d1d, #991b1b, #b91c1c, #7c3aed, #1e1b4b)" }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl animate-float"
          style={{ background: "radial-gradient(circle, #f87171, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl animate-float"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent)", animationDelay: "2s" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            NTU Singapore · Smart Campus Navigation
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Navigate NTU <br />
            <span className="shimmer-text">Intelligently</span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-white/75 leading-relaxed">
            CampusMind AI combines real-time pathfinding, an AI campus assistant, and an interactive map
            — so you never get lost on campus again.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link href="/map"
              className="rounded-full bg-white px-8 py-3.5 font-bold text-red-700 shadow-xl hover:bg-red-50 transition-all btn-glow text-base">
              🗺️ Open Campus Map
            </Link>
            <Link href="/assistant"
              className="rounded-full glass px-8 py-3.5 font-semibold text-white hover:bg-white/20 transition-all text-base">
              🤖 Ask the AI
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
          <span>scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">Features</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Everything you need on campus</h2>
            <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
              One app for navigation, AI Q&A, and smart scheduling — built for NTU students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Link key={f.title} href={f.href}
                className={`group relative flex flex-col gap-4 rounded-3xl bg-white p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden`}>
                {/* Glow strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg ${f.glow}`}>
                  <span className="text-2xl">{f.icon}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>

                <span className="mt-auto text-sm font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">How It Works</p>
            <h2 className="text-4xl font-extrabold text-gray-900">From lost to found in 3 steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line */}
            <div className="absolute top-8 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent hidden md:block" />

            {howItWorks.map((h, i) => (
              <div key={h.step} className="flex flex-col items-center text-center gap-4"
                style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-200">
                  <span className="text-2xl font-black text-white">{h.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{h.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative px-6 py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #7c3aed 100%)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold text-white">Ready to find your way?</h2>
          <p className="mt-4 text-lg text-red-100">Open the map or ask the AI assistant — it knows every corner of NTU.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/map"
              className="rounded-full bg-white px-8 py-3.5 font-bold text-red-700 shadow-xl hover:bg-red-50 transition">
              Open Map
            </Link>
            <Link href="/assistant"
              className="rounded-full border border-white/40 glass px-8 py-3.5 font-semibold text-white hover:bg-white/20 transition">
              Chat with AI
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-gray-950 px-6 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-white text-lg">CampusMind <span className="text-red-500">AI</span></span>
        </div>
        <p className="text-sm text-gray-500">Built for NTU Singapore · Next.js · FastAPI · Ollama</p>
        <p className="mt-2 text-xs text-gray-600">© 2025 CampusMind AI · Open Source</p>
      </footer>

    </main>
  );
}
