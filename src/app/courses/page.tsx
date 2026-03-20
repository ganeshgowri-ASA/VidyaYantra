'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { courses, getCoursesByGrade, getAllGrades, getGradeLabel } from '@/lib/courseData'

const subjectColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Mathematics: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', gradient: 'from-blue-600 to-cyan-500' },
  Science: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', gradient: 'from-yellow-500 to-orange-500' },
  EVS: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', gradient: 'from-green-500 to-emerald-500' },
  English: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', gradient: 'from-purple-500 to-pink-500' },
  Hindi: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', gradient: 'from-orange-500 to-red-500' },
  'Social Studies': { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30', gradient: 'from-teal-500 to-cyan-500' },
}

const subjectEmojis: Record<string, string> = {
  Mathematics: '📐',
  Science: '🔬',
  EVS: '🌱',
  English: '📖',
  Hindi: '🪔',
  'Social Studies': '🌍',
}

export default function CoursesPage() {
  const [activeGrade, setActiveGrade] = useState('1-2')
  const [activeSubject, setActiveSubject] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const grades = getAllGrades()

  const gradeCourses = getCoursesByGrade(activeGrade)
  const allSubjects = useMemo(() => [...new Set(gradeCourses.map(c => c.subject))], [activeGrade])

  const filteredCourses = useMemo(() => {
    let result = gradeCourses
    if (activeSubject) result = result.filter(c => c.subject === activeSubject)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q))
    }
    return result
  }, [activeGrade, activeSubject, searchQuery])

  // Individual class tabs
  const classTabs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const classToGrade = (cls: string): string => {
    const n = parseInt(cls)
    if (n <= 2) return '1-2'
    if (n <= 5) return '3-5'
    if (n <= 8) return '6-8'
    return '9-10'
  }
  const [activeClass, setActiveClass] = useState('1')

  const handleClassChange = (cls: string) => {
    setActiveClass(cls)
    const grade = classToGrade(cls)
    if (grade !== activeGrade) {
      setActiveGrade(grade)
      setActiveSubject(null)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="pt-4 pb-8 border-b border-white/10 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">📚 All Courses</h1>
          <p className="text-slate-400">Interactive lessons, quizzes & labs for Classes 1-10</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input
              type="text"
              placeholder="Search courses by title, subject..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Courses', val: courses.length, icon: '📚' },
            { label: 'Subjects', val: [...new Set(courses.map(c => c.subject))].length, icon: '🎯' },
            { label: 'Total Lessons', val: courses.reduce((a, c) => a + c.totalLessons, 0), icon: '▶️' },
            { label: 'Max XP', val: courses.reduce((a, c) => a + c.xpReward, 0).toLocaleString(), icon: '⚡' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-white font-bold text-xl">{s.val}</div>
              <div className="text-slate-400 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Grade Tabs - Individual class pills in scrollable row */}
        <div className="mb-4">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Select Class</p>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {classTabs.map(cls => (
              <button
                key={cls}
                onClick={() => handleClassChange(cls)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border whitespace-nowrap ${
                  activeClass === cls
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                Class {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="mb-8">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Filter by Subject</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSubject(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                !activeSubject
                  ? 'bg-white/15 text-white border-white/30'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              All Subjects
            </button>
            {allSubjects.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSubject(activeSubject === sub ? null : sub)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border flex items-center gap-1.5 ${
                  activeSubject === sub
                    ? `${subjectColors[sub]?.bg || 'bg-white/15'} ${subjectColors[sub]?.text || 'text-white'} ${subjectColors[sub]?.border || 'border-white/30'}`
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                }`}
              >
                <span>{subjectEmojis[sub] || '📘'}</span>
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {filteredCourses.length === 0 ? (
            <div className="col-span-3 text-center py-16">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-slate-400 text-lg">
                {searchQuery ? `No courses found for "${searchQuery}"` : `More courses coming soon for Class ${activeClass}!`}
              </p>
            </div>
          ) : (
            filteredCourses.map(course => {
              const colors = subjectColors[course.subject] || { bg: 'bg-white/10', text: 'text-slate-300', border: 'border-white/20', gradient: 'from-gray-600 to-gray-700' }
              return (
                <Link href={`/courses/${course.id}`} key={course.id}
                  className="group flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                  {/* Colorful Gradient Header */}
                  <div className={`bg-gradient-to-r ${colors.gradient} p-6 relative overflow-hidden`}>
                    <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      Class {course.grade}
                    </div>
                    <div className="text-5xl mb-2 drop-shadow-lg">{course.icon}</div>
                    <span className="text-white/80 text-xs font-medium">{course.subject}</span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {course.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">📚 {course.totalLessons} lessons</span>
                      <span className="flex items-center gap-1">⏰ {course.totalDuration}</span>
                    </div>

                    {/* XP & Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-yellow-400 text-xs font-semibold">⚡ {course.xpReward} XP</span>
                        <span className="text-slate-500 text-xs">0% complete</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>

                    {/* Start Button */}
                    <button className="w-full py-2.5 bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all group-hover:bg-indigo-500">
                      Start Learning →
                    </button>
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}
