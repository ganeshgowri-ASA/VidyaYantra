'use client'
import { useState } from 'react'
export default function AiTutor({ topic }: { topic: string }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{role:string;text:string}[]>([{role:'bot',text:`Hi! I'm VidyaBot 🤖 Ask me anything about "${topic}"!`}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const send = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(m => [...m, {role:'user',text:userMsg}])
    setInput('')
    setLoading(true)
    try {
      const r = await fetch('/api/ai-tutor', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:userMsg,topic})})
      const d = await r.json()
      setMessages(m => [...m, {role:'bot',text:d.reply}])
    } catch { setMessages(m => [...m, {role:'bot',text:'Oops! Try again 🙏'}]) }
    setLoading(false)
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl flex flex-col" style={{height:'400px'}}>
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-white font-semibold text-sm">🤖 VidyaBot AI Tutor</span>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m,i) => (
              <div key={i} className={`flex ${m.role==='user'?'justify-end':''}`}>
                <div className={`max-w-xs px-3 py-2 rounded-xl text-sm ${m.role==='user'?'bg-indigo-600 text-white':'bg-white/10 text-slate-200'}`}>{m.text}</div>
              </div>
            ))}
            {loading && <div className="flex"><div className="bg-white/10 text-slate-300 px-3 py-2 rounded-xl text-sm">Thinking... 🤔</div></div>}
          </div>
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask a question..." className="flex-1 bg-white/10 text-white placeholder-slate-500 text-sm px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-500" />
            <button onClick={send} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-sm font-semibold">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all hover:scale-110">
        {open ? '✕' : '🤖'}
      </button>
    </div>
  )
}
