import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are VidyaBot, a friendly and encouraging AI tutor for school students (Classes 1-10).
You help with Mathematics, Science, EVS, English, Hindi, and Social Studies.
Rules:
- Keep explanations simple and age-appropriate
- Use emojis to make learning fun
- Give step-by-step solutions
- Encourage the student after every answer
- If they make a mistake, gently guide them
- Use examples from everyday life
- For younger kids (Class 1-5), use stories and visuals
- For older kids (Class 6-10), be more detailed and exam-focused
- Always end with a follow-up question to keep them engaged`

// Built-in fallback responses when OpenAI API key is not configured
const FALLBACK_RESPONSES: Record<string, string> = {
  math: '\ud83d\udcdd Great question about math! Let me help you step by step.\n\nRemember these key tips:\n1. Read the problem carefully\n2. Identify what you need to find\n3. Write down what you know\n4. Choose the right operation (+, -, \u00d7, \u00f7)\n5. Check your answer!\n\nWant me to help with a specific problem? \ud83d\ude0a',
  science: '\ud83d\udd2c Science is all about asking WHY and HOW! \n\nHere are some tips:\n1. Observe carefully\n2. Ask questions\n3. Make predictions\n4. Test your ideas\n5. Draw conclusions\n\nWhat specific topic are you studying? I can explain it with fun examples! \ud83c\udf1f',
  english: '\ud83d\udcda English is fun when you read every day! \n\nTips for improvement:\n1. Read stories aloud\n2. Learn 5 new words daily\n3. Practice writing sentences\n4. Watch English shows\n5. Keep a vocabulary journal\n\nWant help with grammar, reading, or writing? \u270d\ufe0f',
  default: '\ud83c\udf1f Hi there! I\'m VidyaBot, your AI study buddy! \n\nI can help you with:\n\ud83d\udd22 Mathematics - Numbers, algebra, geometry\n\ud83d\udd2c Science - Physics, chemistry, biology\n\ud83d\udcda English - Grammar, comprehension, writing\n\ud83c\udf3f EVS - Plants, animals, environment\n\nJust ask me any question and I\'ll explain it in a fun way! What would you like to learn today? \ud83d\ude80',
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('math') || lower.includes('number') || lower.includes('add') || lower.includes('subtract') || lower.includes('multiply') || lower.includes('divide') || lower.includes('equation') || lower.includes('algebra') || lower.includes('geometry')) {
    return FALLBACK_RESPONSES.math
  }
  if (lower.includes('science') || lower.includes('physics') || lower.includes('chemistry') || lower.includes('biology') || lower.includes('plant') || lower.includes('animal') || lower.includes('body') || lower.includes('energy')) {
    return FALLBACK_RESPONSES.science
  }
  if (lower.includes('english') || lower.includes('grammar') || lower.includes('noun') || lower.includes('verb') || lower.includes('read') || lower.includes('write') || lower.includes('poem') || lower.includes('story')) {
    return FALLBACK_RESPONSES.english
  }
  return FALLBACK_RESPONSES.default
}

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY

    // If OpenAI key is configured, use it
    if (apiKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT + (context ? `\nCurrent lesson context: ${context}` : '') },
            { role: 'user', content: message },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          reply: data.choices[0]?.message?.content || 'I could not generate a response.',
          source: 'openai',
        })
      }
    }

    // Fallback: built-in responses
    return NextResponse.json({
      reply: getFallbackResponse(message),
      source: 'fallback',
    })
  } catch (error) {
    console.error('AI Tutor Error:', error)
    return NextResponse.json({
      reply: FALLBACK_RESPONSES.default,
      source: 'fallback',
    })
  }
}
