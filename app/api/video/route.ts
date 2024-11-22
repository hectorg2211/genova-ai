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
    const response = (await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt,
        },
      }
    )) as ReadableStream[]

    if (response[0]) {
      // Convert the ReadableStream to a buffer
      const videoBuffer = await streamToBuffer(response[0])

      // Serve the video as a Base64-encoded string or store it in a file storage service (e.g., AWS S3)
      const base64Video = videoBuffer.toString('base64')

      // Return a data URI or process as needed
      return NextResponse.json({ video: `data:video/mp4;base64,${base64Video}` })
    }

    return new NextResponse('Failed to generate video', { status: 500 })
  } catch (error) {
    console.log('Video error', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
