'use client'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trophy, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Game History', href: '/game-history', current: false },
  { name: 'Winners', href: '#', current: false },
  { name: 'How To Play', href: '/how-to-play', current: false },
  { name: 'Terms', href: '/terms-and-conditions', current: false },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="relative border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
            {navigation.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`${item.current ? 'text-foreground' : 'text-muted-foreground'} hover:text-primary transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Button variant="ghost" className="hidden md:inline-flex text-foreground">
              Sign In
            </Button>
            {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Now
            </Button> */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          navigation={navigation} 
          onClose={() => setMobileMenuOpen(false)} 
        />
      </div>
    </header>
  )
}

interface MobileMenuProps {
  isOpen: boolean
  navigation: Array<{ name: string; href: string; current: boolean }>
  onClose: () => void
}

function MobileMenu({ isOpen, navigation, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            height: 'auto',
            transition: { 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smoother animation
              opacity: { duration: 0.2 }
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            height: 0,
            transition: { 
              duration: 0.3,
              ease: [0.4, 0, 1, 1] // Faster exit
            }
          }}
          className="md:hidden overflow-hidden absolute left-0 right-0 z-50 bg-card shadow-lg"
        >
          <div className="pt-4 pb-6 px-4 space-y-6">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`text-lg font-medium px-3 py-2 rounded-md transition-colors ${
                    item.current 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
            <div className="pt-4 border-t border-border">
              <Button className="w-full mb-3">
                Join Now
              </Button>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
