"use client";

/**
 * /assistant – AI Chat page
 * Streams responses from the FastAPI backend via SSE.
 */

import { useEffect, useRef, useState } from "react";
import { assistantApi } from "@/lib/api";
import { generateId } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const SUGGESTED = [
  "How do I get from The Hive to the LWN Library?",
  "Where is Canteen 2?",
  "What shuttle bus goes to Hall of Residence 1?",
  "Where can I print documents on campus?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm CampusMind, your NTU campus assistant. Ask me about buildings, canteens, shuttle buses, or anything on campus 🎓",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || streaming) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const assistantId = generateId();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setStreaming(true);

    await assistantApi.streamChat(
      text,
      messages.slice(-10).map((m) => ({ role: m.role, content: m.content })),
      (token) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + token } : m
          )
        );
      },
      () => setStreaming(false),
      (err) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: `⚠️ Error: ${err.message}` }
              : m
          )
        );
        setStreaming(false);
      }
    );
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <nav className="flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <a href="/" className="text-xl font-bold text-red-700">🎓 CampusMind AI</a>
        <span className="text-sm text-gray-400">Campus Assistant</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Ollama
        </span>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-6">
        <div className="mx-auto max-w-2xl flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <span className="mr-2 mt-1 text-2xl">🤖</span>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-red-600 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                }`}
              >
                {msg.content}
                {msg.role === "assistant" && !msg.content && (
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2 max-w-2xl mx-auto w-full">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-600 hover:border-red-300 hover:bg-red-50 transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <form
          className="mx-auto flex max-w-2xl gap-2"
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        >
          <input
            className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm focus:border-red-400 focus:outline-none"
            placeholder="Ask about NTU campus…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={streaming}
          />
          <button
            type="submit"
            disabled={!input.trim() || streaming}
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
