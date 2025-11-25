"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, TrendingUp, Trophy, Zap, Clock, X } from "lucide-react"

interface GameRecord {
  id: string
  gameType: string
  drawDate: string
  ticketNumbers: string[]
  result: "won" | "lost" | "pending"
  prize?: string
  multiplier?: number
}

const mockGameHistory: GameRecord[] = [
  {
    id: "1",
    gameType: "Mega Power",
    drawDate: "Nov 24, 2025",
    ticketNumbers: ["245891", "356702"],
    result: "won",
    prize: "$2,500",
    multiplier: 50,
  },
  {
    id: "2",
    gameType: "Fortune Tiger",
    drawDate: "Nov 22, 2025",
    ticketNumbers: ["128947"],
    result: "lost",
  },
  {
    id: "3",
    gameType: "Monthly Jackpot",
    drawDate: "Nov 20, 2025",
    ticketNumbers: ["654321", "789456"],
    result: "won",
    prize: "$1,200",
    multiplier: 24,
  },
  {
    id: "4",
    gameType: "Lucky Spin",
    drawDate: "Nov 18, 2025",
    ticketNumbers: ["512345"],
    result: "lost",
  },
  {
    id: "5",
    gameType: "Buzzy Cash",
    drawDate: "Nov 15, 2025",
    ticketNumbers: ["987654", "456789", "123456"],
    result: "pending",
  },
  {
    id: "6",
    gameType: "Daily Draw",
    drawDate: "Nov 12, 2025",
    ticketNumbers: ["654123"],
    result: "won",
    prize: "$500",
    multiplier: 10,
  },
]

export function GameHistorySection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<"all" | "won" | "lost" | "pending">("all")

  const filteredHistory = mockGameHistory.filter(
    (record) => filterStatus === "all" || record.result === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "lost":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won":
        return <Trophy className="w-4 h-4" />
      case "lost":
        return <X className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "won":
        return "Won"
      case "lost":
        return "No Win"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  const totalWinnings = mockGameHistory
    .filter((r) => r.result === "won" && r.prize)
    .reduce((sum, r) => {
      const prizeAmount = Number.parseInt(r.prize?.replace("$", "").replace(",", "") || "0")
      return sum + prizeAmount
    }, 0)

  const totalGames = mockGameHistory.length
  const wonGames = mockGameHistory.filter((r) => r.result === "won").length

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0F172A] to-[#1E293B] min-h-screen">
      <div className="max-w-6xl mx-auto relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-orange-500/5 rounded-full filter blur-3xl"></div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F97716] to-[#FDB400] text-black px-6 py-1.5 rounded-full text-sm font-bold mb-4">
            <Zap className="w-4 h-4" />
            YOUR GAME HISTORY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Your <span className="bg-gradient-to-r from-[#F97716] to-[#FDB400] text-transparent bg-clip-text">Game Records</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track all your past games and winnings in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-6 hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Games</p>
                <p className="text-3xl font-bold text-white">{totalGames}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </Card>

          <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-6 hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Games Won</p>
                <p className="text-3xl font-bold text-green-400">{wonGames}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm p-6 hover:bg-gray-800/70 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Winnings</p>
                <p className="text-3xl font-bold text-yellow-400">
                  ${totalWinnings.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {(["all", "won", "lost", "pending"] as const).map((status) => (
            <Button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`h-10 px-5 rounded-full text-sm font-medium transition-all ${
                filterStatus === status
                  ? "bg-gradient-to-r from-[#F97716] to-[#FDB400] text-gray-900 hover:from-[#E06A0F] hover:to-[#E8A01E] shadow-lg shadow-yellow-500/20"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600 hover:border-gray-500"
              }`}
            >
              {status === "all" ? "All Games" : status}
            </Button>
          ))}
        </div>

        {/* Game History List */}
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((record) => (
              <Card
                key={record.id}
                className="border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-gray-600 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
                  className="w-full p-5 text-left hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          {getStatusIcon(record.result)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{record.gameType}</h3>
                          <p className="text-sm text-gray-400">{record.drawDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      {record.result === "won" && (
                        <div className="text-right">
                          <p className="text-lg font-bold bg-gradient-to-r from-[#F97716] to-[#FDB400] text-transparent bg-clip-text">
                            {record.prize}
                          </p>
                          {record.multiplier && (
                            <p className="text-xs text-yellow-400">x{record.multiplier} Multiplier</p>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <Badge 
                          className={`${getStatusColor(record.result)} px-3 py-1.5 text-sm font-medium flex items-center gap-1.5`}
                        >
                          {getStatusIcon(record.result)}
                          {getStatusLabel(record.result)}
                        </Badge>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedId === record.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {expandedId === record.id && (
                  <div className="border-t border-gray-700 bg-gray-900/30 p-5 space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Ticket Numbers</p>
                      <div className="flex flex-wrap gap-2">
                        {record.ticketNumbers.map((ticket, idx) => (
                          <Badge 
                            key={idx} 
                            className="bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 px-3 py-1.5 font-mono text-sm"
                          >
                            {ticket}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <Button 
                        className="h-12 bg-gradient-to-r from-[#F97716] to-[#FDB400] text-gray-900 hover:from-[#E06A0F] hover:to-[#E8A01E] font-semibold"
                      >
                        View Game Details
                      </Button>
                      {record.result === "won" ? (
                        <Button
                          variant="outline"
                          className="h-12 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50 font-semibold"
                        >
                          Claim Prize
                        </Button>
                      ) : record.result === "pending" ? (
                        <Button
                          variant="outline"
                          className="h-12 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/50 font-semibold"
                          disabled
                        >
                          Drawing Soon
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="h-12 border-gray-500/30 text-gray-400 hover:bg-gray-500/10 hover:border-gray-500/50 font-semibold"
                        >
                          Try Again
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <div className="text-center py-16 bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-700">
              <div className="max-w-md mx-auto">
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
                <p className="text-gray-400 mb-6">
                  {filterStatus === "all" 
                    ? "You haven't played any games yet." 
                    : `You don't have any ${filterStatus} games.`}
                </p>
                <Button
                  onClick={() => setFilterStatus("all")}
                  variant="outline"
                  className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/50"
                >
                  View All Games
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}