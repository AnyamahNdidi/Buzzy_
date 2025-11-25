"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"

interface Result {
  status: "won" | "pending" | "lost"
  prize?: string
  drawNumber?: string
  drawDate?: string
  ticketNumber?: string
  phoneNumber?: string
}

export function CheckTicketSection() {
  const [ticketNumber, setTicketNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [result, setResult] = useState<Result | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckTicket = async () => {
    if (!ticketNumber.trim() || !phoneNumber.trim()) return
    
    setIsLoading(true)
    setResult(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock response - replace with actual API call
      const mockResponses: Result[] = [
        { 
          status: 'won', 
          prize: "$2,500", 
          drawNumber: `DRAW-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, 
          drawDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          ticketNumber: ticketNumber,
          phoneNumber: phoneNumber
        },
        { 
          status: 'pending', 
          drawNumber: `DRAW-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, 
          drawDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          ticketNumber: ticketNumber,
          phoneNumber: phoneNumber
        },
        { 
          status: 'lost', 
          drawNumber: `DRAW-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, 
          drawDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          ticketNumber: ticketNumber,
          phoneNumber: phoneNumber
        }
      ]
      
      setResult(mockResponses[Math.floor(Math.random() * mockResponses.length)])
    } catch (error) {
      console.error('Error checking ticket:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderResult = () => {
    if (!result) return null

    const statusConfig = {
      won: {
        title: "Congratulations!",
        message: `You've won ${result.prize}! We'll contact you at ${result.phoneNumber} to claim your prize.`,
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500",
        textColor: "text-green-400",
        icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      },
      pending: {
        title: "Draw Pending",
        message: "Your ticket is registered for the upcoming draw. Check back after the draw date to see if you've won!",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-400",
        icon: <Clock className="w-8 h-8 text-yellow-400" />,
      },
      lost: {
        title: "Better Luck Next Time",
        message: "Keep playing to win big!",
        bgColor: "bg-gray-500/20",
        borderColor: "border-gray-500",
        textColor: "text-gray-400",
        icon: <XCircle className="w-8 h-8 text-gray-400" />,
      },
    }

    const config = statusConfig[result.status]

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
              <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-1">
                <p className="text-sm text-gray-400"><span className="font-medium">Ticket:</span> <span className="font-mono">{result.ticketNumber}</span></p>
                <p className="text-sm text-gray-400"><span className="font-medium">Phone:</span> {result.phoneNumber}</p>
                <p className="text-sm text-gray-400"><span className="font-medium">Draw #:</span> {result.drawNumber}</p>
                <p className="text-sm text-gray-400"><span className="font-medium">Draw Date:</span> {result.drawDate}</p>
                {result.status === 'won' && result.prize && (
                  <p className="text-sm text-green-400 font-medium mt-2">Prize: {result.prize}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97716] to-[#FDB400] text-black px-6 py-1.5 rounded-full text-sm font-bold mb-4">
            CHECK RESULTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Check Your <span className="bg-gradient-to-r from-[#F97716] to-[#FDB400] text-transparent bg-clip-text">Ticket</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Enter your ticket and phone number to check if you've won
          </p>
        </div>

        {/* Input Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 mb-6 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ticket Number</label>
                <Input
                  type="text"
                  placeholder="e.g. TKT-123456"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 h-12 text-base"
                  maxLength={10}
                />
                <p className="text-xs text-gray-400 mt-1">Enter your 6-10 digit ticket number</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  value={phoneNumber}
                  onChange={(e) => {
                    // Allow only numbers
                    const value = e.target.value.replace(/\D/g, '')
                    // Limit to 11 digits
                    if (value.length <= 11) {
                      setPhoneNumber(value)
                    }
                  }}
                  className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 h-12 text-base"
                />
                <p className="text-xs text-gray-400 mt-1">Enter your 11-digit phone number</p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleCheckTicket}
                  disabled={!ticketNumber.trim() || !phoneNumber.trim() || isLoading}
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-[#F97716] to-[#FDB400] hover:from-[#E06A0F] hover:to-[#E8A01E] text-gray-900 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking...
                    </span>
                  ) : (
                    'Check Ticket Status'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Result Display */}
        {renderResult()}
      </div>
    </section>
  )
}