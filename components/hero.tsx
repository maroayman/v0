import Link from "next/link"
import { Github, Linkedin, Mail, FileText } from "lucide-react"
import { HashnodeIcon } from "@/components/icons/hashnode-icon"

const GitLabIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
  </svg>
)

export function Hero() {
  return (
    <header className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Marwan Ayman Shawky</h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
          Cloud & DevOps Engineer passionate about building scalable infrastructure, automating deployments, and optimizing system performance.
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm mb-6">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <Link 
              href="mailto:marwanayman.shawky@gmail.com" 
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              marwanayman.shawky@gmail.com
            </Link>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/maroayman" 
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link 
              href="https://gitlab.com/maroayman" 
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitLab"
            >
              <GitLabIcon className="h-5 w-5" />
            </Link>
            <Link 
              href="https://linkedin.com/in/maroayman" 
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="https://hashnode.com/@maroayman" 
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Hashnode Blog"
            >
              <HashnodeIcon className="h-5 w-5" />
            </Link>
          </div>
          
          <Link 
            href="/resume.pdf" 
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border rounded-md hover:bg-muted transition-colors"
          >
            <FileText className="h-4 w-4" />
            Resume
          </Link>
        </div>
      </div>
    </header>
  )
}
