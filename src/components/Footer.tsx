"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copyright, Accessibility, Linkedin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Progressive enhancement: try server action first, fallback to fetch
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Thanks for subscribing! Check your email for confirmation.");
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Brand lockup */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">Q</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">Qroshious</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Made with Love, Served with Smiles.
            </p>
          </div>

          {/* Middle: Utility links */}
          <div className="lg:col-span-1">
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3" aria-label="Footer navigation">
              <a 
                href="/brands/macronica" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                Macronica
              </a>
              <a 
                href="/brands/orchids" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                Orchids
              </a>
              <a 
                href="/story" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                Story
              </a>
              <a 
                href="/products" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                Products
              </a>
              <a 
                href="/sustainability" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                Sustainability
              </a>
              <a 
                href="/accessibility" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                aria-label="Accessibility statement"
              >
                Accessibility
              </a>
              <a 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                Privacy
              </a>
            </nav>
          </div>

          {/* Right: Social + Newsletter */}
          <div className="space-y-6">
            {/* Social icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com/company/qroshious"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Follow Qroshious on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>

            {/* Newsletter signup */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Get seasonal recipes & updates
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground"
                    aria-describedby="newsletter-error"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <div id="newsletter-error" aria-live="polite" className="sr-only" />
            </div>
          </div>
        </div>

        {/* Footer bottom row */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Copyright className="w-4 h-4" />
              <span>{new Date().getFullYear()} Qroshious. All rights reserved.</span>
            </div>

            {/* Additional links */}
            <div className="flex items-center space-x-6">
              <a 
                href="/sitemap" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                Sitemap
              </a>
              
              {/* Language selector */}
              <div className="relative">
                <select 
                  className="text-sm text-muted-foreground bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm cursor-pointer"
                  aria-label="Select language"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              {/* Contact info */}
              <span className="text-sm text-muted-foreground">
                Questions? <a href="mailto:hello@qroshious.example" className="hover:text-foreground transition-colors">hello@qroshious.example</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}