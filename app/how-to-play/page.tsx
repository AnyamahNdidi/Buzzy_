import { Header } from "@/components/header"
import Link from "next/link"

export const metadata = {
  title: "How to Play - Buzzycash Ghana",
  description: "Learn how to play Buzzycash Ghana games",
}

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
         <Header />
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-950 border-b border-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 text-balance">How to Play</h1>
          <p className="text-lg text-slate-300">Watch our video guide and learn the basics</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Video Section */}
        <div className="mb-16">
          <div className="relative w-full bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/QzuUmQkNTqM?si=T-x1oFYIEGPW-0lj"
              title="Buzzycash Ghana - How to Play"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-2xl"
            />
          </div>
        </div>

        {/* Written Guide */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-white mb-4">Getting Started with Buzzycash Ghana</h2>
            <p className="text-slate-300 leading-relaxed">
              Buzzycash Ghana brings exciting gaming opportunities to your mobile phone. Access our games anytime,
              anywhere by dialing <span className="text-yellow-400 font-semibold">*245#</span> on any mobile network. No
              internet connection needed!
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Three Games, Endless Possibilities</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-6 py-2">
                <h4 className="text-xl font-semibold text-yellow-400 mb-2">Ghana Jollof</h4>
                <p className="text-slate-300">
                  Pick the secret ingredient in our quick jollof cook-off game. Simple, fun, and rewarding!
                </p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-6 py-2">
                <h4 className="text-xl font-semibold text-yellow-400 mb-2">Gold Mine</h4>
                <p className="text-slate-300">
                  Dig deeper to find real gold! Test your luck and strategy as you decide when to cash out.
                </p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-6 py-2">
                <h4 className="text-xl font-semibold text-yellow-400 mb-2">TroTro</h4>
                <p className="text-slate-300">
                  Board the ride and choose when to get off. Every stop brings new possibilities and bigger rewards.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">How to Get Started</h3>
            <ol className="space-y-3 list-decimal list-inside text-slate-300">
              <li>
                Dial <span className="text-yellow-400 font-semibold">*245#</span> on any mobile network
              </li>
              <li>Create your account in less than a minute</li>
              <li>Fund your wallet via Mobile Money</li>
              <li>Choose your game and place your bet</li>
              <li>Watch as your winnings arrive instantly</li>
            </ol>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">Play Responsibly</h3>
            <p className="text-slate-300 mb-4">
              We're committed to promoting responsible gaming. Set limits on your spending, never chase losses, and
              remember - gaming should be fun and entertaining.
            </p>
            <p className="text-slate-300">
              If you or someone you know needs help with gaming habits, visit our{" "}
              <Link href="/responsible-gaming" className="text-yellow-400 hover:text-yellow-300 underline">
                Responsible Gaming
              </Link>{" "}
              page.
            </p>
          </section>

          <section className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Win?</h3>
            <p className="text-slate-300 mb-6">
              Join thousands of players on Buzzycash Ghana. Simply dial{" "}
              <span className="text-yellow-400 font-semibold">*245#</span> to start playing today!
            </p>
            <Link
              href="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}
