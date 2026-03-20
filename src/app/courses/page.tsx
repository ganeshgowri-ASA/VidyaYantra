'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { courses, getCoursesByGrade, getAllGrades } from '@/lib/courseData'

const subjectColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  Mathematics: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', gradient: 'from-blue-600 to-cyan-500' },
  Science: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30', gradient: 'from-yellow-500 to-orange-500' },
  EVS: { bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/30', gradient: 'from-green-500 to-emerald-500' },
  English: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30', gradient: 'from-purple-500 to-pink-500' },
  Hindi: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30', gradient: 'from-orange-500 to-red-500' },
  'Social Studies': { bg: 'bg-teal-500/15', text: 'text-teal-400', border: 'border-teal-500/30', gradient: 'from-teal-500 to-cyan-500' },
}

const subjectIcons: Record<string, React.ReactNode> = {
  Mathematics: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  Science: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  EVS: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z"/><path d="M2 12h20"/></svg>,
  English: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Hindi: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  'Social Studies': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
}

export default function CoursesPage() {
  const [activeGrade, setActiveGrade] = useState('1-2')
  const [activeSubject, setActiveSubject] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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

  const totalLessons = courses.reduce((a, c) => a + c.totalLessons, 0)
  const totalSubjects = [...new Set(courses.map(c => c.subject))].length

  return (
    <main className="min-h-screen bg-[#0F0F1A] flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="pt-4 pb-6 mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm mb-4 inline-flex items-center gap-1.5 transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">All Courses</h1>
          <p className="text-gray-500 text-base">Interactive lessons, quizzes & labs for Classes 1-10</p>
        </div>

        {/* Stats Pill Row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 bg-[#16213E] border border-[#2A2A4A] rounded-full px-4 py-2 text-sm text-gray-300 font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            {courses.length} Courses
          </span>
          <span className="text-[#2A2A4A]">|</span>
          <span className="inline-flex items-center gap-1.5 bg-[#16213E] border border-[#2A2A4A] rounded-full px-4 py-2 text-sm text-gray-300 font-medium">
            {totalSubjects} Subjects
          </span>
          <span className="text-[#2A2A4A]">|</span>
          <span className="inline-flex items-center gap-1.5 bg-[#16213E] border border-[#2A2A4A] rounded-full px-4 py-2 text-sm text-gray-300 font-medium">
            {totalLessons} Lessons
          </span>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search courses by title, subject..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#16213E] border border-[#2A2A4A] text-white placeholder-gray-600 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
            />
          </div>
        </div>

        {/* Filter bar - sticky */}
        <div className="sticky top-16 z-40 bg-[#0F0F1A]/90 backdrop-blur-xl py-4 -mx-6 px-6 lg:-mx-8 lg:px-8 mb-6 border-b border-[#2A2A4A]/50">
          {/* Class Tabs */}
          <div className="mb-4">
            <p className="text-gray-600 text-xs font-medium uppercase tracking-wider mb-2.5">Select Class</p>
            <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
              {classTabs.map(cls => (
                <button
                  key={cls}
                  onClick={() => handleClassChange(cls)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 border ${
                    activeClass === cls
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-[#16213E] text-gray-400 border-[#2A2A4A] hover:text-white hover:border-gray-600'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSubject(null)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                !activeSubject
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-transparent text-gray-500 border-[#2A2A4A] hover:text-gray-300'
              }`}
            >
              All Subjects
            </button>
            {allSubjects.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSubject(activeSubject === sub ? null : sub)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                  activeSubject === sub
                    ? `${subjectColors[sub]?.bg || 'bg-white/10'} ${subjectColors[sub]?.text || 'text-white'} ${subjectColors[sub]?.border || 'border-white/20'}`
                    : 'bg-transparent text-gray-500 border-[#2A2A4A] hover:text-gray-300'
                }`}
              >
                <span className={activeSubject === sub ? subjectColors[sub]?.text : 'text-gray-600'}>{subjectIcons[sub]}</span>
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {filteredCourses.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              <svg className="mx-auto mb-4 text-gray-700" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <p className="text-gray-500 text-base">
                {searchQuery ? `No courses found for "${searchQuery}"` : `More courses coming soon for Class ${activeClass}!`}
              </p>
            </div>
          ) : (
            filteredCourses.map(course => {
              const colors = subjectColors[course.subject] || { bg: 'bg-white/10', text: 'text-gray-400', border: 'border-white/20', gradient: 'from-gray-600 to-gray-700' }
              return (
                <Link href={`/courses/${course.id}`} key={course.id}
                  className="group flex flex-col h-full bg-[#16213E] border border-[#2A2A4A] rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-200 card-glow">
                  {/* Gradient Banner */}
                  <div className={`bg-gradient-to-r ${colors.gradient} h-20 relative overflow-hidden flex items-end p-4`}>
                    <div className="absolute top-3 right-3">
                      <span className={`${colors.bg} ${colors.text} text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm`}>
                        {course.subject}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-indigo-300 transition-colors duration-200 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {course.description}
                    </p>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        {course.totalLessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {course.totalDuration}
                      </span>
                      <span className="flex items-center gap-1 text-indigo-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        {course.xpReward} XP
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-gray-600 text-xs">Progress</span>
                        <span className="text-gray-600 text-xs">0%</span>
                      </div>
                      <div className="w-full bg-[#2A2A4A] h-1.5 rounded-full">
                        <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-2.5 bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-all duration-200">
                      Start Learning
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
