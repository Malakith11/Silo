import OpenAI from 'openai'

let cachedClient: OpenAI | null = null

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.warn('OPENAI_API_KEY is not configured; returning fallback responses.')
    return null
  }

  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey })
  }

  return cachedClient
}

export async function generateSupplementSummary(
  supplementName: string,
  context: string
): Promise<string> {
  try {
    const openai = getOpenAIClient()

    if (!openai) {
      return "Summary unavailable"
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a supplement research expert. Provide clear, evidence-based summaries."
        },
        {
          role: "user",
          content: `Provide a concise summary for ${supplementName} based on this context: ${context}`
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || "Summary unavailable"
  } catch (error) {
    console.error('OpenAI API error:', error)
    return "Summary unavailable"
  }
}

export async function generateOptimizationSuggestions(
  currentStack: any[],
  userGoals: string[]
): Promise<string[]> {
  try {
    const openai = getOpenAIClient()

    if (!openai) {
      return ["Optimization suggestions unavailable"]
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a supplement optimization expert. Provide evidence-based suggestions for improving supplement stacks."
        },
        {
          role: "user",
          content: `Current stack: ${JSON.stringify(currentStack)}. User goals: ${userGoals.join(', ')}. Suggest 3-5 optimization recommendations.`
        }
      ],
      max_tokens: 300,
      temperature: 0.6,
    })

    const content = completion.choices[0]?.message?.content || ""
    return content.split('\n').filter(line => line.trim().length > 0)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return ["Optimization suggestions unavailable"]
  }
}

export { getOpenAIClient as openai }
