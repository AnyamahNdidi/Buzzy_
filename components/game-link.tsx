'use client'

import { FC, MouseEvent } from 'react'

interface GameLinkProps {
  children: React.ReactNode
}

const GameLink: FC<GameLinkProps> = ({ children }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const gameSection = document.getElementById('game-selection')
    if (gameSection) {
      gameSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href="#"
      className="text-muted-foreground hover:text-primary transition-colors"
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default GameLink