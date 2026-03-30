import { motion } from 'framer-motion';
import { LayoutGrid, PlayCircle, Code2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

// 1. Content Configuration: Separates logic from UI
const HERO_CONTENT = {
  technical: {
    badge: 'Engineering',
    highlight: 'for Developers & Builders',
    description: 'In-depth articles on programming, architecture, tools, and the craft of building products that scale.',
    primaryBtn: 'Explore Articles',
    secondaryBtn: 'Start Reading',
    SecondaryIcon: PlayCircle,
    gradient: 'from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400',
    orbColor: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%)'
  },
  'non-technical': {
    badge: 'Creativity',
    highlight: 'for Every Mind',
    description: 'Explore stories, lessons, and inspiration across technology, life, and creativity — written for all curious minds.',
    primaryBtn: 'Browse Stories',
    secondaryBtn: 'Explore Technical',
    SecondaryIcon: Code2,
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400',
    orbColor: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0) 70%)'
  }
} as const;

// 2. Orchestrated Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } // Spring-like ease out
  }
};

export function Hero() {
  const { mode } = useTheme();

  // Type safety fallback in case mode is undefined during SSR
  const content = HERO_CONTENT[mode as keyof typeof HERO_CONTENT] || HERO_CONTENT.technical;
  const SecondaryIcon = content.SecondaryIcon;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 isolate"
    >
      {/* Background Ambient Orb */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] pointer-events-none -z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full blur-3xl opacity-60 dark:opacity-40"
          style={{ background: content.orbColor }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className={cn(
              "inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full",
              "bg-primary/5 border border-primary/20 backdrop-blur-sm",
              "text-primary text-xs font-bold uppercase tracking-widest shadow-sm"
            )}>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Explore the latest in {content.badge}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground mb-6 leading-[1.05] font-display text-balance"
          >
            Insights & Ideas <br className="hidden md:block" />
            <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", content.gradient)}>
              {content.highlight}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed text-pretty"
          >
            {content.description}
          </motion.p>

          {/* Interactive Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <button
              className={cn(
                "group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[15px]",
                "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
                "transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
            >
              <LayoutGrid className="w-5 h-5" aria-hidden="true" />
              {content.primaryBtn}
            </button>

            <button
              className={cn(
                "group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[15px]",
                "bg-background/50 backdrop-blur-sm border border-border text-foreground shadow-sm",
                "transition-all duration-300 hover:bg-muted hover:border-border/80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
            >
              <SecondaryIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
              {content.secondaryBtn}
              {mode !== 'technical' && (
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              )}
            </button>
          </motion.div>

          {/* Social Proof / Author Block */}
          <motion.div
            variants={itemVariants}
            className="mt-16 sm:mt-24 inline-flex items-center gap-4 p-2 pr-6 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-sm hover:bg-background/80 transition-colors cursor-pointer group"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
                alt="Portrait of the author"
                // CRITICAL Performance fix: LCP images above the fold should NEVER be lazy loaded.
                loading="eager"
                decoding="sync"
                className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-sm group-hover:scale-105 transition-transform"
              />
              <span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background"
                aria-label="Author is currently active/online"
                title="Online"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground font-display leading-tight">Written by Your Name</span>
              <span className="text-xs text-muted-foreground font-medium">Sharing practical real-world insights</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}