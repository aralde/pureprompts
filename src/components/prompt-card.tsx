"use client"

import { Prompt } from '@/lib/mock-data';
import { User, Copy, Check, FileCode, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PromptDetailsModal } from './prompt-details-modal';

interface PromptCardProps {
  prompt: Prompt;
  variant?: "grid" | "list";
}

export function PromptCard({ prompt, variant = "grid" }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // We consider it an image prompt if it's explicitly in the 'Images' category,
  // which is how they are defined in external-image-prompts.json
  const isImageCategory = prompt.metadata.category === 'Images';
  const imageSrc = prompt.url || prompt.metadata.url;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent responding to parent clicks if we add them later
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "list") {
    return (
      <>
      <div className="group relative flex items-center justify-between border border-border bg-card p-4 transition-colors hover:border-foreground/50 animate-fade-in-up">
         {(isImageCategory && imageSrc) && (
            <div className="relative w-16 h-16 mr-4 flex-shrink-0 rounded-md overflow-hidden bg-muted/20 hidden sm:block border border-border">
               <img 
                  src={imageSrc} 
                  alt={`${prompt.title} preview`}
                  className="object-cover w-full h-full"
               />
            </div>
         )}
         <div className="min-w-0 flex-1 pr-6">
            <h3 className="text-base font-bold font-mono tracking-tight text-foreground truncate">
                 {prompt.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1 font-mono mt-1">
                {prompt.metadata.description}
            </p>
         </div>

         <div className="flex items-center gap-4">
            {/* Metadata Block: Category & Tags */}
            <div className="hidden md:flex flex-col items-end gap-1.5 min-w-[200px]">
                {/* Category */}
                <span className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider">
                    {prompt.metadata.category}
                </span>
                
                {/* Divider */}
                <div className="w-full h-px bg-border"></div>

                {/* Tags */}
                <div className="flex gap-2 justify-end">
                   {prompt.metadata.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] text-muted-foreground font-mono">
                          #{tag}
                      </span>
                  ))}
                </div>
            </div>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className={cn(
                    "flex-shrink-0 flex items-center justify-center w-8 h-8 border border-border transition-all hover:bg-foreground hover:text-background ml-2",
                    copied && "border-green-500 text-green-500 hover:border-green-500 hover:text-green-500 hover:bg-transparent"
                )}
                title="Copy Prompt"
            >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 border border-border transition-all hover:bg-foreground hover:text-background ml-2"
                title="View Details"
            >
                <Eye className="w-4 h-4" />
            </button>
         </div>
      </div>
      <PromptDetailsModal prompt={prompt} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // Masonry Image Variant
  if (isImageCategory && imageSrc && variant === "grid") {
    return (
      <>
        <div 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-block w-full mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-md border border-border bg-card transition-all hover:border-foreground/50 animate-fade-in-up"
        >
          {/* Imagen completa, altura auto para Masonry */}
          <img 
             src={imageSrc} 
             alt={`${prompt.title} preview`}
             className="w-full h-auto block object-cover transition-transform duration-300 group-hover:scale-[1.02]"
             loading="lazy"
          />
          
          {/* Overlay gradiente inferior para que destaque el botón */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
             {/* Copy Button flotante */}
             <button
                 onClick={handleCopy}
                 className={cn(
                     "flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/20 text-white text-xs font-medium font-mono transition-all hover:bg-black/80 hover:scale-105",
                     copied && "bg-green-500/80 border-green-500 text-white"
                 )}
                 title="Copy Prompt"
             >
                 {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                 {copied ? "Copied" : "Copy Prompt"}
             </button>
          </div>
        </div>
        <PromptDetailsModal prompt={prompt} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }

  // Text Grid Variant
  return (
    <>
    <div className="group relative flex flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-foreground/50 h-full animate-fade-in-up mb-6 break-inside-avoid">
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Version only now */}
        <div className="flex items-start justify-end mb-2">
             <span className='text-[10px] font-mono text-muted-foreground'>v{prompt.metadata.version}</span>
        </div>

        <h3 className="mb-3 text-lg font-bold font-mono tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
          {prompt.title}
        </h3>

        <p className="mb-6 text-sm text-muted-foreground line-clamp-3 font-mono leading-relaxed">
          {prompt.metadata.description}
        </p>

        <div className="mt-auto">
            {/* Metadata Block - Mimicking List View */}
             <div className="flex flex-col items-end gap-1.5 mb-6">
                <span className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider">
                    {prompt.metadata.category}
                </span>
                
                <div className="w-full h-px bg-border"></div>

                <div className="flex flex-wrap gap-2 justify-end">
                    {prompt.metadata.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-[10px] text-muted-foreground font-mono hover:text-foreground transition-colors cursor-default">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
                <div className="flex items-center text-xs text-muted-foreground font-mono">
                    <User className="mr-2 h-3 w-3" />
                    <span>{prompt.metadata.author}</span>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center text-xs text-muted-foreground font-mono" title={`${prompt.metadata.globs.length} files`}>
                        <FileCode className="mr-1 h-3 w-3" />
                        <span>{prompt.metadata.globs.length}</span>
                    </div>
                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className={cn(
                            "flex items-center justify-center w-8 h-8 border border-border transition-all hover:bg-foreground hover:text-background",
                            copied && "border-green-500 text-green-500 hover:border-green-500 hover:text-green-500 hover:bg-transparent"
                        )}
                        title="Copy Prompt"
                    >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                    {/* View Button */}
                     <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center w-8 h-8 border border-border transition-all hover:bg-foreground hover:text-background ml-2"
                        title="View Details"
                    >
                        <Eye className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
      <PromptDetailsModal prompt={prompt} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
    );
}
