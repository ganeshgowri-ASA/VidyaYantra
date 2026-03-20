'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getCourse, type Lesson, type QuizQuestion } from '@/lib/courseData'

function QuizComponent({ questions }: { questions: QuizQuestion[] }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const q = questions[current]

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '💪'}</div>
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
        <p className="text-slate-300 text-lg">You scored <span className="text-indigo-400 font-bold">{score}/{questions.length}</span></p>
        <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setDone(false) }}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
          Retry Quiz
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-slate-400">Question {current + 1} of {questions.length}</span>
        <span className="text-sm text-indigo-400 font-semibold">Score: {score}</span>
      </div>
      <div className="w-full bg-white/10 h-1.5 rounded-full mb-6">
        <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{width: `${((current + 1) / questions.length) * 100}%`}} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-4">{q.question}</h3>
      <div className="space-y-3">
        {q.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleSelect(idx)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
              selected === null ? 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200'
              : idx === q.correct ? 'border-green-500 bg-green-500/20 text-green-300'
              : idx === selected ? 'border-red-500 bg-red-500/20 text-red-300'
              : 'border-white/5 bg-white/3 text-slate-500'
            }`}>
            <span className="mr-3 font-bold">{String.fromCharCode(65 + idx)}.</span>{opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className={`mt-4 p-4 rounded-xl border ${
          selected === q.correct ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
        }`}>
          <p className={selected === q.correct ? 'text-green-300' : 'text-red-300'}>
            {selected === q.correct ? '✅ Correct! ' : '❌ Incorrect. '}{q.explanation}
          </p>
        </div>
      )}
      {selected !== null && (
        <button onClick={handleNext}
          className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500">
          {current + 1 < questions.length ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  )
}

export default function LessonPage() {
  const params = useParams()
  const courseId = params.id as string
  const lessonId = params.lessonId as string
  const course = getCourse(courseId)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  if (!course) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Course not found</div>

  let lesson: Lesson | undefined
  let moduleTitle = ''
  for (const mod of course.modules) {
    const found = mod.lessons.find(l => l.id === lessonId)
    if (found) { lesson = found; moduleTitle = mod.title; break }
  }

  if (!lesson) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Lesson not found</div>

  const allLessons = course.modules.flatMap(m => m.lessons)
  const currentIdx = allLessons.findIndex(l => l.id === lessonId)
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null

  const typeIcons: Record<string, string> = { video: '▶️', reading: '📖', quiz: '❓', exercise: '💻', lab: '🧪' }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Top Nav */}
      <div className="px-6 md:px-12 py-4 border-b border-white/10 flex items-center justify-between">
        <Link href={`/courses/${courseId}`} className="text-slate-400 hover:text-white text-sm">← {course.title}</Link>
        <span className="text-xs text-slate-500">{currentIdx + 1} / {allLessons.length}</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{typeIcons[lesson.type]}</span>
            <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-lg capitalize">{lesson.type}</span>
            <span className="text-xs text-slate-500">{lesson.duration}</span>
            <span className="text-xs text-yellow-400">+{lesson.xp} XP</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{lesson.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{moduleTitle}</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-3">📝 Overview</h2>
            <p className="text-slate-300 leading-relaxed">{lesson.content.overview}</p>
          </div>

          {/* Key Points */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-3">🎯 Key Points</h2>
            <ul className="space-y-2">
              {lesson.content.keyPoints.map((kp, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300">
                  <span className="text-indigo-400 mt-0.5">•</span>{kp}
                </li>
              ))}
            </ul>
          </div>

          {/* Video Section */}
          {lesson.content.videoTitle && (
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-3">🎥 Video: {lesson.content.videoTitle}</h2>
              <div className="aspect-video bg-black/40 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <div className="text-5xl mb-3">▶️</div>
                  <p className="text-slate-400">Video: {lesson.content.videoTitle}</p>
                  <p className="text-slate-500 text-sm">{lesson.content.videoDuration}</p>
                </div>
              </div>
            </div>
          )}

          {/* Exercise Section */}
          {lesson.content.exercise && (
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-3">💻 Exercise: {lesson.content.exercise.title}</h2>
              <p className="text-slate-300 mb-4">{lesson.content.exercise.instructions}</p>

              {lesson.content.exercise.starterCode && (
                <div className="bg-black/40 rounded-xl p-4 mb-4 border border-white/10">
                  <p className="text-xs text-slate-500 mb-2">Starter Code:</p>
                  <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">{lesson.content.exercise.starterCode}</pre>
                </div>
              )}

              {lesson.content.exercise.hints && (
                <div className="mt-4">
                  <button onClick={() => setShowHints(!showHints)}
                    className="text-sm text-yellow-400 hover:text-yellow-300 font-semibold">
                    {showHints ? '👁 Hide Hints' : '💡 Show Hints'}
                  </button>
                  {showHints && (
                    <ul className="mt-2 space-y-1">
                      {lesson.content.exercise.hints.map((h, i) => (
                        <li key={i} className="text-yellow-200/70 text-sm">💡 {h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {lesson.content.exercise.solution && (
                <div className="mt-4">
                  <button onClick={() => setShowSolution(!showSolution)}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold">
                    {showSolution ? '👁 Hide Solution' : '✅ Show Solution'}
                  </button>
                  {showSolution && (
                    <div className="mt-2 bg-black/30 rounded-lg p-3 border border-emerald-500/20">
                      <pre className="text-emerald-300 text-sm font-mono whitespace-pre-wrap">{lesson.content.exercise.solution}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quiz Section */}
          {lesson.content.quiz && lesson.content.quiz.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/20 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">❓ Quiz Time!</h2>
              <QuizComponent questions={lesson.content.quiz} />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
          {prevLesson ? (
            <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`}
              className="text-slate-400 hover:text-white text-sm">← {prevLesson.title}</Link>
          ) : <div />}
          {nextLesson ? (
            <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
              Next: {nextLesson.title} →
            </Link>
          ) : (
            <Link href={`/courses/${courseId}`}
              className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
              ✅ Complete Course
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
