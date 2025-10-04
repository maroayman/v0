"use client"

import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
      setIsVisible(window.scrollY < window.innerHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 opacity-60 hover:opacity-100 transition-all duration-300">
      <div className="neu-card p-4 flex flex-col items-center space-y-4">
        {/* Progress bar */}
        <div className="w-2 h-32 neu-pressed rounded-full relative overflow-hidden bg-background">
          <div 
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-secondary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        
        {/* Scroll indicator */}
        {isVisible && (
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-transparent rounded-full" />
            <div className="text-xs text-muted-foreground font-medium">
              Scroll
            </div>
          </div>
        )}
      </div>
    </div>
  )
}