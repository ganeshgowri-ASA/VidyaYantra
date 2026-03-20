'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const features = [
  { icon: '🎯', title: 'Interactive Quizzes', desc: 'Adaptive quizzes that adjust difficulty based on your performance. Get instant feedback and explanations.', gradient: 'from-blue-600 to-cyan-500' },
  { icon: '🤖', title: 'AI Tutor', desc: 'VidyaBot answers your doubts instantly, explains concepts step-by-step like a personal tutor.', gradient: 'from-purple-600 to-pink-500' },
  { icon: '⚡', title: 'XP & Levels', desc: 'Earn XP for every lesson, unlock achievements, compete on leaderboards. Learning made fun!', gradient: 'from-yellow-500 to-orange-500' },
  { icon: '🎥', title: 'Video Lessons', desc: 'Short, engaging video segments for every concept with 3D animations and visual explanations.', gradient: 'from-red-500 to-rose-500' },
  { icon: '💻', title: 'Live Exercises', desc: 'Hands-on coding labs, drag-drop activities, virtual science experiments and interactive simulations.', gradient: 'from-green-500 to-emerald-500' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Detailed analytics, mastery-based progression, knowledge graph showing your learning journey.', gradient: 'from-indigo-500 to-violet-500' },
]

const subjects = [
  { name: 'Maths', emoji: '📐', color: 'from-blue-500 to-blue-700' },
  { name: 'Science', emoji: '🔬', color: 'from-green-500 to-green-700' },
  { name: 'English', emoji: '📖', color: 'from-purple-500 to-purple-700' },
  { name: 'Hindi', emoji: '🪔', color: 'from-orange-500 to-orange-700' },
  { name: 'EVS', emoji: '🌱', color: 'from-emerald-500 to-emerald-700' },
  { name: 'Social Studies', emoji: '🌍', color: 'from-teal-500 to-teal-700' },
  { name: 'Computer', emoji: '💻', color: 'from-indigo-500 to-indigo-700' },
]

const gradeCards = [
  { grade: '1-2', emoji: '🌟', label: 'Classes 1-2', desc: 'Foundation & fun learning', gradient: 'from-pink-500 to-rose-600', students: '2K+' },
  { grade: '3-5', emoji: '📚', label: 'Classes 3-5', desc: 'Building core skills', gradient: 'from-blue-500 to-cyan-600', students: '5K+' },
  { grade: '6-8', emoji: '🔬', label: 'Classes 6-8', desc: 'Science & exploration', gradient: 'from-purple-500 to-violet-600', students: '8K+' },
  { grade: '9-10', emoji: '🎯', label: 'Classes 9-10', desc: 'Board exam prep', gradient: 'from-orange-500 to-red-600', students: '10K+' },
]

const testimonials = [
  { name: 'Aarav S.', class: 'Class 8', avatar: '👦', text: 'VidyaYantra made Science so easy! The virtual labs and 3D animations helped me understand concepts I struggled with for months.', rating: 5 },
  { name: 'Priya M.', class: 'Class 5', avatar: '👧', text: 'I love the XP system! It makes me want to study more every day. My Maths scores improved from 60% to 92% in just 3 months.', rating: 5 },
  { name: 'Rohit K.', class: 'Class 10', avatar: '👦', text: 'The AI tutor is like having a personal teacher 24/7. Board exam preparation became stress-free with VidyaYantra!', rating: 5 },
]

