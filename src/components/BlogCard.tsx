import { motion } from 'framer-motion';
import { Bookmark, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils'; // Moved to top for correct module resolution

interface BlogCardProps {
  // Removed 'key' - React handles this natively, it shouldn't be in the prop interface
  post: {
    id: string;
    title: string;
    description: string;
    readTime: string;
    date: string;
    image: string;
    mode: 'technical' | 'non-technical'; 
    tags: string[];
    category: string;
  };
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article // Semantic HTML: Changed from div to article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} // Triggers slightly before it enters the viewport
      // Premium easing curve (simulates physical spring/momentum)
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "group relative flex flex-col bg-card rounded-3xl",
        "border border-border/40 shadow-sm", // Subtle borders and shadows
        "hover:border-border/80 hover:shadow-xl hover:shadow-primary/5", // Lift effect
        "transition-all duration-500 ease-out"
      )}
    >
      {/* A11y Fix: Hidden from screen readers to prevent redundant link announcements. 
        The title link handles the actual navigation. 
      */}
      <Link
        to={`/post/${post.id}`}
        aria-hidden="true"
        tabIndex={-1}
        className="block relative aspect-[16/10] overflow-hidden m-2 rounded-2xl bg-muted isolate"
      >
        <img
          src={post.image}
          alt="" // Empty alt because the link is aria-hidden
          loading="lazy"
          decoding="async" // Performance: Non-blocking image decoding
          className={cn(
            "object-cover w-full h-full",
            "transform will-change-transform group-hover:scale-105", // Hardware acceleration + tighter scale
            "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" // Butter-smooth easing
          )}
        />
        {/* Refined gradient overlay: only appears on hover, adds a subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      </Link>

      <div className="flex flex-col flex-1 p-5 pt-4">
        <header className="flex items-center justify-between mb-4">
          <span className={cn(
            "text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest", // Tighter tracking
            post.mode === 'technical'
              ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
          )}>
            {post.mode === 'technical' ? 'Technical' : 'General'}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Main interactive area */}
        <div className="flex-1 mb-6">
          <Link
            to={`/post/${post.id}`}
            className="block group/link rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <h3 className="text-xl font-bold text-foreground leading-snug font-display group-hover/link:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        </div>

        <footer className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{post.category}</span>
            </div>
            <span className="opacity-50">•</span>
            {/* Safe date display to prevent crash with human-readable dates like "2 days ago" */}
            <time>{post.date}</time>
          </div>

          <button
            type="button"
            aria-label="Bookmark post"
            className={cn(
              "p-2 -mr-2 rounded-full text-muted-foreground",
              "hover:text-primary hover:bg-primary/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "transition-colors duration-200"
            )}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </motion.article>
  );
}