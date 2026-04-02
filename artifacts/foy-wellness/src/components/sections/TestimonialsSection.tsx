import { FadeIn } from "../animations/FadeIn";
import { Star, BadgeCheck } from "lucide-react";

const ROW_A = [
  {
    name: "Dr. M. Khalil",
    location: "Cairo, Egypt",
    text: "The depth of clinical insight at FOY is unmatched. My metabolic markers have shifted significantly within three months. Physician-led, evidence-based, and genuinely world-class."
  },
  {
    name: "Rania A.",
    location: "Dubai, UAE",
    text: "This is not a wellness spa — it is serious regenerative medicine. The personalized protocol transformed my energy and cognitive clarity beyond what I thought possible."
  },
  {
    name: "S. Al Fahim",
    location: "Abu Dhabi, UAE",
    text: "After consulting top clinics across London and Geneva, FOY's approach stands apart. The integration of diagnostics, nutrition, and regenerative science is exceptional."
  },
  {
    name: "Hana M.",
    location: "Alexandria, Egypt",
    text: "I came for skin concerns and stayed for the longevity program. My biological age assessment was revealing — and the protocol has delivered measurable, lasting results."
  },
  {
    name: "T. Mansour",
    location: "Riyadh, KSA",
    text: "The physician-led structure gives complete confidence. Every recommendation is grounded in data. This is preventive medicine as it should be practiced."
  },
];

const ROW_B = [
  {
    name: "Yasmine K.",
    location: "Cairo, Egypt",
    text: "Six months in, I have more sustained energy than I did a decade ago. The metabolic reset program addressed root causes, not symptoms. Truly transformative."
  },
  {
    name: "Omar N.",
    location: "Dubai, UAE",
    text: "I appreciated the clarity and transparency of the entire process — from biomarker testing to the personalized protocol. No guesswork. Only precision."
  },
  {
    name: "Layla R.",
    location: "Doha, Qatar",
    text: "FOY operates at a different standard. The consultation alone offered more clinical insight than years of routine check-ups. I recommend it without reservation."
  },
  {
    name: "Dr. A. Ibrahim",
    location: "Cairo, Egypt",
    text: "As a physician myself, I am selective about where I seek care. FOY meets the highest standards of evidence-based, personalized medicine. Impressive in every respect."
  },
  {
    name: "Nour F.",
    location: "Dubai, UAE",
    text: "The patient journey is thoughtfully structured — consultation, advanced testing, personalized plan, and ongoing monitoring. Nothing is left to chance."
  },
];

function TestimonialCard({ name, location, text }: { name: string; location: string; text: string }) {
  return (
    <div className="flex-shrink-0 w-[360px] mx-3 bg-white rounded-2xl border border-border p-6 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.09)] hover:border-primary/20 transition-all duration-300 group">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-gold text-gold" />
        ))}
      </div>
      <p className="text-foreground/75 text-sm leading-relaxed mb-5 font-light">"{text}"</p>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="font-semibold text-sm text-foreground">{name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{location}</p>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-primary font-medium bg-primary/6 px-2 py-1 rounded-full border border-primary/12">
          <BadgeCheck className="w-3 h-3" />
          Verified
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof ROW_A; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"} hover:[animation-play-state:paused]`}
        style={{ width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-14">
        <FadeIn className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start lg:items-end">
          <div className="lg:w-5/12">
            <span className="section-label">Patient Outcomes</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1]">
              What Our<br />Patients Say
            </h2>
          </div>
          <div className="lg:w-7/12">
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Outcomes that speak for themselves — from patients across Egypt, the Gulf, and beyond.
            </p>
            <div className="flex flex-wrap gap-8 mt-6">
              {[
                { num: "10,000+", label: "Patients Treated" },
                { num: "97%", label: "Satisfaction Rate" },
                { num: "40+", label: "Countries" },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-display font-bold text-primary">{s.num}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>
    </section>
  );
}
