import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-1">Are you lost?</p>
        <p className="text-muted-foreground mb-6">
          Page not found
        </p>
        
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
    </main>
  )
}
