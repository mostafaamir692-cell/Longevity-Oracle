import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, Sparkles, ChevronDown, Bot } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState<number | null>(null);
  const [streamingText, setStreamingText] = useState("");
  const [pulsing, setPulsing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Pulsing attention animation when closed
  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setPulsing(true);
        setTimeout(() => setPulsing(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const initConversation = useCallback(async () => {
    if (convId !== null) return convId;
    const res = await fetch(`${BASE}/api/openai/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "FOY Health Consultation" }),
    });
    const data = await res.json();
    setConvId(data.id);
    return data.id as number;
  }, [convId]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setStreamingText("");

    try {
      const cid = await initConversation();
      abortRef.current = new AbortController();

      const res = await fetch(`${BASE}/api/openai/conversations/${cid}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.done) {
              setMessages((prev) => [
                ...prev,
                { id: `a-${Date.now()}`, role: "assistant", content: accumulated },
              ]);
              setStreamingText("");
            } else if (parsed.content) {
              accumulated += parsed.content;
              setStreamingText(accumulated);
            }
          } catch {}
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: "I'm sorry, I encountered an issue. Please try again or contact us directly at clinic@foyclinic.com.",
          },
        ]);
      }
    } finally {
      setLoading(false);
      setStreamingText("");
    }
  }, [input, loading, initConversation]);

  const sendQuick = useCallback(async (text: string) => {
    if (loading) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setStreamingText("");

    try {
      const cid = await initConversation();
      abortRef.current = new AbortController();

      const res = await fetch(`${BASE}/api/openai/conversations/${cid}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.done) {
              setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: accumulated }]);
              setStreamingText("");
            } else if (parsed.content) {
              accumulated += parsed.content;
              setStreamingText(accumulated);
            }
          } catch {}
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) => [...prev, { id: `err-${Date.now()}`, role: "assistant", content: "I'm sorry, I encountered an issue. Please contact us at clinic@foyclinic.com." }]);
      }
    } finally {
      setLoading(false);
      setStreamingText("");
    }
  }, [loading, initConversation]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const welcomeMessage = messages.length === 0 && !loading;

  return (
    <>
      {/* Floating button — left side */}
      <div
        className="fixed left-5 bottom-6 z-[9999]"
        style={{ filter: "drop-shadow(0 0 18px rgba(45,212,191,0.35))" }}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open AI Health Advisor"
          className={`
            relative flex items-center justify-center w-14 h-14 rounded-full
            bg-gradient-to-br from-teal-500 via-teal-400 to-cyan-400
            border border-teal-300/40
            text-[#030e14] font-bold shadow-xl
            transition-all duration-300
            hover:scale-110 hover:from-teal-400 hover:to-cyan-300
            focus:outline-none focus:ring-2 focus:ring-teal-400/60
            ${open ? "rotate-90 scale-105" : ""}
          `}
        >
          {open ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              {pulsing && (
                <span className="absolute inset-0 rounded-full animate-ping bg-teal-400/30 pointer-events-none" />
              )}
            </>
          )}
        </button>

        {/* Tooltip label */}
        {!open && (
          <div
            className="
              absolute left-16 bottom-1/2 translate-y-1/2
              whitespace-nowrap px-3 py-1.5 rounded-lg
              bg-[#0a1628]/90 border border-teal-500/30
              text-teal-300 text-xs font-medium
              pointer-events-none
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
            style={{ backdropFilter: "blur(8px)" }}
          >
            AI Health Advisor
          </div>
        )}
      </div>

      {/* Chat panel */}
      <div
        className={`
          fixed left-5 z-[9998]
          flex flex-col
          w-[340px] sm:w-[380px]
          rounded-2xl overflow-hidden
          border border-teal-500/20
          shadow-2xl
          transition-all duration-500 ease-out
          ${open
            ? "bottom-24 opacity-100 translate-y-0 pointer-events-auto"
            : "bottom-16 opacity-0 translate-y-8 pointer-events-none"}
        `}
        style={{
          background: "linear-gradient(160deg, #030e14 0%, #061525 60%, #0a1a2e 100%)",
          boxShadow: "0 0 40px rgba(45,212,191,0.12), 0 20px 60px rgba(0,0,0,0.5)",
          maxHeight: "min(500px, calc(100vh - 120px))",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-teal-500/20"
          style={{ background: "rgba(13,25,42,0.9)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/15 border border-teal-500/30">
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-teal-300 leading-none">FOY AI Advisor</p>
              <p className="text-[10px] text-teal-500/70 mt-0.5">Longevity & Wellness</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-teal-300 hover:bg-teal-500/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
          {welcomeMessage && (
            <div className="space-y-3">
              <div
                className="p-3.5 rounded-xl rounded-tl-sm text-sm text-slate-200 leading-relaxed"
                style={{ background: "rgba(45,212,191,0.07)", border: "1px solid rgba(45,212,191,0.12)" }}
              >
                <p className="font-medium text-teal-300 mb-1.5">Welcome to FOY Clinic</p>
                <p>I'm your AI health advisor. Ask me about longevity medicine, our programs, or how to begin your transformation with Dr. Ahmed Amer.</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["What is the Longevity Program?", "How do I book a consultation?", "What biomarkers do you track?"].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendQuick(q)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-teal-500/25 text-teal-400/80 hover:text-teal-300 hover:border-teal-400/40 hover:bg-teal-500/10 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed
                  ${msg.role === "user"
                    ? "rounded-tr-sm bg-teal-600/25 border border-teal-500/25 text-teal-100"
                    : "rounded-tl-sm text-slate-200"
                  }
                `}
                style={
                  msg.role === "assistant"
                    ? { background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.1)" }
                    : {}
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Streaming response */}
          {streamingText && (
            <div className="flex justify-start">
              <div
                className="max-w-[85%] px-3.5 py-2.5 rounded-xl rounded-tl-sm text-sm leading-relaxed text-slate-200"
                style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.1)" }}
              >
                {streamingText}
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-teal-400 animate-pulse rounded-sm align-text-bottom" />
              </div>
            </div>
          )}

          {loading && !streamingText && (
            <div className="flex justify-start">
              <div
                className="px-3.5 py-2.5 rounded-xl rounded-tl-sm"
                style={{ background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.1)" }}
              >
                <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          className="p-3 border-t border-teal-500/15"
          style={{ background: "rgba(8,18,32,0.8)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder="Ask about longevity, programs, or Dr. Amer…"
              disabled={loading}
              className="
                flex-1 resize-none bg-transparent rounded-xl
                px-3.5 py-2.5 text-sm text-slate-200
                placeholder:text-slate-500
                border border-teal-500/20 focus:border-teal-500/40
                focus:outline-none focus:ring-1 focus:ring-teal-500/20
                transition-colors disabled:opacity-50
                scrollbar-thin
              "
              style={{ minHeight: "40px", maxHeight: "100px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="
                flex-shrink-0 p-2.5 rounded-xl
                bg-teal-500 hover:bg-teal-400
                disabled:bg-teal-500/30 disabled:cursor-not-allowed
                text-[#030e14] transition-all duration-200
                hover:scale-105 active:scale-95
              "
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-slate-600 text-center mt-2">
            AI advisor · Not medical advice · Always consult Dr. Amer
          </p>
        </div>
      </div>
    </>
  );
}
