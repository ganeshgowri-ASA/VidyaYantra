'use client'
import { useState } from 'react'

interface FlashCardProps {
  cards: { term: string; definition: string }[]
}

export default function FlashCard({ cards }: FlashCardProps) {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const handlePrev = () => {
    setFlipped(false)
    setCurrent(c => (c > 0 ? c - 1 : cards.length - 1))
  }

  const handleNext = () => {
    setFlipped(false)
    setCurrent(c => (c < cards.length - 1 ? c + 1 : 0))
  }

  if (cards.length === 0) return null

  return (
    <div className="flex flex-col items-center">
      {/* Card with 3D flip */}
      <div
        className="w-full max-w-md cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            height: '200px',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex flex-col items-center justify-center p-6 border border-indigo-400/30"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Tap to flip</p>
            <p className="text-white font-bold text-xl text-center">{cards[current].term}</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex flex-col items-center justify-center p-6 border border-emerald-400/30"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">Definition</p>
            <p className="text-white font-medium text-center text-sm leading-relaxed">{cards[current].definition}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
        >
          ←
        </button>
        <span className="text-slate-400 text-sm font-medium">
          Card {current + 1} of {cards.length}
        </span>
        <button
          onClick={handleNext}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
        >
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-4">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFlipped(false); setCurrent(i) }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-indigo-400 w-4' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
