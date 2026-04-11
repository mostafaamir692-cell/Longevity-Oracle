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
    <div className="flex-shrink-0 w-[380px] mx-3 bg-white rounded-2xl border border-border p-7 hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-light">"{text}"</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{location}</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-primary font-medium bg-primary/8 px-2.5 py-1 rounded-full border border-primary/15">
          <BadgeCheck className="w-3 h-3" />
          Verified
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof ROW_A; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
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
    <section className="py-24 bg-mesh-diagonal relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-14">
        <FadeIn className="text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary border border-primary/25 bg-primary/8 px-3 py-1.5 rounded-full mb-5">
            Patient Outcomes
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">What Our Patients Say</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-light">
            Outcomes that speak for themselves — from patients across Egypt, the Gulf, and beyond.
          </p>
        </FadeIn>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-14">
        <FadeIn className="flex flex-wrap justify-center gap-10 text-center">
          {[
            { num: "10,000+", label: "Patients Treated" },
            { num: "97%", label: "Satisfaction Rate" },
            { num: "15+", label: "Years of Excellence" },
            { num: "40+", label: "Countries Represented" },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-display font-bold text-primary mb-1">{stat.num}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
