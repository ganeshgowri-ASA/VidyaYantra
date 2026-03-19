import { BookOpen, Clock, Users, Star, Play, Code2, CheckCircle2, ArrowLeft, Trophy, Brain, FileText, HelpCircle, Beaker } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourseById, getAllLessons } from '@/lib/courseData'

const typeIcons: Record<string, string> = {
  video: '▶',
  reading: '📖',
  quiz: '❓',
  exercise: '💻',
  lab: '🧪',
}

export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = getCourseById(Number(id))
  if (!course) return notFound()
  const allLessons = getAllLessons(course.id)
  const totalXp = allLessons.reduce((sum, l) => sum + l.xp, 0)

  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
          <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
        </div>
      </nav>

      <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <span className="text-xs px-2.5 py-1 rounded-full border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">{course.level}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">{course.title}</h1>
            <p className="text-slate-400 text-lg mb-6">{course.about}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {allLessons.length} lessons</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {course.modules.length} modules</span>
              <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-indigo-400" /> {totalXp} XP</span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3">What You Will Learn</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Curriculum</h2>
            <div className="space-y-4">
              {course.modules.map((mod) => (
                <div key={mod.id} className="glass rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-3">Module {mod.id}: {mod.title}</h3>
                  <div className="space-y-2">
                    {mod.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/courses/${course.id}/lessons/${lesson.id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{typeIcons[lesson.type]}</span>
                          <div>
                            <p className="text-sm text-white group-hover:text-indigo-300 transition">{lesson.title}</p>
                            <p className="text-xs text-slate-500">{lesson.type} · {lesson.duration}</p>
                          </div>
                        </div>
                        <span className="text-xs text-indigo-400 font-medium">+{lesson.xp} XP</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="h-40 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center mb-6">
                <Play className="w-16 h-16 text-white/60" />
              </div>
              <Link href={`/courses/${course.id}/lessons/${allLessons[0]?.id}`} className="block w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition mb-3 text-center">
                Start Learning
              </Link>
              <div className="space-y-3 text-sm mt-4">
                <div className="flex justify-between"><span className="text-slate-400">Instructor</span><span className="text-white">{course.instructor}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Level</span><span className="text-white">{course.level}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Lessons</span><span className="text-white">{allLessons.length}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">XP Reward</span><span className="text-indigo-400 font-medium">{totalXp} XP</span></div>
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

        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-3">Requirements</h2>
          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            {course.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
