import { useState, useEffect, useRef, useCallback } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "ai"; content: string };

const RESPONSES: { test: (s: string) => boolean; reply: string }[] = [
  {
    test: s => /skin|pore|glow|complexion|facil/i.test(s),
    reply: "For cellular skin rejuvenation, the FOY protocol combines advanced HydraFacial treatments with Exosome therapy and targeted laser resurfacing. This repairs cellular damage from the inside out, promoting natural collagen production. Results are visible within 4–6 weeks."
  },
  {
    test: s => /energy|sleep|fatigue|tired|exhaust/i.test(s),
    reply: "Chronic low energy or sleep disruption is often linked to mitochondrial decline. We utilize targeted NAD+ IV therapy, biohacking sleep optimization, and hormonal balancing to restore your cellular energy production. Most clients report significant improvement within 3 weeks."
  },
  {
    test: s => /hair|scalp|bald|thin/i.test(s),
    reply: "Hair restoration with PRP and Exosome therapy stimulates dormant follicles and increases hair density. Our protocol is personalized based on your scalp analysis. Visible regrowth is typically observed in 8–12 weeks."
  },
  {
    test: s => /weight|slim|fat|metabol/i.test(s),
    reply: "Metabolic optimization requires precision. Our protocol includes comprehensive blood panels, personalized peptide therapy (such as GLP-1 analogs if indicated), and targeted nutritional modifications to achieve sustainable cellular health and body composition improvement."
  },
  {
    test: s => /stress|anxiety|mental|mind|fog/i.test(s),
    reply: "Chronic stress elevates cortisol and accelerates cellular aging. We recommend our adaptogenic IV formulations, neuro-feedback sessions, and mindful breathing protocols to lower your allostatic load and restore mental clarity."
  },
  {
    test: s => /peptide|hormone|nad|iv/i.test(s),
    reply: "Peptide therapy is a cornerstone of our longevity program. By utilizing specific amino acid sequences, we signal your body to naturally increase growth hormone production, reduce inflammation, and accelerate tissue repair. Your protocol is custom-designed from your biomarker results."
  },
  {
    test: s => /consult|book|appoint|meet/i.test(s),
    reply: "I can help arrange a consultation with our medical team. Please scroll to the booking section below or call us directly. Our concierge team typically responds within 2 hours."
  },
  {
    test: s => /anti.?aging|age|wrinkle|line|youthful/i.test(s),
    reply: "Anti-aging at FOY goes beyond surface treatments. We combine biomarker-driven protocols with peptide therapy, laser skin tightening, and cellular regeneration techniques. Our clients typically see visible improvements in skin firmness, energy, and cognitive clarity within 6–10 weeks."
  },
];

const DEFAULT_REPLY = (text: string) =>
  `Based on our clinical analysis of "${text}", I recommend beginning with our Comprehensive Biomarker Assessment. This allows our physicians to design a fully personalized longevity protocol covering aesthetics, cellular health, and vitality optimization. Would you like to schedule a consultation?`;

export function AiAssistantSection() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello. I am the FOY AI Health Advisor.\n\nDescribe your concern or health goal, and I will provide a personalized clinical recommendation based on the FOY Longevity Protocol." }
  ]);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Only auto-scroll when a complete message is added — not on every character
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const simulateResponse = useCallback((userText: string) => {
    const match = RESPONSES.find(r => r.test(userText));
    const fullResponse = match ? match.reply : DEFAULT_REPLY(userText);

    setIsTyping(true);
    setTypingText("");

    let i = 0;
    // Batch characters per tick to reduce render frequency
    const CHARS_PER_TICK = 3;
    const TICK_MS = 30;

    intervalRef.current = setInterval(() => {
      i = Math.min(i + CHARS_PER_TICK, fullResponse.length);
      setTypingText(fullResponse.slice(0, i));

      if (i >= fullResponse.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        // Batch the final state update into one paint
        requestAnimationFrame(() => {
          setIsTyping(false);
          setTypingText("");
          setMessages(prev => [...prev, { role: "ai", content: fullResponse }]);
        });
      }
    }, TICK_MS);
  }, []);

  const handleSend = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages(prev => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setTimeout(() => simulateResponse(trimmed), 400);
  }, [isTyping, simulateResponse]);

  const prompts = ["Anti-aging", "Skin concerns", "Low energy", "Hair loss", "Sleep", "Stress", "Peptides", "Consultation"];

  return (
    <section id="ai-advisor" className="py-24 bg-card relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-gold w-8 h-8" />
            AI Health Advisor
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Describe your concern and get an instant, personalized clinical recommendation based on the FOY Longevity Protocol.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="animate-border-glow rounded-2xl p-[1px] bg-gradient-to-b from-primary/50 to-primary/10 shadow-2xl relative">
            <div className="bg-[#030e14] rounded-2xl overflow-hidden flex flex-col h-[520px] relative">

              {/* Scanline overlay — purely decorative, no JS */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />

              {/* Terminal Header */}
              <div className="bg-[#051620] border-b border-primary/30 px-6 py-3.5 flex items-center justify-between z-10 relative flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-primary/80 tracking-widest ml-2">FOY AI ADVISOR v2.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400 font-mono tracking-wider">ACTIVE</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                </div>
              </div>

              {/* Chat messages — no smooth scroll, just instant scroll on new message */}
              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-5 space-y-5 z-10 relative"
                style={{ scrollBehavior: "auto" }}
              >
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "ai" ? (
                      <div className="max-w-[85%] bg-black/60 border-l-2 border-primary shadow-[2px_0_8px_rgba(13,148,136,0.3)] rounded-r-xl rounded-bl-xl px-5 py-4">
                        <p className="leading-relaxed text-sm md:text-base font-mono text-foreground/90 whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ) : (
                      <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-5 py-4 shadow-lg">
                        <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing bubble — no backdrop-blur (performance) */}
                {isTyping && (
                  <div className="flex w-full justify-start">
                    <div className="max-w-[85%] bg-black/70 border-l-2 border-primary/80 shadow-[2px_0_8px_rgba(13,148,136,0.25)] rounded-r-xl rounded-bl-xl px-5 py-4">
                      <p className="leading-relaxed text-sm md:text-base font-mono text-foreground/90 whitespace-pre-wrap">
                        {typingText}
                        <span className="inline-block w-[2px] h-[1em] ml-0.5 bg-primary align-middle animate-[blink_0.8s_step-end_infinite]" />
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div className="px-5 pb-3 flex flex-wrap gap-2 z-10 relative flex-shrink-0">
                {prompts.map(p => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    disabled={isTyping}
                    className="text-xs bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-full px-3 py-1.5 text-foreground/70 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 bg-background/80 border-t border-primary/20 z-10 relative flex-shrink-0">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    placeholder="Describe your concern or health goal..."
                    className="w-full bg-black/60 border border-primary/30 rounded-full py-3.5 pl-6 pr-14 text-foreground font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-foreground/30"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 p-2.5 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors disabled:opacity-40 disabled:pointer-events-none shadow-[0_0_10px_rgba(13,148,136,0.4)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-center mt-2 text-[10px] text-foreground/30 uppercase tracking-widest font-mono">
                  Powered by FOY Neural Network
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
