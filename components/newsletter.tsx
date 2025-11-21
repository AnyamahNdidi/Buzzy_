import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/20 via-card to-card rounded-3xl p-8 md:p-12 border border-primary/20">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Join Our Newsletter</h2>

            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              Get exclusive lottery tips, winning strategies, and be the first to know about our biggest jackpots.
              Subscribe now and never miss a chance to win!
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground flex-1"
              />
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
                Subscribe Now
              </Button>
            </form>

            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