export default function HomePage() {
  const [heroText, setHeroText] = useState('')
  const fullText = "India ka Best Free Learning App"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setHeroText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900/60 to-slate-900 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2.5 text-indigo-400 text-sm font-medium mb-8 animate-fade-in">
              🌟 #1 Free Learning Platform for School Students
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in" style={{ minHeight: '168px' }}>
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 text-transparent bg-clip-text">
                {heroText}
              </span>
              <span className="animate-pulse text-yellow-400">|</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Interactive lessons, AI tutoring, XP rewards & live exercises for Classes 1-10.
              <span className="text-indigo-400 font-semibold"> Learn like a champion.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link href="/courses" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25">
                📚 Start Learning Free
              </Link>
              <Link href="/ai-generate" className="border-2 border-indigo-500/40 hover:border-indigo-400 bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-105">
                🤖 Try AI Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '50+', label: 'Courses', icon: '📚' },
              { num: '500+', label: 'Lessons', icon: '▶️' },
              { num: '1-10', label: 'Classes', icon: '🏫' },
              { num: 'AI', label: 'Powered', icon: '🤖' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-center gap-4 py-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <div className="text-3xl font-extrabold text-white">{s.num}</div>
                  <div className="text-slate-400 text-sm">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Selector Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Choose Your Class</h2>
          <p className="text-slate-400 text-center mb-12 text-lg">Select your grade range to explore courses tailored for you</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gradeCards.map(g => (
              <Link key={g.grade} href="/courses"
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="relative p-8 text-center">
                  <div className="text-5xl mb-4">{g.emoji}</div>
                  <h3 className="text-white font-bold text-xl mb-2">{g.label}</h3>
                  <p className="text-slate-400 text-sm mb-4">{g.desc}</p>
                  <div className="inline-flex items-center gap-1 text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full">
                    👨‍🎓 {g.students} Students
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - 3-col grid */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Everything You Need to Excel</h2>
          <p className="text-slate-400 text-center mb-12 text-lg">Inspired by PhysicsWallah, BYJU&apos;S & Khan Academy — built for Indian classrooms</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Subjects We Cover</h2>
          <p className="text-slate-400 text-center mb-12 text-lg">Complete CBSE curriculum across all major subjects</p>
          <div className="flex flex-wrap justify-center gap-4">
            {subjects.map(s => (
              <div key={s.name}
                className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all hover:-translate-y-1 cursor-default">
                <span className="text-3xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                <span className="text-white font-semibold">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">What Students Say</h2>
          <p className="text-slate-400 text-center mb-12 text-lg">Join thousands of happy learners across India</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.class}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">Join thousands of students learning smarter with VidyaYantra. It&apos;s free, fun, and effective.</p>
            <Link href="/courses" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-12 py-4 rounded-2xl text-lg transition-all inline-block hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25">
              Explore All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎓</span>
                <span className="text-white font-bold text-lg">VidyaYantra</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Making quality education accessible to every student in India. Learn smarter, not harder.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link href="/courses" className="block text-slate-400 hover:text-white text-sm transition-colors">All Courses</Link>
                <Link href="/dashboard" className="block text-slate-400 hover:text-white text-sm transition-colors">Dashboard</Link>
                <Link href="/playground" className="block text-slate-400 hover:text-white text-sm transition-colors">Science Lab</Link>
                <Link href="/ai-generate" className="block text-slate-400 hover:text-white text-sm transition-colors">AI Studio</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Subjects</h4>
              <div className="space-y-2">
                <span className="block text-slate-400 text-sm">Mathematics</span>
                <span className="block text-slate-400 text-sm">Science</span>
                <span className="block text-slate-400 text-sm">English</span>
                <span className="block text-slate-400 text-sm">Hindi</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Classes</h4>
              <div className="space-y-2">
                <Link href="/courses" className="block text-slate-400 hover:text-white text-sm transition-colors">Classes 1-2</Link>
                <Link href="/courses" className="block text-slate-400 hover:text-white text-sm transition-colors">Classes 3-5</Link>
                <Link href="/courses" className="block text-slate-400 hover:text-white text-sm transition-colors">Classes 6-8</Link>
                <Link href="/courses" className="block text-slate-400 hover:text-white text-sm transition-colors">Classes 9-10</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-slate-500 text-sm">🎓 VidyaYantra — Making learning magical for every child ✨</p>
            <p className="text-slate-600 text-xs mt-2">Built with love for Classes 1-10</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
