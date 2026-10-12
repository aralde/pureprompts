'use client';

import { Navbar } from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import { PromptCard } from '@/components/prompt-card';
import { PromptCardSkeleton } from '@/components/prompt-card-skeleton';
import { getPrompts, getCategories, getTags } from '@/lib/mock-data';
import { ViewToggle } from '@/components/view-toggle';
import { Search } from '@/components/search';
import { ImagePromptBuilder } from '@/components/image-prompt-builder';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Prompt } from '@/lib/mock-data';
import { LayoutGrid, Code, Image as ImageIcon, Library } from 'lucide-react';
import Image from 'next/image';

const categoryIcons: Record<string, React.ReactNode> = {
    'Tactio': <Image src="/tactio-logo-wt.svg" alt="Tactio" width={32} height={32} className="mb-3" />,
    'Coding': <Code className="w-8 h-8 mb-3" />,
    'Images': <ImageIcon className="w-8 h-8 mb-3" />,
    'General': <Library className="w-8 h-8 mb-3" />
};

export function PromptGallery() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [totalPrompts, setTotalPrompts] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "trending" | "last_added">("all");
  
  // Filter Filtering State (Arrays for Multi-select)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('source') === 'tactio' || params.get('category') === 'Tactio') {
            return ["Tactio"];
        }
        if (params.get('category')) {
            return [params.get('category')!];
        }
        if (params.get('q')) {
            return [];
        }
    }
    return ["Images"];
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        return params.get('q') || '';
    }
    return '';
  });

  // Infinite Scroll State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef(false);

  // Initial Fetch & Filter Change
  useEffect(() => {
    async function initData() {
        setPage(1);
        setHasMore(true); 
        setIsLoading(true);

        try {
            const [promptsData, categoriesData, tagsData] = await Promise.all([
                getPrompts(1, 20, selectedCategories, selectedTags, searchQuery),
                getCategories(),
                getTags()
            ]);
            
            setPrompts(promptsData.prompts);
            setHasMore(promptsData.hasMore);
            setTotalPrompts(promptsData.total);
            setCategories(categoriesData);
            setTags(tagsData);
        } finally {
            setIsLoading(false);
        }
    }
    initData();
  }, [selectedCategories, selectedTags, searchQuery]); 

  // Handlers for Multi-select
  const toggleCategory = (category: string) => {
      setSelectedCategories(prev => 
        prev.includes(category) 
            ? prev.filter(c => c !== category)
            : [...prev, category]
      );
  };

  const toggleTag = (tag: string) => {
      setSelectedTags(prev => 
        prev.includes(tag) 
            ? prev.filter(t => t !== tag)
            : [...prev, tag]
      );
  };

  const clearCategories = () => setSelectedCategories([]);

  // Load More Function
  const loadMore = useCallback(async () => {
      if (loadingRef.current || !hasMore) return;
      
      loadingRef.current = true;
      setIsLoadingMore(true);
      
      try {
        const nextPage = page + 1;
        const data = await getPrompts(nextPage, 20, selectedCategories, selectedTags, searchQuery);
        
        setPrompts(prev => {
            const newItems = data.prompts.filter(p => !prev.some(existing => existing.id === p.id));
            if (newItems.length === 0) return prev;
            return [...prev, ...newItems];
        });
        
        setHasMore(data.hasMore);
        setPage(nextPage);
      } finally {
        loadingRef.current = false;
        setIsLoadingMore(false);
      }
  }, [hasMore, page, selectedCategories, selectedTags, searchQuery]);
  
  // Intersection Observer
  useEffect(() => {
      const observer = new IntersectionObserver(
          entries => {
              if (entries[0].isIntersecting && !isLoading && hasMore) {
                  loadMore();
              }
          },
          { threshold: 1.0 }
      );
      
      const sentinel = document.getElementById("sentinel");
      if (sentinel) observer.observe(sentinel);
      
      return () => observer.disconnect();
  }, [isLoading, hasMore, loadMore]);

  const getFilteredPrompts = () => {
    const sorted = [...prompts];
    if (filter === "trending") {
        return sorted.sort(() => 0.5 - Math.random());
    } else if (filter === "last_added") {
        return sorted.reverse();
    }
    return sorted;
  };

  const filteredPrompts = getFilteredPrompts();

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 max-w-screen-2xl px-4 md:px-8">
        <Sidebar 
            tags={tags} 
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
        />
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">
             
             {/* Header Section */}
             <div className="mb-8">
                <div className="flex flex-col gap-2 mb-8">
                     <h1 className="text-4xl font-bold tracking-tight text-foreground font-mono uppercase">
                        AI PROMPTS GALLERY
                    </h1>
                    <p className="text-muted-foreground font-mono text-lg">
                        The Open Prompt Gallery Ecosystem
                    </p>
                </div>
                
                <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div className="flex-1">
                        <Search onSearch={setSearchQuery} initialValue={searchQuery} />
                    </div>
                    <ImagePromptBuilder />
                </div>

                {/* Categories icons grid */}
                <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <button
                        onClick={clearCategories}
                        className={`group flex flex-col items-center justify-center p-6 border rounded-xl transition-all ${
                            selectedCategories.length === 0 
                                ? 'bg-foreground text-background border-foreground shadow-md' 
                                : 'bg-background text-foreground border-border hover:border-foreground/50 hover:bg-muted/50 shadow-sm'
                        }`}
                    >
                        <LayoutGrid className="w-8 h-8 mb-3 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                        <span className="font-mono font-bold text-sm uppercase tracking-wider">All Categories</span>
                    </button>
                    {[...categories].sort((a, b) => a === 'Images' ? -1 : b === 'Images' ? 1 : 0).map(cat => (
                        <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`group flex flex-col items-center justify-center p-6 border rounded-xl transition-all ${
                                selectedCategories.includes(cat) 
                                    ? 'bg-foreground text-background border-foreground shadow-md' 
                                    : 'bg-background text-foreground border-border hover:border-foreground/50 hover:bg-muted/50 shadow-sm'
                            }`}
                        >
                            <div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                                {categoryIcons[cat] || <Library className="w-8 h-8 mb-3" />}
                            </div>
                            <span className="font-mono font-bold text-sm uppercase tracking-wider">{cat}</span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={() => setFilter("all")}
                            className={`text-lg font-bold tracking-tight font-mono transition-colors ${filter === 'all' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
                        >
                            All ({totalPrompts})
                        </button>
                        <button 
                            onClick={() => setFilter("trending")}
                            className={`text-lg font-bold tracking-tight font-mono transition-colors ${filter === 'trending' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
                        >
                            Trending ({totalPrompts})
                        </button>
                         <button 
                            onClick={() => setFilter("last_added")}
                            className={`text-lg font-bold tracking-tight font-mono transition-colors ${filter === 'last_added' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}
                        >
                            Last Added ({totalPrompts})
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                    </div>
                </div>
             </div>
             
             {/* Prompts Grid */}
             {prompts.length === 0 && isLoading ? (
                 <div className={`gap-6 ${viewMode === 'grid' ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4' : 'grid grid-cols-1'}`}>
                    {Array.from({ length: 9 }).map((_, i) => (
                        <PromptCardSkeleton key={i} variant={viewMode} />
                    ))}
                 </div>
             ) : (
                 <div className={`gap-6 ${viewMode === 'grid' ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4' : 'grid grid-cols-1'}`}>
                    {filteredPrompts.map(prompt => (
                        <PromptCard key={prompt.id} prompt={prompt} variant={viewMode} />
                    ))}
                 </div>
             )}

             {/* Infinite Scroll Sentinel */}
             <div id="sentinel" className="min-h-20 py-8">
                 {isLoadingMore && (
                     <div className={`gap-6 ${viewMode === 'grid' ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4' : 'grid grid-cols-1'}`}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <PromptCardSkeleton key={i} variant={viewMode} />
                        ))}
                     </div>
                 )}
                 {!hasMore && prompts.length > 0 && (
                     <div className="flex justify-center py-8">
                        <span className="font-mono text-muted-foreground text-sm">-- END OF RESULTS --</span>
                     </div>
                 )}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
