import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!openai.apiKey) return new NextResponse('OpenAI API key not configured', { status: 500 })
    if (!messages) return new NextResponse('Messages are required', { status: 400 })

    const freeTrial = await checkApiLimit()
    if (!freeTrial) {
      return new NextResponse('Free trial limit exceeded', { status: 403 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    })

    await increaseApiLimit()

    return new NextResponse(JSON.stringify(response.choices[0].message), { status: 200 })
  } catch (error) {
    console.log('Conversation error', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
