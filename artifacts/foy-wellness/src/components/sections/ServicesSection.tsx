import { FadeIn } from "../animations/FadeIn";
import { ArrowRight, Sparkles, Zap, Activity, HeartPulse } from "lucide-react";
import { Link } from "wouter";

export function ServicesSection() {
  const services = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Skin & Aesthetics",
      desc: "HydraFacial, PRP, customized Dermal Fillers, and Laser skin rejuvenation for a flawless, youthful complexion.",
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Laser & Advanced",
      desc: "CO2 laser resurfacing, IPL therapy, and Radio frequency skin tightening to reverse deep signs of aging.",
    },
    {
      icon: <Activity className="w-6 h-6 text-primary" />,
      title: "Hair & Anti-Aging",
      desc: "PRP hair restoration, breakthrough exosome therapy, and advanced stem cell treatments.",
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-primary" />,
      title: "AI Health Analysis",
      desc: "Comprehensive biomarker blood panel yielding your AI health score and a personalized longevity protocol.",
    }
  ];

  return (
    <section id="services" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <FadeIn className="max-w-2xl">
            <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block">Treatments</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Elevate Your Biology</h2>
            <p className="text-foreground/60 text-lg">Curated medical and aesthetic treatments designed to maximize longevity and beauty.</p>
          </FadeIn>
          <FadeIn delay={0.2} direction="left">
            <button 
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="text-primary hover:text-primary-foreground flex items-center gap-2 font-medium tracking-wide transition-colors group"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="h-full">
              <div className="glass-panel group p-8 md:p-10 rounded-3xl h-full flex flex-col cursor-pointer hover:-translate-y-2 transition-transform duration-500">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-foreground/60 mb-8 flex-grow">{service.desc}</p>
                <div className="flex items-center text-primary font-medium text-sm mt-auto">
                  <span className="group-hover:mr-2 transition-all">Learn More</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
