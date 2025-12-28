"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { X, Play } from "lucide-react"

export function MonthlyJackpot() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  })
  const [showGamesModal, setShowGamesModal] = useState(false)
  const [showPlayModal, setShowPlayModal] = useState(false)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedOperator, setSelectedOperator] = useState("")

  const games = [
     {
      id: 1,
      name: "Ghana Jollof",
      shortCode: "*245#",
      color: "from-yellow-400 to-orange-500",
      image: "1.jpeg",
      tagline: "THE SECRET TO WINNING",
      subtitle: "IT'S IN THE JOLLOF!",
      description: "Get yourself locked up in this exciting game to win lots of cash. Be a part of this new trend in gaming.",
      instruction: "PLAY GHANAJOLLOF NOW on"
    },
    {
      id: 2,
      name: "Trotro",
      shortCode: "*245#",
      color: "from-blue-500 to-blue-700",
      image: "2.jpeg",
      tagline: "THE RACE FOR",
      subtitle: "THE SEAT",
      description: "Don't miss the TROTRO! Catch your seat & win cash instantly! Get yourself locked up in this exciting game to win lots of cash. Be a part of this new trend in gaming.",
      instruction: "PLAY TROTRO NOW on",
      specialNote: "BUS STOP"
    },
    // {
    //   id: 3,
    //   name: "Goldmine",
    //   shortCode: "*245#",
    //   color: "from-amber-600 to-yellow-700",
    //   image: "3.jpeg",
    //   tagline: "EVERY DIG COULD BE",
    //   subtitle: "YOUR BIG JACKPOT",
    //   description: "Get yourself locked up in this exciting game to win lots of cash. Be a part of this new trend in gaming.",
    //   instruction: "PLAY GOLDMINE NOW on"
    // },
    {
      id: 3,
      name: "Goldmine",
      shortCode: "*245#",
      color: "from-purple-500 to-pink-600",
      image: "4.jpeg",
      tagline: "YOU GOTTA BE IN IT",
      subtitle: "TO GET BUZZED!",
      description: "Get yourself locked up in this exciting game to win lots of cash. Be a part of this new trend in gaming.",
      instruction: "DIAL SHORT CODE"
    }
    // {
    //   id: 4,
    //   name: "BuzzyCash",
    //   shortCode: "*245#",
    //   color: "from-purple-500 to-pink-600",
    //   image: "4.jpeg",
    //   tagline: "YOU GOTTA BE IN IT",
    //   subtitle: "TO GET BUZZED!",
    //   description: "Get yourself locked up in this exciting game to win lots of cash. Be a part of this new trend in gaming.",
    //   instruction: "DIAL SHORT CODE"
    // }
  ]

  const operators = [
    { id: "mtn", name: "MTN", logo: "momo.jpg" },
    { id: "Telecel", name: "Telecel", logo: "telecel.jpg" },
    { id: "AirtelTigo", name: "AirtelTigo", logo: "airteltigo.jpg" }
  ]

  useEffect(() => {
    const targetDate = new Date('2025-12-20T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)))
      const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      const mins = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
      const secs = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000))

      setTimeLeft({ days, hours, mins, secs })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const handlePlayGame = (game: any) => {
    setSelectedGame(game)
    setShowGamesModal(false)
    setShowPlayModal(true)
    console.log("Playing game:", game.name)
  }

  const handleStartGame = () => {
    console.log("Starting game:", selectedGame?.name)
    console.log("Phone:", phoneNumber)
    console.log("Amount:", amount)
    console.log("Operator:", selectedOperator)
    // Add your game start logic here
    setShowPlayModal(false)
    setSelectedGame(null)
    setPhoneNumber("")
    setAmount("")
    setSelectedOperator("")
  }

  return (
    <>
      <section className="pb-20 pt-0 px-4 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-12">
            Participate in Monthly Jackpot By Playing Any Game
          </h2>

          <div className="bg-card/80 backdrop-blur-sm border-2 border-border rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Monthly Jackpot</h3>
              <div className="text-sm text-muted-foreground mt-2">Draw closes 20th of the next month</div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                  <span className="text-3xl md:text-5xl font-bold text-foreground">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground mt-3 font-medium">Days</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                  <span className="text-3xl md:text-5xl font-bold text-foreground">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground mt-3 font-medium">Hours</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                  <span className="text-3xl md:text-5xl font-bold text-foreground">
                    {timeLeft.mins.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground mt-3 font-medium">Mins</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-secondary/80 backdrop-blur-sm w-full aspect-square rounded-2xl flex flex-col items-center justify-center border border-border shadow-lg">
                  <span className="text-3xl md:text-5xl font-bold text-foreground">
                    {timeLeft.secs.toString().padStart(2, '0')}
                  </span>
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
                onClick={() => setShowGamesModal(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 py-6 text-lg font-bold shadow-lg hover:shadow-primary/50 transition-all"
              >
                Play Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Games Selection Modal */}
      {showGamesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border-2 border-border rounded-3xl p-6 max-w-[100rem] w-full max-h-[90vh] overflow-y-auto">
            <div className="relative mb-8">
              <h3 className="text-3xl font-bold text-foreground text-center">Select Your Game</h3>
              <button
                onClick={() => {
                  setShowGamesModal(false)
                  setSelectedGame(null)
                }}
                className="absolute right-0 top-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Game Cards Grid */}
            <div className="flex flex-col pb-4 md:flex-row md:flex-wrap md:justify-center gap-6 md:gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handlePlayGame(game)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.05] w-full md:w-64 hover:shadow-xl border-4 border-yellow-500 md:border-transparent md:hover:border-yellow-500"
                >
                  {/* Full Promotional Image */}
                  <div className="relative aspect-[3/4]">
                    <img 
                      src={game.image || "/placeholder.svg"} 
                      alt={game.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Game Name Badge - Top Left */}
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-bold text-sm">{game.name}</span>
                    </div>

                    {/* Play Now Badge - Bottom Right */}
                    <div className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-full transition-all group-hover:scale-110">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-primary-foreground" fill="currentColor" />
                        <span className="text-white font-bold text-sm">PLAY NOW</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Play Game Modal */}
      {showPlayModal && selectedGame && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#0a1628] to-[#1a2942] border-2 border-blue-500/30 rounded-3xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Play {selectedGame.name}</h3>
              <button
                onClick={() => {
                  setShowPlayModal(false)
                  setSelectedGame(null)
                  setPhoneNumber("")
                  setAmount("")
                  setSelectedOperator("")
                  setShowGamesModal(true)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Phone Number Input */}
            <div className="mb-6">
              <label className="block text-white text-center mb-3 font-medium">
                Enter your phone number
              </label>
              <input
                type="tel"
                placeholder="e.g., 0241234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent border-2 border-blue-500/50 rounded-xl px-4 py-3 text-blue-400 placeholder-blue-400/50 text-center focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-white text-center mb-3 font-medium">
                Enter an amount to play
              </label>
              <input
                type="text"
                placeholder="Play GHC 5 or more"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent border-2 border-blue-500/50 rounded-xl px-4 py-3 text-blue-400 placeholder-blue-400/50 text-center focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Mobile Money Operator Selection */}
            <div className="mb-8">
              <label className="block text-white text-center mb-4 font-medium">
                Choose Your Mobile Money Operator
              </label>
              <div className="flex justify-center gap-4">
                {operators.map((operator) => (
                  <button
                    key={operator.id}
                    onClick={() => setSelectedOperator(operator.id)}
                    className={`bg-white rounded-xl p-4 w-20 h-20 flex items-center justify-center transition-all hover:scale-110 ${
                      selectedOperator === operator.id ? 'ring-4 ring-blue-500' : ''
                    }`}
                  >
                    <img 
                      src={operator.logo} 
                      alt={operator.name} 
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleStartGame}
                disabled={!phoneNumber || !amount || !selectedOperator}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Playing
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}