import { Header } from "@/components/header"
import  {HeroSection }from "@/components/hero-section"
import { RecentWinners } from "@/components/recent-winners"
import { TrendingLotteries } from "@/components/trending-lotteries"
import { SelectGame } from "@/components/select-game"
import { MonthlyJackpot } from "@/components/monthly-jackpot"
import { NumberPicker } from "@/components/number-picker"
import { SuccessStories } from "@/components/success-stories"
import { Champions } from "@/components/champions"
import { WaysToPlay } from "@/components/ways-to-play"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { LotteryBallsBackground } from "@/components/lottery-balls-background"
import { FAQSection } from "@/components/faq-sections"
import { CheckTicketSection } from "@/components/check-ticket-section"
import { VideoGuide } from "@/components/video-guide"

export default function Page() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* <LotteryBallsBackground /> */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <MonthlyJackpot />
          {/* <RecentWinners /> */}
          {/* <TrendingLotteries /> */}
          <SelectGame />
          
          {/* <NumberPicker /> */}
          {/* <SuccessStories /> */}
          <CheckTicketSection/>
          {/* <Champions /> */}
          <VideoGuide/>

          {/* <WaysToPlay /> */}
          {/* <Newsletter /> */}
           <FAQSection/>
        </main>
        <Footer />
      </div>
    </div>
  )
}
