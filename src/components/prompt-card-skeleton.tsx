import { cn } from "@/lib/utils";

interface PromptCardSkeletonProps {
  variant?: "grid" | "list";
}

export function PromptCardSkeleton({ variant = "grid" }: PromptCardSkeletonProps) {
  if (variant === "list") {
    return (
      <div className="flex items-center justify-between border border-border/50 bg-card/50 p-4 animate-pulse">
         <div className="min-w-0 flex-1 pr-6">
            <div className="h-5 w-1/3 bg-muted rounded-none mb-2"></div>
            <div className="h-3 w-2/3 bg-muted/50 rounded-none"></div>
         </div>

         <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end gap-1.5 min-w-[200px]">
                <div className="h-3 w-24 bg-muted rounded-none"></div>
                <div className="w-full h-px bg-border/50"></div>
                <div className="flex gap-2 justify-end">
                   <div className="h-2 w-12 bg-muted/50 rounded-none"></div>
                   <div className="h-2 w-10 bg-muted/50 rounded-none"></div>
                   <div className="h-2 w-14 bg-muted/50 rounded-none"></div>
                </div>
            </div>

            <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-none ml-2"></div>
         </div>
      </div>
    );
  }

  // Grid Variant
  return (
    <div className="flex flex-col justify-between border border-border/50 bg-card/50 p-6 h-full animate-pulse">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-end mb-2">
             <div className="h-3 w-8 bg-muted/50 rounded-none"></div>
        </div>

        <div className="h-6 w-3/4 bg-muted rounded-none mb-3"></div>

        <div className="space-y-2 mb-6">
            <div className="h-3 w-full bg-muted/50 rounded-none"></div>
            <div className="h-3 w-5/6 bg-muted/50 rounded-none"></div>
            <div className="h-3 w-4/6 bg-muted/50 rounded-none"></div>
        </div>

        <div className="mt-auto">
             <div className="flex flex-col items-end gap-1.5 mb-6">
                <div className="h-3 w-20 bg-muted rounded-none"></div>
                <div className="w-full h-px bg-border/50"></div>
                <div className="flex gap-2 justify-end mt-1">
                    <div className="h-2 w-10 bg-muted/50 rounded-none"></div>
                    <div className="h-2 w-12 bg-muted/50 rounded-none"></div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2">
                <div className="flex items-center">
                    <div className="h-3 w-3 bg-muted rounded-none mr-2"></div>
                    <div className="h-3 w-20 bg-muted/50 rounded-none"></div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="h-3 w-8 bg-muted/50 rounded-none"></div>
                    <div className="w-8 h-8 bg-muted rounded-none"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
