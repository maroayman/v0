"use client"

import { useEffect, useState } from "react"

export function NeuBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-60">
      {/* Neumorphism floating elements */}
      <div 
        className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-30"
        style={{
          background: 'hsl(var(--background))',
          boxShadow: `
            20px 20px 40px hsl(var(--neu-shadow-dark)),
            -20px -20px 40px hsl(var(--neu-shadow-light))
          `,
          animation: 'neuFloat 8s ease-in-out infinite'
        }}
      />
      
      <div 
        className="absolute top-1/2 right-20 w-24 h-24 rounded-full opacity-30"
        style={{
          background: 'hsl(var(--background))',
          boxShadow: `
            15px 15px 30px hsl(var(--neu-shadow-dark)),
            -15px -15px 30px hsl(var(--neu-shadow-light))
          `,
          animation: 'neuFloat 10s ease-in-out infinite reverse'
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full opacity-30"
        style={{
          background: 'hsl(var(--background))',
          boxShadow: `
            12px 12px 24px hsl(var(--neu-shadow-dark)),
            -12px -12px 24px hsl(var(--neu-shadow-light))
          `,
          animation: 'neuFloat 12s ease-in-out infinite'
        }}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-secondary/2" />
    </div>
  )
}

// Update the export
export { NeuBackground as ModernBackground }