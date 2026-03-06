"use client"

import { Search as SearchIcon } from "lucide-react"

interface SearchProps {
  onSearch?: (query: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-0 top-3 h-5 w-5 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search prompts..."
        onChange={(e) => onSearch?.(e.target.value)}
        className="h-12 w-full border-b border-border bg-transparent pl-8 pr-12 text-base font-mono text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div className="absolute right-0 top-3 flex items-center gap-1 pointer-events-none">
          <kbd className="inline-flex h-6 items-center rounded border border-border px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            /
          </kbd>
      </div>
    </div>
  )
}
