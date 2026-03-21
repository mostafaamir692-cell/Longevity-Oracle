import { useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What makes FOY different from other aesthetic clinics?",
    a: "FOY transcends traditional aesthetics by combining surface-level treatments with deep biological anti-aging protocols. Our AI-driven health analysis ensures every treatment addresses root causes, not just symptoms."
  },
  {
    q: "How does the AI Health Analysis work?",
    a: "We start with a comprehensive blood and biomarker panel. Our proprietary AI analyzes these hundreds of data points against clinical longevity databases to build a highly personalized protocol for your unique biology."
  },
  {
    q: "Is the treatment process painful?",
    a: "Patient comfort is paramount. Most of our aesthetic and IV therapies are completely painless or use advanced numbing protocols. We ensure a luxurious, relaxing experience throughout your transformation."
  },
  {
    q: "How soon will I see results?",
    a: "Aesthetic procedures like HydraFacial show immediate radiance. Deeper cellular therapies (like Peptides or NAD+) typically yield noticeable energy and vitality improvements within 2-4 weeks, with cumulative benefits over months."
  },
  {
    q: "Are the treatments safe for all skin types?",
    a: "Absolutely. Because our approach is highly personalized, we select laser wavelengths, serums, and treatments specifically suited for your unique skin type and genetic background to ensure maximum safety and efficacy."
  }
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Frequently Asked Questions</h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div 
                  className={cn(
                    "border rounded-2xl overflow-hidden transition-colors duration-300",
                    isOpen ? "bg-card/50 border-primary/40" : "bg-card/20 border-white/5 hover:border-white/20"
                  )}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                  >
                    <span className="font-bold text-lg pr-8">{faq.q}</span>
                    <span className="shrink-0 text-primary">
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  <div 
                    className={cn(
                      "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
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
