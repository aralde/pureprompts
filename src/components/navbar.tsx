'use client';

import { Terminal, Github } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
        <div className="mr-8 flex items-center">
          <a className="flex items-center justify-center gap-2 mr-6" href="/">
            <div className="flex items-center justify-center w-8 h-8 bg-foreground text-background">
                <Terminal className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold font-mono tracking-tighter text-foreground">
                PURE PROMPTS_
            </span>
          </a>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
            </a>
            <ModeToggle />
             <button className='hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border bg-transparent shadow-sm hover:bg-foreground hover:text-background h-9 px-4 py-2 font-mono uppercase tracking-wide'>
                Submit
             </button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
