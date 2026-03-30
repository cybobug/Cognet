import { BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeatureBlockProps {
  title?: string;
  description?: string;
  className?: string;
}

export function FeatureBlock({
  title = "A Better Reading Experience",
  description = "Carefully crafted typography, fluid layout adjustments, and a distraction-free mode designed to keep you immersed in the story.",
  className
}: FeatureBlockProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-start gap-4 p-6 rounded-2xl",
        "transition-colors duration-300 hover:bg-muted/40",
        className
      )}
    >
      {/* Visual Anchor: Premium Icon Container */}
      <div className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-xl",
        "bg-primary/10 text-primary ring-1 ring-primary/20",
        "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "group-hover:scale-110 group-hover:bg-primary/20 group-hover:ring-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10"
      )}>
        <BookOpen className="h-5 w-5" aria-hidden="true" />
      </div>

      {/* Typography Node */}
      <div className="space-y-2.5">
        <h3 className="text-xl font-semibold tracking-tight text-foreground font-display">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-[280px]">
          {description}
        </p>
      </div>
    </div>
  );
}