"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function NumberPicker() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [bonusNumbers, setBonusNumbers] = useState<number[]>([])

  const toggleNumber = (num: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : prev.length < 6 ? [...prev, num] : prev,
    )
  }

  const toggleBonus = (num: number) => {
    setBonusNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : prev.length < 1 ? [...prev, num] : prev,
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-bold uppercase">
              Quick Pick
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Pick Your Winning Numbers</h2>
          </div>

          <Card className="bg-card border-border p-8">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Pick Numbers ({selectedNumbers.length}/6)</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedNumbers([])}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-8 md:grid-cols-10 gap-3">
                  {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => toggleNumber(num)}
                      className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                        selectedNumbers.includes(num)
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Selected Numbers</h3>
                <div className="flex gap-3 mb-6">
                  {selectedNumbers.length > 0 ? (
                    selectedNumbers.map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg shadow-primary/50"
                      >
                        {num}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No numbers selected yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Bonus Number ({bonusNumbers.length}/1)</h3>
                <div className="grid grid-cols-8 md:grid-cols-10 gap-3 mb-6">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => toggleBonus(num)}
                      className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                        bonusNumbers.includes(num)
                          ? "bg-rose-500 text-white shadow-lg shadow-rose-500/50"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={selectedNumbers.length < 6 || bonusNumbers.length < 1}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Play Selected Numbers
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-card bg-transparent"
                >
                  Quick Pick
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
