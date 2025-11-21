"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const root = document.documentElement
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === "light") {
        root.classList.remove("dark")
      } else {
        root.classList.add("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "light") {
      root.classList.remove("dark")
    } else {
      root.classList.add("dark")
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground hover:bg-accent">
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
