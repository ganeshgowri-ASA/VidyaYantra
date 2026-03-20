import Link from 'next/link'

const grades = [
  { grade: '1-2', label: 'Classes 1-2', emoji: '🌟', desc: 'Fun learning with stories & games', subjects: 'English, Hindi, Maths, EVS' },
  { grade: '3-5', label: 'Classes 3-5', emoji: '📚', desc: 'Building strong foundations', subjects: 'English, Hindi, Maths, Science, Social Studies' },
  { grade: '6-8', label: 'Classes 6-8', emoji: '🔬', desc: 'Explore & experiment with concepts', subjects: 'Maths, Science, English, Hindi, History, Geography, Civics' },
  { grade: '9-10', label: 'Classes 9-10', emoji: '🎯', desc: 'Board exam ready with practice', subjects: 'Maths, Science, English, Hindi, Social Science' },
]

const features = [
  { icon: '🎮', title: 'Interactive Quizzes', desc: 'Gamified quizzes with instant feedback and explanations for every answer' },
  { icon: '🧩', title: 'Hands-on Exercises', desc: 'Solve problems step-by-step with hints, starter prompts, and solutions' },
  { icon: '🎥', title: 'Video Lessons', desc: 'Short, engaging video explanations for every topic and concept' },
  { icon: '🧪', title: 'Virtual Labs', desc: 'Interactive science experiments and math visualizations' },
  { icon: '🏆', title: 'XP & Achievements', desc: 'Earn points, badges, and track your progress on the leaderboard' },
  { icon: '🤖', title: 'AI Tutor', desc: 'Get personalized help anytime with our AI-powered tutor' },
]

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    desc: 'Get started with basic learning',
    features: ['5 courses access', 'Basic quizzes', 'Progress tracking', 'Community forum'],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹199',
    period: '/month',
    desc: 'Full access for serious learners',
    features: ['All courses & subjects', 'Interactive labs & exercises', 'AI Tutor unlimited', 'Download lessons offline', 'Certificates', 'Priority support'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'School',
    price: '₹99',
    period: '/student/month',
    desc: 'For schools & institutions',
    features: ['Everything in Pro', 'Teacher dashboard', 'Batch management', 'Custom assignments', 'Analytics & reports', 'Dedicated support'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="#grades" className="hover:text-white transition">Grades</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
          <Link href="/courses" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition font-medium text-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-6">
          🎓 India's Interactive Learning Platform for School Students
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Learn <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Every Subject</span>,<br />The Fun Way
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          Classes 1 to 10 — Maths, Science, English, Hindi & more. Interactive quizzes, virtual labs, video lessons, and an AI tutor that adapts to your pace.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/courses" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition">
            Explore Courses →
          </Link>
          <a href="#features" className="px-6 py-3 border border-slate-600 hover:border-indigo-500 rounded-xl text-slate-300 hover:text-white transition font-medium">
            See Features
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[{ v: '50+', l: 'Courses' }, { v: '500+', l: 'Lessons' }, { v: '1000+', l: 'Quizzes' }, { v: 'Classes 1-10', l: 'Coverage' }].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">{s.v}</p>
              <p className="text-sm text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grades */}
      <section id="grades" className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Choose Your Class</h2>
        <p className="text-slate-400 text-center mb-10">Curriculum aligned with CBSE & ICSE boards</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {grades.map((g) => (
            <Link key={g.grade} href={`/courses?grade=${g.grade}`} className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition">
              <span className="text-4xl block mb-3">{g.emoji}</span>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition">{g.label}</h3>
              <p className="text-sm text-slate-400 mb-3">{g.desc}</p>
              <p className="text-xs text-slate-500">{g.subjects}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Why Students Love VidyaYantra</h2>
        <p className="text-slate-400 text-center mb-10">Interactive tools that make learning engaging and effective</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <span className="text-3xl block mb-3">{f.icon}</span>
              <h3 className="text-white font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-3">Simple Pricing</h2>
        <p className="text-slate-400 text-center mb-10">Start free, upgrade when you are ready</p>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${
              p.highlight ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30' : 'border-white/10 bg-white/5'
            }`}>
              {p.highlight && <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500 text-white font-medium mb-3 inline-block">Most Popular</span>}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{p.desc}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">{p.price}</span>
                <span className="text-slate-500 text-sm">{p.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {p.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/courses" className={`block text-center py-2.5 rounded-xl font-medium transition ${
                p.highlight ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'border border-slate-600 hover:border-indigo-500 text-slate-300 hover:text-white'
              }`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
        <p className="text-slate-400 mb-8">Join thousands of students across India learning with interactive courses, quizzes, and AI-powered tutoring.</p>
        <Link href="/courses" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition inline-block">
          Get Started for Free →
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-500">© 2026 VidyaYantra. Built for Indian students.</p>
      </footer>
    </main>
  )
}
