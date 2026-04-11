import { useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionBg } from "../SectionBg";

const faqs = [
  {
    q: "What makes FOY different from a conventional clinic?",
    a: "FOY operates within a structured, program-based model focused on prevention and optimization — not reactive treatment. Each patient undergoes advanced diagnostic testing before any protocol is designed, ensuring that interventions address root causes rather than surface symptoms."
  },
  {
    q: "Who are the programs designed for?",
    a: "Our programs are designed for individuals who want to understand their biology, address early metabolic dysfunction, improve long-term vitality, or explore regenerative medicine. Whether you are proactively managing your health or addressing specific concerns, we offer a structured pathway tailored to your needs."
  },
  {
    q: "How long does each program last?",
    a: "The Metabolic Reset and Longevity Optimization Programs typically run 3–6 months, with ongoing monitoring included. The Regeneration Program varies depending on individual requirements. All programs include scheduled follow-up consultations to track progress and refine the protocol."
  },
  {
    q: "What kind of testing is involved?",
    a: "We conduct comprehensive biomarker assessments, metabolic laboratory panels, and biological health evaluations. The specific tests depend on your program and individual health profile, and are always ordered and interpreted by our medical team."
  },
  {
    q: "Is everything handled by a physician?",
    a: "Yes. Every consultation, testing decision, protocol design, and follow-up at FOY is physician-led. Dr. Ahmed Amer oversees all clinical pathways to ensure the highest standards of medical care are maintained throughout your journey."
  },
  {
    q: "How do I know which program is right for me?",
    a: "During your initial consultation, our physician will review your health history, lifestyle, and goals to recommend the most appropriate program. The consultation is the starting point — no commitments are required beforehand."
  }
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <SectionBg variant="faq" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-glow-white">Frequently Asked Questions</h2>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-all duration-300",
                    isOpen
                      ? "glass-strong border-primary/25 shadow-md"
                      : "glass-card"
                  )}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                  >
                    <span className="font-semibold text-base pr-8 text-foreground/85">{faq.q}</span>
                    <span className={cn("shrink-0 transition-colors", isOpen ? "text-primary" : "text-muted-foreground")}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-60 pb-6 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
