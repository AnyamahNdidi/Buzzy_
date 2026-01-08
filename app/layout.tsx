import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ReduxProvider } from "@/lib/redux/provider"

// Using Inter as a fallback font since Geist isn't available via Google Fonts
const inter = Inter({ subsets: ["latin"] })

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
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>
          {children}
          <Analytics />
        </ReduxProvider>
      </body>
    </html>
  )
}
