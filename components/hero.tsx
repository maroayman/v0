"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

export function Hero() {
  const resumeUrl = `https://d12v6csynq0gvxlv.public.blob.vercel-storage.com/Marwan_Ayman.pdf?v=${Date.now()}`

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-primary font-mono text-sm">
            <pre>{`
╔══════════════════════════════════════════════════════════════╗
║                    MARWAN AYMAN SHAWKY                      ║
║                  DevOps & Cloud Engineer                    ║
╚══════════════════════════════════════════════════════════════╝
            `}</pre>
          </div>

          <div className="space-y-6 text-foreground">
            <div className="text-lg">
              <span className="text-primary">$</span> whoami
            </div>
            <div className="pl-4 text-muted-foreground">
              Cloud & DevOps Engineer passionate about building scalable infrastructure,
              <br />
              automating deployments, and optimizing system performance.
            </div>

            <div className="text-lg">
              <span className="text-primary">$</span> ls -la skills/
            </div>
            <div className="pl-4 text-muted-foreground">
              drwxr-xr-x kubernetes docker terraform aws gcp ansible jenkins
            </div>

            <div className="text-lg">
              <span className="text-primary">$</span> cat contact.txt
            </div>
            <div className="pl-4 space-y-2">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-secondary">email:</span>
                <Link href="mailto:marwanayman.shawky@gmail.com" className="text-accent hover:text-accent/80 underline">
                  marwanayman.shawky@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-secondary">github:</span>
                <Link
                  href="https://github.com/maroayman"
                  target="_blank"
                  className="text-accent hover:text-accent/80 underline"
                >
                  github.com/maroayman
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-secondary">linkedin:</span>
                <Link
                  href="https://linkedin.com/in/maroayman"
                  target="_blank"
                  className="text-accent hover:text-accent/80 underline"
                >
                  linkedin.com/in/maroayman
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm">
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

            <div className="text-lg">
              <span className="text-primary">$</span> ./download_resume.sh
            </div>
            <div className="pl-4">
              <a href={resumeUrl} download="resume.pdf">
                <Button size="sm" variant="default" className="font-mono text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  Download Resume
                </Button>
              </a>
            </div>

            <div className="text-lg">
              <span className="text-primary">$</span> cd projects/
            </div>
            <div className="pl-4">
              <Link href="/projects">
                <Button size="sm" variant="default" className="font-mono text-xs">
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
