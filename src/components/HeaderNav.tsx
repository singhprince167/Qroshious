"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface Brand {
  id: string;
  name: string;
  tagline: string;
  accentColor: string;
}

const brands: Brand[] = [
  {
    id: "macronica",
    name: "Macronica",
    tagline: "Family-friendly comfort",
    accentColor: "#10b981"
  },
  {
    id: "orchids",
    name: "Orchids", 
    tagline: "Premium gourmet",
    accentColor: "#8b5cf6"
  }
];

export default function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandSwitcherOpen, setIsBrandSwitcherOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const brandSwitcherRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Load brand preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("qroshious-selected-brand");
      if (saved) {
        const brand = brands.find(b => b.id === saved);
        if (brand) {
          setSelectedBrand(brand);
        }
      }
    }
  }, []);

  // Update localStorage when brand changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (selectedBrand) {
        localStorage.setItem("qroshious-selected-brand", selectedBrand.id);
      } else {
        localStorage.removeItem("qroshious-selected-brand");
      }
    }
  }, [selectedBrand]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsBrandSwitcherOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Focus trap for mobile menu
      const firstFocusable = mobileMenuRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      firstFocusable?.focus();
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

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

  const handleLogoClick = () => {
    setSelectedBrand(null);
    setIsBrandSwitcherOpen(false);
    setIsMobileMenuOpen(false);
    scrollToSection('home');

    // Update status for screen readers
    if (statusRef.current) {
      statusRef.current.textContent = "Active brand: Qroshious";
    }
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsBrandSwitcherOpen(false);
    setIsMobileMenuOpen(false);

    // Update status for screen readers
    if (statusRef.current) {
      statusRef.current.textContent = `Active brand: ${brand.name}`;
    }

    // Show toast notification
    toast.success(
      `Viewing ${brand.name} — ${brand.tagline}. Switch back to Qroshious.`,
      {
        duration: 4000,
        action: {
          label: "Switch back",
          onClick: () => handleReturnToParent()
        }
      }
    );
  };

  const handleReturnToParent = () => {
    setSelectedBrand(null);
    setIsBrandSwitcherOpen(false);
    setIsMobileMenuOpen(false);
    scrollToSection('home');

    // Update status for screen readers
    if (statusRef.current) {
      statusRef.current.textContent = "Active brand: Qroshious";
    }

    toast.success("Returned to Qroshious — Family of Food Brands");
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
      {/* Screen reader status for brand changes */}
      <div
        ref={statusRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Active brand: {selectedBrand ? selectedBrand.name : "Qroshious"}
      </div>

      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Parent Brand */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg p-2 -m-2 transition-colors hover:bg-muted"
                aria-label="Return to Qroshious homepage"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                  aria-hidden="true"
                >
                  <title>Qroshious Logo</title>
                  <rect width="32" height="32" rx="8" fill="currentColor"/>
                  <path d="M8 12h16v2H8v-2zm0 4h12v2H8v-2zm0 4h8v2H8v-2z" fill="white"/>
                </svg>
                <div className="hidden sm:block">
                  <div className="font-display font-bold text-lg lg:text-xl text-foreground">
                    Qroshious
                  </div>
                  <div className="text-xs text-muted-foreground -mt-1">
                    Family of Food Brands
                  </div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#brands")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Explore Brands
              </button>
            </nav>

            {/* Brand Switcher & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Desktop Brand Switcher */}
              <div className="hidden lg:block relative" ref={brandSwitcherRef}>
                <button
                  onClick={() => setIsBrandSwitcherOpen(!isBrandSwitcherOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-expanded={isBrandSwitcherOpen}
                  aria-haspopup="true"
                  aria-label="View brand switcher"
                >
                  <span>Brands</span>
                  <ChevronUp className={`w-4 h-4 transition-transform ${isBrandSwitcherOpen ? "rotate-180" : ""}`} />
                </button>

                {isBrandSwitcherOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-lg p-3 animate-in fade-in-0 zoom-in-95">
                    <div className="text-xs text-muted-foreground mb-2">Switch between brands</div>
                    
                    {selectedBrand && (
                      <button
                        onClick={handleReturnToParent}
                        className="w-full flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring mb-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <div className="text-left">
                            <div className="font-medium text-sm">Qroshious</div>
                            <div className="text-xs text-muted-foreground">Family of Food Brands</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}

                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => handleBrandSelect(brand)}
                        className="w-full flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: brand.accentColor }}
                          ></div>
                          <div className="text-left">
                            <div className="font-medium text-sm">{brand.name}</div>
                            <div className="text-xs text-muted-foreground">{brand.tagline}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}

                    {!selectedBrand && brands.length === 0 && (
                      <div className="text-center py-4 text-sm text-muted-foreground">
                        No brand selected — explore Qroshious first.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile navigation"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden fixed inset-0 top-16 bg-card z-40 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation Links */}
              <nav className="space-y-4 mb-8" role="navigation" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left py-3 px-4 text-lg font-medium text-foreground hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ minHeight: '44px' }}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Brand Switcher */}
              <div className="border-t border-border pt-6 mb-8">
                <h3 className="text-sm font-medium text-foreground mb-4">Brands</h3>
                
                {selectedBrand && (
                  <button
                    onClick={handleReturnToParent}
                    className="w-full flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring mb-3"
                    style={{ minHeight: '44px' }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full bg-primary"></div>
                      <div className="text-left">
                        <div className="font-medium">Qroshious</div>
                        <div className="text-sm text-muted-foreground">Family of Food Brands</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand)}
                    className="w-full flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring mb-3"
                    style={{ minHeight: '44px' }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: brand.accentColor }}
                      ></div>
                      <div className="text-left">
                        <div className="font-medium">{brand.name}</div>
                        <div className="text-sm text-muted-foreground">{brand.tagline}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="sticky bottom-0 bg-card pt-4 border-t border-border">
                <button
                  onClick={() => handleNavClick("#brands")}
                  className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  Explore brands
                </button>
                {selectedBrand && (
                  <button
                    onClick={() => handleBrandSelect(selectedBrand)}
                    className="block w-full mt-3 bg-secondary text-secondary-foreground text-center py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ backgroundColor: selectedBrand.accentColor, color: 'white' }}
                  >
                    Switch to {selectedBrand.name}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}