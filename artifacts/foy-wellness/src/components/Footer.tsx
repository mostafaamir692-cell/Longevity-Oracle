import { Link } from "wouter";
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-foreground border-t border-white/5 pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-display font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold block mb-5">
              FOY CLINIC
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-2 font-light">
              Longevity &amp; Regenerative Medicine Center
            </p>
            <p className="text-white/30 text-xs leading-relaxed mb-6">
              Healing. Thriving. Living Beautifully.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/80 mb-6 tracking-wider uppercase">Programs</h4>
            <ul className="space-y-3">
              {[
                ["Metabolic Reset", "#services"],
                ["Longevity Optimization", "#services"],
                ["Regeneration Program", "#services"],
                ["AI Health Advisor", "#ai-advisor"],
              ].map(([label, id]) => (
                <li key={label}>
                  <button onClick={() => scrollTo(id)} className="text-white/40 hover:text-primary transition-colors text-sm font-light">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/80 mb-6 tracking-wider uppercase">Information</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Patient Consent", "Medical Disclaimer"].map(label => (
                <li key={label}>
                  <a href="#" className="text-white/40 hover:text-primary transition-colors text-sm font-light">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/80 mb-6 tracking-wider uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/40 font-light">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Cairo, Egypt<br />New Cairo Medical District</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40 font-light">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+20 100 000 0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40 font-light">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>clinic@foyclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <p>&copy; {new Date().getFullYear()} FOY Longevity &amp; Regenerative Medicine Center. All rights reserved.</p>
          <p>Led by Dr. Ahmed Amer · Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}
