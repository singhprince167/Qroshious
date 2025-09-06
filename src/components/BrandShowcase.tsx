"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, X, Heart, Leaf, Phone, Mail, MapPin, Award, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Brand {
  id: string;
  name: string;
  tagline: string;
  descriptor: string;
  ctaText: string;
  accentColor: string;
  heroImage: string;
  heroImageAlt: string;
  productHighlights: string[];
  extendedDescription: string;
}

const subBrands: Brand[] = [
  {
    id: "macronica",
    name: "Macronica",
    tagline: "Family-friendly comfort",
    descriptor: "Playful flavors and timeless mac & cheese recipes that bring families together around the table, creating lasting memories one bite at a time.",
    ctaText: "Find family favorites",
    accentColor: "#f59e0b",
    heroImage: "https://images.unsplash.com/photo-1609501676725-7186f734b23b?w=800&h=600&fit=crop&auto=format",
    heroImageAlt: "Happy children laughing and enjoying colorful macaroni and cheese together at a family dinner table",
    productHighlights: [
      "Kid-approved recipes that parents love too",
      "Quick 15-minute prep for busy families", 
      "Fun shapes and colors that make eating exciting"
    ],
    extendedDescription: "From classic mac & cheese to creative twists with hidden vegetables and protein additions, Macronica brings joy to family mealtimes with recipes that everyone loves. Our playful approach to comfort food means no more dinner battles – just smiles around the table."
  },
  {
    id: "orchids",
    name: "Orchids",
    tagline: "Refined. Elegant. Gourmet.",
    descriptor: "Premium ingredients and chef-inspired recipes for sophisticated palates seeking restaurant-quality experiences at home.",
    ctaText: "Discover gourmet dishes",
    accentColor: "#8b5cf6",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
    heroImageAlt: "Elegant fine dining table setting with beautifully plated gourmet pasta garnished with microgreens and truffle oil",
    productHighlights: [
      "Restaurant-quality plating techniques and presentation",
      "Carefully curated premium ingredients and flavor profiles",
      "Sustainable sourcing from artisanal producers"
    ],
    extendedDescription: "Elevate your dining experience with Orchids' collection of sophisticated recipes, featuring premium ingredients and restaurant-quality presentation for memorable occasions. Each dish is crafted to transform your home into an intimate fine dining destination."
  }
];

