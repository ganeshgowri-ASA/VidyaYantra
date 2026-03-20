import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
export const metadata: Metadata = { title: 'VidyaYantra — Learn Smarter', description: 'World-class e-learning for school kids Classes 1-10' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-900">
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="text-white font-bold text-lg">VidyaYantra</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/courses" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">📚 Courses</Link>
              <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">🏅 Dashboard</Link>
              <Link href="/playground" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">🔬 Lab</Link>
              <Link href="/courses" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">Start Learning</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-white/10 py-8 text-center text-slate-500 text-sm mt-16">
          <p>🎓 VidyaYantra — Making learning magical for every child ✨</p>
          <p className="mt-1">Built with love for Classes 1-10 📚</p>
        </footer>
      </body>
    </html>
  )
}
