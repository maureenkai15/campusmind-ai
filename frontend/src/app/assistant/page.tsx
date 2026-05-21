"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { generateId } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const SUGGESTED = [
  "Where is The Hive?",
  "Which hall is closest to North Spine?",
  "Where is NIE?",
  "Where can I eat near the engineering blocks?",
  "Which shuttle goes to Hall 1?",
  "Where is the swimming pool?",
];

function getStaticResponse(message: string): string {
  const q = message.toLowerCase();

  // NIE
  if (q.includes("nie") || q.includes("national institute of education") || q.includes("teacher"))
    return "🎓 **NIE (National Institute of Education)** is Singapore's sole teacher-training institution, located in the northeast corner of NTU campus.\n\n• **NIE Library** — education-focused collections\n• **NIE Performing Arts Centre** — rehearsal and performance spaces\n• **NIE Teaching Resource Centre** — e-learning support\n\nTake **Shuttle Route B or C** and alight at the NIE Bus Stop. From North Spine it's about a 15-min walk east.";

  // Halls - specific
  if (q.match(/hall\s*(1|one)\b/) || q.includes("hall 1"))
    return "🏠 **Hall of Residence 1** is one of NTU's oldest halls, located in the northwest residential area near North Hill. It's served by **Shuttle Route A**. Known for its strong inter-hall games tradition.";
  if (q.match(/hall\s*(16|sixteen)\b/) || q.includes("hall 16"))
    return "🏠 **Hall of Residence 16** is one of NTU's newest halls with fully air-conditioned en-suite rooms. Located in the southwest residential area. Great facilities and an active hall culture.";
  if (q.includes("residential college") || q.includes(" rc ") || q.includes("pioneer rc") || q.includes("nanyang rc"))
    return "🏠 NTU has **5 Residential Colleges (RCs)**:\n• **Pioneer House** — leadership & sustainability\n• **Nanyang House** — East-West dialogue\n• **Binjai Hall** — innovation & tech\n• **Tanjong Hall** — arts & service learning\n• **Palm Villa** — global citizenship\n\nRCs offer a 4-year living-learning programme with special curriculum.";
  if (q.includes("hall") || q.includes("hostel") || q.includes("residence") || q.includes("dorm"))
    return "🏠 NTU has **16 Halls of Residence** (Hall 1–16) plus **6 Residential Colleges** (Pioneer, Nanyang, Camellia, Binjai, Tanjong, Palm).\n\nHalls 1–6 are on the northwest (North Hill area), Halls 7–12 are near the Sports Hall, and Halls 13–16 are on the southwest side. All are served by shuttle buses from the North Bus Terminal.";

  // Libraries
  if (q.includes("library") || q.includes("lwn") || q.includes("study"))
    return "📚 NTU has **3 libraries**:\n• **Lee Wee Nam Library (LWN)** — main library, 24/7 study zone, makerspace, printing. Near North Spine.\n• **NIE Library** — education-focused, near NIE block.\n• **Chinese Heritage Centre Library** — specialised collection.\n\nLWN printing: use your student card at any printer kiosk on any floor.";

  // Canteens / food
  if (q.includes("canteen") || q.includes("food") || q.includes("eat") || q.includes("hungry") || q.includes("lunch") || q.includes("dinner"))
    return "🍽️ NTU has **7 canteens and food areas**:\n• **Canteen 1 & 2** — North Spine (Malay, Chinese, Indian, Western)\n• **Canteen 9 & 11** — South Spine (near engineering)\n• **Canteen 13** — near Sports Hall\n• **North Hill Canteen + Koufu** — residential area, open late\n• **The Hive Café** — coffee & pastries inside The Hive\n\nMost canteens open 7:30am–9pm weekdays.";

  // Bus / shuttle
  if (q.includes("shuttle") || q.includes("bus") || q.includes("route"))
    return "🚌 NTU runs **4 shuttle routes** (free for students):\n• **Route A** — North Hill Halls ↔ Innovation Walk ↔ ADM\n• **Route B** — Boon Lay MRT ↔ North Spine ↔ NIE\n• **Route C** — Boon Lay MRT ↔ South Spine ↔ NIE\n• **Route D** — Campus inner loop (south side)\n\nBuses run every **10–15 min** on weekdays. Use the **NTU Campus Rider app** for live arrival times. Main terminal is at North Spine.";

  // Sports
  if (q.includes("gym") || q.includes("swim") || q.includes("pool") || q.includes("tennis") || q.includes("badminton") || q.includes("basketball") || q.includes("sports"))
    return "🏋️ NTU Sports & Recreation facilities:\n• **Sports Hall** — badminton, basketball, squash, gym\n• **Olympic Pool** — 50m outdoor pool\n• **Track & Field** — 400m athletics track + football field\n• **Tennis Courts** — bookable via OSC app\n• **Multi-Purpose Sports Hall (MPSH)** — volleyball, futsal\n\nAll near the northwest corner of campus. Walk west from North Spine (~10 min) or take Route A to Sports Hall stop.";

  // Printing
  if (q.includes("print"))
    return "🖨️ Printing is available at:\n• **LWN Library** — every floor, self-service\n• **North Spine** — kiosk near One-Stop Centre\n• **Co-op (South Spine)** — ground floor\n\nLog in with your student card. B&W ~$0.10/page, colour ~$0.30/page.";

  // Medical
  if (q.includes("clinic") || q.includes("doctor") || q.includes("sick") || q.includes("health") || q.includes("medical"))
    return "🏥 **Campus Health & Medical Centre** is located near North Spine. Services include GP consultations, vaccinations, mental health support, and specialist referrals.\n\nFor dental care, the nearest dentist is off-campus at Boon Lay MRT. The NTU Counselling Centre (for mental wellness) is also near North Spine.";

  // Schools
  if (q.includes("computer science") || q.includes("scse") || q.includes("coding") || q.includes("software"))
    return "💻 **SCSE (School of Computer Science & Engineering)** is located in Block N4 in the northeast academic zone. It covers computer science, AI, cybersecurity, software engineering, and data science. The new **CCDS (College of Computing & Data Science)** is also nearby.";
  if (q.includes("business") || q.includes("nbs") || q.includes("mba") || q.includes("accountancy"))
    return "📊 **Nanyang Business School (NBS)** is one of Asia's top business schools. Located in The Arc building near North Spine. Offers BBA, Accountancy, MBA, and EMBA programmes. It has its own café and study lounges.";
  if (q.includes("medicine") || q.includes("lkc") || q.includes("medical school") || q.includes("mbbs"))
    return "⚕️ **Lee Kong Chian School of Medicine (LKCMed)** is NTU's joint medical school with Imperial College London. Located in the south academic zone. It trains doctors through an innovative problem-based curriculum.";
  if (q.includes("adm") || q.includes("art") || q.includes("design") || q.includes("media") || q.includes("animation"))
    return "🎨 **ADM (School of Art, Design & Media)** has the iconic curved green roof on the west side of campus. It houses animation studios, photography dark rooms, a public gallery, and digital media labs. Take Shuttle Route A to the ADM stop.";

  // ATM
  if (q.includes("atm") || q.includes("money") || q.includes("cash") || q.includes("bank"))
    return "🏧 ATM clusters are at:\n• **North Spine** — DBS, OCBC, UOB near the main entrance\n• **South Spine** — near the Co-op bookstore\n\nNearest full bank branch is at Boon Lay MRT / Jurong Point mall (15 min by shuttle).";

  // Admin / one-stop
  if (q.includes("register") || q.includes("admin") || q.includes("one-stop") || q.includes("student service") || q.includes("bursar") || q.includes("id card"))
    return "🏢 **NTU One-Stop Student Service Centre** is at North Spine. It handles:\n• Course registration issues\n• Accommodation applications\n• Financial aid & bursaries\n• Student ID card collection\n• Academic records\n\nOpen Mon–Fri 8:30am–6pm.";

  // Hive
  if (q.includes("hive"))
    return "🏛️ **The Hive (Learning Hub)** is NTU's iconic 12-storey beehive-shaped building near North Spine. It has collaborative learning studios, tutorial rooms, project rooms, and The Hive Café on the ground floor. Look for the honeycomb hexagonal facade!";

  // North Spine / South Spine
  if (q.includes("north spine"))
    return "🔀 **North Spine Plaza** is NTU's main north campus hub. It has Canteen 1 & 2, ATMs, the One-Stop Centre, the main shuttle bus terminal, and connects most academic buildings. If you're lost, head here first.";
  if (q.includes("south spine"))
    return "🔀 **South Spine** is the south campus hub near the engineering schools. It has Canteen 9 & 11, the Co-op bookstore, ATMs, and student services. Served by Shuttle Route C & D.";

  return "🤖 I'm **CampusMind**, your NTU campus guide! I know all 80 locations on campus — halls, schools, canteens, bus stops, and more.\n\nTry asking:\n• *Where is Hall 5?*\n• *Where is NIE?*\n• *Which bus goes to South Spine?*\n• *Where can I eat near Engineering?*";
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm **CampusMind** 🎓, your NTU campus assistant.\n\nAsk me about buildings, canteens, shuttle buses, or directions across campus. I know every corner of NTU!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: ChatMessage = { id: generateId(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate typing delay then respond with static knowledge
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    const reply = getStaticResponse(text);
    setMessages((prev) => [...prev, { id: generateId(), role: "assistant", content: reply, timestamp: new Date() }]);
    setTyping(false);
  };

  // Simple markdown-ish renderer for bold + newlines
  function renderContent(text: string) {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.+?)\*\*/g);
      return (
        <p key={i} className={i > 0 ? "mt-1" : ""}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  }

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
                label === "Assistant"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}>
              {label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-700 bg-emerald-950 px-3 py-1 text-xs font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Campus Knowledge Active
        </div>
      </nav>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6"
        style={{ background: "linear-gradient(to bottom, #030712, #111827)" }}>
        <div className="mx-auto max-w-2xl flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

              {msg.role === "assistant" && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-red-600 to-violet-600 flex items-center justify-center text-sm shadow-lg">
                  🤖
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-red-600 text-white rounded-br-none shadow-lg shadow-red-900/30"
                  : "bg-gray-800 border border-gray-700 text-gray-200 rounded-bl-none shadow-lg"
              }`}>
                {renderContent(msg.content)}
                <p className={`text-xs mt-2 ${msg.role === "user" ? "text-red-200" : "text-gray-500"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {msg.role === "user" && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                  🧑
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-red-600 to-violet-600 flex items-center justify-center text-sm">🤖</div>
              <div className="rounded-2xl rounded-bl-none bg-gray-800 border border-gray-700 px-4 py-3 flex gap-1.5 items-center">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="h-2 w-2 rounded-full bg-gray-500 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Suggestions ── */}
      {messages.length <= 1 && (
        <div className="border-t border-gray-800 bg-gray-900 px-4 py-3">
          <p className="text-xs text-gray-500 mb-2 text-center">Try asking…</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {SUGGESTED.map((s) => (
              <button key={s} onClick={() => sendMessage(s)}
                className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-300 hover:border-red-600 hover:bg-red-950 hover:text-red-300 transition">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input ── */}
      <div className="border-t border-gray-800 bg-gray-900 px-4 py-4">
        <form className="mx-auto flex max-w-2xl gap-2"
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}>
          <input ref={inputRef}
            className="flex-1 rounded-full border border-gray-700 bg-gray-800 px-5 py-3 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition"
            placeholder="Ask anything about NTU campus…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={typing}
          />
          <button type="submit" disabled={!input.trim() || typing}
            className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40 transition shadow-lg shadow-red-900/30">
            Send ↑
          </button>
        </form>
        <p className="text-center text-xs text-gray-600 mt-2">
          Built-in campus knowledge · Full AI via Ollama locally
        </p>
      </div>
    </div>
  );
}