export default function BrandShowcase() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openBrandModal = useCallback((brand: Brand, triggerElement: HTMLElement) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
    triggerRef.current = triggerElement;
  }, []);

  const closeBrandModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedBrand(null);
    
    // Return focus to the trigger element
    if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, []);

  // Add scroll navigation function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
  };

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeBrandModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeBrandModal]);

  // Focus trap for modal
  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isModalOpen]);

  const handleCardClick = (brand: Brand, event: React.MouseEvent<HTMLDivElement>) => {
    openBrandModal(brand, event.currentTarget);
  };

  const handleCardKeyDown = (brand: Brand, event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openBrandModal(brand, event.currentTarget);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!contactForm.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-background">
      {/* Home/Hero Section - Enhanced for brand prominence */}
      <section id="home" className="relative bg-background">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Hero Content - Enhanced hierarchy */}
            <div className="space-y-6 sm:space-y-8">
              {/* Main Brand Identity */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-accent rounded-full text-xs sm:text-sm font-medium text-primary mb-4">
                  Family of Food Brands
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-foreground">
                  Qroshious
                </h1>
                <div className="space-y-2">
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary">
                    Made with Love, Served with Smiles.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium">
                    The umbrella brand bringing you exceptional dining experiences
                  </p>
                </div>
              </div>
              
              <div className="h-px bg-border my-4 sm:my-6"></div>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Creating memorable dining experiences through thoughtfully crafted recipes that bring people together around the table. From comfort classics to gourmet elegance, each brand tells its own story.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                <button
                  onClick={() => handleNavClick("#brands")}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm"
                >
                  Explore Our Brands
                </button>
                <button
                  onClick={() => handleNavClick("#story")}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold text-base sm:text-lg hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  Our Story
                </button>
              </div>

              {/* Brand Promise Indicators */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-border">
                <div className="text-center space-y-2">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center mx-auto">
                    <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-primary-foreground" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground">Made with Love</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center mx-auto">
                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-primary-foreground" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground">Bringing Together</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center mx-auto">
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-primary-foreground" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground">Creating Smiles</div>
                </div>
              </div>
            </div>

            {/* Hero Image - Enhanced presentation with better responsive behavior */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/10 to-accent/20 rounded-2xl blur-2xl opacity-30"></div>
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format 600w,
                          https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=533&fit=crop&auto=format 800w"
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
                <source
                  media="(min-width: 640px)"
                  srcSet="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=640&h=400&fit=crop&auto=format"
                />
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format"
                  alt="Warm family moment: Multi-generational family sharing a homemade dinner together at a beautifully set dining table, representing Qroshious' commitment to bringing families together through food"
                  className="relative w-full h-56 sm:h-72 lg:h-96 object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section - Enhanced hierarchy with better mobile layout */}
      <section id="brands" className="relative bg-muted/30">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="space-y-8 sm:space-y-12">
            {/* Section Header - Enhanced */}
            <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-card border border-border rounded-full text-xs sm:text-sm font-medium text-muted-foreground">
                Part of the Qroshious Family
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
                Our Family of Brands
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4 sm:px-0">
                Each brand in the Qroshious family brings its own unique character while sharing our commitment to quality, love, and bringing smiles to every meal. Discover which brand speaks to your taste and style.
              </p>
            </div>

            {/* Brand Cards Grid - Enhanced differentiation with better mobile layout */}
            <div className="grid gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto md:grid-cols-2">
              {subBrands.map((brand) => (
                <div
                  key={brand.id}
                  role="button"
                  tabIndex={0}
                  className="group relative bg-card border-2 border-border rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-opacity-50 focus:outline-none focus:ring-4 focus:ring-ring/20 focus:ring-offset-2"
                  onClick={(e) => handleCardClick(brand, e)}
                  onKeyDown={(e) => handleCardKeyDown(brand, e)}
                  aria-describedby={`${brand.id}-descriptor`}
                  style={{ 
                    borderColor: `${brand.accentColor}40`,
                    boxShadow: `0 0 0 0 ${brand.accentColor}20`
                  }}
                >
                  {/* Enhanced Accent Treatment */}
                  <div
                    className="absolute top-0 left-0 w-full h-2 rounded-t-2xl"
                    style={{ backgroundColor: brand.accentColor }}
                  />
                  
                  {/* Brand Icon */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div 
                      className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl flex items-center justify-center text-white font-display font-bold text-lg sm:text-xl shadow-lg"
                      style={{ backgroundColor: brand.accentColor }}
                    >
                      {brand.name.charAt(0)}
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        A Qroshious Brand
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                        {brand.name}
                      </h3>
                      <p className="text-base sm:text-lg font-semibold" style={{ color: brand.accentColor }}>
                        {brand.tagline}
                      </p>
                    </div>

                    <p
                      id={`${brand.id}-descriptor`}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    >
                      {brand.descriptor}
                    </p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: brand.accentColor }}
                        />
                        <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Discover more
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                          Explore {brand.name}
                        </span>
                        <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center pt-6 sm:pt-8">
              <div className="inline-flex items-center space-x-3 sm:space-x-4 px-4 sm:px-6 py-3 bg-background border border-border rounded-full text-xs sm:text-sm text-muted-foreground">
                <span>All brands proudly part of</span>
                <span className="font-display font-bold text-primary">Qroshious</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Enhanced brand messaging with better responsive images */}
      <section id="story" className="relative bg-background">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-accent rounded-full text-xs sm:text-sm font-medium text-primary">
                  Our Heritage
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
                  The Qroshious Story
                </h2>
                <p className="text-lg sm:text-xl font-semibold text-primary">
                  Made with Love, Served with Smiles.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Qroshious began with a simple belief: that great food has the power to bring people together. Founded on the principles of quality, creativity, and genuine care, we've grown from a single vision into a family of distinctive brands.
                </p>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Each recipe we create, each product we develop, carries with it our commitment to making mealtime moments more meaningful. Whether it's the playful comfort of Macronica or the refined elegance of Orchids, every brand reflects our core values.
                </p>
              </div>

              {/* Enhanced value props with better mobile layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-border">
                <div className="text-center sm:text-center space-y-3">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">Made with Love</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Every recipe crafted with care</div>
                </div>
                <div className="text-center sm:text-center space-y-3">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">Bringing Together</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Connecting families & friends</div>
                </div>
                <div className="text-center sm:text-center space-y-3">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">Creating Smiles</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Joy in every bite</div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-l from-accent/30 to-primary/10 rounded-2xl blur-2xl opacity-40"></div>
              <img
                src="https://images.unsplash.com/photo-1543353071-10c8c57e4951?w=800&h=600&fit=crop&auto=format"
                alt="Dedicated chef carefully preparing fresh ingredients with passion and attention to detail, embodying Qroshious' commitment to quality and craftsmanship in every recipe"
                className="relative w-full h-56 sm:h-72 lg:h-96 object-cover rounded-2xl shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Enhanced brand connection with better responsive layout */}
      <section id="products" className="relative bg-muted/30">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-card border border-border rounded-full text-xs sm:text-sm font-medium text-muted-foreground">
              Signature Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Discover our signature recipes and products across the Qroshious family of brands. Each product embodies our commitment to quality and the unique character of its brand.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {/* Enhanced product cards with better brand association and responsive design */}
            {/* Macronica Products */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-200">
              <img
                src="https://images.unsplash.com/photo-1551892374-ecf8fa57a5b5?w=400&h=250&fit=crop&auto=format"
                alt="Golden, bubbly classic mac and cheese with crispy breadcrumb topping, served in a colorful bowl that appeals to children and families"
                className="w-full h-48 sm:h-52 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-amber-500"></div>
                    <span className="text-xs sm:text-sm font-semibold text-amber-600">Macronica</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Family Comfort</span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">Classic Mac & Cheese</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Creamy, cheesy comfort that brings the whole family together around the dinner table.</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-200">
              <img
                src="https://images.unsplash.com/photo-1621996346565-e3dbc794d53a?w=400&h=250&fit=crop&auto=format"
                alt="Vibrant rainbow-colored pasta salad with fresh vegetables, making healthy eating fun and appealing for children"
                className="w-full h-48 sm:h-52 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-amber-500"></div>
                    <span className="text-xs sm:text-sm font-semibold text-amber-600">Macronica</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Kid-Approved</span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">Rainbow Veggie Pasta</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Fun, colorful pasta dishes that make eating vegetables exciting and enjoyable for kids.</p>
              </div>
            </div>

            {/* Orchids Products */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-violet-200">
              <img
                src="https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=250&fit=crop&auto=format"
                alt="Luxurious truffle risotto with delicate microgreens and elegant plating, showcasing restaurant-quality presentation"
                className="w-full h-48 sm:h-52 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-violet-500"></div>
                    <span className="text-xs sm:text-sm font-semibold text-violet-600">Orchids</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Gourmet Elegance</span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">Truffle Risotto</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Premium ingredients create an unforgettable fine dining experience at home.</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-violet-200">
              <img
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=250&fit=crop&auto=format"
                alt="Artisanal seafood linguine with fresh herbs and elegant presentation, perfect for sophisticated dinner parties"
                className="w-full h-48 sm:h-52 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-violet-500"></div>
                    <span className="text-xs sm:text-sm font-semibold text-violet-600">Orchids</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Premium Seafood</span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">Seafood Linguine</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Sophisticated flavors and restaurant-quality presentation for special occasions.</p>
              </div>
            </div>

            {/* Feature Product */}
            <div className="sm:col-span-2 lg:col-span-1 bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&auto=format"
                alt="Fresh artisanal pasta ingredients and handcrafted noodles laid out beautifully, representing Qroshious' commitment to quality and craftsmanship"
                className="w-full h-48 sm:h-52 object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs sm:text-sm font-medium text-primary">Qroshious</span>
                </div>
                <h3 className="font-display font-semibold text-lg sm:text-xl text-foreground">Artisan Recipe Kits</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Complete meal kits that bring the joy of cooking and sharing to your kitchen.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <button
              onClick={() => handleNavClick("#contact")}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm"
            >
              Request Product Information
            </button>
          </div>
        </div>
      </section>

      {/* Sustainability Section - Enhanced with better mobile layout */}
      <section id="sustainability" className="relative bg-background">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-accent rounded-full text-xs sm:text-sm font-medium text-primary">
                  Our Commitment
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
                  Caring for Tomorrow
                </h2>
                <p className="text-lg font-semibold text-success">
                  Sustainable practices for a better future.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  At Qroshious, we believe that caring for people extends to caring for our planet. Our commitment to sustainability runs through every aspect of our business, from ingredient sourcing to packaging choices.
                </p>
              </div>

              {/* Enhanced value props with better mobile stacking */}
              <div className="grid gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-success-soft rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 sm:w-7 h-6 sm:h-7 text-success" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-base sm:text-lg font-semibold text-foreground">Responsible Sourcing</div>
                    <div className="text-sm sm:text-base text-muted-foreground">We partner with suppliers who share our values of quality, ethics, and environmental stewardship.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-success-soft rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 sm:w-7 h-6 sm:h-7 text-success" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-base sm:text-lg font-semibold text-foreground">Eco-Friendly Packaging</div>
                    <div className="text-sm sm:text-base text-muted-foreground">Our packaging is designed to minimize waste while maintaining product quality and freshness.</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 bg-success-soft rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 sm:w-7 h-6 sm:h-7 text-success" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-base sm:text-lg font-semibold text-foreground">Community Impact</div>
                    <div className="text-sm sm:text-base text-muted-foreground">We support local communities and food security initiatives through partnerships and donations.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-l from-success/20 to-accent/10 rounded-2xl blur-2xl opacity-40"></div>
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&auto=format"
                alt="Fresh, vibrant ingredients from sustainable farming practices, showcasing Qroshious' commitment to environmental responsibility and quality sourcing"
                className="relative w-full h-56 sm:h-72 lg:h-96 object-cover rounded-2xl shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced mobile form layout */}
      <section id="contact" className="relative bg-muted/30">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-accent rounded-full text-xs sm:text-sm font-medium text-primary">
                  Get in Touch
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
                  Get in Touch
                </h2>
                <p className="text-lg font-semibold text-primary">
                  We'd love to hear from you.
                </p>
              </div>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Whether you have questions about our products, want to learn more about our brands, or are interested in partnerships, we're here to help.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:hello@qroshious.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      hello@qroshious.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+1-555-0123" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      +1 (555) 012-3456
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">
                      123 Culinary Way<br />
                      Food City, FC 12345
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Enhanced for mobile */}
            <div className="bg-card rounded-lg p-4 sm:p-6 lg:p-8 mt-8 lg:mt-0">
              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Detail Modal - Enhanced for mobile */}
      {isModalOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${selectedBrand.id}-modal-title`}
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={closeBrandModal}
              className="absolute top-4 right-4 z-10 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Hero Image */}
              <div className="relative">
                <img
                  src={selectedBrand.heroImage}
                  alt={selectedBrand.heroImageAlt}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-t-lg"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-lg" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <h2
                    id={`${selectedBrand.id}-modal-title`}
                    className="text-2xl sm:text-3xl font-display font-bold text-foreground"
                  >
                    {selectedBrand.name}
                  </h2>
                  <p className="text-base sm:text-lg font-medium" style={{ color: selectedBrand.accentColor }}>
                    {selectedBrand.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {selectedBrand.extendedDescription}
                </p>

                {/* Product Highlights */}
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-display font-semibold text-foreground">
                    What makes {selectedBrand.name} special:
                  </h3>
                  <ul className="space-y-2">
                    {selectedBrand.productHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: selectedBrand.accentColor }}
                        />
                        <span className="text-sm sm:text-base text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => {
                      // Handle view products action
                      console.log(`View ${selectedBrand.name} products`);
                      closeBrandModal();
                      handleNavClick("#products");
                    }}
                  >
                    {selectedBrand.ctaText}
                  </button>
                  <button
                    onClick={closeBrandModal}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    Back to Qroshious
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}