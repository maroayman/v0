"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { currentConfig } from "@/config/portfolio"

export function NavigationSidebar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-semibold hover:text-muted-foreground transition-colors">
            Marwan Ayman Shawky
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href={isHomePage ? "#about" : "/#about"}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              About
            </Link>
            <Link
              href={isHomePage ? "#experience" : "/experience"}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Experience
            </Link>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            {currentConfig.showBlogSection && (
              <Link
                href="/articles"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            )}

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
