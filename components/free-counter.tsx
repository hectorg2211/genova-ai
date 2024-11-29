'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MAX_FREE_COUNTS } from '@/constants'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'

interface FreeCounterProps {
  count: number
  isPro: boolean
}

const FreeCounter: React.FC<FreeCounterProps> = ({ count, isPro = false }) => {
  const proModal = useProModal()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (isPro) {
    return null
  }

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>
              {count} / {MAX_FREE_COUNTS} Free Generations
            </p>

            <Progress value={(count / MAX_FREE_COUNTS) * 100} className='h-3' />
          </div>

          <Button variant='premium' className='w-full' onClick={proModal.onOpen}>
            Upgrade <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter
