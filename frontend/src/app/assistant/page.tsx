"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { generateId } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const SUGGESTED = [
  "Where is The Hive?",
  "How do I get from North Spine to the Library?",
  "Which shuttle bus goes to Hall 1?",
  "Where can I print documents on campus?",
  "What's at South Spine?",
  "Where is the Sports Hall?",
];

// Simple rule-based responses when backend is unavailable
function getStaticResponse(message: string): string {
  const q = message.toLowerCase();
  if (q.includes("hive") || q.includes("ns1"))
    return "🏛️ **The Hive (NS1)** is NTU's iconic 12-storey beehive-shaped building. It houses collaborative learning spaces, tutorial rooms, and studios. It's one of the most recognisable landmarks on campus — look for the hexagonal facade near North Spine!";
  if (q.includes("library") || q.includes("lwn"))
    return "📚 **Lee Wee Nam Library (LWN)** is NTU's main library. It has a 24/7 study zone, digital resources, a makerspace, and printing facilities. It's a 5-minute walk from North Spine Plaza.";
  if (q.includes("canteen") || q.includes("food") || q.includes("eat"))
    return "🍽️ NTU has several canteens:\n• **North Spine** — Canteen 1 & 2, close to academic blocks\n• **South Spine** — Canteen 9 & 11, near CoE buildings\n• **Canteen 13** — near the Sports Hall\n\nMost are open 7:30am–9pm on weekdays.";
  if (q.includes("shuttle") || q.includes("bus"))
    return "🚌 NTU runs **4 shuttle bus routes**:\n• **Route A** — North Hill ↔ Innovation Walk\n• **Route B** — Boon Lay MRT ↔ North Spine\n• **Route C** — Boon Lay MRT ↔ South Spine\n• **Route D** — Campus loop (South side)\n\nBuses run every 10–15 min on weekdays. The North Bus Terminal is at NS2.";
  if (q.includes("hall") || q.includes("hostel") || q.includes("residence"))
    return "🏠 NTU has multiple **Halls of Residence** (Hall 1–16) and Residential Colleges (Pioneer, Nanyang, Camellia, Binjai, Tanjong, Palm). They're spread across the western part of campus. Hall 1 is served by Shuttle Route A.";
  if (q.includes("sports") || q.includes("gym") || q.includes("swim"))
    return "🏋️ The **Sports Hall (SH)** has badminton courts, basketball courts, squash courts, a gym, and an Olympic-size swimming pool. It's open daily. Head west from North Spine for about 10 minutes or take the campus loop shuttle.";
  if (q.includes("print") || q.includes("printing"))
    return "🖨️ Printing is available at:\n• **LWN Library** — all floors\n• **North Spine** — kiosk near student services\n• **Co-op at South Spine** — ground floor\n\nUse your student card to log in and release print jobs.";
  if (q.includes("adm") || q.includes("art") || q.includes("design") || q.includes("media"))
    return "🎨 The **School of Art, Design & Media (ADM)** is the distinctive building with a green curved roof on the western side of campus. It houses studios, a gallery, and digital labs. Take Shuttle Route A or walk 15 min from North Spine.";
  if (q.includes("north spine") || q.includes("ns2"))
    return "🔀 **North Spine Plaza (NS2)** is the main hub of NTU's north campus. It connects most academic blocks and has Canteen 1, Canteen 2, ATMs, student services, and the main bus terminal. Great landmark to start from!";
  return "🤖 I'm CampusMind, your NTU campus guide! I can help you find buildings, canteens, shuttle buses, libraries, and more. For full AI responses, run the backend locally with Ollama.\n\nTry asking: *Where is The Hive?* or *Which bus goes to Hall 1?*";
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
