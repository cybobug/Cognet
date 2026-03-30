import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Bookmark, Share2, Clock, Calendar } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export function BlogPost() {
  const { id } = useParams();
  const { mode } = useTheme();
  const post = blogPosts.find(p => p.id === id) || blogPosts[0];
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <article className="min-h-screen bg-background pb-20">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 pt-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to articles
        </Link>

        <header className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-soft-accent text-primary">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-[1.2] mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-text-secondary leading-relaxed mb-8">
            {post.description}
          </p>

          <div className="flex items-center justify-between py-6 border-y border-border">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" 
                alt="Author" 
                loading="lazy"
                className="w-10 h-10 rounded-full border border-border"
              />
              <div>
                <p className="text-sm font-medium text-text-primary">Your Name</p>
                <p className="text-xs text-text-muted">Senior Product Designer</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden border border-border">
          <img 
            src={post.image} 
            alt={post.title} 
            loading="lazy"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>

        <div className={`max-w-3xl mx-auto prose prose-lg ${mode === 'technical' ? 'prose-invert' : ''} prose-p:text-text-secondary prose-headings:text-text-primary prose-a:text-primary hover:prose-a:text-primary-hover`}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h2>The Core Philosophy</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          {mode === 'technical' && (
            <div className="my-8 rounded-xl overflow-hidden border border-border bg-[#0d0d0d]">
              <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
                <span className="text-xs font-mono text-text-secondary">example.ts</span>
                <button className="text-xs text-text-secondary hover:text-text-primary transition-colors">Copy</button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
                <code>{`async function fetchUserData(id: string) {
  try {
    const response = await api.get(\`/users/\${id}\`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('User not found');
  }
}`}</code>
              </pre>
            </div>
          )}

          <blockquote>
            "Design is not just what it looks like and feels like. Design is how it works."
          </blockquote>

          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          <h3>Key Takeaways</h3>
          <ul>
            <li>Focus on the user experience first and foremost.</li>
            <li>Keep the design clean, minimal, and intentional.</li>
            <li>Performance is a feature, not an afterthought.</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
