import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourse } from '@/lib/courseData'

const typeIcons: Record<string, string> = {
  video: '▶️',
  reading: '📖',
  quiz: '❓',
  exercise: '💻',
  lab: '🧪',
}

const typeColors: Record<string, string> = {
  video: 'bg-blue-500/20 text-blue-400',
  reading: 'bg-purple-500/20 text-purple-400',
  quiz: 'bg-yellow-500/20 text-yellow-400',
  exercise: 'bg-green-500/20 text-green-400',
  lab: 'bg-red-500/20 text-red-400',
}

export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = getCourse(id)
  if (!course) return notFound()

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const totalXp = course.modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + l.xp, 0), 0)

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero */}
      <div className="px-6 py-10 max-w-4xl mx-auto border-b border-white/10">
        <Link href="/courses" className="text-slate-400 hover:text-white text-sm mb-6 inline-flex items-center gap-1">
          ← Back to Courses
        </Link>
        <div className="flex items-start gap-5 mt-2">
          <div className="text-6xl">{course.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2.5 py-1 rounded-lg">
                {course.subject}
              </span>
              <span className="text-xs text-slate-500">Classes {course.grade}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{course.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">{course.description}</p>
            <div className="flex flex-wrap gap-6 mt-4 text-sm">
              <span className="text-slate-300">📚 <strong>{totalLessons}</strong> lessons</span>
              <span className="text-slate-300">⏰ <strong>{course.totalDuration}</strong></span>
              <span className="text-slate-300">⚡ <strong>{totalXp} XP</strong> to earn</span>
              <span className="text-slate-300">🏆 <strong>{course.modules.length}</strong> modules</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link href={`/courses/${course.id}/lessons/${course.modules[0]?.lessons[0]?.id}`}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            ▶ Start Learning
          </Link>
        </div>
      </div>

      {/* Modules & Lessons */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">Course Content</h2>
        <div className="space-y-6">
          {course.modules.map((mod, mi) => (
            <div key={mod.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* Module Header */}
              <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                <h3 className="text-white font-semibold">
                  <span className="text-indigo-400 mr-2">Module {mi + 1}:</span> {mod.title}
                </h3>
                <p className="text-slate-400 text-sm mt-1">{mod.lessons.length} lessons</p>
              </div>

              {/* Lessons */}
              <div className="divide-y divide-white/5">
                {mod.lessons.map((lesson, li) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 flex-shrink-0">
                      {li + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium group-hover:text-indigo-300 transition-colors truncate">
                        {lesson.title}
                      </p>
                      <p className="text-slate-500 text-sm">{lesson.duration}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        typeColors[lesson.type] || 'bg-white/10 text-slate-400'
                      }`}>
                        {typeIcons[lesson.type]} {lesson.type}
                      </span>
                      <span className="text-xs text-yellow-400 font-semibold">+{lesson.xp} XP</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
