import { Link } from "wouter";
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#010508] border-t border-white/5 pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold block mb-6">
              FOY.
            </Link>
            <p className="text-foreground/50 text-sm leading-relaxed mb-6">
              Redefining aging through precision science, natural healing, and artificial intelligence. Your journey to endless vitality starts here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })} className="text-foreground/60 hover:text-primary transition-colors text-sm">Treatments & Services</button></li>
              <li><button onClick={() => document.querySelector("#system")?.scrollIntoView({ behavior: "smooth" })} className="text-foreground/60 hover:text-primary transition-colors text-sm">The FOY System</button></li>
              <li><button onClick={() => document.querySelector("#ai-advisor")?.scrollIntoView({ behavior: "smooth" })} className="text-foreground/60 hover:text-primary transition-colors text-sm">AI Health Advisor</button></li>
              <li><button onClick={() => document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" })} className="text-foreground/60 hover:text-primary transition-colors text-sm">Transformations</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors text-sm">Patient Consent</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-foreground/60">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Downtown Dubai, Sheikh Mohammed bin Rashid Blvd, UAE</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/60">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+971 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/60">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>concierge@foywellness.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/40">
          <p>&copy; {new Date().getFullYear()} FOY Longevity & Wellness Clinic. All rights reserved.</p>
          <p>Powered by advanced biotechnology.</p>
        </div>
      </div>
    </footer>
  );
}
