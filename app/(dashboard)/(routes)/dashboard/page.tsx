'use client'

import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/conversation',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/code',
  },
]

export default function Dashboard() {
  const router = useRouter()

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-2lx md:text-4xl font-bold text-center'>Explore de power of AI</h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Unleash Creativity with Generative AI and Transform Ideas into Reality
        </p>

        <div className='px-4 md:px-20 lg:px-32 space-y-4'>
          {tools.map(tool => (
            <Card
              onClick={() => {
                router.push(tool.href)
              }}
              key={tool.href}
              className='p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer'
            >
              <div className='flex items-center gap-x-4'>
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-8 h-8', tool.color)} />
                </div>

                <div className='font-semibold'>{tool.label}</div>
              </div>
              <ArrowRight className='w-5 h-5' />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
