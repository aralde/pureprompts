"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Check if user has already accepted/declined
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
        // slight delay for animation
        const timer = setTimeout(() => setIsVisible(true), 1000)
        return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div 
        className={cn(
            "fixed bottom-4 right-4 z-50 max-w-sm w-full p-4 bg-background border border-border animate-fade-in-up",
            "shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
        )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start gap-2">
            <div>
                <h3 className="font-mono text-sm font-bold uppercase mb-1">Cookies & Protocol</h3>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    We use cookies to ensure you get the best experience on our terminal. 
                    Accepting enables saved preferences and session data.
                </p>
            </div>
            {/* Close button acts as decline/dismiss */}
            <button 
                onClick={handleDecline} 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
            >
                <X className="h-4 w-4" />
            </button>
        </div>

        <div className="flex gap-3 justify-end">
            <button 
                onClick={handleDecline}
                className="px-3 py-1.5 font-mono text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
                Decline
            </button>
            <button 
                onClick={handleAccept}
                className="px-4 py-1.5 font-mono text-xs font-bold bg-foreground text-background hover:bg-foreground/90 transition-colors uppercase"
            >
                Accept All
            </button>
        </div>
      </div>
    </div>
  )
}
