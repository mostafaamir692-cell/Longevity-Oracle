import { FadeIn } from "../animations/FadeIn";
import { ArrowRight, Sparkles, Zap, Activity, HeartPulse } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: "Skin & Aesthetics",
      desc: "HydraFacial, PRP, customized Dermal Fillers, and Laser skin rejuvenation for a flawless, youthful complexion.",
      num: "01"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Laser & Advanced",
      desc: "CO2 laser resurfacing, IPL therapy, and Radio frequency skin tightening to reverse deep signs of aging.",
      num: "02"
    },
    {
      icon: <Activity className="w-8 h-8 text-white" />,
      title: "Hair & Anti-Aging",
      desc: "PRP hair restoration, breakthrough exosome therapy, and advanced stem cell treatments.",
      num: "03"
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-white" />,
      title: "AI Health Analysis",
      desc: "Comprehensive biomarker blood panel yielding your AI health score and a personalized longevity protocol.",
      num: "04"
    }
  ];

  return (
    <section id="services" className="py-32 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="h-full">
              <div className="glow-card group relative p-10 rounded-3xl h-full flex flex-col cursor-pointer bg-card/40 border border-white/5 overflow-hidden">
                {/* Number Label */}
                <div className="absolute top-4 right-6 text-white/5 text-8xl font-display font-bold pointer-events-none transition-all duration-500 group-hover:text-primary/10">
                  {service.num}
                </div>
                
                {/* Gradient Icon Background */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-green-500 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(13,148,136,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(13,148,136,0.5)] transition-all duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 relative z-10">{service.title}</h3>
                <p className="text-foreground/60 mb-10 flex-grow relative z-10 text-lg">{service.desc}</p>
                
                <div className="flex items-center text-primary font-medium mt-auto relative z-10">
                  <span className="group-hover:mr-2 transition-all">Discover</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                
                {/* Bottom expandable line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-green-400 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
