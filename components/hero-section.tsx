
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Rocket, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Lottery balls background image */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-60"
        style={{
          backgroundImage: "url('/lottery-balls-bg.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      
      {/* Gradient overlay to blend the image */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent via-transparent to-gray-900/90 pointer-events-none" />

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
            Secure, Trusted, And Fast Lottery Experience.
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-white">Win Big With <span className="bg-gradient-to-r from-[#F97716] from-23% to-[#FAB515] to-83% text-transparent bg-clip-text">BuzzyCash</span></span>
          <br />
          <span className="text-cyan-400">Winning</span> <span className="text-white">Daily</span>
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
          {/* Left: Circular player count badge */}
          <motion.div 
            className="flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-cyan-400 flex flex-col items-center justify-center shadow-2xl shadow-cyan-400/50"
                animate={{ 
                  x: [0, 15, 0, -15, 0],
                  y: [0, -10, 0, 10, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <Rocket className="w-12 h-12 md:w-16 md:h-16 text-gray-900 mb-2" />
                <div className="text-4xl md:text-5xl font-bold text-gray-900">15M+</div>
                <div className="text-sm md:text-base font-semibold text-gray-900">Total Players</div>
              </motion.div>
            </div>
            <p className="text-white text-center lg:text-left mt-6 max-w-xs text-sm md:text-base">
              Join 5M+ Members In Thrilling, Secure, And Rewarding Lottery Gaming.
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
              Welcome To The Ultimate Lottery Experience, Where Every Ticket Is A Chance To Change Your Life.
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

            {/* Stats */}
            <div className="flex gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white">15M+</div>
                <div className="text-sm text-gray-400">Total Winners</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white">5.2K+</div>
                <div className="text-sm text-gray-400">Total Payouts</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-12 h-12 rounded-full bg-[#FDB400] flex items-center justify-center">
          <ArrowRight className="w-6 h-6 text-gray-900 rotate-90" />
        </div>
      </motion.div>
    </section>
  )
}