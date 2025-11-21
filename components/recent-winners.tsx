"use client"

import { Star } from "lucide-react"

const winners = [
  { amount: "5,000,000", phone: "+233 801 *** 5678", date: "30/08/2025" },
  { amount: "5,000,000", phone: "+233 801 *** 5678", date: "30/08/2025" },
  { amount: "5,000,000", phone: "+233 801 *** 5678", date: "30/08/2025" },
  { amount: "5,000,000", phone: "+233 801 *** 5678", date: "30/08/2025" },
  { amount: "5,000,000", phone: "+233 801 *** 5678", date: "30/08/2025" },
  { amount: "5,000,000", phone: "+233 801 *** 5678", date: "30/08/2025" },
]

export function RecentWinners() {
  return (
    <section className="py-8 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">Recent Big Winners</h2>

        {/* Scrolling ticker */}
        <div className="relative">
          <div className="flex animate-scroll whitespace-nowrap">
            {/* Duplicate the winners array to create seamless loop */}
            {[...winners, ...winners, ...winners].map((winner, index) => (
              <div key={index} className="inline-flex items-center mx-8 flex-shrink-0">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{winner.amount}</div>
                  <div className="text-sm md:text-base text-white/90 font-medium">{winner.phone}</div>
                  <div className="text-xs md:text-sm text-white/80">{winner.date}</div>
                </div>
                <Star className="w-6 h-6 text-white fill-white ml-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
