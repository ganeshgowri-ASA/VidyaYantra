'use client'
import { useState } from 'react'

export default function AiGeneratePage() {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('5')
  const [subject, setSubject] = useState('Science')
  const [difficulty, setDifficulty] = useState('Medium')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null as any)
  const [copied, setCopied] = useState(false)

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'EVS', 'Social Studies', 'Computer']

  const handleGenerate = async () => {
    if (!topic.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const r = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generate: true, topic, grade, subject, difficulty })
      })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const data = await r.json()
      if (data.error) {
        setResult({ error: data.error })
      } else {
        setResult(data.lesson || data)
      }
    } catch {
      setResult({ error: 'Failed to generate. Please try again.' })
    }
    setLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#0F0F1A] text-white flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-6 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Lesson Generator</h1>
          <p className="text-gray-500 text-base">Generate interactive lesson content instantly for any topic</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-6 md:p-8 mb-8">
          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Topic or Concept</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Photosynthesis, Fractions, Water Cycle..."
              className="w-full bg-[#0F0F1A] border border-[#2A2A4A] rounded-lg px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 text-base transition-all duration-200"
            />
          </div>

          {/* 2-col grid: Class + Subject */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Class / Grade</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full bg-[#0F0F1A] border border-[#2A2A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(g => (
                  <option key={g} value={String(g)}>Class {g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full bg-[#0F0F1A] border border-[#2A2A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-all duration-200"
              >
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Difficulty Segmented Control */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <div className="flex gap-2 bg-[#0F0F1A] p-1 rounded-lg border border-[#2A2A4A]">
              {['Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                    difficulty === d
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-300'
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
            disabled={loading || !topic.trim()}
            className="w-full py-[13px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-base rounded-lg transition-all duration-200"
            style={{ height: '52px' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10"/></svg>
                Generating Lesson...
              </span>
            ) : 'Generate Lesson'}
          </button>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-6 animate-pulse">
            <div className="h-3.5 bg-[#2A2A4A] rounded mb-4 w-1/3" />
            <div className="h-3.5 bg-[#2A2A4A] rounded mb-3 w-full" />
            <div className="h-3.5 bg-[#2A2A4A] rounded mb-3 w-4/5" />
            <div className="h-3.5 bg-[#2A2A4A] rounded w-2/3" />
          </div>
        )}

        {/* Results */}
        {result && !result.error && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Generated Lesson</h2>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-[#16213E] border border-[#2A2A4A] hover:border-gray-600 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {copied ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>
            {result.overview && (
              <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-5">
                <h3 className="font-semibold text-indigo-400 text-sm mb-2">Overview</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{result.overview}</p>
              </div>
            )}
            {result.keyPoints && (
              <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-5">
                <h3 className="font-semibold text-emerald-400 text-sm mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {result.keyPoints.map((kp: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-400 text-sm">
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      {kp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.quiz && (
              <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-5">
                <h3 className="font-semibold text-yellow-400 text-sm mb-4">Quiz Questions</h3>
                <div className="space-y-4">
                  {result.quiz.map((q: any, i: number) => (
                    <div key={i} className="bg-[#0F0F1A] rounded-lg p-4">
                      <p className="font-medium text-white text-sm mb-3">Q{i+1}. {q.question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt: string, j: number) => (
                          <div key={j} className={`px-3 py-2 rounded-lg text-sm ${j === q.correct ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#16213E] text-gray-500 border border-[#2A2A4A]'}`}>
                            {String.fromCharCode(65+j)}. {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.exercise && (
              <div className="bg-[#16213E] border border-[#2A2A4A] rounded-xl p-5">
                <h3 className="font-semibold text-purple-400 text-sm mb-2">Exercise: {result.exercise.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{result.exercise.instructions}</p>
                {result.exercise.hints && (
                  <ul className="space-y-1.5">
                    {result.exercise.hints.map((h: string, i: number) => (
                      <li key={i} className="text-yellow-400/60 text-xs">Hint {i+1}: {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {result && result.error && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 text-red-400 text-sm">
            {result.error}
          </div>
        )}
      </div>
    </main>
  )
}
