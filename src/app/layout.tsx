import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VidyaYantra - The Interactive Knowledge Engine',
  description: 'Interactive L&D Portal with Live Coding, AI Tutor & Gamification. Learn by doing with 6 types of exercises, in-browser coding sandboxes, and AI-powered tutoring.',
  keywords: ['learning', 'coding', 'interactive', 'AI tutor', 'gamification', 'L&D'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
