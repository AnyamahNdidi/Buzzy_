"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Rocket, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-10 pb-0 md:py-20  overflow-hidden">
      {/* Lottery balls background image - Desktop only */}
      <div 
        className="hidden md:block absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-60"
        style={{
          backgroundImage: "url('/lottery-balls-bg.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      
      {/* Gradient overlay to blend the image */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent via-transparent to-gray-900/90 pointer-events-none" />

      {/* Floating gradient orbs with Framer Motion */}
      <motion.div 
        className="absolute left-0 top-20 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-400/30 via-pink-400/30 to-cyan-400/30 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-10 top-40 w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-cyan-400/40 via-blue-400/40 to-purple-400/40 blur-2xl"
        animate={{ 
          x: [0, -25, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute right-0 top-32 w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-cyan-400/30 blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 25, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute right-10 bottom-20 w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cyan-400/40 via-purple-400/40 to-pink-400/40 blur-2xl"
        animate={{ 
          x: [0, 35, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-[#FDB400] text-black px-6 py-2 rounded-lg font-bold text-sm md:text-base">
            Trusted instant and fastest payout
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-white">Play & win with <span className="bg-gradient-to-r from-[#F97716] from-23% to-[#FAB515] to-83% text-transparent bg-clip-text">buzzycash</span></span>
        </motion.h1>

        {/* Mobile Layout */}
        <div className="flex flex-col items-center space-y-8 md:hidden pb-10 relative">
          {/* Join Lottery Button - Moved to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="z-10"
          >
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-6 rounded-full text-lg group"
            >
              Play Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Total Players Circle */}
          {/* <motion.div 
            className="flex flex-col items-center mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.div 
              className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex flex-col items-center justify-center shadow-2xl shadow-cyan-500/50 border-4 border-white"
              animate={{ 
                rotate: [0, 5, -5, 5, 0],
                scale: [1, 1.05, 1, 1.03, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl font-bold text-white mb-1">🚀</div>
              <div className="text-4xl font-bold text-white">15M +</div>
              <div className="text-sm font-semibold text-white">Total Players</div>
            </motion.div>
          </motion.div> */}

          {/* Description Text */}
          <motion.p 
            className="hidden md:block text-white text-center max-w-sm text-base px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Join 5M+ Members In Thrilling, Secure, And Rewarding Lottery Gaming.
          </motion.p>

          {/* Avatar Group */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-blue-500 flex items-center justify-center text-white font-bold">J</div>
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-green-500 flex items-center justify-center text-white font-bold">K</div>
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-purple-500 flex items-center justify-center text-white font-bold">A</div>
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-pink-500 flex items-center justify-center text-white font-bold">M</div>
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-[#FDB400] flex items-center justify-center text-gray-900 font-bold">25+</div>
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.p 
            className="text-white text-center text-2xl max-w-sm  px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
           Where every ticket is a chance to change your life win more
          </motion.p>

          {/* Stats */}
          {/* <motion.div 
            className="flex gap-12 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#F97716] to-[#FAB515] text-transparent bg-clip-text">15M +</div>
              <div className="text-sm text-gray-400 mt-1">Total Winners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#F97716] to-[#FAB515] text-transparent bg-clip-text">5.2K +</div>
              <div className="text-sm text-gray-400 mt-1">Total Payouts</div>
            </div>
          </motion.div> */}
        </div>

          {/* Winner Image - Mobile - Positioned at bottom as semi-circle */}
          <motion.div 
            className="w-full mt-4 md:hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="w-full h-50 rounded-t-full bg-gradient-to-b from-[#FDB400] to-[#F97716] overflow-hidden shadow-2xl">
                <img
                  src="/backgroungI.png"
                  alt="Winner celebrating"
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>
          </motion.div>

        {/* Desktop Layout - Original Grid */}
        <div className="hidden md:grid lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          {/* Left: Circular player count badge */}
          <motion.div 
            className="flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex flex-col items-center justify-center shadow-2xl shadow-orange-500/50 border-4 border-white"
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.05, 1, 1.03, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-6xl md:text-7xl font-bold text-white mb-2">🎯</div>
                <div className="text-2xl md:text-3xl font-bold text-white text-center px-2">Monthly Draw</div>
                <div className="text-sm font-semibold text-white text-center px-4 mt-2">Every play enters you into our grand monthly draw</div>
              </motion.div>
            </div>
            <p className="text-white text-center lg:text-left mt-6 max-w-xs text-sm md:text-base">
              Every play enters a draw for the month
            </p>
          </motion.div>

          {/* Center: Winner with trophy in circular yellow frame */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="relative">
              {/* Yellow circular background with sideways animation */}
              <motion.div 
                className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#FDB400] overflow-hidden shadow-2xl shadow-yellow-400/50"
                animate={{ 
                  x: [0, 20, 0, -20, 0],
                  y: [0, -15, 0, 15, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/backgroungI.png"
                  alt="Winner celebrating with trophy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Decorative lottery balls at bottom with individual animations */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shadow-lg"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  5
                </motion.div>
                <motion.div 
                  className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -8, 0]
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  12
                </motion.div>
                <motion.div 
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-lg"
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 12, 0]
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  23
                </motion.div>
                <motion.div 
                  className="w-10 h-10 rounded-full bg-[#FDB400] flex items-center justify-center text-gray-900 font-bold shadow-lg"
                  animate={{ 
                    y: [0, -9, 0],
                    rotate: [0, -10, 0]
                  }}
                  transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                >
                  42
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: CTA and stats */}
          <motion.div 
            className="flex flex-col items-center lg:items-end space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-white text-center lg:text-right max-w-xs text-sm md:text-base">
              Where every ticket is a chance to change your life win more.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-6 rounded-full text-lg group"
              >
                Play now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-12 h-12 rounded-full bg-[#FDB400] flex items-center justify-center">
          <ArrowRight className="w-6 h-6 text-gray-900 rotate-90" />
        </div>
      </motion.div> */}
    </section>
  )
}