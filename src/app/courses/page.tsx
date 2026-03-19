import { BookOpen, Clock, Users, Star, Search, Filter, Code2, Brain, Palette, Database, Globe, Shield } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'All', icon: BookOpen, count: 24 },
  { name: 'Frontend', icon: Code2, count: 8 },
  { name: 'Backend', icon: Database, count: 6 },
  { name: 'AI/ML', icon: Brain, count: 4 },
  { name: 'Design', icon: Palette, count: 3 },
  { name: 'DevOps', icon: Globe, count: 2 },
  { name: 'Security', icon: Shield, count: 1 },
]

const courses = [
  { id: 1, title: 'React Mastery: Interactive Components', category: 'Frontend', level: 'Intermediate', duration: '12h', students: 2340, rating: 4.9, modules: 24, hasLab: true, hasDemos: true, desc: 'Build production-ready React apps with hands-on exercises and live code sandboxes.' },
  { id: 2, title: 'Python for Data Science & AI', category: 'AI/ML', level: 'Beginner', duration: '18h', students: 5120, rating: 4.8, modules: 32, hasLab: true, hasDemos: true, desc: 'From basics to building ML models with interactive Jupyter-style notebooks.' },
  { id: 3, title: 'Node.js Backend Architecture', category: 'Backend', level: 'Advanced', duration: '15h', students: 1890, rating: 4.7, modules: 20, hasLab: true, hasDemos: false, desc: 'Design scalable APIs and microservices with live coding challenges.' },
  { id: 4, title: 'TypeScript Deep Dive', category: 'Frontend', level: 'Intermediate', duration: '10h', students: 3200, rating: 4.9, modules: 18, hasLab: true, hasDemos: true, desc: 'Master TypeScript with interactive type challenges and real-world patterns.' },
  { id: 5, title: 'UI/UX Design Fundamentals', category: 'Design', level: 'Beginner', duration: '8h', students: 4100, rating: 4.6, modules: 15, hasLab: false, hasDemos: true, desc: 'Learn design thinking with interactive prototyping exercises.' },
  { id: 6, title: 'Docker & Kubernetes in Practice', category: 'DevOps', level: 'Advanced', duration: '14h', students: 1560, rating: 4.8, modules: 22, hasLab: true, hasDemos: true, desc: 'Deploy containerized apps with live terminal sandboxes.' },
  { id: 7, title: 'Next.js Full-Stack Development', category: 'Frontend', level: 'Intermediate', duration: '16h', students: 2780, rating: 4.9, modules: 28, hasLab: true, hasDemos: true, desc: 'Build complete web apps with server components and API routes.' },
  { id: 8, title: 'PostgreSQL & Database Design', category: 'Backend', level: 'Intermediate', duration: '11h', students: 1920, rating: 4.7, modules: 19, hasLab: true, hasDemos: false, desc: 'Master SQL with interactive query playgrounds and schema challenges.' },
  { id: 9, title: 'Cybersecurity Essentials', category: 'Security', level: 'Beginner', duration: '9h', students: 3400, rating: 4.5, modules: 16, hasLab: true, hasDemos: true, desc: 'Hands-on labs for ethical hacking and secure coding practices.' },
]

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/courses" className="text-white font-medium">Courses</Link>
          <Link href="#" className="hover:text-white transition">My Learning</Link>
          <Link href="#" className="hover:text-white transition">Leaderboard</Link>
          <Link href="#" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition font-medium">Sign In</Link>
        </div>
      </nav>

      <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Course Catalog</h1>
          <p className="text-slate-400">Explore interactive courses with live code sandboxes, AI tutoring, and hands-on exercises.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition" />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-slate-300 hover:border-indigo-500 transition">
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button key={c.name} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-slate-800/30 text-slate-300 hover:border-indigo-500 hover:text-white transition whitespace-nowrap text-sm">
              <c.icon className="w-4 h-4" /> {c.name} <span className="text-slate-500">({c.count})</span>
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="glass glass-hover rounded-2xl overflow-hidden group cursor-pointer">
              {/* Course Header Bar */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${levelColors[course.level]}`}>{course.level}</span>
                  <span className="text-xs text-slate-500">{course.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition">{course.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{course.desc}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules} modules</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-white">{course.rating}</span>
                  </div>
                  <div className="flex gap-2">
                    {course.hasLab && <span className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">Lab</span>}
                    {course.hasDemos && <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">Demo</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
