import { Link } from "wouter";
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#091617] pt-20 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/6">
          
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="text-xl font-display font-bold tracking-[0.18em] text-white block mb-4">
              FOY CLINIC
            </Link>
            <p className="text-white/35 text-sm font-light leading-relaxed mb-1">
              Longevity &amp; Regenerative Medicine Center
            </p>
            <p className="text-primary/60 text-xs font-light italic mb-8">
              Healing. Thriving. Living Beautifully.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-white/30 hover:border-primary/40 hover:text-primary transition-all duration-300">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[11px] text-white/40 font-semibold uppercase tracking-widest mb-5">Programs</h4>
            <ul className="space-y-3">
              {[
                ["Metabolic Reset", "#services"],
                ["Longevity Optimization", "#services"],
                ["Regeneration Program", "#services"],
                ["AI Health Advisor", "#ai-advisor"],
              ].map(([label, id]) => (
                <li key={label}>
                  <button onClick={() => scrollTo(id)} className="text-white/35 hover:text-primary transition-colors text-sm font-light">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] text-white/40 font-semibold uppercase tracking-widest mb-5">Information</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Patient Consent", "Medical Disclaimer"].map(label => (
                <li key={label}>
                  <a href="#" className="text-white/35 hover:text-primary transition-colors text-sm font-light">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-[11px] text-white/40 font-semibold uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                <span className="text-sm text-white/35 font-light">Cairo, Egypt<br />New Cairo Medical District</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary/60 shrink-0" />
                <span className="text-sm text-white/35 font-light">+20 100 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary/60 shrink-0" />
                <span className="text-sm text-white/35 font-light">clinic@foyclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-white/20 font-light">
          <p>&copy; {new Date().getFullYear()} FOY Longevity &amp; Regenerative Medicine Center. All rights reserved.</p>
          <p>Led by Dr. Ahmed Amer · Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}
