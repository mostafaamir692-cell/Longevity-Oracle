import { useState, useEffect, useRef } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiAssistantSection() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai", content: string }[]>([
    { role: "ai", content: "Initializing FOY Neural Network...\n\nHello. I am the FOY AI Health Advisor. How can I help optimize your longevity today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const currentResponseRef = useRef("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prompts = ["Anti-aging protocols", "Fix my sleep", "Skin concerns", "Low energy levels", "Weight optimization", "Manage stress", "Peptides", "Consultation"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedResponse]);

  const simulateResponse = (userText: string) => {
    setIsTyping(true);
    let fullResponse = "Based on our clinical protocols, addressing " + userText.toLowerCase() + " requires a holistic approach. I recommend starting with our comprehensive Biomarker Analysis followed by a tailored peptide and NAD+ therapy plan. Would you like me to prepare a booking for a specialist consultation?";
    
    const lower = userText.toLowerCase();
    if (lower.includes("skin") || lower.includes("aging")) {
      fullResponse = "For cellular skin rejuvenation, the FOY protocol combines advanced HydraFacial treatments with Exosome therapy and targeted laser resurfacing. This repairs cellular damage from the inside out, promoting natural collagen production.";
    } else if (lower.includes("energy") || lower.includes("sleep")) {
      fullResponse = "Chronic low energy or sleep disruption is often linked to mitochondrial decline. We utilize targeted NAD+ IV therapy, biohacking sleep optimization plans, and hormonal balancing to restore your cellular energy production.";
    } else if (lower.includes("weight")) {
      fullResponse = "Metabolic optimization requires precision. Our protocol includes comprehensive blood panels, personalized peptide therapy (like GLP-1 analogs if indicated), and targeted nutritional modifications to achieve sustainable cellular health.";
    } else if (lower.includes("stress")) {
      fullResponse = "Chronic stress elevates cortisol and accelerates cellular aging. We recommend our adaptogenic IV formulations, neuro-feedback sessions, and mindful breathing protocols to lower your allostatic load.";
    } else if (lower.includes("peptide")) {
      fullResponse = "Peptide therapy is a cornerstone of our longevity program. By utilizing specific amino acid sequences, we can signal your body to naturally increase growth hormone production, reduce inflammation, and accelerate tissue repair.";
    } else if (lower.includes("consult")) {
      fullResponse = "Excellent. I can help arrange a consultation with our medical team. Please navigate to the booking section below or let me know what day works best for you.";
    }

    currentResponseRef.current = "";
    setDisplayedResponse("");

    let i = 0;
    const interval = setInterval(() => {
      currentResponseRef.current += fullResponse.charAt(i);
      setDisplayedResponse(currentResponseRef.current);
      i++;
      if (i >= fullResponse.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages(prev => [...prev, { role: "ai", content: fullResponse }]);
        setDisplayedResponse("");
      }
    }, 20); // slightly faster
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => simulateResponse(text), 500);
  };

  return (
    <section id="ai-advisor" className="py-24 bg-card relative z-10 overflow-hidden">
      {/* Decorative background blur */}
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
            {/* Terminal Container */}
            <div className="bg-[#030e14] rounded-2xl overflow-hidden flex flex-col h-[550px] relative">
              
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-0" />

              {/* Terminal Header */}
              <div className="bg-[#051620] border-b border-primary/30 px-6 py-4 flex items-center justify-between z-10 relative">
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
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 relative scroll-smooth">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "ai" ? (
                      <div className="max-w-[85%] bg-black/60 backdrop-blur-md border-l-2 border-primary shadow-[2px_0_10px_rgba(13,148,136,0.4)] rounded-r-xl rounded-bl-xl px-5 py-4">
                        <p className="leading-relaxed text-sm md:text-base font-mono text-primary-foreground/90 whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ) : (
                      <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-5 py-4 shadow-lg">
                        <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Active Typing Bubble */}
                {isTyping && (
                  <div className="flex w-full justify-start">
                    <div className="max-w-[85%] bg-black/60 backdrop-blur-md border-l-2 border-primary shadow-[2px_0_10px_rgba(13,148,136,0.4)] rounded-r-xl rounded-bl-xl px-5 py-4">
                      <p className="leading-relaxed text-sm md:text-base font-mono text-primary-foreground/90">
                        {displayedResponse}
                        <span className="inline-block w-2 h-4 ml-1 bg-primary animate-[pulse_0.8s_infinite] align-middle">▊</span>
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-6 pb-3 flex flex-wrap gap-2 z-10 relative">
                {prompts.map(p => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    disabled={isTyping}
                    className="text-xs bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 hover:shadow-[0_0_10px_rgba(13,148,136,0.3)] rounded-full px-3 py-1.5 text-foreground/80 transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-background/80 backdrop-blur-md border-t border-primary/20 z-10 relative">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    placeholder="Type your concern..."
                    className="w-full bg-black/60 border border-primary/30 rounded-full py-4 pl-6 pr-14 text-foreground font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-foreground/30"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 p-3 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:hover:bg-primary shadow-[0_0_10px_rgba(13,148,136,0.5)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="text-center mt-3">
                  <span className="text-[10px] text-foreground/40 uppercase tracking-widest font-mono">Powered by FOY Neural Network</span>
                </div>
              </div>
              
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
