"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
]

const pageItems = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/articles", label: "articles" },
]

export function NavigationSidebar() {
  const [activeSection, setActiveSection] = useState("about")
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed top-6 right-6 z-50 bg-primary hover:bg-primary/90 shadow-lg font-mono"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

      <div
        className={`fixed right-0 top-0 h-full w-80 bg-background border-l-2 border-primary z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 font-mono">
          <div className="mb-8 pt-4">
            <div className="text-primary text-sm">
              <pre>{`
┌─────────────────────────────────┐
│ NAVIGATION MENU                 │
│ User: marwan@portfolio:~$       │
└─────────────────────────────────┘
              `}</pre>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm mb-2">
              <span className="text-primary">$</span> toggle_theme
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-start font-mono text-xs"
            >
              {theme === "dark" ? <Sun className="h-3 w-3 mr-2" /> : <Moon className="h-3 w-3 mr-2" />}[
              {theme === "dark" ? "LIGHT" : "DARK"}] mode
            </Button>
          </div>

          <div className="mb-6">
            <div className="text-sm mb-2">
              <span className="text-primary">$</span> cd pages/
            </div>
            <nav className="space-y-1 text-xs">
              {pageItems.map((item) => (
                <div key={item.href} className="flex items-center">
                  <span className="text-muted-foreground mr-2">{pathname === item.href ? ">" : " "}</span>
                  <Link
                    href={item.href}
                    className={`text-left hover:text-accent transition-colors ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {pathname === "/" && (
            <div className="mb-6">
              <div className="text-sm mb-2">
                <span className="text-primary">$</span> ls -la sections/
              </div>
              <nav className="space-y-1 text-xs">
                {navigationItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <span className="text-muted-foreground mr-2">{activeSection === item.id ? ">" : " "}</span>
                    <button
                      className={`text-left hover:text-accent transition-colors ${
                        activeSection === item.id ? "text-primary" : "text-muted-foreground"
                      }`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          )}

          {pathname === "/" && (
            <div className="mt-8">
              <div className="text-xs text-muted-foreground mb-2">
                <span className="text-primary">$</span> progress
              </div>
              <div className="text-xs">
                <span className="text-secondary">
                  [
                  {Math.round(
                    ((navigationItems.findIndex((item) => item.id === activeSection) + 1) / navigationItems.length) *
                      100,
                  )}
                  %]
                </span>
                <div className="mt-1">
                  {"█".repeat(
                    Math.round(
                      ((navigationItems.findIndex((item) => item.id === activeSection) + 1) / navigationItems.length) *
                        20,
                    ),
                  )}
                  {"░".repeat(
                    20 -
                      Math.round(
                        ((navigationItems.findIndex((item) => item.id === activeSection) + 1) /
                          navigationItems.length) *
                          20,
                      ),
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
