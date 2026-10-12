'use client';

import { cn } from "@/lib/utils";

interface SidebarProps {
    tags: string[]
    selectedTags: string[]
    onToggleTag: (tag: string) => void
}

export function Sidebar({ 
    tags, 
    selectedTags = [], 
    onToggleTag
}: SidebarProps) {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border md:sticky md:block bg-background">
      <div className="py-6 pr-6 lg:py-8">

        <h4 className="mb-6 text-xs font-bold tracking-widest text-muted-foreground uppercase font-mono">
            {'// Tags'}
        </h4>
        <div className="flex flex-wrap gap-2 px-1">
             {tags.slice(0, 20).map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                <button 
                    key={tag} 
                    onClick={() => onToggleTag(tag)}
                    className={cn(
                        "inline-flex items-center border px-2 py-1 text-xs font-mono transition-colors",
                        isSelected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground bg-background"
                    )}
                >
                    {tag}
                </button>
            )})}
        </div>
      </div>
    </aside>
  );
}
