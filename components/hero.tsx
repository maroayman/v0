"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

export function Hero() {
  const resumeUrl = `/resume.pdf?v=${Date.now()}`

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 text-primary font-mono text-[8px] xs:text-[10px] sm:text-sm overflow-x-auto">
            <pre className="hidden sm:block">{`
╔══════════════════════════════════════════════════════════════╗
║                    MARWAN AYMAN SHAWKY                      ║
║                  DevOps & Cloud Engineer                    ║
╚══════════════════════════════════════════════════════════════╝
            `}</pre>
            <div className="sm:hidden text-center py-4">
              <h1 className="text-xl font-bold text-primary">MARWAN AYMAN SHAWKY</h1>
              <p className="text-sm text-muted-foreground">DevOps & Cloud Engineer</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 text-foreground">
            <div className="text-base sm:text-lg">
              <span className="text-primary">$</span> whoami
            </div>
            <div className="pl-2 sm:pl-4 text-sm sm:text-base text-muted-foreground">
              Cloud & DevOps Engineer passionate about building scalable infrastructure, automating deployments, and
              optimizing system performance.
            </div>

            <div className="text-base sm:text-lg">
              <span className="text-primary">$</span> ls -la skills/
            </div>
            <div className="pl-2 sm:pl-4 text-sm sm:text-base text-muted-foreground break-words">
              drwxr-xr-x kubernetes docker terraform aws gcp ansible jenkins
            </div>

            <div className="text-base sm:text-lg">
              <span className="text-primary">$</span> cat contact.txt
            </div>
            <div className="pl-2 sm:pl-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                <span className="text-secondary">email:</span>
                <Link
                  href="mailto:marwanayman.shawky@gmail.com"
                  className="text-accent hover:text-accent/80 underline break-all"
                >
                  marwanayman.shawky@gmail.com
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                <span className="text-secondary">github:</span>
                <Link
                  href="https://github.com/maroayman"
                  target="_blank"
                  className="text-accent hover:text-accent/80 underline"
                >
                  github.com/maroayman
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                <span className="text-secondary">linkedin:</span>
                <Link
                  href="https://linkedin.com/in/maroayman"
                  target="_blank"
                  className="text-accent hover:text-accent/80 underline"
                >
                  linkedin.com/in/maroayman
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm">
                <span className="text-secondary">blog:</span>
                <Link
                  href="https://hashnode.com/@maroayman"
                  target="_blank"
                  className="text-accent hover:text-accent/80 underline"
                >
                  hashnode.com/@maroayman
                </Link>
              </div>
            </div>

            <div className="text-base sm:text-lg">
              <span className="text-primary">$</span> ./download_resume.sh
            </div>
            <div className="pl-2 sm:pl-4">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="default" className="font-mono text-xs w-full sm:w-auto">
                  <Download className="h-3 w-3 mr-1" />
                  Download Resume
                </Button>
              </a>
            </div>

            <div className="text-base sm:text-lg">
              <span className="text-primary">$</span> cd projects/
            </div>
            <div className="pl-2 sm:pl-4">
              <Link href="/projects">
                <Button size="sm" variant="default" className="font-mono text-xs w-full sm:w-auto">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View All Projects
                </Button>
              </Link>
            </div>

            <div className="pt-4">
              <span className="text-primary">$</span> <span className="terminal-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
