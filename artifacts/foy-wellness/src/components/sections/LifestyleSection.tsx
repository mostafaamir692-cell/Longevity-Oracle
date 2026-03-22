import { FadeIn } from "../animations/FadeIn";
import { Apple, Moon, Waves, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

export function LifestyleSection() {
  const habits = [
    {
      icon: <Apple className="w-8 h-8 text-primary group-hover:text-primary transition-colors duration-300" />,
      title: "Nutritional Protocols",
      desc: "Personalized anti-inflammatory eating plans.",
      color: "bg-primary/10",
      delay: 0.1
    },
    {
      icon: <Moon className="w-8 h-8 text-primary group-hover:text-primary transition-colors duration-300" />,
      title: "Sleep Optimization",
      desc: "Biohacking deep sleep for cellular recovery.",
      color: "bg-card/80",
      delay: 0.2
    },
    {
      icon: <Waves className="w-8 h-8 text-primary group-hover:text-primary transition-colors duration-300" />,
      title: "Mental Clarity",
      desc: "Stress reduction and mindfulness practices.",
      color: "bg-card/80",
      delay: 0.3
    },
    {
      icon: <Infinity className="w-8 h-8 text-primary group-hover:text-primary transition-colors duration-300" />,
      title: "Longevity Habits",
      desc: "Daily rituals backed by anti-aging science.",
      color: "bg-primary/10",
      delay: 0.4
    }
  ];

  return (
    <section className="py-24 bg-background relative z-10 section-transition">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">A Complete Lifestyle Approach</h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              True longevity doesn't stop when you leave the clinic. The FOY System integrates seamlessly into your daily life, transforming how you eat, sleep, and thrive.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {/* Background glowing aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] -z-10 rounded-full" />
            
            {habits.map((habit, i) => (
              <FadeIn key={i} delay={habit.delay} direction="up" className={cn(
                "h-full",
                i % 2 !== 0 ? "sm:mt-12" : "" // Masonry offset
              )}>
                <div className={cn(
                  "group p-8 rounded-3xl h-full flex flex-col items-start border border-white/5 shadow-lg hover:-translate-y-2 transition-all duration-500 hover:border-primary/30 backdrop-blur-md",
                  habit.color
                )}>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all duration-500">
                    {habit.icon}
                  </div>
                  <h4 className="font-bold text-xl mb-2">{habit.title}</h4>
                  <p className="text-foreground/60 leading-relaxed">{habit.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
