import { FadeIn } from "../animations/FadeIn";
import { Frown, ZapOff, Clock, CloudFog } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: <Frown className="w-8 h-8 text-primary" />,
      title: "Tired Skin",
      desc: "Dull, aging skin that doesn't reflect how vibrant you feel inside."
    },
    {
      icon: <ZapOff className="w-8 h-8 text-primary" />,
      title: "Low Energy",
      desc: "Chronic fatigue that steals your joy and daily productivity."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Visible Aging",
      desc: "Fine lines and cellular aging appearing earlier than expected."
    },
    {
      icon: <CloudFog className="w-8 h-8 text-primary" />,
      title: "Mental Fog",
      desc: "Stress, anxiety, and a lack of mental clarity holding you back."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Do You Recognize Yourself?</h2>
          <p className="text-foreground/60 text-lg">
            Aging is inevitable, but how we age is entirely in our control. Often, our bodies signal imbalances long before profound symptoms appear.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up" className="h-full">
              <div className="glass-panel glass-panel-hover p-8 rounded-2xl h-full flex flex-col items-start text-left group">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
