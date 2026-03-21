import { useState, useEffect, useRef } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Send, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiAssistantSection() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai", content: string }[]>([
    { role: "ai", content: "Hello. I am the FOY AI Health Advisor. How can I help optimize your longevity today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const currentResponseRef = useRef("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prompts = ["Anti-aging protocols", "Fix my sleep", "Skin concerns", "Low energy levels"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedResponse]);

  const simulateResponse = (userText: string) => {
    setIsTyping(true);
    let fullResponse = "Based on our clinical protocols, addressing " + userText.toLowerCase() + " requires a holistic approach. I recommend starting with our comprehensive Biomarker Analysis followed by a tailored peptide and NAD+ therapy plan. Would you like me to prepare a booking for a specialist consultation?";
    
    // Custom responses based on keywords
    if (userText.toLowerCase().includes("skin")) {
      fullResponse = "For skin rejuvenation, the FOY protocol combines advanced HydraFacial treatments with Exosome therapy to repair cellular damage from the inside out, promoting natural collagen production.";
    } else if (userText.toLowerCase().includes("energy") || userText.toLowerCase().includes("sleep")) {
      fullResponse = "Chronic low energy is often linked to mitochondrial decline. We utilize targeted NAD+ IV therapy and biohacking sleep optimization plans to restore your cellular energy production.";
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
    }, 25);
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
          <div className="glass-panel rounded-3xl overflow-hidden border border-primary/30 shadow-[0_0_40px_rgba(13,148,136,0.15)] flex flex-col h-[500px]">
            
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-5 py-4",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-sm" 
                      : "bg-background/80 border border-white/10 rounded-bl-sm"
                  )}>
                    {msg.role === "ai" && <Bot className="w-5 h-5 mb-2 text-primary" />}
                    <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {/* Active Typing Bubble */}
              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="max-w-[80%] rounded-2xl px-5 py-4 bg-background/80 border border-primary/30 shadow-[0_0_15px_rgba(13,148,136,0.2)] rounded-bl-sm">
                    <Bot className="w-5 h-5 mb-2 text-primary animate-pulse" />
                    <p className="leading-relaxed text-sm md:text-base">
                      {displayedResponse}
                      <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {prompts.map(p => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  disabled={isTyping}
                  className="text-xs bg-white/5 hover:bg-primary/20 border border-white/10 rounded-full px-3 py-1.5 text-foreground/80 transition-colors disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/50 border-t border-white/5">
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
                  className="w-full bg-black/40 border border-white/10 rounded-full py-4 pl-6 pr-14 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-foreground/30"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-3 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
