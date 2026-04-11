import { Link } from "wouter";
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Footer() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-dark-grid relative z-10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-5"
            >
              <img
                src={`${BASE}images/foy-logo.png`}
                alt="FOY Clinic"
                className="h-8 w-auto"
              />
              <span className="text-xl font-display font-bold tracking-[0.1em] text-gradient-teal-gold">
                FOY CLINIC
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-2 font-light">
              Longevity &amp; Regenerative Medicine Center
            </p>
            <p className="text-white/30 text-xs leading-relaxed mb-6">
              Healing. Thriving. Living Beautifully.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/foycliniceg" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/foycliniceg" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel={href !== "#" ? "noopener noreferrer" : undefined} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_0_16px_rgba(16,185,171,0.3)] transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="https://wa.me/201200022406"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_0_16px_rgba(37,211,102,0.3)] transition-all duration-300"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-white/50 mb-6 tracking-[0.2em] uppercase">Programs</h4>
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
            <h4 className="font-semibold text-xs text-white/50 mb-6 tracking-[0.2em] uppercase">Information</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Patient Consent", "Medical Disclaimer"].map(label => (
                <li key={label}>
                  <a href="#" className="text-white/40 hover:text-primary transition-colors text-sm font-light">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-white/50 mb-6 tracking-[0.2em] uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm font-light">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/eNogzYsjbfpKWsnC7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-primary transition-colors"
                >
                  30 El-Mohandes Mohammed Hasan Helmy<br />El Mohandseen, Cairo, Egypt
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40 font-light">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>012 0002 2406</span>
              </li>
              <li>
                <a
                  href="https://wa.me/201200022406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-[#25D366] transition-colors font-light group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]/60 group-hover:text-[#25D366] shrink-0 transition-colors" />
                  <span>WhatsApp: 012 0002 2406</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/40 font-light">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>clinic@foyclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} FOY Longevity &amp; Regenerative Medicine Center. All rights reserved.</p>
          <p>Led by Dr. Ahmed Amer · Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}
