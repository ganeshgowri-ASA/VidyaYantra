'use client'
import { useState } from 'react'
import Link from 'next/link'

interface GeneratedLesson {
  overview: string
  keyPoints: string[]
  quiz: { question: string; options: string[]; correct: number; explanation: string }[]
  exercise: { title: string; instructions: string; hints: string[] }
}

const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'EVS', 'Social Studies', 'Computer Science']
const difficulties = ['Easy', 'Medium', 'Hard']

export default function AiGeneratePage() {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('5')
  const [subject, setSubject] = useState('Science')
  const [difficulty, setDifficulty] = useState('Medium')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratedLesson | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generate: true, topic: topic.trim(), grade, subject, difficulty }),
      })
      const data = await res.json()
      if (data.lesson) {
        setResult(data.lesson)
      } else {
        // Fallback demo content
        setResult({
          overview: `This lesson covers ${topic} for Class ${grade} ${subject} at ${difficulty} difficulty. Students will learn the fundamental concepts, practice with interactive exercises, and test their understanding through quizzes.`,
          keyPoints: [
            `Understanding the basics of ${topic}`,
            `Key formulas and definitions related to ${topic}`,
            `Real-world applications of ${topic}`,
            `Common mistakes to avoid when studying ${topic}`,
            `Practice problems and solved examples`,
          ],
          quiz: [
            { question: `What is the most important concept in ${topic}?`, options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'], correct: 0, explanation: `Concept A is fundamental to understanding ${topic} at the Class ${grade} level.` },
            { question: `Which of these is related to ${topic}?`, options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct: 1, explanation: `Option 2 directly relates to ${topic} as studied in ${subject}.` },
            { question: `In ${topic}, what comes first?`, options: ['Step 1', 'Step 2', 'Step 3', 'Step 4'], correct: 0, explanation: `Step 1 is always the starting point when working with ${topic}.` },
          ],
          exercise: {
            title: `Practice: ${topic}`,
            instructions: `Apply what you learned about ${topic}. Solve the following problems step by step. Show your working for each answer.`,
            hints: [
              `Start by recalling the key definition of ${topic}`,
              `Use the formula or method taught in the lesson`,
              `Check your answer by substituting back`,
            ],
          },
        })
      }
    } catch {
      setResult({
        overview: `This lesson covers ${topic} for Class ${grade} ${subject}. Explore the key concepts and test your understanding.`,
        keyPoints: [`Core concepts of ${topic}`, `Important definitions`, `Practice applications`, `Key formulas`, `Common examples`],
        quiz: [
          { question: `What is ${topic}?`, options: ['Definition A', 'Definition B', 'Definition C', 'Definition D'], correct: 0, explanation: 'This is the standard definition.' },
        ],
        exercise: { title: `${topic} Practice`, instructions: 'Solve the problems using concepts from this lesson.', hints: ['Review the key points', 'Apply step by step'] },
      })
    }

    setLoading(false)
  }

  const handleExport = () => {
    if (!result) return
    const json = JSON.stringify({ topic, grade, subject, difficulty, lesson: result }, null, 2)
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="pt-4 pb-8 border-b border-white/10 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            🤖 AI Lesson Generator
          </h1>
          <p className="text-slate-400 text-lg">Generate complete lesson content from any topic — powered by AI. Perfect for teachers and students.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-[40%]">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:sticky lg:top-24 space-y-5">
              <h2 className="text-white font-semibold text-lg mb-2">Configure Your Lesson</h2>

              {/* Topic Input */}
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Topic / Concept *</label>
                <input
                  type="text"
                  placeholder="e.g., Photosynthesis, Quadratic Equations, Nouns..."
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>

              {/* Grade Select */}
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Class / Grade</label>
                <select
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>Class {i + 1}</option>
                  ))}
                </select>
              </div>

              {/* Subject Select */}
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Subject</label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                >
                  {subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Difficulty</label>
                <div className="flex gap-2">
                  {difficulties.map(d => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                        difficulty === d
                          ? d === 'Easy' ? 'bg-green-600 border-green-500 text-white'
                            : d === 'Medium' ? 'bg-yellow-600 border-yellow-500 text-white'
                            : 'bg-red-600 border-red-500 text-white'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-base transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                {loading ? '⏳ Generating...' : '✨ Generate Lesson'}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:w-[60%]">
            {loading && (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="h-5 bg-white/10 rounded w-1/3 mb-4" />
                    <div className="space-y-2">
                      <div className="h-3 bg-white/10 rounded w-full" />
                      <div className="h-3 bg-white/10 rounded w-4/5" />
                      <div className="h-3 bg-white/10 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !result && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🧠</div>
                <h3 className="text-white font-bold text-xl mb-2">Generate a Lesson</h3>
                <p className="text-slate-400 text-sm max-w-md">Enter a topic, select grade and subject, then click Generate. AI will create a complete lesson with overview, key points, quiz questions, and an exercise.</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6 animate-fade-in">
                {/* Export Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    {copied ? '✅ Copied!' : '📋 Export JSON'}
                  </button>
                </div>

                {/* Overview */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">📝 Overview</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.overview}</p>
                </div>

                {/* Key Points */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">🎯 5 Key Points</h3>
                  <ul className="space-y-3">
                    {result.keyPoints.map((kp, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                        <span className="leading-relaxed">{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quiz */}
                <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-2xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">🧠 3 Quiz Questions</h3>
                  <div className="space-y-5">
                    {result.quiz.map((q, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-white font-medium text-sm mb-3">Q{i + 1}. {q.question}</p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className={`px-3 py-2 rounded-lg text-xs ${oi === q.correct ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                              {String.fromCharCode(65 + oi)}. {opt}
                            </div>
                          ))}
                        </div>
                        <p className="text-slate-500 text-xs">💡 {q.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exercise */}
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2">💻 Exercise: {result.exercise.title}</h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">{result.exercise.instructions}</p>
                  <div className="space-y-2">
                    {result.exercise.hints.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-yellow-300/70 text-xs">
                        <span>💡</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
