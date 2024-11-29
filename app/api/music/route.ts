import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
})

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: ReadableStream) {
  const reader = stream.getReader()
  const chunks = []
  let done = false

  while (!done) {
    const { value, done: isDone } = await reader.read()
    if (value) chunks.push(value)
    done = isDone
  }

  return Buffer.concat(chunks)
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    const body = await req.json()
    const { prompt } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!prompt) return new NextResponse('Prompt is required', { status: 400 })

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse('Free trial limit exceeded', { status: 403 })
    }

    const response = (await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
        },
      }
    )) as { audio: ReadableStream }

    if (!isPro) await increaseApiLimit()

    if (response.audio) {
      // Convert the ReadableStream to a buffer
      const audioBuffer = await streamToBuffer(response.audio)

      // Serve the audio as a Base64-encoded string or store it in a file storage service (e.g., AWS S3)
      const base64Audio = audioBuffer.toString('base64')

      // Return a data URI or process as needed
      return NextResponse.json({ audio: `data:audio/mpeg;base64,${base64Audio}` })
    }

    return new NextResponse('Failed to generate audio', { status: 500 })
  } catch (error) {
    console.log('Music error', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
