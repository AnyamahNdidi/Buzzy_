"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Check, AlertCircle } from "lucide-react"

interface TicketResult {
  ticketNumber: string
  status: "won" | "pending" | "lost" | null
  prize?: string
  drawDate?: string
}

export function CheckTicketSection() {
  const [ticketNumber, setTicketNumber] = useState("")
  const [result, setResult] = useState<TicketResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckTicket = async () => {
    if (!ticketNumber.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockStatuses: Array<"won" | "pending" | "lost"> = ["won", "pending", "lost"]
      const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)]

      setResult({
        ticketNumber,
        status: randomStatus,
        prize: randomStatus === "won" ? `$${Math.floor(Math.random() * 10000) + 100}` : undefined,
        drawDate: "Nov 25, 2025",
      })
      setIsLoading(false)
    }, 800)
  }

  const handleClear = () => {
    setTicketNumber("")
    setResult(null)
  }

  const getResultDisplay = () => {
    if (!result) return null

    const statusConfig = {
      won: {
        title: "🎉 Congratulations!",
        message: `You won ${result.prize}!`,
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500",
        textColor: "text-green-400",
        icon: <Check className="w-8 h-8 text-green-400" />,
      },
      pending: {
        title: "Draw Pending",
        message: "Your ticket is still active for upcoming draws",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500",
        textColor: "text-blue-400",
        icon: <AlertCircle className="w-8 h-8 text-blue-400" />,
      },
      lost: {
        title: "Better Luck Next Time",
        message: "Keep playing to win big!",
        bgColor: "bg-gray-500/20",
        borderColor: "border-gray-500",
        textColor: "text-gray-400",
        icon: <AlertCircle className="w-8 h-8 text-gray-400" />,
      },
    }

    const config = statusConfig[result.status!]

    return (
      <div className="max-w-md mx-auto">
          <Card className={`border-2 ${config.borderColor} ${config.bgColor} p-6 mt-6 backdrop-blur-sm overflow-hidden`}>
            <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-white/5 rounded-full"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${config.bgColor} flex items-center justify-center`}>
                  {config.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold ${config.textColor} mb-1`}>{config.title}</h3>
                <p className="text-gray-300">{config.message}</p>
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <p className="text-sm text-gray-400"><span className="font-medium">Ticket:</span> <span className="font-mono">{result.ticketNumber}</span></p>
                  <p className="text-sm text-gray-400"><span className="font-medium">Draw Date:</span> {result.drawDate}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
    )
  }

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-[#F97716] to-[#FDB400] text-black px-6 py-1.5 rounded-full text-sm font-bold mb-4">
            CHECK RESULTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Check Your <span className="bg-gradient-to-r from-[#F97716] to-[#FDB400] text-transparent bg-clip-text">Ticket</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Enter your ticket number to see if you've won big in our latest draw!</p>
        </div>

        {/* Input Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 mb-6 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Enter Ticket Number</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="e.g. TKT-123456"
                      value={ticketNumber}
                      onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleCheckTicket()}
                      className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 h-12 md:h-14 text-base"
                      maxLength={10}
                    />
                  </div>
                  <Button
                    onClick={handleCheckTicket}
                    disabled={!ticketNumber.trim() || isLoading}
                    className="h-12 md:h-14 px-8 text-base font-semibold bg-gradient-to-r from-[#F97716] to-[#FDB400] hover:from-[#E06A0F] hover:to-[#E8A01E] text-gray-900 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checking...
                      </span>
                    ) : (
                      'Check Now'
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Enter your 6-10 digit ticket number to check the results</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Result Display */}
        {result && getResultDisplay()}

        {/* Clear Button */}
        {result && (
          <div className="text-center mt-8">
            <Button
              onClick={handleClear}
              variant="outline"
              className="h-12 px-8 text-base font-medium border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500 hover:text-yellow-400 transition-colors duration-200"
            >
              Check Another Ticket
            </Button>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <Card className="border border-gray-700 bg-gray-800/50 p-6 text-center hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">24/7</h4>
            <p className="text-gray-300">Check your tickets anytime, from anywhere</p>
          </Card>
          
          <Card className="border border-gray-700 bg-gray-800/50 p-6 text-center hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Instant</h4>
            <p className="text-gray-300">Get results immediately after each draw</p>
          </Card>
          
          <Card className="border border-gray-700 bg-gray-800/50 p-6 text-center hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Secure</h4>
            <p className="text-gray-300">Your data is encrypted and protected</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
