'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle2, Play, Code2, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'
import { getCourseById, getLessonById, getAllLessons } from '@/lib/courseData'

export default function LessonPlayer() {
  const params = useParams()
  const courseId = Number(params.id)
  const lessonId = params.lessonId as string
  const course = getCourseById(courseId)
  const lesson = getLessonById(courseId, lessonId)
  const allLessons = getAllLessons(courseId)
  const currentIndex = allLessons.findIndex(l => l.id === lessonId)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  if (!course || !lesson) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lesson not found</h1>
          <Link href="/courses" className="text-indigo-400 hover:underline">Back to courses</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 md:px-12 py-3 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href={`/courses/${courseId}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline text-sm">{course.title}</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{currentIndex + 1} / {allLessons.length}</span>
          <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }} />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 capitalize">{lesson.type}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 ml-2">+{lesson.xp} XP</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
        <p className="text-slate-400 mb-8">{lesson.content.overview}</p>

        {lesson.content.keyPoints.length > 0 && (
          <div className="glass rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-white mb-3">Key Points</h2>
            <ul className="space-y-2">
              {lesson.content.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {lesson.type === 'video' && lesson.content.videoTitle && (
          <div className="glass rounded-xl overflow-hidden mb-8">
            <div className="h-64 md:h-80 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-white/60 mx-auto mb-3" />
                <p className="text-white font-medium">{lesson.content.videoTitle}</p>
                <p className="text-slate-400 text-sm">{lesson.content.videoDuration}</p>
              </div>
            </div>
          </div>
        )}

        {lesson.content.codeExample && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" /> Code Example
            </h2>
            <pre className="glass rounded-xl p-4 overflow-x-auto text-sm text-green-300 font-mono">
              <code>{lesson.content.codeExample}</code>
            </pre>
          </div>
        )}

        {lesson.content.quiz && lesson.content.quiz.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Quiz</h2>
            <div className="space-y-6">
              {lesson.content.quiz.map((q) => (
                <div key={q.id} className="glass rounded-xl p-6">
                  <p className="text-white font-medium mb-4">{q.id}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = selectedAnswers[q.id] === oi
                      const isCorrect = showResults && oi === q.correct
                      const isWrong = showResults && isSelected && oi !== q.correct
                      return (
                        <button
                          key={oi}
                          onClick={() => !showResults && setSelectedAnswers(prev => ({ ...prev, [q.id]: oi }))}
                          className={`w-full text-left p-3 rounded-lg border transition text-sm ${
                            isCorrect ? 'border-green-500 bg-green-500/20 text-green-300' :
                            isWrong ? 'border-red-500 bg-red-500/20 text-red-300' :
                            isSelected ? 'border-indigo-500 bg-indigo-500/20 text-white' :
                            'border-white/10 hover:border-white/30 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                  {showResults && selectedAnswers[q.id] !== undefined && (
                    <p className="mt-3 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg">{q.explanation}</p>
                  )}
                </div>
              ))}
              {!showResults && (
                <button
                  onClick={() => setShowResults(true)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-medium transition"
                >
                  Check Answers
                </button>
              )}
            </div>
          </div>
        )}

        {lesson.content.exercise && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-3">Exercise: {lesson.content.exercise.title}</h2>
            <p className="text-slate-400 text-sm mb-4">{lesson.content.exercise.description}</p>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-slate-300 mb-2">Starter Code</h3>
              <pre className="glass rounded-xl p-4 overflow-x-auto text-sm text-cyan-300 font-mono">
                <code>{lesson.content.exercise.starterCode}</code>
              </pre>
            </div>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 px-4 py-2 border border-yellow-500/30 text-yellow-300 rounded-lg hover:bg-yellow-500/10 transition text-sm"
              >
                <Lightbulb className="w-4 h-4" />
                {showHints ? 'Hide Hints' : 'Show Hints'}
                {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-2 px-4 py-2 border border-green-500/30 text-green-300 rounded-lg hover:bg-green-500/10 transition text-sm"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
            </div>
            {showHints && (
              <div className="glass rounded-xl p-4 mb-4">
                <ul className="space-y-2">
                  {lesson.content.exercise.hints.map((hint, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-yellow-300">
                      <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" /> {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showSolution && (
              <div>
                <h3 className="text-sm font-medium text-green-300 mb-2">Solution</h3>
                <pre className="glass rounded-xl p-4 overflow-x-auto text-sm text-green-300 font-mono">
                  <code>{lesson.content.exercise.solution}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          {prevLesson ? (
            <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" /> {prevLesson.title}
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition">
              {nextLesson.title} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href={`/courses/${courseId}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white transition">
              <CheckCircle2 className="w-4 h-4" /> Complete Course
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
