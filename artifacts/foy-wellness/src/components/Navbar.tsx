import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { PremiumButton } from "./ui/PremiumButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "The System", href: "#system" },
    { name: "AI Advisor", href: "#ai-advisor" },
    { name: "Results", href: "#results" },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-white/5 py-4 shadow-lg" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold relative z-50"
        >
          FOY.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300 font-medium tracking-wide uppercase"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <PremiumButton onClick={() => scrollTo("#booking")} size="sm">
            Book Now
          </PremiumButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 transition-all duration-500 ease-in-out md:hidden",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-2xl font-display tracking-widest text-foreground hover:text-primary transition-colors"
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
