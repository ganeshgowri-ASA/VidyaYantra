'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const features = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>, title: 'Interactive Quizzes', desc: 'Adaptive quizzes that adjust difficulty based on your performance with instant feedback.', color: 'bg-blue-500/10 text-blue-400' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: 'AI Tutor', desc: 'VidyaBot answers your doubts instantly and explains concepts step-by-step.', color: 'bg-purple-500/10 text-purple-400' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: 'XP & Levels', desc: 'Earn XP for every lesson, unlock achievements, and track your progress.', color: 'bg-yellow-500/10 text-yellow-400' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>, title: 'Video Lessons', desc: 'Short, engaging video segments with animations and visual explanations.', color: 'bg-red-500/10 text-red-400' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title: 'Live Exercises', desc: 'Hands-on coding labs, drag-drop activities, and interactive simulations.', color: 'bg-emerald-500/10 text-emerald-400' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, title: 'Progress Tracking', desc: 'Detailed analytics and mastery-based progression for your journey.', color: 'bg-indigo-500/10 text-indigo-400' },
]

const gradeCards = [
  { grade: '1-2', label: 'Classes 1-2', desc: 'Foundation & fun learning', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: 'border-t-pink-500', students: '2,400+' },
  { grade: '3-5', label: 'Classes 3-5', desc: 'Building core skills', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, color: 'border-t-blue-500', students: '5,100+' },
  { grade: '6-8', label: 'Classes 6-8', desc: 'Science & exploration', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, color: 'border-t-purple-500', students: '8,300+' },
  { grade: '9-10', label: 'Classes 9-10', desc: 'Board exam prep', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, color: 'border-t-orange-500', students: '10,500+' },
]

const testimonials = [
  { name: 'Aarav S.', class: 'Class 8', initials: 'AS', text: 'VidyaYantra made Science so easy! The virtual labs and animations helped me understand concepts I struggled with for months.', rating: 5 },
  { name: 'Priya M.', class: 'Class 5', initials: 'PM', text: 'I love the XP system! It makes me want to study more every day. My Maths scores improved from 60% to 92% in just 3 months.', rating: 5 },
  { name: 'Rohit K.', class: 'Class 10', initials: 'RK', text: 'The AI tutor is like having a personal teacher 24/7. Board exam preparation became stress-free with VidyaYantra!', rating: 5 },
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
    <main className="min-h-screen bg-[#0F0F1A]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.06) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/8 border border-indigo-500/15 rounded-full px-4 py-2 text-indigo-400 text-sm font-medium mb-8 animate-fade-in">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              #1 Free Learning Platform for School Students
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] animate-fade-in" style={{ minHeight: '168px', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 text-transparent bg-clip-text">
                {heroText}
              </span>
              <span className="animate-pulse text-indigo-400">|</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Interactive lessons, AI tutoring, XP rewards & live exercises for Classes 1-10.
              <span className="text-indigo-400 font-medium"> Learn like a champion.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link href="/courses" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20">
                Start Learning Free
              </Link>
              <Link href="/ai-generate" className="border border-[#2A2A4A] hover:border-indigo-500/40 bg-white/[0.03] hover:bg-white/[0.06] text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200">
                Try AI Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-[#2A2A4A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '50+', label: 'Courses', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
              { num: '500+', label: 'Lessons', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> },
              { num: '1-10', label: 'Classes', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
              { num: 'AI', label: 'Powered', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
            ].map((s, i) => (
              <div key={s.label} className={`flex items-center justify-center gap-4 py-5 ${i < 3 ? 'border-r border-[#2A2A4A]' : ''}`}>
                <div className="text-indigo-400">{s.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-white">{s.num}</div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Selector Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">Choose Your Class</h2>
          <p className="text-gray-500 text-center mb-12 text-base">Select your grade range to explore tailored courses</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {gradeCards.map(g => (
              <Link key={g.grade} href="/courses"
                className={`group bg-[#16213E] border border-[#2A2A4A] ${g.color} border-t-2 rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-200 hover:-translate-y-1 card-glow`}>
                <div className="text-gray-400 mb-4 group-hover:text-indigo-400 transition-colors">{g.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-1">{g.label}</h3>
                <p className="text-gray-500 text-sm mb-4">{g.desc}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  {g.students} Students
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1A1A2E]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">Everything You Need to Excel</h2>
          <p className="text-gray-500 text-center mb-12 text-base">Inspired by the best learning platforms, built for Indian classrooms</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="group bg-[#16213E] border border-[#2A2A4A] rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">What Students Say</h2>
          <p className="text-gray-500 text-center mb-12 text-base">Join thousands of happy learners across India</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-6 hover:border-indigo-500/20 transition-all duration-200">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#EAB308" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#2A2A4A]">
                  <div className="w-9 h-9 rounded-full bg-indigo-500/15 flex items-center justify-center text-indigo-400 text-xs font-semibold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-gray-600 text-xs">{t.class}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-[#2A2A4A] rounded-2xl p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-gray-400 mb-8 text-base max-w-2xl mx-auto">Join thousands of students learning smarter with VidyaYantra. Free, effective, and built for you.</p>
            <Link href="/courses" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-3.5 rounded-full text-base transition-all duration-200 inline-block hover:shadow-lg hover:shadow-indigo-500/20">
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
