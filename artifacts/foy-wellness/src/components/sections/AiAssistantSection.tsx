import { useState, useEffect, useRef, useCallback } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Send, Sparkles } from "lucide-react";
import { PulseRings } from "../PulseRings";
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

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const simulateResponse = useCallback((userText: string) => {
    const match = RESPONSES.find(r => r.test(userText));
    const fullResponse = match ? match.reply : DEFAULT_REPLY(userText);

    setIsTyping(true);
    setTypingText("");

    let i = 0;
    const CHARS_PER_TICK = 3;
    const TICK_MS = 30;

    intervalRef.current = setInterval(() => {
      i = Math.min(i + CHARS_PER_TICK, fullResponse.length);
      setTypingText(fullResponse.slice(0, i));

      if (i >= fullResponse.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
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
    <section id="ai-advisor" className="py-24 relative z-10 overflow-hidden" style={{
      background: `
        radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,171,0.06) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 20% 80%, rgba(197,165,114,0.04) 0%, transparent 50%),
        linear-gradient(180deg, hsl(200, 15%, 96%) 0%, hsl(200, 18%, 97%) 100%)
      `
    }}>
      <PulseRings origins={[
        { x: "15%", y: "25%", color: "rgba(16, 185, 171, 0.25)", delay: 0, size: 400, count: 3 },
        { x: "85%", y: "75%", color: "rgba(94, 234, 212, 0.2)", delay: 1.7, size: 380, count: 3 },
        { x: "50%", y: "50%", color: "rgba(197, 165, 114, 0.15)", delay: 0.8, size: 550, count: 4 },
      ]} />
      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold flex items-center justify-center gap-3 mb-4 text-foreground text-glow-white">
            <Sparkles className="text-primary w-8 h-8" />
            AI Health Advisor
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Describe your concern and get an instant, personalized clinical recommendation based on the FOY Longevity Protocol.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-border shadow-lg overflow-hidden">
            <div className="bg-[#1a2332] rounded-2xl overflow-hidden flex flex-col h-[520px] relative">
              <div className="bg-[#1e2a3a] border-b border-white/10 px-6 py-3.5 flex items-center justify-between z-10 relative flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="font-mono text-xs text-primary/80 tracking-widest ml-2">FOY AI ADVISOR v2.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400 font-mono tracking-wider">ACTIVE</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>

              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-5 space-y-5 z-10 relative"
                style={{ scrollBehavior: "auto" }}
              >
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "ai" ? (
                      <div className="max-w-[85%] bg-white/5 border-l-2 border-primary rounded-r-xl rounded-bl-xl px-5 py-4">
                        <p className="leading-relaxed text-sm md:text-base font-mono text-white/85 whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ) : (
                      <div className="max-w-[80%] bg-primary text-white rounded-2xl rounded-br-sm px-5 py-4 shadow-lg">
                        <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex w-full justify-start">
                    <div className="max-w-[85%] bg-white/5 border-l-2 border-primary/80 rounded-r-xl rounded-bl-xl px-5 py-4">
                      <p className="leading-relaxed text-sm md:text-base font-mono text-white/85 whitespace-pre-wrap">
                        {typingText}
                        <span className="inline-block w-[2px] h-[1em] ml-0.5 bg-primary align-middle animate-[blink_0.8s_step-end_infinite]" />
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-5 pb-3 flex flex-wrap gap-2 z-10 relative flex-shrink-0">
                {prompts.map(p => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    disabled={isTyping}
                    className="text-xs bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-full px-3 py-1.5 text-white/70 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-[#151f2e] border-t border-white/10 z-10 relative flex-shrink-0">
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
                    className="w-full bg-white/5 border border-white/15 rounded-full py-3.5 pl-6 pr-14 text-white font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-white/30"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 p-2.5 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-center mt-2 text-[10px] text-white/25 uppercase tracking-widest font-mono">
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
