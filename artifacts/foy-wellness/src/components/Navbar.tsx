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
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-border/60 py-3 shadow-sm"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "text-xl font-display font-bold tracking-[0.15em] relative z-50 transition-colors",
            scrolled
              ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold"
          )}
        >
          FOY CLINIC
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-7">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    "text-xs font-semibold tracking-widest uppercase transition-colors duration-300",
                    scrolled ? "text-foreground/70 hover:text-primary" : "text-white/70 hover:text-white"
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

        {/* Mobile Toggle */}
        <button
          className={cn("md:hidden z-50 p-2 transition-colors", scrolled ? "text-foreground" : "text-white")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/97 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-xl font-display tracking-widest text-foreground hover:text-primary transition-colors"
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
