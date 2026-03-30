import { Hero } from '../components/Hero';
import { BlogGrid } from '../components/BlogGrid';
import { FeatureBlock } from '../components/FeatureBanner';

export function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <BlogGrid />
      <section className="py-24 container mx-auto px-4 lg:px-8 border-t border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureBlock 
            title="A Better Reading Experience"
            description="Carefully crafted typography, fluid layout adjustments, and a distraction-free mode designed to keep you immersed in the story."
          />
          <FeatureBlock 
            title="Intuitive Navigation"
            description="Effortlessly flip between technical deep-dives and creative non-technical stories with a single click."
          />
          <FeatureBlock 
            title="Smarter Insights"
            description="Every article is curated to provide actionable knowledge that helps you grow both personally and professionally."
          />
        </div>
      </section>
    </main>
  );
}
