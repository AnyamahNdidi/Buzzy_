"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { useEffect, useState } from "react"

const lotteries = [
  {
    id: "#1",
    title: "Bingo Jackpot",
    price: "$958",
    logo: "/green-bingo-logo.jpg",
    color: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
  {
    id: "#2",
    title: "Euro Millions",
    price: "$958",
    logo: "/magenta-euro-millions-logo.jpg",
    color: "#d946ef",
    glowColor: "rgba(217, 70, 239, 0.5)",
  },
  {
    id: "#3",
    title: "Hot Lotto",
    price: "$958",
    logo: "/orange-oz-lotto-logo.jpg",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    id: "#4",
    title: "Florida Lottery",
    price: "$958",
    logo: "/red-lotto-logo.jpg",
    color: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.5)",
  },
  {
    id: "#5",
    title: "Bingo Jackpot",
    price: "$958",
    logo: "/green-bingo-logo.jpg",
    color: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
  {
    id: "#6",
    title: "OZ Lotto",
    price: "$958",
    logo: "/orange-oz-lotto-logo.jpg",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    id: "#7",
    title: "OZ Lotto",
    price: "$958",
    logo: "/orange-oz-lotto-logo.jpg",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    id: "#8",
    title: "Bingo Jackpot",
    price: "$958",
    logo: "/green-bingo-logo.jpg",
    color: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
]

const partners = [
  { name: "Airtable", logo: "/airtable-logo.png" },
  { name: "ClickUp", logo: "/clickup-logo.png" },
  { name: "Jotform", logo: "/jotform-logo.png" },
  { name: "LiveChat", logo: "/livechat-logo.jpg" },
  { name: "Pinterest", logo: "/pinterest-logo.png" },
]

function CountdownTimer() {
  const [time, setTime] = useState({ days: 46, hours: 0, minutes: 8, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-[#f59e0b] text-sm">
      <Clock className="w-4 h-4" />
      <span className="font-medium">
        Next Draw: {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
      </span>
    </div>
  )
}

export function TrendingLotteries() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Partners Section */}
        <div className="text-center mb-16 pb-12 border-b border-white/5">
          <p className="text-white/80 text-lg mb-6">
            Trusted By Over <span className="text-[#f59e0b] font-bold">12,500</span> Best Partner
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="w-8 h-8" />
                <span className="text-white font-semibold text-lg">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-12 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#f59e0b] text-black px-3 py-1 rounded text-sm font-bold">Top,</span>
              <span className="text-white/60 text-sm font-medium">Lottery Picks</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
              Trending Lotteries With
              <br />
              Big Payout
            </h2>
          </div>
          <div className="flex flex-col items-end gap-4">
            <p className="text-white/70 text-sm max-w-sm text-right text-balance">
              Experience The Excitement Of Playing The Most Popular Lotteries Worldwide, All In One Place.
            </p>
            <Button className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-6">
              Explore All →
            </Button>
          </div>
        </div>

        {/* Lottery Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lotteries.map((lottery, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20 transform hover:-translate-y-2 relative overflow-hidden group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Card Number Badge */}
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white/60 text-sm font-semibold z-10">
                {lottery.id}
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-[#f59e0b] text-black px-3 py-1 rounded text-sm font-bold z-10">
                {lottery.price}
              </div>

              {/* Logo with Glow */}
              <div className="flex items-center justify-center mb-6 mt-8 relative">
                <div
                  className="absolute inset-0 blur-2xl opacity-50 rounded-full"
                  style={{ backgroundColor: lottery.glowColor }}
                />
                <div
                  className="relative w-32 h-32 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: lottery.color }}
                >
                  <img
                    src={lottery.logo || "/placeholder.svg"}
                    alt={lottery.title}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4 text-center">{lottery.title}</h3>

              {/* Countdown Timer */}
              <div className="bg-white/5 border border-[#f59e0b]/30 rounded-lg p-3 mb-4">
                <CountdownTimer />
              </div>

              {/* Play Now Button */}
              <Button className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                Play Now →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
