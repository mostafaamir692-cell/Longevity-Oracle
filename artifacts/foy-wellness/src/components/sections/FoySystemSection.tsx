import { FadeIn } from "../animations/FadeIn";
import { Dna, Leaf, Cpu } from "lucide-react";

export function FoySystemSection() {
  const pillars = [
    {
      icon: <Dna className="w-10 h-10 text-primary" />,
      title: "Precision Science",
      desc: "Advanced biomarker analysis, peptide therapy, and evidence-based anti-aging medical protocols tailored to your DNA."
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-500" />,
      title: "Natural Healing",
      desc: "Plant-based treatments, adaptogenic herbs, and ancient wisdom applied with modern precision to heal without harm."
    },
    {
      icon: <Cpu className="w-10 h-10 text-gold" />,
      title: "AI Intelligence",
      desc: "Personalized health analysis powered by machine learning to continuously optimize your unique biological journey."
    }
  ];

  return (
    <section id="system" className="py-24 bg-card relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">The Core</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">The FOY System</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} direction="up" className="h-full">
              <div className="glass-panel glass-panel-hover p-10 rounded-3xl h-full text-center flex flex-col items-center relative overflow-hidden group">
                {/* Background glow orb */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors duration-500" />
                
                <div className="relative z-10 mb-6 p-5 rounded-2xl bg-background/50 border border-white/10 shadow-lg">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{pillar.title}</h3>
                <p className="text-foreground/70 leading-relaxed relative z-10">{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
