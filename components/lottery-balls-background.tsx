"use client"

import { useEffect, useState } from "react"

interface Ball {
  id: number
  number: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
}

export function LotteryBallsBackground() {
  const [balls, setBalls] = useState<Ball[]>([])

  useEffect(() => {
    const colors = [
      "#EF4444", // red
      "#3B82F6", // blue
      "#10B981", // green
      "#FDB400", // yellow
      "#8B5CF6", // purple
      "#EC4899", // pink
    ]

    const initialBalls: Ball[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      number: Math.floor(Math.random() * 49) + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    }))

    setBalls(initialBalls)

    const interval = setInterval(() => {
      setBalls((prevBalls) =>
        prevBalls.map((ball) => {
          let newX = ball.x + ball.speedX
          let newY = ball.y + ball.speedY
          let newSpeedX = ball.speedX
          let newSpeedY = ball.speedY

          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            newSpeedX = -ball.speedX
            newX = Math.max(0, Math.min(100, newX))
          }
          if (newY <= 0 || newY >= 100) {
            newSpeedY = -ball.speedY
            newY = Math.max(0, Math.min(100, newY))
          }

          return {
            ...ball,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="absolute rounded-full shadow-2xl flex items-center justify-center font-bold text-white transition-all duration-100 ease-linear"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            backgroundColor: ball.color,
            transform: "translate(-50%, -50%)",
            fontSize: `${ball.size * 0.4}px`,
            boxShadow: `0 0 ${ball.size * 0.5}px ${ball.color}`,
          }}
        >
          {ball.number}
        </div>
      ))}
    </div>
  )
}
