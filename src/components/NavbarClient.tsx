'use client'
import Link from 'next/link'
import { useState } from 'react'

export function NavbarClient() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 h-16 bg-[#0F0F1A]/80 backdrop-blur-xl border-b border-[#2A2A4A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <span className="text-white font-semibold text-base tracking-tight">VidyaYantra</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/courses" className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group">
            Courses
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
          </Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group">
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
          </Link>
          <Link href="/playground" className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group">
            Lab
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
          </Link>
          <Link href="/ai-generate" className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group">
            AI Studio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
          </Link>
          <Link href="/courses" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200">
            Start Learning
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0F0F1A]/95 backdrop-blur-xl border-b border-[#2A2A4A] px-6 py-4 space-y-3">
          <Link href="/courses" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium py-2 transition-colors">Courses</Link>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium py-2 transition-colors">Dashboard</Link>
          <Link href="/playground" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium py-2 transition-colors">Lab</Link>
          <Link href="/ai-generate" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white text-sm font-medium py-2 transition-colors">AI Studio</Link>
          <Link href="/courses" onClick={() => setMobileOpen(false)} className="block bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center mt-2 transition-all">Start Learning</Link>
        </div>
      )}
    </nav>
  )
}
