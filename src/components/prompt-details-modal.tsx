
import { Prompt } from '@/lib/mock-data';
import { X, Copy, Check, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import { useIsTactioSource } from '@/lib/use-tactio-source';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PromptDetailsModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptDetailsModal({ prompt, isOpen, onClose }: PromptDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  const [imageOrientation, setImageOrientation] = useState<'portrait' | 'landscape' | 'square' | null>(null);
  const isTactioSource = useIsTactioSource();

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalHeight > naturalWidth * 1.05) {
      setImageOrientation('portrait');
    } else if (Math.abs(naturalWidth - naturalHeight) < naturalWidth * 0.1) {
      setImageOrientation('square');
    } else {
      setImageOrientation('landscape');
    }
  };

  // We consider it an image prompt if it's explicitly in the 'Images' category,
  // which is how they are defined in external-image-prompts.json
  const isImageCategory = prompt.metadata.category === 'Images';
  const imageSrc = prompt.url || prompt.metadata.url;

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    const promptData = {
      title: prompt.title,
      content: prompt.content,
      tags: prompt.metadata.tags || []
    };
    const uri = `tactio://add-prompt?data=${encodeURIComponent(JSON.stringify(promptData))}`;
    window.location.href = uri;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-background border border-border rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
              <h2 className="text-xl font-bold font-mono tracking-tight">{prompt.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-xs font-mono text-muted-foreground">{prompt.metadata.author}</span>
                 <span className="text-xs font-mono text-muted-foreground">•</span>
                 <span className="text-xs font-mono text-muted-foreground">{prompt.metadata.category}</span>
              </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className={cn(
          "flex-1 overflow-y-auto p-6 flex gap-6",
          imageOrientation === 'portrait' ? "flex-col md:flex-row items-start" : "flex-col"
        )}>
            {(isImageCategory && imageSrc) && (
              <div className={cn(
                "relative rounded-md overflow-hidden bg-muted/20 border border-border shrink-0 flex items-center justify-center",
                imageOrientation === 'portrait' ? "w-fit max-w-full md:max-w-[45%] self-center md:self-start" : "w-fit max-w-full self-center"
              )}>
                <Image
                   src={imageSrc}
                   alt={`${prompt.title} preview`}
                   width={0}
                   height={0}
                   sizes="(max-width: 768px) 100vw, 50vw"
                   className={cn(
                     "object-contain w-auto h-auto max-w-full",
                     imageOrientation === 'portrait' ? "max-h-[60vh] md:max-h-[70vh]" : "max-h-[50vh] sm:max-h-96"
                   )}
                   onLoad={handleImageLoad}
                />
              </div>
            )}
            <div className={cn(
              "prose prose-sm sm:prose-base dark:prose-invert font-mono",
              imageOrientation === 'portrait' ? "flex-1 min-w-0" : "max-w-none w-full"
            )}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {prompt.content}
                </ReactMarkdown>
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-between items-center bg-muted/20">
            <div className="flex gap-2">
                {prompt.metadata.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground font-mono">
                       #{tag}
                   </span> 
                ))}
            </div>
            
            <div className="flex gap-2">
                <button
                    onClick={handleCopy}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 border border-border bg-background hover:bg-foreground hover:text-background transition-all font-mono text-sm font-bold rounded-md",
                        copied && "border-green-500 text-green-500 hover:border-green-500 hover:text-green-500 hover:bg-background"
                    )}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "COPIED" : "COPY PROMPT"}
                </button>
                {isTactioSource && (
                    <button
                        onClick={handleImport}
                        className="flex items-center gap-2 px-4 py-2 border border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white transition-all font-mono text-sm font-bold rounded-md"
                    >
                        <Download className="w-4 h-4" />
                        IMPORT TO TACTIO
                    </button>
                )}
            </div>
        </div>
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
