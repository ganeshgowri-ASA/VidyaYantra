import { BookOpen, Clock, Users, Star, Code2, Brain, Palette, Globe, Shield, Trophy } from 'lucide-react'
import Link from 'next/link'
import { allCourses, getAllLessons } from '@/lib/courseData'

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const categoryColors: Record<string, string> = {
  Development: 'from-indigo-600/20 to-blue-600/20',
  'Data Science': 'from-purple-600/20 to-pink-600/20',
  Design: 'from-orange-600/20 to-yellow-600/20',
  Cloud: 'from-cyan-600/20 to-teal-600/20',
}

export default function CourseCatalog() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/courses" className="text-white">Courses</Link>
          <Link href="/playground" className="hover:text-white transition">Playground</Link>
          <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
        </div>
      </nav>

      <div className="px-4 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Course Catalog</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Explore our interactive courses with hands-on exercises, live code sandboxes, quizzes, and AI-powered tutoring.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {allCourses.map((course) => {
            const lessons = getAllLessons(course.id)
            const totalXp = lessons.reduce((sum, l) => sum + l.xp, 0)
            return (
              <Link key={course.id} href={`/courses/${course.id}`} className="glass rounded-2xl overflow-hidden hover:border-indigo-500/50 transition group">
                <div className={`h-32 bg-gradient-to-br ${categoryColors[course.category] || 'from-slate-600/20 to-slate-600/20'} flex items-center justify-center`}>
                  <div className="text-center">
                    <p className="text-3xl mb-1">{course.category === 'Development' ? '💻' : course.category === 'Data Science' ? '📊' : course.category === 'Design' ? '🎨' : '☁️'}</p>
                    <p className="text-xs text-slate-400">{course.category}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColors[course.level]}`}>{course.level}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition">{course.title}</h2>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.about}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules.length} modules</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {lessons.length} lessons</span>
                    </div>
                    <span className="flex items-center gap-1 text-indigo-400"><Trophy className="w-3.5 h-3.5" /> {totalXp} XP</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">by {course.instructor}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
