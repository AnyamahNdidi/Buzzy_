import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Monitor, Users } from "lucide-react"

const ways = [
  {
    title: "Mobile App",
    description: "Play anywhere, anytime with our mobile app. Available on iOS and Android.",
    image: "/people-using-mobile-lottery-app.jpg",
    icon: Smartphone,
  },
  {
    title: "Desktop Platform",
    description: "Full-featured desktop experience with advanced analytics and tracking.",
    image: "/person-using-desktop-lottery-platform.jpg",
    icon: Monitor,
  },
  {
    title: "Group Play",
    description: "Join syndicates and increase your chances of winning together.",
    image: "/group-of-people-celebrating-lottery-win.jpg",
    icon: Users,
  },
]

export function WaysToPlay() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-bold uppercase">
            Play Anywhere
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Innovative Ways To Play</h2>
        </div>

        <p className="text-muted-foreground mb-12 max-w-2xl text-pretty">
          Choose how you want to play. Multiple platforms, one winning experience. Your lucky numbers are always at your
          fingertips.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ways.map((way, index) => {
            const Icon = way.icon
            return (
              <Card
                key={index}
                className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-2 hover:scale-105 animate-in fade-in zoom-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationDuration: "600ms",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={way.image || "/placeholder.svg"}
                    alt={way.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{way.title}</h3>
                  <p className="text-muted-foreground mb-4 text-pretty">{way.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-secondary bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
