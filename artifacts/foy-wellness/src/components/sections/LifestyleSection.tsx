import { FadeIn } from "../animations/FadeIn";
import { Apple, Moon, Waves, Infinity } from "lucide-react";

export function LifestyleSection() {
  const habits = [
    {
      icon: <Apple className="w-8 h-8 text-primary" />,
      title: "Nutritional Protocols",
      desc: "Personalized anti-inflammatory eating plans."
    },
    {
      icon: <Moon className="w-8 h-8 text-primary" />,
      title: "Sleep Optimization",
      desc: "Biohacking deep sleep for cellular recovery."
    },
    {
      icon: <Waves className="w-8 h-8 text-primary" />,
      title: "Mental Clarity",
      desc: "Stress reduction and mindfulness practices."
    },
    {
      icon: <Infinity className="w-8 h-8 text-primary" />,
      title: "Longevity Habits",
      desc: "Daily rituals backed by anti-aging science."
    }
  ];

  return (
    <section className="py-24 bg-card relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">A Complete Lifestyle Approach</h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              True longevity doesn't stop when you leave the clinic. The FOY System integrates seamlessly into your daily life, transforming how you eat, sleep, and thrive.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {habits.map((habit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                    {habit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{habit.title}</h4>
                    <p className="text-sm text-foreground/60">{habit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="left" className="relative h-[500px] rounded-3xl overflow-hidden glass-panel flex items-center justify-center">
            {/* Using a beautifully styled abstract representation instead of a stock photo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-background to-gold/10" />
            <div className="absolute w-64 h-64 border-[1px] border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-48 h-48 border-[1px] border-gold/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute w-32 h-32 border-[2px] border-primary/50 rounded-full animate-pulse shadow-[0_0_40px_rgba(13,148,136,0.5)]" />
            <div className="text-center z-10 p-8">
               <h3 className="text-2xl font-display italic text-white/90">"Harmony inside,<br/>Radiance outside"</h3>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
