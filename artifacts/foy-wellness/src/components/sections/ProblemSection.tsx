import { FadeIn } from "../animations/FadeIn";
import { Frown, ZapOff, Clock, CloudFog } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProblemSection() {
  const problems = [
    {
      icon: <Frown className="w-8 h-8 text-red-500/80 group-hover:text-primary transition-colors" />,
      title: "Tired Skin",
      desc: "Dull, aging skin that doesn't reflect how vibrant you feel inside."
    },
    {
      icon: <ZapOff className="w-8 h-8 text-red-500/80 group-hover:text-primary transition-colors" />,
      title: "Low Energy",
      desc: "Chronic fatigue that steals your joy and daily productivity."
    },
    {
      icon: <Clock className="w-8 h-8 text-red-500/80 group-hover:text-primary transition-colors" />,
      title: "Visible Aging",
      desc: "Fine lines and cellular aging appearing earlier than expected."
    },
    {
      icon: <CloudFog className="w-8 h-8 text-red-500/80 group-hover:text-primary transition-colors" />,
      title: "Mental Fog",
      desc: "Stress, anxiety, and a lack of mental clarity holding you back."
    }
  ];

  return (
    <section id="problem" className="py-32 relative z-10 overflow-hidden bg-black">
      {/* Dark overlay with subtle reddish warmth tint */}
      <div className="absolute inset-0 z-0 bg-black/80 backdrop-blur-sm" />
      <div className="absolute inset-0 z-0 bg-red-950/10 mix-blend-overlay" />
      
      {/* Floating decorative blurred orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full animate-float-orb pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full animate-float-orb pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white drop-shadow-lg">Does this sound familiar?</h2>
          <p className="text-white/70 text-xl font-light">
            You're not alone. Millions feel this way — but there is a way out.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up" className="h-full">
              <div className="group relative p-8 rounded-2xl h-full flex flex-col items-start text-left bg-black/60 backdrop-blur-xl border border-red-900/40 hover:border-primary/50 transition-all duration-500 shadow-2xl overflow-hidden hover:-translate-y-2">
                {/* Pulse indicator dot */}
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)] group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(13,148,136,0.8)] transition-colors" />
                
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/70 transition-colors">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="text-center">
          <p className="text-2xl md:text-3xl font-display italic text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200 gold-glow px-4 py-2 inline-block">
            "The first step is recognizing the problem. The next step is FOY."
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
