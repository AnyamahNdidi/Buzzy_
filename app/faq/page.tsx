
"use client"
 
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const faqs:any = [
    {
    category: "General",
    question: "What is Buzzycash?",
    answer: "Buzzycash is a digital gaming platform that allows users to play engaging games and stand a chance to win cash rewards through USSD, Mobile Web, and Telegram."
  },
  {
    category: "Access",
    question: "How can I access Buzzycash?",
    answer: "You can access Buzzycash through:\n• USSD: Dial *245#\n• Mobile Web: Visit the official Buzzycash website\n• Telegram: Via the official Buzzycash Telegram channel."
  },
  {
    category: "Access",
    question: "Do I need Internet to play?",
    answer: "If you are using USSD (*245#), you do not need internet access. However, Mobile Web and Telegram require an internet connection."
  },
  {
    category: "Games",
    question: "What games are available on Buzzycash?",
    answer: "Buzzycash currently offers:\n• Ghana Jollof\n• Gold Mine\n• Trotro"
  },
  {
    category: "Payment",
    question: "What is the minimum amount required to play?",
    answer: "The minimum stake to play on Buzzycash is GHS 1. Players may stake higher amounts based on their preference."
  },
  {
    category: "How to Play",
    question: "How do I play?",
    answer: "Dial *245#, select your preferred game, choose your stake amount, confirm the transaction, and enter your PIN to complete your play."
  },
  {
    category: "Promotions",
    question: "How do I qualify for promotions or raffles?",
    answer: "To qualify for any ongoing promotion or raffle, simply play with the required minimum stake. The more you play, the higher your chances of qualifying."
  },
  {
    category: "Winning",
    question: "How are winners selected?",
    answer: "Winners are selected through a secure and transparent system process in accordance with the rules of each game or promotional draw."
  },
  {
    category: "Winning",
    question: "How will I know if I win?",
    answer: "All winners receive an official SMS notification confirming their win."
  },
  {
    category: "Winning",
    question: "How are winnings paid?",
    answer: "Winnings are credited directly to the same Mobile Money wallet used for the transaction."
  },
  {
    category: "General",
    question: "Can I play multiple times?",
    answer: "Yes. There is no restriction on the number of times a user can play."
  },
  {
    category: "Eligibility",
    question: "Who is eligible to play?",
    answer: "Buzzycash is available to individuals who meet the legal age requirement and who reside in Ghana or have a valid Ghanaian mobile number."
  },
  {
    category: "Support",
    question: "What should I do if my transaction fails?",
    answer: "If a transaction fails but your wallet is debited, the amount will be automatically reversed."
  }
  
]

// export const metadata = {
//   title: "FAQ - Buzzycash Ghana",
//   description: "Frequently asked questions about Buzzycash Ghana",
// }

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
      <Header />
      
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-950 border-b border-slate-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 text-balance">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-300">Find answers to common questions about BuzzyCash</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {faqs.map((faq:any, index:any) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 ${
                openIndex === index
                  ? "bg-slate-800/50 border-yellow-400/50"
                  : "bg-slate-800/30 border-slate-700 hover:border-slate-600"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <div className="flex items-center gap-4">
                  <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-md">
                    {faq.category}
                  </span>
                  <span className="text-white font-medium text-lg">{faq.question}</span>
                </div>
                <div
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-yellow-400" />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-300 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-6">Still have questions? Contact our support team for assistance.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-yellow-400 hover:bg-yellow-500 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}