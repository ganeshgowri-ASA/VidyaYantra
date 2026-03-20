import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // AI Lesson Generation endpoint
  if (body.generate) {
    const { topic, grade, subject, difficulty } = body
    const key = process.env.OPENAI_API_KEY

    if (!key) {
      // Demo mode - return structured lesson content
      return NextResponse.json({
        lesson: {
          overview: `This lesson covers ${topic} for Class ${grade} ${subject} at ${difficulty} difficulty. Students will explore core concepts through interactive examples and guided practice.`,
          keyPoints: [
            `Understanding the fundamentals of ${topic}`,
            `Key definitions and terminology in ${topic}`,
            `Step-by-step problem solving with ${topic}`,
            `Real-world applications of ${topic}`,
            `Common mistakes and how to avoid them`,
          ],
          quiz: [
            { question: `What is the primary concept behind ${topic}?`, options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'], correct: 0, explanation: `Concept A is the foundation of ${topic} at the Class ${grade} level.` },
            { question: `Which of these best describes ${topic}?`, options: ['Description 1', 'Description 2', 'Description 3', 'Description 4'], correct: 1, explanation: `Description 2 accurately captures the essence of ${topic} in ${subject}.` },
            { question: `How is ${topic} applied in real life?`, options: ['Application A', 'Application B', 'Application C', 'Application D'], correct: 2, explanation: `Application C is the most common real-world use of ${topic}.` },
          ],
          exercise: {
            title: `Practice: ${topic}`,
            instructions: `Apply the concepts of ${topic} to solve the following problems. Show step-by-step working for each answer. This is a ${difficulty.toLowerCase()} level exercise for Class ${grade} ${subject}.`,
            hints: [
              `Start by recalling the key definition of ${topic}`,
              `Use the formulas or methods discussed in the lesson`,
              `Verify your answer by checking if it makes sense in context`,
            ],
          },
        },
      })
    }

    try {
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are VidyaBot, an AI lesson generator for Indian school students. Generate a structured lesson in JSON format. The response must be valid JSON with this exact structure:
{
  "overview": "2-3 sentence overview",
  "keyPoints": ["point1", "point2", "point3", "point4", "point5"],
  "quiz": [
    {"question": "...", "options": ["A","B","C","D"], "correct": 0, "explanation": "..."},
    {"question": "...", "options": ["A","B","C","D"], "correct": 1, "explanation": "..."},
    {"question": "...", "options": ["A","B","C","D"], "correct": 2, "explanation": "..."}
  ],
  "exercise": {"title": "...", "instructions": "...", "hints": ["hint1","hint2","hint3"]}
}
Only output the JSON, nothing else.`,
            },
            {
              role: 'user',
              content: `Generate a ${difficulty} difficulty lesson on "${topic}" for Class ${grade} ${subject}.`,
            },
          ],
          max_tokens: 800,
        }),
      })
      const d = await r.json()
      const content = d.choices[0].message.content
      const lesson = JSON.parse(content)
      return NextResponse.json({ lesson })
    } catch {
      return NextResponse.json({
        lesson: {
          overview: `Lesson on ${topic} for Class ${grade} ${subject} (${difficulty}).`,
          keyPoints: [`Core concepts of ${topic}`, 'Important definitions', 'Practice applications', 'Key formulas', 'Summary'],
          quiz: [{ question: `What is ${topic}?`, options: ['A', 'B', 'C', 'D'], correct: 0, explanation: 'This is the correct answer.' }],
          exercise: { title: `${topic} Practice`, instructions: 'Solve problems using lesson concepts.', hints: ['Review key points'] },
        },
      })
    }
  }

  // Regular AI Tutor chat
  const { message, topic } = body
  const key = process.env.OPENAI_API_KEY

  if (!key) {
    return NextResponse.json({
      reply: `Hi! I'm VidyaBot 🤖. You're studying: ${topic}. Ask me anything about it! (OpenAI key not configured - showing demo mode)`,
    })
  }

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: `You are VidyaBot, a friendly AI tutor for school kids. Topic: ${topic}. Be encouraging, simple, use emojis.` },
          { role: 'user', content: message },
        ],
        max_tokens: 200,
      }),
    })
    const d = await r.json()
    return NextResponse.json({ reply: d.choices[0].message.content })
  } catch {
    return NextResponse.json({ reply: 'Oops! Try again. ' + topic })
  }
}
