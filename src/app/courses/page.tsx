'use client'
import { useState } from 'react'
import Link from 'next/link'
import { courses, getCoursesByGrade, getAllGrades, getGradeLabel } from '@/lib/courseData'

const subjectColors: Record<string, string> = {
  Mathematics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Science: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  EVS: 'bg-green-500/20 text-green-400 border-green-500/30',
  English: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Hindi: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Social Studies': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
}

const gradeEmojis: Record<string, string> = {
  '1-2': '🌟',
  '3-5': '📚',
  '6-8': '🔬',
  '9-10': '🎯',
}

export default function CoursesPage() {
  const [activeGrade, setActiveGrade] = useState('1-2')
  const grades = getAllGrades()
  const filteredCourses = getCoursesByGrade(activeGrade)

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="pt-4 pb-8 border-b border-white/10 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white text-sm mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🏢 School Courses</h1>
          <p className="text-slate-400">Interactive lessons, quizzes & labs for Classes 1-10</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{label: 'Total Courses', val: courses.length, icon: '📚'},
            {label: 'Subjects', val: [...new Set(courses.map(c=>c.subject))].length, icon: '🎯'},
            {label: 'Total Lessons', val: courses.reduce((a,c)=>a+c.totalLessons,0), icon: '▶️'},
            {label: 'Max XP', val: courses.reduce((a,c)=>a+c.xpReward,0).toLocaleString(), icon: '⚡'}
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center min-h-[100px] flex flex-col items-center justify-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-white font-bold text-xl">{s.val}</div>
              <div className="text-slate-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Grade Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {grades.map(grade => (
            <button
              key={grade}
              onClick={() => setActiveGrade(grade)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all border ${
                activeGrade === grade
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {gradeEmojis[grade]} {getGradeLabel(grade)}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
          {filteredCourses.length === 0 ? (
            <div className="col-span-3 text-center py-16">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-slate-400 text-lg">More courses coming soon for {getGradeLabel(activeGrade)}!</p>
            </div>
          ) : (
            filteredCourses.map(course => (
              <Link href={`/courses/${course.id}`} key={course.id}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-indigo-500/40 transition-all hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                {/* Icon & Subject */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{course.icon}</div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                    subjectColors[course.subject] || 'bg-white/10 text-slate-300 border-white/20'
                  }`}>
                    {course.subject}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span>📚 {course.totalLessons} lessons</span>
                  <span>⏰ {course.totalDuration}</span>
                  <span>⚡ {course.xpReward} XP</span>
                </div>

                {/* Module count */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-slate-400 text-xs">{course.modules.length} modules</span>
                  <span className="text-indigo-400 text-sm font-semibold group-hover:text-indigo-300">
                    Start Learning →
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </main>
  )
}
