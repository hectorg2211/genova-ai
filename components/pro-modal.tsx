'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from '@/components/ui/badge'
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
]

const ProModal = () => {
  const proModal = useProModal()

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              <span>
                Upgrade your <span className='text-emerald-500'>Genova AI</span> experience
              </span>
              <Badge variant='premium' className='uppercase text-sm py-1'>
                Pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription asChild className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            <div>
              {tools.map(tool => (
                <Card key={tool.label} className='p-3 border-black/5 flex items-center justify-between'>
                  <div className='flex items-center gap-x-4'>
                    <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                      <tool.icon className={cn('w-6 h-6', tool.color)} />
                    </div>

                    <div className='font-semibold text-sm'>{tool.label}</div>
                  </div>

                  <Check className='text-primary w-5 h-5' />
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='premium' size='lg' className='w-full'>
            Upgrade <Zap className='w-4 h-4 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
