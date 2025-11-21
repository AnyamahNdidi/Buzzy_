import { Button } from "@/components/ui/button"
import { QrCode, ExternalLink } from "lucide-react"

export function SelectGame() {
  const games = [
    {
      id: 1,
      name: "Ghana Jollof",
      price: "$24.95",
      color: "from-yellow-400 to-orange-500",
      image: "/delicious-jollof-rice-plate.jpg",
      tagline: "THE SECRET TO WINNING? IT'S IN THE JOLLOF",
      subtitle: "play GHANAJOLLOF NOW on",
    },
    {
      id: 2,
      name: "Trotro",
      price: "$24.95",
      color: "from-blue-500 to-blue-700",
      image: "/blue-trotro-minibus-car.jpg",
      tagline: "THE RACE FOR THE PRIZE!",
      subtitle: "play TROTRO NOW on",
    },
    {
      id: 3,
      name: "Goldmine",
      price: "$24.95",
      color: "from-amber-600 to-yellow-700",
      image: "/gold-mining-treasure-skull.jpg",
      tagline: "EVERY DIG COULD BE YOUR BIG JACKPOT",
      subtitle: "play GOLDMINE NOW on",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Select Game</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative rounded-3xl overflow-hidden border-2 border-border bg-card hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10`} />

              <div className="relative p-6">
                {/* Header with ID and Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                    <span className="text-sm font-medium text-muted-foreground">#{game.id}</span>
                  </div>
                  <div className="bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border border-primary">
                    <span className="text-sm font-bold text-primary">{game.price}</span>
                  </div>
                </div>

                {/* Game Image */}
                <div className="relative aspect-video mb-6 rounded-xl overflow-hidden">
                  <img src={game.image || "/placeholder.svg"} alt={game.name} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-30`} />
                </div>

                {/* Game Info */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold text-foreground text-center">{game.name}</h3>
                  <p className="text-xs text-center text-muted-foreground uppercase tracking-wide">{game.tagline}</p>
                  <p className="text-xs text-center text-muted-foreground">{game.subtitle}</p>
                </div>

                {/* QR Codes and Link Icons */}
                <div className="flex items-center justify-around mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-background/50 rounded-lg flex items-center justify-center border border-border">
                      <QrCode className="w-6 h-6 text-foreground" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-background/50 rounded-lg flex items-center justify-center border border-border">
                      <QrCode className="w-6 h-6 text-foreground" />
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-center text-muted-foreground mb-4 leading-tight">
                  Get yourself hooked up to the exciting world of {game.name}. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs border-border hover:bg-accent bg-transparent"
                  >
                    Learn More
                  </Button>
                  <Button size="sm" className="rounded-full text-xs bg-primary hover:bg-primary/90">
                    Play Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
