import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import Footer from "../widgets/footer"
import Header from "@/widgets/header"
import Sidebar from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Real Estate Marketplace",
  description: "Find your dream property",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <main className="min-h-screen pl-4 pr-4 pt-5">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

