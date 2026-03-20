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
    <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
      <div className="text-gray-400 text-base">Loading...</div>
    </div>
  )

  const xpProgress = (progress.totalXP % 100)
  const totalLessons = courses.reduce((a, c) => a + c.modules.reduce((b, m) => b + m.lessons.length, 0), 0)
  const completionPct = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0

  const enrolledCourses = courses.filter(c =>
    c.modules.some(m => m.lessons.some(l => progress.completedLessons.includes(l.id)))
  )

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
    <main className="min-h-screen bg-[#0F0F1A] text-white flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-2">
          <div>
            <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">Track your learning journey</p>
          </div>
          <button onClick={handleReset} className="text-xs text-gray-600 hover:text-red-400 border border-[#2A2A4A] px-3 py-1.5 rounded-lg transition-colors duration-200">
            Reset Progress
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total XP', value: progress.totalXP, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, iconBg: 'bg-indigo-500/15 text-indigo-400', accent: 'border-indigo-500/20' },
            { label: 'Level', value: progress.level, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, iconBg: 'bg-yellow-500/15 text-yellow-400', accent: 'border-yellow-500/20' },
            { label: 'Lessons Done', value: progress.completedLessons.length, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, iconBg: 'bg-emerald-500/15 text-emerald-400', accent: 'border-emerald-500/20' },
            { label: 'Streak', value: `${progress.streak}d`, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 0 1-5 5 5 5 0 0 1-5-5c0-2 1.5-3 2-4.5C9.5 4 11 3 12 2z"/></svg>, iconBg: 'bg-orange-500/15 text-orange-400', accent: 'border-orange-500/20' },
          ].map(s => (
            <div key={s.label} className={`bg-[#16213E] border border-[#2A2A4A] ${s.accent} rounded-xl p-5`}>
              <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center mb-3`}>
                {s.icon}
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-gray-500 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP Progress + Streak Row */}
        <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl mb-8">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#2A2A4A]">
            {/* XP Progress */}
            <div className="p-6">
              <div className="flex justify-between mb-3">
                <span className="text-white font-medium text-sm">XP Progress — Level {progress.level}</span>
                <span className="text-gray-500 text-sm">{xpProgress} / 100 XP</span>
              </div>
              <div className="w-full bg-[#2A2A4A] rounded-full h-2.5 mb-2">
                <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${xpProgress}%` }} />
              </div>
              <p className="text-gray-600 text-xs">Overall: {completionPct}% ({progress.completedLessons.length}/{totalLessons} lessons)</p>
            </div>

            {/* Streak Tracker */}
            <div className="p-6">
              <div className="flex justify-between mb-3">
                <span className="text-white font-medium text-sm">Streak Tracker</span>
                <span className="text-orange-400 text-sm font-medium">{progress.streak} day{progress.streak !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                {streakDays.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-200 ${
                      d.isActive
                        ? 'bg-orange-500 text-white'
                        : d.isToday
                          ? 'bg-[#2A2A4A] text-gray-500 ring-1.5 ring-orange-500/40'
                          : 'bg-[#2A2A4A] text-gray-600'
                    }`}>
                      {d.isActive ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 0 1-5 5 5 5 0 0 1-5-5c0-2 1.5-3 2-4.5C9.5 4 11 3 12 2z"/></svg> : ''}
                    </div>
                    <span className={`text-[10px] ${d.isToday ? 'text-gray-300 font-medium' : 'text-gray-600'}`}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements - Horizontal scroll */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Achievements</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {ACHIEVEMENTS.map(a => {
              const earned = progress.achievements.includes(a.id)
              return (
                <div key={a.id} className={`flex-shrink-0 w-[130px] border rounded-xl p-4 text-center transition-all duration-200 ${
                  earned ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-[#2A2A4A] bg-[#16213E] opacity-40'
                }`}>
                  <div className="text-2xl mb-2">{earned ? a.icon : ''}</div>
                  {!earned && <svg className="mx-auto mb-2 text-gray-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                  <div className="text-xs font-medium text-white">{a.title}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{a.desc}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Course Progress - Clean list */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Course Progress</h2>
            <Link href="/courses" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200">Browse All</Link>
          </div>
          <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl divide-y divide-[#2A2A4A]">
            {courses.slice(0, 8).map(c => {
              const total = c.modules.reduce((a, m) => a + m.lessons.length, 0)
              const done = c.modules.reduce((a, m) => a + m.lessons.filter(l => progress.completedLessons.includes(l.id)).length, 0)
              const pct = total > 0 ? Math.round(done / total * 100) : 0
              return (
                <Link key={c.id} href={`/courses/${c.id}`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors duration-200 group">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors duration-200 truncate">{c.title}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{c.subject} · {done}/{total} lessons</div>
                  </div>
                  <div className="w-32 flex-shrink-0">
                    <div className="w-full bg-[#2A2A4A] rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${pct === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className={`text-xs font-medium w-10 text-right flex-shrink-0 ${pct === 100 ? 'text-emerald-400' : pct > 0 ? 'text-indigo-400' : 'text-gray-600'}`}>{pct}%</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity - Timeline style */}
        <div className="pb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          {progress.recentActivity && progress.recentActivity.length > 0 ? (
            <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl">
              {progress.recentActivity.slice(0, 10).map((activity, i) => {
                const timeAgo = getTimeAgo(activity.timestamp)
                const isLast = i === Math.min(progress.recentActivity.length, 10) - 1
                return (
                  <div key={i} className={`flex items-center gap-4 px-5 py-4 ${!isLast ? 'border-b border-[#2A2A4A]' : ''}`}>
                    <div className="relative">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        activity.type === 'lesson_complete' ? 'bg-indigo-500'
                        : activity.type === 'quiz_complete' ? 'bg-purple-500'
                        : activity.type === 'achievement' ? 'bg-yellow-500'
                        : 'bg-orange-500'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{activity.title}</p>
                      <p className="text-xs text-gray-600">{timeAgo}</p>
                    </div>
                    {activity.xp > 0 && (
                      <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full flex-shrink-0">
                        +{activity.xp} XP
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-10 text-center">
              <svg className="mx-auto mb-3 text-gray-700" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <p className="text-gray-500 mb-1 text-sm">No activity yet</p>
              <p className="text-gray-600 text-xs mb-4">Start learning to see your activity here</p>
              <Link href="/courses" className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition-all duration-200">
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
