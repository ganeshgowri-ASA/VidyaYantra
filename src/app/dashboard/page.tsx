'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProgress, resetProgress, ACHIEVEMENTS, type UserProgress } from '@/lib/progress'
import { courses, getCourse } from '@/lib/courseData'
import AiTutor from '@/components/AiTutor'

export default function Dashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  if (!progress) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>

  const totalCompleted = Object.values(progress.courses).reduce(
    (sum, c) => sum + Object.values(c.lessons).filter(l => l.completed).length, 0
  )
  const activeCourses = Object.keys(progress.courses).length
  const xpToNextLevel = ((progress.level) * 500) - progress.totalXp
  const levelProgress = ((progress.totalXp % 500) / 500) * 100

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="px-6 md:px-12 py-8 border-b border-white/10">
        <Link href="/" className="text-slate-400 hover:text-white text-sm mb-4 inline-block">← Home</Link>
        <h1 className="text-3xl font-bold text-white">🎯 My Dashboard</h1>
        <p className="text-slate-400">Track your learning progress</p>
      </div>

      <div className="px-6 md:px-12 py-8 max-w-6xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total XP', value: progress.totalXp.toLocaleString(), icon: '⚡', color: 'text-yellow-400' },
            { label: 'Level', value: progress.level, icon: '🎮', color: 'text-indigo-400' },
            { label: 'Streak', value: `${progress.streak} days`, icon: '🔥', color: 'text-orange-400' },
            { label: 'Lessons Done', value: totalCompleted, icon: '✅', color: 'text-green-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-slate-400 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level Progress */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white font-semibold">Level {progress.level} Progress</h2>
            <span className="text-xs text-slate-400">{xpToNextLevel} XP to Level {progress.level + 1}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all" style={{ width: `${levelProgress}%` }} />
          </div>
        </div>

        {/* Active Courses */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-xl mb-4">📚 Active Courses ({activeCourses})</h2>
          {activeCourses === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-slate-400 mb-4">No courses started yet!</p>
              <Link href="/courses" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-500">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(progress.courses).map(([courseId, cp]) => {
                const course = getCourse(courseId)
                if (!course) return null
                const completed = Object.values(cp.lessons).filter(l => l.completed).length
                const total = course.modules.reduce((s, m) => s + m.lessons.length, 0)
                const pct = Math.round((completed / total) * 100)
                return (
                  <Link href={`/courses/${courseId}`} key={courseId}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{course.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold group-hover:text-indigo-300">{course.title}</h3>
                        <p className="text-xs text-slate-400">{completed}/{total} lessons</p>
                      </div>
                      <span className="text-lg font-bold text-indigo-400">{pct}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-xl mb-4">🏆 Achievements ({progress.achievements.length}/{Object.keys(ACHIEVEMENTS).length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(ACHIEVEMENTS).map(([key, ach]) => {
              const unlocked = progress.achievements.includes(key)
              return (
                <div key={key} className={`rounded-xl p-4 text-center border transition-all ${
                  unlocked ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-white/3 border-white/5 opacity-40'
                }`}>
                  <div className="text-3xl mb-1">{ach.icon}</div>
                  <div className={`text-xs font-semibold ${unlocked ? 'text-yellow-300' : 'text-slate-500'}`}>{ach.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{ach.desc}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Reset */}
        <div className="text-center pt-4 border-t border-white/10">
          <button onClick={() => { resetProgress(); setProgress(getProgress()) }}
            className="text-xs text-red-400 hover:text-red-300">
            🗑️ Reset All Progress
          </button>
        </div>
      </div>
      <AiTutor />
    </main>
  )
}
