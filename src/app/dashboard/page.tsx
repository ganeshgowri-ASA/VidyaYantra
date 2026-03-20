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
  if (!progress) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>
  const xpForNextLevel = progress.level * 100
  const xpProgress = (progress.totalXP % 100) / 100 * 100
  const totalLessons = courses.reduce((a, c) => a + c.modules.reduce((b, m) => b + m.lessons.length, 0), 0)
  const completionPct = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">🎓 My Dashboard</h1>
            <p className="text-slate-400 mt-1">Track your learning journey</p>
          </div>
          <button onClick={handleReset} className="text-xs text-slate-500 hover:text-red-400 border border-white/10 px-3 py-1.5 rounded-lg">Reset Progress</button>
        </div>
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{label:'Total XP',value:progress.totalXP,icon:'⚡',color:'indigo'},
            {label:'Level',value:progress.level,icon:'🏅',color:'yellow'},
            {label:'Lessons Done',value:progress.completedLessons.length,icon:'✅',color:'green'},
            {label:'Streak',value:`${progress.streak}d`,icon:'🔥',color:'orange'}
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center min-h-[120px] flex flex-col items-center justify-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
        {/* XP Progress */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-white font-semibold">⚡ XP Progress — Level {progress.level}</span>
            <span className="text-slate-400 text-sm">{progress.totalXP % 100} / {xpForNextLevel} XP</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{width:`${xpProgress}%`}} />
          </div>
          <p className="text-slate-500 text-xs mt-2">Overall completion: {completionPct}% ({progress.completedLessons.length}/{totalLessons} lessons)</p>
        </div>
        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">🏆 Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS.map(a => {
              const earned = progress.achievements.includes(a.id)
              return (
                <div key={a.id} className={`border rounded-2xl p-5 text-center transition-all ${earned ? 'border-yellow-500/40 bg-yellow-500/10' : 'border-white/10 bg-white/5 opacity-50'}`}>
                  <div className="text-3xl mb-2">{earned ? a.icon : '🔒'}</div>
                  <div className="text-sm font-semibold text-white">{a.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{a.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
        {/* Course Progress */}
        <div className="pb-8">
          <h2 className="text-xl font-bold mb-4">📚 Course Progress</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {courses.slice(0, 8).map(c => {
              const total = c.modules.reduce((a, m) => a + m.lessons.length, 0)
              const done = c.modules.reduce((a, m) => a + m.lessons.filter(l => progress.completedLessons.includes(l.id)).length, 0)
              const pct = total > 0 ? Math.round(done / total * 100) : 0
              return (
                <Link key={c.id} href={`/courses/${c.id}`} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-indigo-500/40 hover:bg-white/8 hover:-translate-y-0.5 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{c.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{done}/{total} lessons</div>
                    </div>
                    <span className="text-xs font-bold text-indigo-400">{pct}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{width:`${pct}%`}} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
