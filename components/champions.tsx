import { Card } from "@/components/ui/card"
import { Trophy, TrendingUp } from "lucide-react"

const champions = [
  {
    name: "Alex Rodriguez",
    wins: "12",
    totalPrize: "$2.5M",
    image: "/winner-avatar-1.jpg",
    badge: "Gold",
  },
  {
    name: "Jessica Lee",
    wins: "10",
    totalPrize: "$1.8M",
    image: "/winner-avatar-2.jpg",
    badge: "Gold",
  },
  {
    name: "David Brown",
    wins: "8",
    totalPrize: "$1.2M",
    image: "/winner-avatar-3.jpg",
    badge: "Silver",
  },
  {
    name: "Maria Garcia",
    wins: "9",
    totalPrize: "$1.5M",
    image: "/winner-avatar-4.jpg",
    badge: "Gold",
  },
  {
    name: "James Wilson",
    wins: "7",
    totalPrize: "$950K",
    image: "/winner-avatar-5.jpg",
    badge: "Silver",
  },
  {
    name: "Sophie Martin",
    wins: "11",
    totalPrize: "$2.1M",
    image: "/winner-avatar-6.jpg",
    badge: "Gold",
  },
]

export function Champions() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-bold uppercase">
            Top Players
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Meet Our Latest Champions</h2>
        </div>

        <p className="text-muted-foreground mb-12 max-w-2xl text-pretty">
          Our top winners who have made it big with their lucky numbers. Join them on the winners' board today!
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {champions.map((champion, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-2 hover:scale-105 animate-in fade-in zoom-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: "500ms",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <img
                  src={champion.image || "/placeholder.svg"}
                  alt={champion.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                />
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {champion.badge}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{champion.name}</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Wins</p>
                  <p className="text-2xl font-bold text-primary">{champion.wins}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Prize</p>
                  <p className="text-2xl font-bold text-primary">{champion.totalPrize}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">Active Player</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
