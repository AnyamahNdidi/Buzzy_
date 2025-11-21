import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const stories = [
  {
    name: "Sarah Johnson",
    amount: "$1,250,000",
    image: "/happy-woman-winner.jpg",
    rating: 5,
    story:
      "I never thought this day would come! Won the jackpot on my first try. The platform is so easy to use and the payout was instant. Life-changing experience!",
  },
  {
    name: "Michael Chen",
    amount: "$850,000",
    image: "/happy-man-winner.png",
    rating: 5,
    story:
      "Incredible platform with transparent processes. I won big and received my prize within 24 hours. Highly recommend to anyone looking to try their luck!",
  },
  {
    name: "Emma Wilson",
    amount: "$500,000",
    image: "/happy-woman-celebrating.jpg",
    rating: 5,
    story:
      "Best lottery experience I've ever had. The interface is intuitive, and customer support is outstanding. My winnings changed my family's life forever.",
  },
]

export function SuccessStories() {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-bold uppercase">
            Winners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Success Stories From Our Winners</h2>
        </div>

        <p className="text-muted-foreground mb-12 max-w-2xl text-pretty">
          Real people, real wins. Read what our jackpot winners have to say about their life-changing experiences.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <Card key={index} className="bg-card border-border p-6 relative overflow-hidden">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10" />

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold text-foreground">{story.name}</h3>
                  <p className="text-2xl font-bold text-primary">{story.amount}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">{story.story}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
