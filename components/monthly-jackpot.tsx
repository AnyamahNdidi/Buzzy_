"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function MonthlyJackpot() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 1,
    mins: 2,
    secs: 3,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs } = prev

        if (secs > 0) {
          secs--
        } else {
          secs = 59
          if (mins > 0) {
            mins--
          } else {
            mins = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, mins, secs }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
          Participate in Monthly Jackpot
        </h2>

        <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-3xl p-8 md:p-12 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">Monthly Jackpot</h3>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-foreground">{timeLeft.days}</span>
              </div>
              <span className="text-sm text-muted-foreground mt-3 font-medium">Days</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-foreground">{timeLeft.hours}</span>
              </div>
              <span className="text-sm text-muted-foreground mt-3 font-medium">Hours</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-foreground">{timeLeft.mins}</span>
              </div>
              <span className="text-sm text-muted-foreground mt-3 font-medium">Mins</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-foreground">{timeLeft.secs}</span>
              </div>
              <span className="text-sm text-muted-foreground mt-3 font-medium">Secs</span>
            </div>
          </div>

          {/* Minimum Play */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Minimum Play: <span className="font-bold text-foreground">500</span>
            </p>
          </div>

          {/* Play Now Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 py-6 text-lg font-bold shadow-lg hover:shadow-primary/50 transition-all"
            >
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
