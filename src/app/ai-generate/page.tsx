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
    } catch (e) {
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
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-indigo-400 text-sm mb-6">
            Powered by AI
          </div>
          <h1 className="text-4xl font-extrabold mb-3">AI Lesson Generator</h1>
          <p className="text-slate-400 text-lg">Generate interactive lesson content instantly — like Articulate 360, built for Indian schools</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Topic or Concept</label>
              <input
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Photosynthesis, Fractions, Water Cycle..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Class / Grade</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(g => (
                  <option key={g} value={String(g)}>Class {g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Subject</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
              >
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Difficulty</label>
              <div className="flex gap-3">
                {['Easy', 'Medium', 'Hard'].map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${difficulty === d ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all"
          >
            {loading ? 'Generating Lesson...' : 'Generate Lesson'}
          </button>
        </div>

        {loading && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 animate-pulse">
            <div className="h-4 bg-white/10 rounded mb-4 w-1/3" />
            <div className="h-4 bg-white/10 rounded mb-3 w-full" />
            <div className="h-4 bg-white/10 rounded mb-3 w-4/5" />
            <div className="h-4 bg-white/10 rounded w-2/3" />
          </div>
        )}

        {result && !result.error && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Generated Lesson</h2>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-all"
              >
                {copied ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>
            {result.overview && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-indigo-400 mb-3">Overview</h3>
                <p className="text-slate-300 leading-relaxed">{result.overview}</p>
              </div>
            )}
            {result.keyPoints && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-green-400 mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {result.keyPoints.map((kp: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <span className="text-green-400 mt-1">•</span>{kp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.quiz && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-yellow-400 mb-4">Quiz Questions</h3>
                <div className="space-y-4">
                  {result.quiz.map((q: any, i: number) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4">
                      <p className="font-semibold text-white mb-2">Q{i+1}. {q.question}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt: string, j: number) => (
                          <div key={j} className={`px-3 py-2 rounded-lg text-sm ${j === q.correct ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-white/5 text-slate-400'}`}>
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
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-purple-400 mb-3">Exercise: {result.exercise.title}</h3>
                <p className="text-slate-300 mb-3">{result.exercise.instructions}</p>
                {result.exercise.hints && (
                  <ul className="space-y-1">
                    {result.exercise.hints.map((h: string, i: number) => (
                      <li key={i} className="text-yellow-300/70 text-sm">Hint {i+1}: {h}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {result && result.error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-300">
            {result.error}
          </div>
        )}

      </div>
    </main>
  )
}
