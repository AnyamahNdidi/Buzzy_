// app/game-history/page.tsx
import { GameHistorySection } from "@/components/game-history-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function GameHistoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GameHistorySection />
      </main>
      <Footer />
    </div>
  )
}