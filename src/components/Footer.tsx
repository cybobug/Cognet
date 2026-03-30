import { Github, Twitter, Linkedin, Rss } from 'lucide-react';
import { cn } from '../lib/utils';

// 1. Data-Driven Configuration: 
// Moving data outside the component prevents recreation on every render
// and makes it incredibly easy for non-developers (like content editors) to update.
const SOCIAL_LINKS = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'GitHub', icon: Github, href: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'RSS Feed', icon: Rss, href: '/rss.xml', internal: true },
];

const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-labelledby="footer-heading"
      className={cn(
        "relative mt-20 border-t border-border/40 py-12 md:py-16",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" // Subtle glass effect
      )}
    >
      <h2 id="footer-heading" className="sr-only">Site Footer</h2>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">

          {/* Brand Identity */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-lg",
              "bg-gradient-to-br from-primary to-primary/60 shadow-md shadow-primary/20",
              "transition-transform duration-300 group-hover:scale-105"
            )}>
              <span className="text-primary-foreground font-bold text-sm tracking-tighter">C</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground uppercase">
              Cognet
            </span>
          </div>

          {/* Social Navigation */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-4 sm:gap-6 text-muted-foreground">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      // Security: Required for external links to prevent tab-nabbing attacks
                      {...(!link.internal && { target: "_blank", rel: "noopener noreferrer" })}
                      aria-label={`Follow us on ${link.name}`}
                      className={cn(
                        "block p-2 -m-2 rounded-full", // Increased tap target size for mobile
                        "transition-all duration-300",
                        "hover:text-foreground hover:bg-muted",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      )}
                    >
                      <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/40 text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Cognet. All rights reserved.
          </p>

          <nav aria-label="Legal navigation">
            <ul className="flex gap-6">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}