"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface Brand {
  id: string;
  name: string;
  link: string;
}

const brands: Brand[] = [
  { id: "macronica", name: "Macronica", link: "https://macronica-website-main.vercel.app/" },
  
];

export default function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandSwitcherOpen, setIsBrandSwitcherOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const brandSwitcherRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Close brand switcher when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (brandSwitcherRef.current && !brandSwitcherRef.current.contains(e.target as Node)) {
        setIsBrandSwitcherOpen(false);
      }
    };

    if (isBrandSwitcherOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isBrandSwitcherOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#brands", label: "Brands" },
    { href: "#story", label: "Story" },
    { href: "#products", label: "Products" },
    { href: "#sustainability", label: "Sustainability" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <>
      

      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg p-2 -m-2 transition-colors hover:bg-muted"
              aria-label="Return to Qroshious homepage"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-primary">
                <rect width="32" height="32" rx="8" fill="currentColor"/>
                <path d="M8 12h16v2H8v-2zm0 4h12v2H8v-2zm0 4h8v2H8v-2z" fill="white"/>
              </svg>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-lg lg:text-xl text-foreground">Qroshious</div>
                <div className="text-xs text-muted-foreground -mt-1">Family of Food Brands</div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
              >
                {link.label}
              </button>
            ))}

            {/* UPDATED: Brand Dropdown */}
            <div className="hidden lg:block relative" ref={brandSwitcherRef}>
              <button
                onClick={() => setIsBrandSwitcherOpen(!isBrandSwitcherOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Brands
                <ChevronUp className={`w-4 h-4 transition-transform ${isBrandSwitcherOpen ? "rotate-180" : ""}`} />
              </button>

              {isBrandSwitcherOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
                  {brands.map((brand) => (
                    <a
                      key={brand.id}
                      href={brand.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
                    >
                      {brand.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden fixed inset-0 top-16 bg-card z-40 overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4 mb-8">
                {navLinks.map(link => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left py-3 px-4 text-lg font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Brand Dropdown */}
              <div className="border-t border-border pt-4 mb-4">
                <h3 className="text-sm font-medium text-foreground mb-2">Brands</h3>
                {brands.map((brand) => (
                  <a
                    key={brand.id}
                    href={brand.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 hover:bg-muted rounded-lg transition-colors"
                  >
                    {brand.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
