'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProgress, resetProgress, ACHIEVEMENTS, type UserProgress } from '@/lib/progress'
import { getAllCourses } from '@/lib/courseData'

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const courses = getAllCourses()

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  const handleReset = () => {
    resetProgress()
    setProgress(getProgress())
  }

  if (!progress) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  )

  const xpProgress = (progress.totalXP % 100)
  const totalLessons = courses.reduce((a, c) => a + c.modules.reduce((b, m) => b + m.lessons.length, 0), 0)
  const completionPct = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0

  // Enrolled courses = courses with any progress
  const enrolledCourses = courses.filter(c =>
    c.modules.some(m => m.lessons.some(l => progress.completedLessons.includes(l.id)))
  )

  // Streak days display (last 7 days)
  const streakDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dayStr = d.toLocaleDateString('en', { weekday: 'short' })
    const isToday = i === 6
    const isActive = progress.lastActive
      ? new Date(progress.lastActive).toDateString() === d.toDateString() || (progress.streak > (6 - i) && i >= (7 - progress.streak))
      : false
    return { day: dayStr, isActive, isToday }
  })

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">🎓 My Dashboard</h1>
            <p className="text-slate-400 mt-1">Track your learning journey</p>
          </div>
          <button onClick={handleReset} className="text-xs text-slate-500 hover:text-red-400 border border-white/10 px-3 py-1.5 rounded-lg">
            Reset Progress
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total XP', value: progress.totalXP, icon: '⚡', gradient: 'from-indigo-600/20 to-purple-600/20 border-indigo-500/20' },
            { label: 'Level', value: progress.level, icon: '🏅', gradient: 'from-yellow-600/20 to-orange-600/20 border-yellow-500/20' },
            { label: 'Lessons Done', value: progress.completedLessons.length, icon: '✅', gradient: 'from-green-600/20 to-emerald-600/20 border-green-500/20' },
            { label: 'Streak', value: `${progress.streak}d`, icon: '🔥', gradient: 'from-orange-600/20 to-red-600/20 border-orange-500/20' },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.gradient} border rounded-2xl p-6 text-center min-h-[120px] flex flex-col items-center justify-center`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP Progress + Streak Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* XP Progress */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between mb-2">
              <span className="text-white font-semibold">⚡ XP Progress — Level {progress.level}</span>
              <span className="text-slate-400 text-sm">{xpProgress} / 100 XP</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{ width: `${xpProgress}%` }} />
            </div>
            <p className="text-slate-500 text-xs mt-2">Overall: {completionPct}% ({progress.completedLessons.length}/{totalLessons} lessons)</p>
          </div>

          {/* Streak Tracker */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between mb-3">
              <span className="text-white font-semibold">🔥 Streak Tracker</span>
              <span className="text-orange-400 text-sm font-semibold">{progress.streak} day{progress.streak !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              {streakDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                    d.isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : d.isToday
                        ? 'bg-white/10 text-slate-400 ring-2 ring-orange-500/50'
                        : 'bg-white/5 text-slate-600'
                  }`}>
                    {d.isActive ? '🔥' : '○'}
                  </div>
                  <span className={`text-[10px] ${d.isToday ? 'text-white font-semibold' : 'text-slate-500'}`}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">🏆 Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS.map(a => {
              const earned = progress.achievements.includes(a.id)
              return (
                <div key={a.id} className={`border rounded-2xl p-5 text-center transition-all ${
                  earned ? 'border-yellow-500/40 bg-yellow-500/10' : 'border-white/10 bg-white/5 opacity-50'
                }`}>
                  <div className="text-3xl mb-2">{earned ? a.icon : '🔒'}</div>
                  <div className="text-sm font-semibold text-white">{a.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{a.desc}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">📖 Enrolled Courses</h2>
              <Link href="/courses" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Browse All →</Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map(c => {
                const total = c.modules.reduce((a, m) => a + m.lessons.length, 0)
                const done = c.modules.reduce((a, m) => a + m.lessons.filter(l => progress.completedLessons.includes(l.id)).length, 0)
                const pct = total > 0 ? Math.round(done / total * 100) : 0
                const firstIncomplete = c.modules
                  .flatMap(m => m.lessons)
                  .find(l => !progress.completedLessons.includes(l.id))
                return (
                  <div key={c.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all group">
                    <div className={`bg-gradient-to-r ${c.color === 'bg-blue-500' ? 'from-blue-600 to-cyan-500' : 'from-indigo-600 to-purple-600'} p-4 flex items-center gap-3`}>
                      <span className="text-3xl">{c.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{c.title}</h3>
                        <p className="text-white/70 text-xs">{c.subject} · Classes {c.grade}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">{done}/{total} lessons</span>
                        <span className={`font-bold ${pct === 100 ? 'text-green-400' : 'text-indigo-400'}`}>{pct}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                        <div className={`h-2 rounded-full transition-all ${pct === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex gap-2">
                        {firstIncomplete ? (
                          <Link href={`/courses/${c.id}/${firstIncomplete.id}`}
                            className="flex-1 text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all">
                            Continue Learning
                          </Link>
                        ) : (
                          <span className="flex-1 text-center py-2 bg-green-500/20 text-green-400 text-xs font-semibold rounded-lg">
                            ✅ Completed
                          </span>
                        )}
                        <Link href={`/quiz/${c.id}`}
                          className="px-3 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-lg transition-all">
                          Quiz
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* All Course Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📚 All Course Progress</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {courses.slice(0, 8).map(c => {
              const total = c.modules.reduce((a, m) => a + m.lessons.length, 0)
              const done = c.modules.reduce((a, m) => a + m.lessons.filter(l => progress.completedLessons.includes(l.id)).length, 0)
              const pct = total > 0 ? Math.round(done / total * 100) : 0
              return (
                <Link key={c.id} href={`/courses/${c.id}`}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{c.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{done}/{total} lessons</div>
                    </div>
                    <span className={`text-xs font-bold ${pct === 100 ? 'text-green-400' : 'text-indigo-400'}`}>{pct}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${pct === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="pb-8">
          <h2 className="text-xl font-bold mb-4">📋 Recent Activity</h2>
          {progress.recentActivity && progress.recentActivity.length > 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
              {progress.recentActivity.slice(0, 10).map((activity, i) => {
                const timeAgo = getTimeAgo(activity.timestamp)
                const icon = activity.type === 'lesson_complete' ? '📖'
                  : activity.type === 'quiz_complete' ? '🧠'
                  : activity.type === 'achievement' ? '🏆'
                  : '🔥'
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-4">
                    <span className="text-xl">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{activity.title}</p>
                      <p className="text-xs text-slate-500">{timeAgo}</p>
                    </div>
                    {activity.xp > 0 && (
                      <span className="text-xs font-semibold text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-lg">
                        +{activity.xp} XP
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-slate-400 mb-1">No activity yet</p>
              <p className="text-slate-500 text-sm mb-4">Start learning to see your activity here!</p>
              <Link href="/courses" className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all">
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function getTimeAgo(timestamp: string): string {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}
