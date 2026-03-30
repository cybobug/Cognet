import { useState, useMemo } from 'react';
import { Search, ChevronRight, FileQuestion } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { blogPosts } from '../data/mockData';
import { BlogCard } from './BlogCard';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export function BlogGrid() {
  const { mode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Dynamic Filters based on theme mode
  const filters = useMemo(() => {
    return mode === 'technical'
      ? ['All', 'Technical', 'Web Development', 'JavaScript', 'Architecture', 'Tools & Workflow']
      : ['All', 'Non-Technical', 'Technical', 'Productivity', 'Life', 'Web Development'];
  }, [mode]);

  // 2. Performance: Memoize the filtering pipeline so it doesn't recalculate on every render
  const processedPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // Search matching (checks title and description)
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter matching
      const matchesFilter =
        activeFilter === 'All' ||
        post.category === activeFilter ||
        post.tags.includes(activeFilter);

      // Context mode matching (mimicking your original logic intent)
      // If we are in 'All', enforce the strict mode separation. Otherwise, trust the explicit filter.
      const matchesMode = activeFilter !== 'All'
        ? true
        : post.mode === mode;

      return matchesSearch && matchesFilter && matchesMode;
    });
  }, [mode, activeFilter, searchQuery]);

  return (
    <section
      aria-labelledby="featured-articles-title"
      className="py-24 container mx-auto px-4 lg:px-8"
    >
      {/* Header & Controls Group */}
      <header className="flex flex-col gap-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              id="featured-articles-title"
              className="text-3xl font-bold text-foreground font-display mb-3"
            >
              Featured Articles
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our most popular and recent stories.
            </p>
          </div>

          {/* Functional, accessible search input */}
          <div className="relative w-full md:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search articles"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-11 pr-4 py-3 rounded-2xl bg-muted/50 border border-border/50",
                "text-[15px] text-foreground placeholder:text-muted-foreground/70",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-background",
                "hover:border-border"
              )}
            />
          </div>
        </div>

        {/* Filter Navigation */}
        <nav
          aria-label="Article categories"
          className="flex flex-wrap items-center gap-2.5"
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={cn(
                "px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                activeFilter === filter
                  ? "bg-foreground text-background border-foreground shadow-md"
                  : "bg-transparent text-muted-foreground border-border/60 hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </nav>
      </header>

      {/* Grid with AnimatePresence for smooth filtering */}
      <div className="min-h-[400px]">
        {processedPosts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {processedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <BlogCard post={post} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Premium Empty State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-3xl bg-muted/20"
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileQuestion className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              We couldn't find any articles matching "{searchQuery}" in the {activeFilter} category.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Pagination / View All */}
      {processedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <button className={cn(
            "group flex items-center gap-2 px-8 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300",
            "bg-background text-foreground border border-border shadow-sm",
            "hover:bg-muted hover:border-foreground/20 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}>
            View All Articles
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </button>
        </motion.div>
      )}
    </section>
  );
}