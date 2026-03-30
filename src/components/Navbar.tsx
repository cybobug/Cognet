import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Terminal, 
  Layout, 
  Search, 
  Menu, 
  X,
  Bell,
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export function Navbar() {
  const { mode, toggleMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Browse', path: '/' },
    { name: 'Newsletter', path: '#newsletter' },
    { name: 'About', path: '#about' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl",
              "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20",
              "transition-transform duration-500 group-hover:rotate-12"
            )}>
              <span className="text-white font-bold text-xl tracking-tighter">C</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-foreground hidden sm:block">
              Cognet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/50">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                    location.pathname === link.path 
                      ? "bg-surface text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search - Hidden on tiny screens */}
            <button className="hidden xs:flex p-2 text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Mode Toggle Switch - Premium Design */}
            <div className="flex items-center gap-3 bg-muted/50 p-1 rounded-2xl border border-border/50">
              <button 
                onClick={() => mode !== 'non-technical' && toggleMode()}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300",
                  mode === 'non-technical' 
                    ? "bg-surface text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Layout className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">General</span>
              </button>
              <button 
                onClick={() => mode !== 'technical' && toggleMode()}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300",
                  mode === 'technical' 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Technical</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Profile (Visual Only) */}
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-border/50">
              <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background" />
              </button>
              <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/30 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 mt-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted rounded-xl text-sm font-bold">
                  <Search className="w-4 h-4" />
                  Search
                </button>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}