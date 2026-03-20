'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getCourse, type Lesson, type QuizQuestion } from '@/lib/courseData'
import { markLessonComplete, getProgress } from '@/lib/progress'
import AiTutor from '@/components/AiTutor'
import FlashCard from '@/components/FlashCard'

/* ─── Quiz Component ─── */
function QuizComponent({ questions, onComplete }: { questions: QuizQuestion[]; onComplete?: (score: number, total: number) => void }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const q = questions[current]

  const optionColors = [
    'border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20',
    'border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20',
    'border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20',
    'border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20',
  ]

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    const newScore = idx === q.correct ? score + 1 : score
    if (idx === q.correct) setScore(newScore)
    if (current + 1 >= questions.length) {
      // Last question - will trigger done on next
    }
  }

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      setDone(true)
      const finalScore = selected === q.correct ? score : score
      onComplete?.(finalScore, questions.length)
    }
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">{pct === 100 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
        <p className="text-slate-300 text-lg mb-1">
          You scored <span className="text-indigo-400 font-bold">{score}/{questions.length}</span>
        </p>
        <p className="text-slate-500 text-sm mb-6">{pct}% correct</p>
        <div className="w-48 mx-auto bg-white/10 h-3 rounded-full mb-6">
          <div className={`h-3 rounded-full transition-all ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
        </div>
        <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setDone(false) }}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-all">
          Retry Quiz
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-slate-400">Question {current + 1} of {questions.length}</span>
        <span className="text-sm font-semibold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full">Score: {score}</span>
      </div>
      <div className="w-full bg-white/10 h-2 rounded-full mb-6">
        <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-5">{q.question}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleSelect(idx)}
            className={`text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${
              selected === null
                ? `${optionColors[idx % 4]} text-slate-200 hover:scale-[1.02]`
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
        <div className={`mt-5 p-4 rounded-xl border ${
          selected === q.correct ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
        }`}>
          <p className={`text-sm ${selected === q.correct ? 'text-green-300' : 'text-red-300'}`}>
            {selected === q.correct ? '✅ Correct! ' : '❌ Incorrect. '}{q.explanation}
          </p>
        </div>
      )}
      {selected !== null && (
        <button onClick={handleNext}
          className="mt-5 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-all">
          {current + 1 < questions.length ? 'Next Question →' : 'See Results'}
        </button>
      )}
    </div>
  )
}

