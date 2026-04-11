import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { PremiumButton } from "./ui/PremiumButton";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "#services" },
    { name: "Our Approach", href: "#system" },
    { name: "AI Advisor", href: "#ai-advisor" },
    { name: "Results", href: "#results" },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700 border-b",
        scrolled
          ? "glass-strong border-white/30 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          : "bg-white/30 backdrop-blur-md border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 relative z-50"
        >
          <img
            src={`${BASE}images/foy-logo.png`}
            alt="FOY Clinic"
            className="h-9 w-auto"
          />
          <span className="text-xl font-display font-bold tracking-[0.1em] text-gradient-teal-gold">
            FOY CLINIC
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-7">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="nav-underline text-xs font-semibold tracking-widest uppercase text-foreground/60 hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <PremiumButton onClick={() => scrollTo("#booking")} size="sm">
            Book Consultation
          </PremiumButton>
        </div>

        <button
          className="md:hidden z-50 p-2 text-foreground/70"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 glass-strong flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-xl font-display tracking-widest text-foreground/60 hover:text-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
          <PremiumButton onClick={() => scrollTo("#booking")} size="lg" className="mt-4">
            Book Consultation
          </PremiumButton>
        </div>
      </div>
    </nav>
  );
}
