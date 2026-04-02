import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { PremiumButton } from "./ui/PremiumButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-400",
      scrolled
        ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-[0_1px_16px_rgba(0,0,0,0.06)] py-3"
        : "bg-transparent border-b border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className={cn(
          "text-lg font-display font-bold tracking-[0.18em] relative z-50 transition-colors",
          scrolled ? "text-foreground" : "text-white"
        )}>
          FOY CLINIC
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map(link => (
              <li key={link.name}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300",
                    scrolled ? "text-foreground/60 hover:text-primary" : "text-white/60 hover:text-white"
                  )}
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

        {/* Mobile toggle */}
        <button
          className={cn("md:hidden z-50 p-2", scrolled ? "text-foreground" : "text-white")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile overlay */}
        <div className={cn(
          "fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 transition-all duration-400 md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-2xl font-display font-bold text-foreground hover:text-primary transition-colors tracking-wide"
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