/* ─── Main Lesson Player Page ─── */
export default function LessonPlayerPage() {
  const params = useParams()
  const courseId = params.id as string
  const lessonId = params.lessonId as string
  const course = getCourse(courseId)
  const [showHints, setShowHints] = useState<Record<number, boolean>>({})
  const [showSolution, setShowSolution] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [isLessonCompleted, setIsLessonCompleted] = useState(false)

  useEffect(() => {
    const progress = getProgress()
    if (progress.completedLessons.includes(lessonId)) {
      setIsLessonCompleted(true)
    }
  }, [lessonId])

  if (!course) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-lg">Course not found</div>

  let lesson: Lesson | undefined
  let moduleTitle = ''
  for (const mod of course.modules) {
    const found = mod.lessons.find(l => l.id === lessonId)
    if (found) { lesson = found; moduleTitle = mod.title; break }
  }

  if (!lesson) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-lg">Lesson not found</div>

  const allLessons = course.modules.flatMap(m => m.lessons)
  const currentIdx = allLessons.findIndex(l => l.id === lessonId)
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null
  const progressPct = Math.round(((currentIdx + 1) / allLessons.length) * 100)

  const handleComplete = () => {
    markLessonComplete(courseId, lessonId, lesson!.xp)
    setCompleted(true)
    setIsLessonCompleted(true)
  }

  const typeIcons: Record<string, string> = { video: '▶️', reading: '📖', quiz: '❓', exercise: '💻', lab: '🧪' }
  const typeColors: Record<string, string> = {
    video: 'bg-blue-500/20 text-blue-400',
    reading: 'bg-purple-500/20 text-purple-400',
    quiz: 'bg-yellow-500/20 text-yellow-400',
    exercise: 'bg-green-500/20 text-green-400',
    lab: 'bg-red-500/20 text-red-400',
  }

  const flashcards = lesson.content.keyPoints.map((kp, i) => ({
    term: `Concept ${i + 1}`,
    definition: kp,
  }))

  const toggleHint = (idx: number) => {
    setShowHints(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Top Breadcrumb Bar with Progress */}
      <div className="border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-2">
            <nav className="flex items-center gap-2 text-sm text-slate-400 truncate">
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <span>/</span>
              <Link href={`/courses/${courseId}`} className="hover:text-white transition-colors truncate max-w-[150px]">{course.title}</Link>
              <span>/</span>
              <span className="text-white truncate max-w-[200px]">{lesson.title}</span>
            </nav>
            <div className="flex items-center gap-3 flex-shrink-0 ml-2">
              {isLessonCompleted && <span className="text-xs text-green-400 font-semibold">✅ Done</span>}
              <span className="text-xs text-slate-500">{currentIdx + 1} / {allLessons.length}</span>
            </div>
          </div>
          {/* Course progress bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full">
            <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Lesson Content (68%) */}
          <div className="lg:w-[68%] space-y-6">
            {/* Lesson Header */}
            <div className="animate-fade-in">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-2xl">{typeIcons[lesson.type]}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-lg capitalize ${typeColors[lesson.type] || 'bg-white/10 text-slate-400'}`}>{lesson.type}</span>
                <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-lg">{lesson.duration}</span>
                <span className="text-xs font-semibold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-lg">⚡ +{lesson.xp} XP</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{lesson.title}</h1>
              <p className="text-slate-500 text-sm">{moduleTitle}</p>
            </div>

            {/* VIDEO Section */}
            {lesson.content.videoTitle && (
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-fade-in">
                <div className="aspect-video bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-slate-900 relative flex items-center justify-center">
                  <div className="relative text-center z-10">
                    <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white/30 transition-all hover:scale-110 group">
                      <span className="text-4xl ml-1 group-hover:scale-110 transition-transform">▶</span>
                    </button>
                    <p className="text-white font-semibold text-lg">{lesson.content.videoTitle}</p>
                    <p className="text-slate-400 text-sm mt-1">{lesson.content.videoDuration}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Concept Overview */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-fade-in">
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                📝 <span>Concept Overview</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">{lesson.content.overview}</p>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                🎯 <span>Key Points</span>
              </h3>
              <ul className="space-y-3">
                {lesson.content.keyPoints.map((kp, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{kp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Quiz */}
            {lesson.content.quiz && lesson.content.quiz.length > 0 && (
              <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-2xl p-6 animate-fade-in">
                <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                  🧠 <span>Interactive Quiz</span>
                </h2>
                <QuizComponent questions={lesson.content.quiz} />
              </div>
            )}

            {/* Exercise Section */}
            {lesson.content.exercise && (
              <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl p-6 animate-fade-in">
                <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  💻 <span>Exercise: {lesson.content.exercise.title}</span>
                </h2>
                <p className="text-slate-300 text-sm mb-5 leading-relaxed">{lesson.content.exercise.instructions}</p>

                {lesson.content.exercise.starterCode && (
                  <div className="bg-slate-950/80 rounded-xl p-5 mb-5 border border-white/10 font-mono">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-slate-500 text-xs ml-2">code</span>
                    </div>
                    <pre className="text-green-300 text-sm whitespace-pre-wrap leading-relaxed">{lesson.content.exercise.starterCode}</pre>
                  </div>
                )}

                {lesson.content.exercise.hints && lesson.content.exercise.hints.length > 0 && (
                  <div className="space-y-2 mb-5">
                    <p className="text-yellow-400 font-semibold text-sm mb-2">💡 Hints (click to reveal)</p>
                    {lesson.content.exercise.hints.map((h, i) => (
                      <button key={i} onClick={() => toggleHint(i)}
                        className="w-full text-left bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3 transition-all hover:bg-yellow-500/10">
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-300 text-sm font-medium">Hint {i + 1}</span>
                          <span className="text-yellow-400 text-xs">{showHints[i] ? '▲' : '▼'}</span>
                        </div>
                        {showHints[i] && <p className="text-yellow-200/70 text-sm mt-2">{h}</p>}
                      </button>
                    ))}
                  </div>
                )}

                {lesson.content.exercise.solution && (
                  <div>
                    <button onClick={() => setShowSolution(!showSolution)}
                      className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                      {showSolution ? '🔒 Hide Solution' : '✅ Reveal Solution'}
                    </button>
                    {showSolution && (
                      <div className="mt-3 bg-slate-950/60 rounded-xl p-4 border border-emerald-500/20">
                        <pre className="text-emerald-300 text-sm font-mono whitespace-pre-wrap">{lesson.content.exercise.solution}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Flashcards */}
            {flashcards.length > 0 && (
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-2xl p-6 animate-fade-in">
                <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                  🃏 <span>Flashcards — Review Key Concepts</span>
                </h2>
                <FlashCard cards={flashcards} />
              </div>
            )}

            {/* Summary */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/20 rounded-2xl p-6 animate-fade-in">
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                📋 <span>Lesson Summary</span>
              </h2>
              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <ul className="space-y-2">
                  {lesson.content.keyPoints.map((kp, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <span className="text-indigo-400 font-bold mt-0.5">✓</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mark Complete Button */}
            {!completed && !isLessonCompleted ? (
              <button onClick={handleComplete}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-2xl text-lg transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-green-500/25 animate-fade-in">
                ✅ Mark Complete & Earn {lesson.xp} XP
              </button>
            ) : (
              <div className="w-full py-4 bg-green-500/10 border-2 border-green-500/40 text-green-300 font-bold rounded-2xl text-lg text-center animate-fade-in">
                🎉 Lesson Complete! +{lesson.xp} XP Earned!
              </div>
            )}

            {/* Prev/Next Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              {prevLesson ? (
                <Link href={`/courses/${courseId}/${prevLesson.id}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors group">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  <span className="truncate max-w-[180px]">{prevLesson.title}</span>
                </Link>
              ) : <div />}
              {nextLesson ? (
                <Link href={`/courses/${courseId}/${nextLesson.id}`}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all group">
                  <span className="truncate max-w-[180px]">Next: {nextLesson.title}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ) : (
                <Link href={`/courses/${courseId}`}
                  className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all">
                  ✅ Complete Course
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT: Course Sidebar (32%) */}
          <div className="lg:w-[32%]">
            <div className="lg:sticky lg:top-[130px]">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 bg-white/5 border-b border-white/10">
                  <h3 className="text-white font-semibold text-sm">📋 Course Outline</h3>
                  <p className="text-slate-500 text-xs mt-1">{course.title}</p>
                </div>
                <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
                  {course.modules.map((mod, mi) => (
                    <div key={mod.id}>
                      <div className="px-4 py-3 bg-white/[0.03] border-b border-white/5">
                        <p className="text-xs font-semibold text-indigo-400">Module {mi + 1}</p>
                        <p className="text-slate-300 text-xs truncate">{mod.title}</p>
                      </div>
                      {mod.lessons.map((l) => {
                        const isCurrent = l.id === lessonId
                        return (
                          <Link key={l.id} href={`/courses/${courseId}/${l.id}`}
                            className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 transition-colors ${
                              isCurrent
                                ? 'bg-indigo-500/10 border-l-2 border-l-indigo-500'
                                : 'hover:bg-white/5 border-l-2 border-l-transparent'
                            }`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                              isCurrent ? 'bg-indigo-500 text-white font-bold' : 'bg-white/10 text-slate-500'
                            }`}>
                              {isCurrent ? '▶' : '○'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs truncate ${isCurrent ? 'text-indigo-300 font-semibold' : 'text-slate-400'}`}>
                                {l.title}
                              </p>
                              <p className="text-slate-600 text-[10px]">{l.duration} · {l.type}</p>
                            </div>
                            <span className="text-[10px] text-yellow-400 flex-shrink-0">+{l.xp}</span>
                          </Link>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AiTutor topic={lesson.title} />
    </main>
  )
}
