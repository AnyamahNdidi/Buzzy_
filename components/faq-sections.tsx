"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"

const faqs = [
  {
    category: "Wallet",
    question: "How do I fund my wallet?",
    answer: "You can fund your wallet using bank transfer, card payment, or cryptocurrency. Simply go to your wallet page and click 'Add Funds' to see all available options."
  },
  {
    category: "Wallet",
    question: "How do I withdraw my winnings?",
    answer: "Navigate to your wallet, click 'Withdraw', enter the amount and your preferred payment method. Withdrawals are processed within 24-48 hours."
  },
  {
    category: "Lottery",
    question: "How do I play the lottery?",
    answer: "Select your preferred lottery game, choose your numbers or use quick pick, confirm your ticket purchase, and wait for the draw. It's that simple!"
  },
  {
    category: "Account",
    question: "How do I verify my account?",
    answer: "Go to Settings > Verification, upload a valid government ID and proof of address. Verification typically takes 1-2 business days."
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative py-20 md:py-10 bg-gray-900 overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div 
        className="absolute left-0 top-20 w-48 h-48 rounded-full bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-cyan-400/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute right-0 bottom-20 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-[#FDB400] text-black px-4 py-1 rounded-lg font-bold text-sm mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Find answers to common questions about BuzzyCash lottery platform.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-xl border transition-colors duration-300 ${
                  openIndex === index
                    ? "bg-gray-800/50 border-cyan-400/50"
                    : "bg-gray-800/30 border-gray-700 hover:border-gray-600"
                }`}
              >
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-[#FDB400] text-black text-xs font-bold px-3 py-1 rounded-md">
                      {faq.category}
                    </span>
                    <span className="text-white font-medium">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.p 
                        className="px-4 pb-4 text-gray-400 text-sm leading-relaxed"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* More Link */}
            <motion.button 
              className="flex items-center gap-2 text-[#FDB400] font-semibold mt-6"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              More <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Illustration Placeholder */}
          <motion.div 
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              {/* FAQ Letters */}
              <div className="text-[180px] font-black leading-none text-[#FDB400] opacity-90 select-none flex">
                <motion.span 
                  className="inline-block"
                  animate={{ rotate: [-12, -8, -12] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  F
                </motion.span>
                <motion.span 
                  className="inline-block"
                  animate={{ rotate: [6, 10, 6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  A
                </motion.span>
                <motion.span 
                  className="inline-block"
                  animate={{ rotate: [-6, -2, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  Q
                </motion.span>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-gray-700 rounded-lg px-3 py-2">
                  <span className="text-[#FDB400] text-xl font-bold">?</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-8 -right-8"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="bg-gray-700 rounded-lg px-3 py-1 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <div className="w-6 h-1 rounded bg-gray-500"></div>
                </div>
              </motion.div>

              {/* Cyan accent circle */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-cyan-400/30 blur-xl" />
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#FDB400]/30 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}