"use client"

import * as React from "react"
import { Grid, List } from "lucide-react"

interface ViewToggleProps {
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
}

export function ViewToggle({ viewMode, setViewMode }: ViewToggleProps) {
  return (
    <div className="flex items-center border border-input p-0.5">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2 transition-colors rounded-none ${
          viewMode === "grid"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Grid view"
      >
        <Grid className="h-4 w-4" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-2 transition-colors rounded-none ${
          viewMode === "list"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  )
}
