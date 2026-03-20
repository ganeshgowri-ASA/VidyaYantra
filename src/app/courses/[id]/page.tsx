import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourse } from '@/lib/courseData'

const typeIcons: Record<string, string> = {
  video: '▶️', reading: '📖', quiz: '❓', exercise: '💻', lab: '🧪',
}
const typeColors: Record<string, string> = {
  video: 'bg-blue-500/20 text-blue-400',
  reading: 'bg-purple-500/20 text-purple-400',
  quiz: 'bg-yellow-500/20 text-yellow-400',
  exercise: 'bg-green-500/20 text-green-400',
  lab: 'bg-red-500/20 text-red-400',
}

const subjectGradients: Record<string, string> = {
  Mathematics: 'from-blue-600 to-cyan-500',
  Science: 'from-yellow-500 to-orange-500',
  EVS: 'from-green-500 to-emerald-500',
  English: 'from-purple-500 to-pink-500',
  Hindi: 'from-orange-500 to-red-500',
  'Social Studies': 'from-teal-500 to-cyan-500',
}

export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = getCourse(id)
  if (!course) return notFound()

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const totalXp = course.modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + l.xp, 0), 0)
  const gradient = subjectGradients[course.subject] || 'from-indigo-600 to-purple-600'

  const learningPoints = [
    `Master ${course.modules.length} key modules of ${course.subject}`,
    `Complete ${totalLessons} interactive lessons with quizzes`,
    `Earn up to ${totalXp} XP and level up your skills`,
    'Get step-by-step explanations and instant feedback',
    'Practice with hands-on exercises and virtual labs',
    'Track your progress with detailed analytics',
  ]

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section with Course Gradient */}
      <div className={`relative bg-gradient-to-r ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className="text-7xl drop-shadow-lg hidden sm:block">{course.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
                  {course.subject}
                </span>
                <span className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-lg">Classes {course.grade}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{course.title}</h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-6">{course.description}</p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/90">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">📚</span>
                  <div>
                    <span className="font-bold">{totalLessons}</span>
                    <span className="text-white/70 ml-1">Lessons</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">⏰</span>
                  <div>
                    <span className="font-bold">{course.totalDuration}</span>
                    <span className="text-white/70 ml-1">Duration</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">⚡</span>
                  <div>
                    <span className="font-bold">{totalXp}</span>
                    <span className="text-white/70 ml-1">XP</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">👨‍🎓</span>
                  <div>
                    <span className="font-bold">2K+</span>
                    <span className="text-white/70 ml-1">Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content: Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Content (70%) */}
          <div className="lg:w-[70%]">
            {/* What You'll Learn */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                🎯 What You&apos;ll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learningPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-slate-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Module Accordion */}
            <h2 className="text-xl font-bold text-white mb-6">📋 Course Content</h2>
            <div className="space-y-4">
              {course.modules.map((mod, mi) => (
                <div key={mod.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  {/* Module Header */}
                  <div className="px-6 py-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">
                        <span className="text-indigo-400 mr-2">Module {mi + 1}:</span> {mod.title}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{mod.lessons.length} lessons</p>
                    </div>
                    <span className="text-xs text-yellow-400 font-semibold bg-yellow-500/10 px-3 py-1 rounded-full">
                      ⚡ {mod.lessons.reduce((s, l) => s + l.xp, 0)} XP
                    </span>
                  </div>

                  {/* Lessons */}
                  <div className="divide-y divide-white/5">
                    {mod.lessons.map((lesson, li) => (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.id}/${lesson.id}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 flex-shrink-0 transition-colors">
                          {li + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium group-hover:text-indigo-300 transition-colors truncate">
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-slate-500 text-xs">{lesson.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
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

          {/* Right: Sticky Enrollment Card (30%) */}
          <div className="lg:w-[30%]">
            <div className="lg:sticky lg:top-24">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${gradient} p-6 text-center`}>
                  <div className="text-6xl mb-3">{course.icon}</div>
                  <h3 className="text-white font-bold text-lg">{course.title}</h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-green-400">FREE</span>
                    <p className="text-slate-400 text-sm mt-1">Full access to all content</p>
                  </div>

                  <Link
                    href={`/courses/${course.id}/${course.modules[0]?.lessons[0]?.id}`}
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    ▶ Start Learning Now
                  </Link>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Lessons</span>
                      <span className="text-white font-semibold text-sm">{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Duration</span>
                      <span className="text-white font-semibold text-sm">{course.totalDuration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Modules</span>
                      <span className="text-white font-semibold text-sm">{course.modules.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">XP Reward</span>
                      <span className="text-yellow-400 font-semibold text-sm">⚡ {totalXp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Level</span>
                      <span className="text-white font-semibold text-sm">Classes {course.grade}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white font-semibold text-sm mb-3">This course includes:</h4>
                    <div className="space-y-2">
                      {['Video lessons with animations', 'Interactive quizzes', 'Hands-on exercises', 'AI tutor support', 'Progress tracking'].map(item => (
                        <div key={item} className="flex items-center gap-2 text-slate-400 text-xs">
                          <span className="text-green-400">✓</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
