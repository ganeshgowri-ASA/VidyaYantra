'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Play, RotateCcw, Copy, Check } from 'lucide-react'

const templates = [
  {
    id: 'hello',
    title: 'Hello World',
    language: 'JavaScript',
    code: '// Welcome to VidyaYantra Playground!\nconsole.log("Hello, World!")\n\nconst greet = (name) => {\n  return `Welcome to VidyaYantra, ${name}!`\n}\n\nconsole.log(greet("Learner"))',
  },
  {
    id: 'array',
    title: 'Array Methods',
    language: 'JavaScript',
    code: 'const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n// Filter even numbers\nconst evens = numbers.filter(n => n % 2 === 0)\nconsole.log("Evens:", evens)\n\n// Map to squares\nconst squares = numbers.map(n => n * n)\nconsole.log("Squares:", squares)\n\n// Reduce to sum\nconst sum = numbers.reduce((acc, n) => acc + n, 0)\nconsole.log("Sum:", sum)',
  },
  {
    id: 'async',
    title: 'Async/Await',
    language: 'JavaScript',
    code: 'const fetchData = async () => {\n  console.log("Fetching data...")\n  \n  // Simulating API call\n  const delay = (ms) => new Promise(r => setTimeout(r, ms))\n  await delay(1000)\n  \n  const data = { users: 42, active: 28 }\n  console.log("Data received:", JSON.stringify(data))\n  return data\n}\n\nfetchData().then(d => console.log("Done!", d))',
  },
  {
    id: 'react',
    title: 'React Component',
    language: 'JSX',
    code: '// React Counter Component\nfunction Counter() {\n  const [count, setCount] = React.useState(0)\n  \n  return (\n    <div className="counter">\n      <h2>Count: {count}</h2>\n      <button onClick={() => setCount(c => c + 1)}>\n        Increment\n      </button>\n      <button onClick={() => setCount(0)}>\n        Reset\n      </button>\n    </div>\n  )\n}',
  },
  {
    id: 'python',
    title: 'Python Basics',
    language: 'Python',
    code: '# Python Data Analysis Example\ndata = [23, 45, 12, 67, 34, 89, 56]\n\n# Basic statistics\nprint(f"Mean: {sum(data) / len(data):.1f}")\nprint(f"Max: {max(data)}")\nprint(f"Min: {min(data)}")\nprint(f"Sorted: {sorted(data)}")\n\n# List comprehension\nsquares = [x**2 for x in data if x > 30]\nprint(f"Squares of values > 30: {squares}")',
  },
]

export default function Playground() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [code, setCode] = useState(templates[0].code)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const runCode = () => {
    try {
      const logs: string[] = []
      const mockConsole = {
        log: (...args: unknown[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      }
      const fn = new Function('console', code)
      fn(mockConsole)
      setOutput(logs.join('\n'))
    } catch (err: unknown) {
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
          <Link href="/playground" className="text-white">Playground</Link>
          <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
        </div>
      </nav>

      <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Code Playground</h1>
          <p className="text-slate-400">Write, run, and experiment with code in real-time. Choose a template or start from scratch.</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelectedTemplate(t); setCode(t.code); setOutput('') }}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                selectedTemplate.id === t.id
                  ? 'bg-indigo-600 text-white'
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <span className="text-sm text-slate-400">{selectedTemplate.language}</span>
              <div className="flex gap-2">
                <button onClick={copyCode} className="text-slate-400 hover:text-white transition p-1">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => { setCode(selectedTemplate.code); setOutput('') }} className="text-slate-400 hover:text-white transition p-1">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 p-4 bg-transparent text-green-300 font-mono text-sm resize-none outline-none"
              spellCheck={false}
            />
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <span className="text-sm text-slate-400">Output</span>
              <button
                onClick={runCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-lg text-white text-sm transition"
              >
                <Play className="w-3.5 h-3.5" /> Run
              </button>
            </div>
            <pre className="h-80 p-4 text-sm font-mono text-slate-300 overflow-auto whitespace-pre-wrap">
              {output || 'Click "Run" to execute your code...'}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
