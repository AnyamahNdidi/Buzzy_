import { Button } from "@/components/ui/button"
import { Trophy, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/Buzzycash Logo.png" 
              alt="BuzzyCash Logo" 
              className="h-10 w-auto"
            />
            
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Lotteries
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Winners
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Button variant="ghost" className="hidden md:inline-flex text-foreground">
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Join Now</Button>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
