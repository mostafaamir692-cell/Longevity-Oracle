import { useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section className="py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <FadeIn className="mb-14">
          <span className="section-label">Common Questions</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Frequently Asked Questions</h2>
        </FadeIn>

        <div className="space-y-0">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <FadeIn key={idx} delay={idx * 0.04}>
                <div className={cn("border-b border-border transition-colors", isOpen ? "border-primary/20" : "")}>
                  <button
                    className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                  >
                    <span className={cn(
                      "font-medium text-base pr-8 transition-colors",
                      isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}>
                      {faq.q}
                    </span>
                    <span className={cn("shrink-0 transition-all", isOpen ? "text-primary rotate-0" : "text-muted-foreground")}>
                      {isOpen
                        ? <Minus className="w-4 h-4" />
                        : <Plus className="w-4 h-4" />
                      }
                    </span>
                  </button>
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <p className="text-muted-foreground leading-relaxed text-sm font-light">{faq.a}</p>
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
