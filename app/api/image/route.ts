import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    const body = await req.json()
    const { prompt, amount = 1, resolution = '512x512' } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!openai.apiKey) return new NextResponse('OpenAI API key not configured', { status: 500 })
    if (!prompt) return new NextResponse('Prompt is required', { status: 400 })

    const freeTrial = await checkApiLimit()
    if (!freeTrial) {
      return new NextResponse('Free trial limit exceeded', { status: 403 })
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })

    await increaseApiLimit()

    return new NextResponse(JSON.stringify(response.data), { status: 200 })
  } catch (error) {
    console.log('Image error', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
