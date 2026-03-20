import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { NavbarClient } from '@/components/NavbarClient'

export const metadata: Metadata = {
  title: 'VidyaYantra - Learn Smarter',
  description: 'World-class e-learning for school kids Classes 1-10',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-[#0F0F1A] min-h-screen flex flex-col">
        <NavbarClient />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-[#2A2A4A]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <span className="text-white font-semibold text-base tracking-tight">VidyaYantra</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">Making quality education accessible to every student in India.</p>
              </div>
              <div>
                <h4 className="text-gray-300 font-semibold text-sm mb-4">Platform</h4>
                <div className="space-y-2.5">
                  <Link href="/courses" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">All Courses</Link>
                  <Link href="/dashboard" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">Dashboard</Link>
                  <Link href="/playground" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">Lab</Link>
                  <Link href="/ai-generate" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">AI Studio</Link>
                </div>
              </div>
              <div>
                <h4 className="text-gray-300 font-semibold text-sm mb-4">Subjects</h4>
                <div className="space-y-2.5">
                  <span className="block text-gray-500 text-sm">Mathematics</span>
                  <span className="block text-gray-500 text-sm">Science</span>
                  <span className="block text-gray-500 text-sm">English</span>
                  <span className="block text-gray-500 text-sm">Hindi</span>
                </div>
              </div>
              <div>
                <h4 className="text-gray-300 font-semibold text-sm mb-4">Classes</h4>
                <div className="space-y-2.5">
                  <Link href="/courses" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">Classes 1-2</Link>
                  <Link href="/courses" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">Classes 3-5</Link>
                  <Link href="/courses" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">Classes 6-8</Link>
                  <Link href="/courses" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200">Classes 9-10</Link>
                </div>
              </div>
            </div>
            <div className="border-t border-[#2A2A4A] mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm">VidyaYantra - Making learning accessible for every child</p>
              <p className="text-gray-700 text-xs">Built for Classes 1-10</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
