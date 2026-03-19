import { BookOpen, Code2, Play, Users, Zap, Trophy, Brain, Sparkles, ArrowRight, CheckCircle2, Star } from 'lucide-react'

const features = [
  { icon: Code2, title: 'Live Code Sandbox', desc: 'Practice coding in real-time with instant feedback and AI-powered hints' },
  { icon: Play, title: 'Interactive Demos', desc: 'Learn by doing with step-by-step guided demos and simulations' },
  { icon: Brain, title: 'AI Tutor', desc: 'Personal AI assistant that adapts to your learning style and pace' },
  { icon: Users, title: 'Peer Learning', desc: 'Collaborate with learners worldwide through live sessions and forums' },
  { icon: Trophy, title: 'Gamified Progress', desc: 'Earn XP, badges, and climb leaderboards as you master new skills' },
  { icon: Sparkles, title: 'Video Shorts', desc: 'AI-generated bite-sized video explanations for complex concepts' },
]

const stats = [
  { value: '500+', label: 'Interactive Courses' },
  { value: '50K+', label: 'Active Learners' },
  { value: '95%', label: 'Completion Rate' },
  { value: '4.9', label: 'Average Rating' },
]

const pillars = [
  { num: '01', title: 'Interactive First', desc: 'Every lesson includes hands-on exercises, code sandboxes, and live demos.' },
  { num: '02', title: 'AI-Powered', desc: 'Adaptive learning paths powered by OpenAI and custom ML models.' },
  { num: '03', title: 'Community Driven', desc: 'Peer review, study groups, and mentorship built into the platform.' },
  { num: '04', title: 'Enterprise Ready', desc: 'Team management, analytics dashboards, and custom learning paths.' },
  { num: '05', title: 'Gamified Experience', desc: 'XP system, achievements, streaks, and competitive leaderboards.' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pillars" className="hover:text-white transition">Pillars</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition font-medium">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-6">
          <Zap className="w-4 h-4" />
          Phase 1: Nirmaan - Foundation Active
        </div>
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Learn by Doing,
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Not Just Watching
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl">
          The next-generation L&D platform with live code sandboxes, AI tutoring, interactive exercises, and gamified learning paths.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a href="#" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition flex items-center gap-2 animate-pulse-glow">
            Start Learning Free <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#features" className="px-8 py-3 border border-slate-600 hover:border-indigo-500 rounded-xl text-slate-300 hover:text-white transition font-semibold">
            Explore Features
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 w-full max-w-3xl">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-4 md:px-12 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Supercharged Learning Tools</h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">Everything you need to master new skills, powered by AI and built for engagement.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="glass glass-hover rounded-2xl p-6 cursor-pointer">
              <f.icon className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Pillars */}
      <section id="pillars" className="px-4 md:px-12 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">The 5 Pillars of VidyaYantra</h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {pillars.map((p) => (
            <div key={p.num} className="glass rounded-xl p-6 flex items-start gap-6 hover:border-indigo-500/50 transition">
              <span className="text-3xl font-bold text-indigo-500/40">{p.num}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-12 py-20">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center animate-pulse-glow">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform How You Learn?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join thousands of learners already using VidyaYantra to build real skills with interactive, AI-powered courses.</p>
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition">
            Get Started for Free <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 md:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold text-white">VidyaYantra</span>
          </div>
          <p className="text-sm text-slate-500">&copy; 2025 VidyaYantra. Built with Next.js, Tailwind CSS & AI.</p>
        </div>
      </footer>
    </main>
  )
}
