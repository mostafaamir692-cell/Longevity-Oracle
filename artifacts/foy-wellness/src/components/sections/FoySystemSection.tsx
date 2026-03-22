import { FadeIn } from "../animations/FadeIn";
import { cn } from "@/lib/utils";

const DnaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 4c0 4 8 12 8 12s8 8 8 12" strokeLinecap="round" />
    <path d="M20 4c0 4-8 12-8 12S4 20 4 24" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const TreeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 22V12" strokeLinecap="round" />
    <path d="M12 12C12 12 7 10 5 6c0 0 5 0 7 6z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12c0 0 5-2 7-6 0 0-5 0-7 6z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8c0 0-3-1-4-4 0 0 3 0 4 4z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BrainIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 4c-3.3 0-6 2.7-6 6 0 1.3.4 2.5 1 3.5v2.5c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2.5c.6-1 1-2.2 1-3.5 0-3.3-2.7-6-6-6z" />
    <path d="M9 18v2M15 18v2M12 18v4M9 13h6M10 9h4" />
  </svg>
);

export function FoySystemSection() {
  const pillars = [
    {
      icon: <DnaIcon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />,
      title: "Precision Science",
      desc: "Advanced biomarker analysis, peptide therapy, and evidence-based anti-aging medical protocols tailored to your DNA."
    },
    {
      icon: <TreeIcon className="w-10 h-10 text-green-500 group-hover:scale-110 transition-transform duration-500" />,
      title: "Natural Healing",
      desc: "Plant-based treatments, adaptogenic herbs, and ancient wisdom applied with modern precision to heal without harm."
    },
    {
      icon: <BrainIcon className="w-10 h-10 text-gold group-hover:scale-110 transition-transform duration-500" />,
      title: "AI Intelligence",
      desc: "Personalized health analysis powered by machine learning to continuously optimize your unique biological journey."
    }
  ];

  return (
    <section id="system" className="py-24 bg-card relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">The Core</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">The FOY System</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} direction="up" className="h-full">
              <div className="relative h-full animate-border-glow rounded-3xl p-[1px] group transition-all duration-500 hover:-translate-y-2">
                {/* Thin white/10 line at the very top (reflection) */}
                <div className="absolute top-0 left-10 right-10 h-[1px] bg-white/20 z-20 pointer-events-none" />
                
                <div className="h-full backdrop-blur-2xl bg-card/30 rounded-3xl p-10 text-center flex flex-col items-center relative overflow-hidden">
                  {/* Glowing circle container */}
                  <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/30 group-hover:blur-2xl transition-all duration-500" />
                    <div className="absolute inset-0 border border-primary/20 rounded-full group-hover:border-primary/50 transition-colors duration-500" />
                    <div className="relative z-10">{pillar.icon}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-glow transition-all duration-500">{pillar.title}</h3>
                  <p className="text-foreground/70 leading-relaxed relative z-10">{pillar.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.6} className="mt-24 flex flex-col items-center">
          <div className="w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mb-6 opacity-50" />
          <p className="text-primary font-display italic text-xl tracking-wide">Integrated. Personalized. Transformative.</p>
        </FadeIn>
      </div>
    </section>
  );
}
