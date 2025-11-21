import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BuzzyCash - Win Big With BuzzyCash",
  description:
    "Experience the thrill of winning with our secure, transparent lottery platform. Choose from trending lotteries with massive jackpots.",
  generator: "BuzzyCash",
  icons: {
    icon: [
      {
        url: "/Buzzycash Logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Buzzycash Logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Buzzycash Logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/Buzzycash Logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
