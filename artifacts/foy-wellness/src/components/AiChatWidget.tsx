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

  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setPulsing(true);
        setTimeout(() => setPulsing(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
    return undefined;
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
      <div
        className="fixed left-5 bottom-6 z-[9999]"
      >
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open AI Health Advisor"
          className={`
            relative flex items-center justify-center w-14 h-14 rounded-full
            bg-primary border border-primary/60
            text-white font-bold shadow-lg
            transition-all duration-300
            hover:scale-110 hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-primary/40
            ${open ? "rotate-90 scale-105" : ""}
          `}
        >
          {open ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              {pulsing && (
                <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
              )}
            </>
          )}
        </button>
      </div>

      <div
        className={`
          fixed left-5 z-[9998]
          flex flex-col
          w-[340px] sm:w-[380px]
          rounded-2xl overflow-hidden
          border border-border
          shadow-xl
          transition-all duration-500 ease-out
          ${open
            ? "bottom-24 opacity-100 translate-y-0 pointer-events-auto"
            : "bottom-16 opacity-0 translate-y-8 pointer-events-none"}
        `}
        style={{
          background: "#fff",
          maxHeight: "min(500px, calc(100vh - 120px))",
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-border"
          style={{ background: "hsl(200, 20%, 98%)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-none">FOY AI Advisor</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Longevity & Wellness</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
          {welcomeMessage && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl rounded-tl-sm text-sm text-foreground/80 leading-relaxed bg-primary/5 border border-primary/10">
                <p className="font-medium text-primary mb-1.5">Welcome to FOY Clinic</p>
                <p>I'm your AI health advisor. Ask me about longevity medicine, our programs, or how to begin your transformation with Dr. Ahmed Amer.</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["What is the Longevity Program?", "How do I book a consultation?", "What biomarkers do you track?"].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendQuick(q)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
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
                    ? "rounded-tr-sm bg-primary text-white"
                    : "rounded-tl-sm bg-muted text-foreground/80 border border-border"
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {streamingText && (
            <div className="flex justify-start">
              <div className="max-w-[85%] px-3.5 py-2.5 rounded-xl rounded-tl-sm text-sm leading-relaxed bg-muted text-foreground/80 border border-border">
                {streamingText}
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary animate-pulse rounded-sm align-text-bottom" />
              </div>
            </div>
          )}

          {loading && !streamingText && (
            <div className="flex justify-start">
              <div className="px-3.5 py-2.5 rounded-xl rounded-tl-sm bg-muted border border-border">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-border bg-muted/30">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder="Ask about longevity, programs, or Dr. Amer..."
              disabled={loading}
              className="
                flex-1 resize-none bg-white rounded-xl
                px-3.5 py-2.5 text-sm text-foreground
                placeholder:text-muted-foreground
                border border-border focus:border-primary
                focus:outline-none focus:ring-1 focus:ring-primary/20
                transition-colors disabled:opacity-50
              "
              style={{ minHeight: "40px", maxHeight: "100px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="
                flex-shrink-0 p-2.5 rounded-xl
                bg-primary hover:bg-primary/90
                disabled:bg-primary/30 disabled:cursor-not-allowed
                text-white transition-all duration-200
                hover:scale-105 active:scale-95
              "
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
            AI advisor · Not medical advice · Always consult Dr. Amer
          </p>
        </div>
      </div>
    </>
  );
}
