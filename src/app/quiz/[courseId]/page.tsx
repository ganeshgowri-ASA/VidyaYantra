'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getCourse, type QuizQuestion } from '@/lib/courseData'
import { getProgress, markLessonComplete } from '@/lib/progress'

interface QuizPool {
  lessonId: string
  lessonTitle: string
  moduleName: string
  questions: QuizQuestion[]
}

export default function StandaloneQuizPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const course = getCourse(courseId)

  const [currentPool, setCurrentPool] = useState(0)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [quizDone, setQuizDone] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)

  if (!course) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">❓</div>
        <h1 className="text-2xl font-bold text-white mb-2">Course Not Found</h1>
        <Link href="/courses" className="text-indigo-400 hover:text-indigo-300">Browse Courses</Link>
      </div>
    </div>
  )

  // Collect all quiz questions from all lessons
  const quizPools: QuizPool[] = []
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.content.quiz && lesson.content.quiz.length > 0) {
        quizPools.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          moduleName: mod.title,
          questions: lesson.content.quiz,
        })
      }
    }
  }

  const totalQuestions = quizPools.reduce((a, p) => a + p.questions.length, 0)

  if (quizPools.length === 0) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📝</div>
        <h1 className="text-2xl font-bold text-white mb-2">No Quizzes Available</h1>
        <p className="text-slate-400 mb-4">This course doesn&apos;t have any quiz questions yet.</p>
        <Link href={`/courses/${courseId}`} className="text-indigo-400 hover:text-indigo-300">Back to Course</Link>
      </div>
    </div>
  )

  const pool = quizPools[currentPool]
  const q = pool.questions[currentQ]

  const optionColors = [
    'border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20',
    'border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20',
    'border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20',
    'border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20',
  ]

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore(s => s + 1)
    setTotalAnswered(t => t + 1)
  }

  const handleNext = () => {
    if (currentQ + 1 < pool.questions.length) {
      setCurrentQ(currentQ + 1)
      setSelected(null)
    } else if (currentPool + 1 < quizPools.length) {
      setCurrentPool(currentPool + 1)
      setCurrentQ(0)
      setSelected(null)
    } else {
      // Quiz complete - award XP
      const earned = score * 10
      setXpEarned(earned)
      setQuizDone(true)
      // Mark progress
      markLessonComplete(courseId, `quiz-${courseId}`, earned)
    }
  }

  const overallProgress = Math.round((totalAnswered / totalQuestions) * 100)

  if (quizDone) {
    const pct = Math.round((score / totalQuestions) * 100)
    return (
      <main className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="text-8xl mb-6">{pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
          <h1 className="text-3xl font-bold mb-3">Quiz Complete!</h1>
          <p className="text-slate-300 text-xl mb-2">
            <span className="text-indigo-400 font-bold">{course.title}</span>
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-8 mb-8">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-white">{score}/{totalQuestions}</div>
                <div className="text-slate-400 text-sm">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-400">{pct}%</div>
                <div className="text-slate-400 text-sm">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">+{xpEarned}</div>
                <div className="text-slate-400 text-sm">XP Earned</div>
              </div>
            </div>
            <div className="w-full bg-white/10 h-3 rounded-full mt-6">
              <div className={`h-3 rounded-full transition-all ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link href={`/courses/${courseId}`} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all">
              Back to Course
            </Link>
            <button onClick={() => { setCurrentPool(0); setCurrentQ(0); setSelected(null); setScore(0); setTotalAnswered(0); setQuizDone(false); setXpEarned(0) }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all">
              Retry Quiz
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>/</span>
            <Link href={`/courses/${courseId}`} className="hover:text-white transition-colors">{course.title}</Link>
            <span>/</span>
            <span className="text-white">Quiz Mode</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">🧠 {course.title} — Quiz Mode</h1>
          <p className="text-slate-400">{course.subject} · {totalQuestions} questions from {quizPools.length} lessons</p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Overall Progress</span>
            <span className="text-sm font-semibold text-indigo-400">{totalAnswered}/{totalQuestions}</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full">
            <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>

        {/* Current Lesson Label */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 mb-6">
          <p className="text-xs text-indigo-400 font-semibold">{pool.moduleName}</p>
          <p className="text-sm text-white font-medium">{pool.lessonTitle}</p>
        </div>

        {/* Question Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-slate-400">
              Question {currentQ + 1} of {pool.questions.length}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
                ✅ {score} correct
              </span>
              <span className="text-sm font-semibold bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full">
                ⚡ {score * 10} XP
              </span>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-white mb-6">{q.question}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleSelect(idx)}
                className={`text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${
                  selected === null
                    ? `${optionColors[idx % 4]} text-slate-200 hover:scale-[1.02] cursor-pointer`
                    : idx === q.correct
                      ? 'border-green-500 bg-green-500/20 text-green-300 scale-[1.02]'
                      : idx === selected
                        ? 'border-red-500 bg-red-500/20 text-red-300'
                        : 'border-white/5 bg-white/[0.02] text-slate-500'
                }`}>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-xs font-bold mr-3">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className={`mt-6 p-4 rounded-xl border ${
              selected === q.correct ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
            }`}>
              <p className={`text-sm ${selected === q.correct ? 'text-green-300' : 'text-red-300'}`}>
                {selected === q.correct ? '✅ Correct! ' : '❌ Incorrect. '}{q.explanation}
              </p>
            </div>
          )}

          {selected !== null && (
            <button onClick={handleNext}
              className="mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all">
              {currentQ + 1 < pool.questions.length
                ? 'Next Question →'
                : currentPool + 1 < quizPools.length
                  ? `Next Lesson: ${quizPools[currentPool + 1].lessonTitle} →`
                  : 'See Final Results'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
