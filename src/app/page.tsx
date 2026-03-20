'use client'
import Link from 'next/link'
const features = [
  {icon:'🎓',title:'Classes 1-10',desc:'Full CBSE curriculum covering all subjects'},
  {icon:'🤖',title:'AI Tutor',desc:'VidyaBot answers your questions instantly'},
  {icon:'⚡',title:'XP & Levels',desc:'Earn XP, level up, unlock achievements'},
  {icon:'🎯',title:'Smart Quizzes',desc:'Adaptive quizzes for every lesson'},
  {icon:'💻',title:'Live Exercises',desc:'Hands-on coding and science labs'},
  {icon:'📊',title:'Progress Tracker',desc:'See your growth with detailed stats'},
]
export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-indigo-400 text-sm font-medium mb-8">
            🌟 World-class e-learning for Indian school kids
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Learn Smarter<br /><span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">with VidyaYantra</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Interactive lessons, AI tutoring, XP rewards & live exercises for Classes 1-10. Learn like the best students in the world.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105">📚 Start Learning Free</Link>
            <Link href="/dashboard" className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all">🏅 My Dashboard</Link>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{num:'10',label:'Classes'},
            {num:'40+',label:'Subjects'},
            {num:'500+',label:'Lessons'},
            {num:'AI',label:'Powered Tutor'}
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold text-indigo-400">{s.num}</div>
              <div className="text-slate-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Everything you need to excel</h2>
          <p className="text-slate-400 text-center mb-12">Inspired by Coursera, Udemy & Khan Academy — built for Indian classrooms</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-white/8 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your learning journey? 🚀</h2>
          <p className="text-slate-400 mb-8">Join thousands of students learning with VidyaYantra</p>
          <Link href="/courses" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all inline-block hover:scale-105">Explore All Courses →</Link>
        </div>
      </section>
    </main>
  )
}
