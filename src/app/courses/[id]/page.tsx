import { BookOpen, Clock, Users, Star, Play, Code2, CheckCircle2, Lock, ArrowLeft, Trophy, Brain } from 'lucide-react'
import Link from 'next/link'

const courseData = {
  title: 'React Mastery: Interactive Components',
  desc: 'Build production-ready React apps with hands-on exercises and live code sandboxes. Master hooks, state management, and advanced patterns.',
  level: 'Intermediate',
  duration: '12h',
  students: 2340,
  rating: 4.9,
  modules: 24,
  xp: 2400,
  instructor: 'Dr. Vidya Sharma',
}

const curriculum = [
  { id: 1, title: 'React Fundamentals', lessons: 4, duration: '1.5h', completed: true, hasLab: true },
  { id: 2, title: 'Hooks Deep Dive', lessons: 5, duration: '2h', completed: true, hasLab: true },
  { id: 3, title: 'State Management Patterns', lessons: 4, duration: '1.5h', completed: false, hasLab: true },
  { id: 4, title: 'Component Architecture', lessons: 3, duration: '1h', completed: false, hasLab: false },
  { id: 5, title: 'Performance Optimization', lessons: 4, duration: '2h', completed: false, hasLab: true },
  { id: 6, title: 'Testing & Best Practices', lessons: 4, duration: '2h', completed: false, hasLab: true },
  { id: 7, title: 'Final Project: Build a Dashboard', lessons: 2, duration: '2h', completed: false, hasLab: true },
]

export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
          <Link href="#" className="hover:text-white transition">My Learning</Link>
          <Link href="#" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition font-medium">Sign In</Link>
        </div>
      </nav>

      <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-xs px-2.5 py-1 rounded-full border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{courseData.level}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{courseData.title}</h1>
            <p className="text-slate-400 text-lg mb-6">{courseData.desc}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {courseData.duration}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {courseData.modules} modules</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {courseData.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {courseData.rating}</span>
              <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-indigo-400" /> {courseData.xp} XP</span>
            </div>

            {/* Curriculum */}
            <h2 className="text-2xl font-bold text-white mb-4">Curriculum</h2>
            <div className="space-y-3">
              {curriculum.map((m, i) => (
                <div key={m.id} className="glass rounded-xl p-4 flex items-center justify-between hover:border-indigo-500/50 transition cursor-pointer">
                  <div className="flex items-center gap-4">
                    {m.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : i <= 2 ? (
                      <Play className="w-6 h-6 text-indigo-400" />
                    ) : (
                      <Lock className="w-6 h-6 text-slate-600" />
                    )}
                    <div>
                      <h3 className="text-white font-medium">{m.title}</h3>
                      <p className="text-xs text-slate-500">{m.lessons} lessons &middot; {m.duration}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {m.hasLab && <span className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">Lab</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="h-40 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center mb-6">
                <Play className="w-16 h-16 text-white/60" />
              </div>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition mb-3">
                Start Learning
              </button>
              <button className="w-full py-3 border border-slate-600 hover:border-indigo-500 rounded-xl text-slate-300 hover:text-white transition font-medium mb-6">
                Add to Wishlist
              </button>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">Instructor</span><span className="text-white">{courseData.instructor}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Level</span><span className="text-white">{courseData.level}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Duration</span><span className="text-white">{courseData.duration}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">XP Reward</span><span className="text-indigo-400 font-medium">{courseData.xp} XP</span></div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-medium text-white">AI Tutor Available</span>
                </div>
                <p className="text-xs text-slate-400">Get personalized help and explanations from our AI assistant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
